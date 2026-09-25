// Aristotle questionnaire definitions and answer formatting.
// Shared by aristotle.html (the questionnaire) and aristotle-community.html (results, comments, admin).
(function () {
  'use strict';

  // Backend lives on the Xenophon app (Render). ?api= overrides it for local testing.
  var API = new URLSearchParams(location.search).get('api') || 'https://xenophon.stratofencing.com/api/aristotle';

  var SECTIONS = {
    A: 'Background',
    B: 'Thinking through the phases of a single bout',
    C: 'Thinking relative to the score',
    D: 'Adapting within a bout',
    E: 'Reflection on the thinking process'
  };

  // Order is deliberate (see PRD Appendix A) — do not reorder or reword.
  var SCREENS = [
    { id: 'A1', type: 'numeric', text: 'How many years have you been fencing?', unit: 'years' },
    { id: 'A2', type: 'selects', text: 'What is your primary fencing event?', fields: [
      ['gender', 'Gender', ["Men's", "Women's"]],
      ['weapon', 'Weapon', ['Foil', 'Épée', 'Sabre']]
    ] },
    { id: 'A3', type: 'checks', text: 'At which level do you compete? (Check all that apply.)',
      options: ['Local', 'Regional', 'National', 'International'] },
    { id: 'A4', type: 'short', text: 'What is your current FencingTracker strength rating?',
      textHtml: 'What is your current <a href="https://fencingtracker.com" target="_blank" rel="noopener">FencingTracker</a> strength rating?',
      helper: ["Leave this blank if you don't have one or don't know it."] },
    { id: 'B1', type: 'long', text: 'What are you thinking about on the en garde line immediately before the bout begins?' },
    { id: 'B2', type: 'long', text: 'What are you thinking about during the moments when you are "out of distance" from your opponent?',
      helper: ['"Out of distance" is the distance at which you or your opponent would need at least two tempos to reach the target and score a touch.'] },
    { id: 'B3', type: 'long', text: 'What are you thinking about when you are "in distance" from your opponent?',
      helper: ['"In distance" is the distance at which either you or your opponent can reach the target in one tempo.'] },
    { id: 'B4', type: 'long', text: 'What are you thinking about when you are making a preparation?',
      helper: ['A "preparation" is any movement that seeks to put your opponent in a position to be hit with a subsequent action.'] },
    { id: 'B5', type: 'long', text: 'What are you thinking about when you see your opponent make a preparation?' },
    { id: 'B6', type: 'long', text: 'What are you thinking about when you are making an action to score against your opponent?' },
    { id: 'B7', type: 'long', text: 'What are you thinking about when your opponent makes an action to score against you?' },
    { id: 'B8', type: 'long', text: 'What are you thinking about in the break between periods?' },
    { id: 'C1', type: 'long', text: 'How much does the previous touch affect your thinking on the current touch?' },
    { id: 'C2', type: 'long', text: 'How much does the first touch of the bout affect your thinking on later touches?' },
    { id: 'C3', type: 'numeric', text: 'In your own fencing, what point deficit feels like "losing by a lot"?', unit: 'touches' },
    { id: 'C4', type: 'long', text: "How does your thinking change when you're losing by that much?" },
    { id: 'C5', type: 'numeric', text: 'In your own fencing, what point lead feels like "winning by a lot"?', unit: 'touches' },
    { id: 'C6', type: 'long', text: "How does your thinking change when you're winning by that much?" },
    { id: 'C7', type: 'long', text: 'What are you thinking about when the score is tied?' },
    { id: 'C8', type: 'long', text: 'What are you thinking about if you\'re ahead, but not by "a lot" as you defined it above?' },
    { id: 'C9', type: 'long', text: 'What are you thinking about if you\'re behind, but not by "a lot" as you defined it above?' },
    { id: 'C10', type: 'matrix',
      text: 'Now consider each of the five score situations above — ahead a lot, ahead a little, tied, behind a little, behind a lot — separately for the beginning, middle, and end of a bout as defined in the note. For each cell, note anything different from what you said above — or leave it blank if nothing changes.',
      helper: [
        'Define the beginning, middle, and end of a bout as follows:',
        'In a 15-touch bout: beginning = 0–3, middle = 4–12, end = 13–15.',
        'In a 5-touch bout: beginning = 0–1, middle = 2–4, end = 5.',
        "Leave any box blank if your answer doesn't change from what you wrote above."
      ] },
    { id: 'D1', type: 'long', text: 'How do you decide when you need to make a change to what you are doing in a fencing match?' },
    { id: 'D2', type: 'long', text: "How do you implement any change to your tactics within a bout that you've decided to make?" },
    { id: 'E1', type: 'long', text: 'Are you aware of your emotions during a match, and do you seek to manage those emotions in any way?' },
    { id: 'E2', type: 'alloc', text: 'How would you allocate the importance of the physical, mental, technical, and tactical aspects of fencing?' },
    { id: 'E3', type: 'long', text: 'Do you feel that you are thinking about fencing the right way during your bouts, or is there anything you would like to be doing differently in the way you are thinking?' }
  ];

  // Rows are score situations, columns are bout phases; stored keys are phase_score.
  var MATRIX_ROWS = [['ahead_lot', 'Ahead a lot'], ['ahead_little', 'Ahead a little'], ['tied', 'Tied'],
                     ['behind_little', 'Behind a little'], ['behind_lot', 'Behind a lot']];
  var MATRIX_COLS = [['beginning', 'Beginning'], ['middle', 'Middle'], ['end', 'End']];
  var ALLOC_KEYS = [['physical', 'Physical'], ['mental', 'Mental'], ['technical', 'Technical'], ['tactical', 'Tactical']];

  // Session ids this browser has submitted; claimed by the account that signs in here.
  var SUBMITTED_KEY = 'aristotle_submitted';

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function answered(s, v) {
    if (v === undefined || v === null) return false;
    if (Array.isArray(v)) return v.length > 0;
    if (typeof v === 'object') {
      return Object.keys(v).some(function (k) { return v[k] !== null && v[k] !== ''; });
    }
    return String(v).trim() !== '';
  }

  function allocTotal(v) {
    return ALLOC_KEYS.reduce(function (sum, k) { return sum + (v && typeof v[k[0]] === 'number' ? v[k[0]] : 0); }, 0);
  }

  function answerText(s, v) {
    if (!answered(s, v)) return null;
    if (s.type === 'numeric') return v + ' ' + s.unit;
    if (s.type === 'checks') return v.join(', ');
    if (s.type === 'selects' && typeof v === 'object') {
      return s.fields.map(function (f) { return v[f[0]]; }).filter(Boolean).join(' ');
    }
    if (s.type === 'matrix') {
      var lines = [];
      MATRIX_ROWS.forEach(function (r) {
        MATRIX_COLS.forEach(function (c) {
          var t = v[c[0] + '_' + r[0]];
          if (t && t.trim()) lines.push(r[1] + ' · ' + c[1] + ': ' + t);
        });
      });
      return lines.join('\n');
    }
    if (s.type === 'alloc') {
      return ALLOC_KEYS.map(function (k) {
        return k[1] + ' ' + (typeof v[k[0]] === 'number' ? v[k[0]] + '%' : '—');
      }).join('  ·  ') + '\n(Total: ' + allocTotal(v) + '%)';
    }
    return v;
  }

  // Random, anonymous id kept in this browser for good; groups one person's responses.
  var RESPONDENT_KEY = 'aristotle_respondent';
  function respondentId() {
    var id;
    try { id = localStorage.getItem(RESPONDENT_KEY); } catch (e) { /* storage unavailable */ }
    if (!id) {
      id = window.crypto && crypto.randomUUID ? crypto.randomUUID() : null;
      try { if (id) localStorage.setItem(RESPONDENT_KEY, id); } catch (e) { /* storage unavailable */ }
    }
    return id;
  }

  function submittedIds() {
    try { return JSON.parse(localStorage.getItem(SUBMITTED_KEY)) || []; } catch (e) { return []; }
  }
  function rememberSubmitted(id) {
    var ids = submittedIds();
    if (!id || ids.indexOf(id) >= 0) return;
    ids.push(id);
    try { localStorage.setItem(SUBMITTED_KEY, JSON.stringify(ids)); } catch (e) { /* storage unavailable */ }
  }

  window.Aristotle = {
    API: API,
    AUTH_API: API.replace(/\/api\/aristotle\/?$/, '') + '/auth',
    TOKEN_KEY: 'aristotle_token',
    SECTIONS: SECTIONS,
    SCREENS: SCREENS,
    MATRIX_ROWS: MATRIX_ROWS,
    MATRIX_COLS: MATRIX_COLS,
    ALLOC_KEYS: ALLOC_KEYS,
    esc: esc,
    answered: answered,
    allocTotal: allocTotal,
    answerText: answerText,
    submittedIds: submittedIds,
    rememberSubmitted: rememberSubmitted,
    respondentId: respondentId
  };
})();
