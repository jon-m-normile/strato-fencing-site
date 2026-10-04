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

  // Order is deliberate (see PRD Appendix A); C5 follows C3 so the two score margins share a page.
  // Screens with the same `page` key are shown together on one questionnaire page (at the first one's position).
  var ALL_SCREENS = [
    { id: 'A1', page: 'background', type: 'numeric', text: 'How many years have you been fencing?', unit: 'years' },
    { id: 'A2', page: 'background', type: 'selects', text: 'What is your primary fencing event?', fields: [
      ['gender', 'Gender', ["Men's", "Women's"]],
      ['weapon', 'Weapon', ['Foil', 'Épée', 'Sabre']]
    ] },
    { id: 'A3', page: 'background', type: 'checks', text: 'At which level do you compete? (Check all that apply.)',
      options: ['Local', 'Regional', 'National', 'International'] },
    { id: 'A4', page: 'background', type: 'short', text: 'What is your current FencingTracker strength rating?',
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
    { id: 'B9', type: 'long', text: 'In between touches, what are you thinking about if you just scored?' },
    { id: 'B10', type: 'long', text: 'In between touches, what are you thinking about if your opponent just scored?' },
    { id: 'B8', type: 'long', text: 'What are you thinking about in the break between periods?' },
    // C1, C2 legacy (site #71): not asked any more; kept for respondents who answered them and on the community page.
    { id: 'C1', type: 'long', legacy: true, text: 'How much does the previous touch affect your thinking on the current touch?' },
    { id: 'C2', type: 'long', legacy: true, text: 'How much does the first touch of the bout affect your thinking on later touches?' },
    { id: 'C3', page: 'score-margins', type: 'numeric', text: 'In your own fencing, what point deficit feels like "losing by a lot"?', unit: 'touches' },
    { id: 'C5', page: 'score-margins', type: 'numeric', text: 'In your own fencing, what point lead feels like "winning by a lot"?', unit: 'touches' },
    { id: 'C4', type: 'long', text: 'How does your thinking change when you\'re losing by "a lot"?' },
    { id: 'C6', type: 'long', text: 'How does your thinking change when you\'re winning by "a lot"?' },
    { id: 'C7', type: 'long', text: 'What are you thinking about when the score is tied?' },
    { id: 'C8', type: 'long', text: 'What are you thinking about if you\'re ahead, but not by "a lot" as you defined it above?' },
    { id: 'C9', type: 'long', text: 'What are you thinking about if you\'re behind, but not by "a lot" as you defined it above?' },
    { id: 'C10', type: 'matrix', retired: true,  // site #52: hidden for now (too overwhelming); may return
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
    { id: 'E2', type: 'alloc', text: 'How would you allocate the importance of the physical, mental, technical, and tactical aspects of fencing?',
      helper: [
        'Physical — Your physical fitness; how fast and strong you are and your level of endurance.',
        'Technical — The quality of your fencing actions; how efficient and effective they are both with your bladework and your footwork.',
        "Tactical — How well you understand what's happening in a bout and if you know what actions to choose versus different types of opponents and different opposing strategies.",
        'Mental — The quality of your thinking and how well it supports your fencing as you seek to score touches.'
      ] },
    { id: 'E3', type: 'long', text: 'Do you feel that you are thinking about fencing the right way during your bouts, or is there anything you would like to be doing differently in the way you are thinking?' }
  ];

  // Retired questions stay defined (and their stored answers kept) but are not asked or shown.
  // Legacy questions are not asked, but stay on the community page and in the questionnaire for
  // respondents who already answered them.
  var SCREENS = ALL_SCREENS.filter(function (s) { return !s.retired; });
  var ACTIVE_SCREENS = SCREENS.filter(function (s) { return !s.legacy; });

  // Serial question numbers (Q1, Q2, …) in the order respondents see the questions; legacy ones get none.
  ACTIVE_SCREENS.forEach(function (s, i) { s.num = 'Q' + (i + 1); });

  // Number shown before a question's text.
  function numLabel(s) { return s.legacy ? '<span class="legacy-tag">Earlier question</span>' : s.num + '/'; }

  // Rows are score situations, columns are bout phases; stored keys are phase_score.
  var MATRIX_ROWS = [['ahead_lot', 'Ahead a lot'], ['ahead_little', 'Ahead a little'], ['tied', 'Tied'],
                     ['behind_little', 'Behind a little'], ['behind_lot', 'Behind a lot']];
  var MATRIX_COLS = [['beginning', 'Beginning'], ['middle', 'Middle'], ['end', 'End']];
  // Shown as a 2x2 grid, top left to bottom right.
  var ALLOC_KEYS = [['physical', 'Physical'], ['technical', 'Technical'], ['tactical', 'Tactical'], ['mental', 'Mental']];

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

  // Render puts the Xenophon server to sleep when idle; the first requests after that fail
  // (or hang) for up to a minute while it starts. waitForServer() polls /ping and, if the
  // wait is noticeable, shows a banner with a progress bar until the server answers.
  var WAKE_LIMIT_MS = 150000;
  var wakePromise = null;

  function ping(timeoutMs) {
    var ctrl = window.AbortController ? new AbortController() : null;
    var timer = ctrl && setTimeout(function () { ctrl.abort(); }, timeoutMs);
    return fetch(API + '/ping', { cache: 'no-store', signal: ctrl ? ctrl.signal : undefined }).then(function (r) {
      clearTimeout(timer);
      if (!r.ok) throw new Error('HTTP ' + r.status);
    }, function (err) { clearTimeout(timer); throw err; });
  }

  function waitForServer() {
    if (wakePromise) return wakePromise;
    var start = Date.now(), banner = null, tick = null;
    var showTimer = setTimeout(function () {
      banner = document.createElement('div');
      banner.className = 'wake-banner';
      banner.setAttribute('role', 'status');
      banner.innerHTML = '<div class="wake-title">Waking up the server…</div>' +
        '<div class="wake-text">The Aristotle server sleeps when it hasn\'t been used for a while and takes up to a minute to start. ' +
        'You don\'t need to do anything — this will continue on its own.</div>' +
        '<div class="wake-bar"><span></span></div><div class="wake-time"></div>';
      document.body.appendChild(banner);
      tick = setInterval(function () {
        var t = (Date.now() - start) / 1000;
        banner.querySelector('.wake-bar span').style.width = (95 * (1 - Math.exp(-t / 25))) + '%';
        banner.querySelector('.wake-time').textContent = Math.round(t) + ' seconds';
      }, 250);
    }, 1500);  // quick answers never show the banner

    function finish() {
      clearTimeout(showTimer);
      clearInterval(tick);
      wakePromise = null;
      if (!banner) return;
      var b = banner;
      b.querySelector('.wake-bar span').style.width = '100%';
      b.querySelector('.wake-title').textContent = 'Server ready';
      setTimeout(function () { b.remove(); }, 700);
    }

    wakePromise = new Promise(function (resolve, reject) {
      (function attempt() {
        ping(20000).then(function () { finish(); resolve(); }, function () {
          if (Date.now() - start < WAKE_LIMIT_MS) { setTimeout(attempt, 3000); return; }
          finish();
          reject(new Error("The server isn't responding. Please try again in a few minutes."));
        });
      })();
    });
    return wakePromise;
  }

  // Network failure or Render's "starting up" responses: worth waiting for the server and retrying.
  function isWaking(err) { return !err.status || err.status === 502 || err.status === 503 || err.status === 504; }

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
    ACTIVE_SCREENS: ACTIVE_SCREENS,
    numLabel: numLabel,
    MATRIX_ROWS: MATRIX_ROWS,
    MATRIX_COLS: MATRIX_COLS,
    ALLOC_KEYS: ALLOC_KEYS,
    esc: esc,
    answered: answered,
    allocTotal: allocTotal,
    answerText: answerText,
    submittedIds: submittedIds,
    rememberSubmitted: rememberSubmitted,
    respondentId: respondentId,
    waitForServer: waitForServer,
    isWaking: isWaking
  };
})();
