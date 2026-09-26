Updates file for the Strato Fencing website

#1 Change the Products page to 'Services'

#2 Let's change how we show pictures on the home page.
##2.1 Let's get rid of the picture carousel.  Some pictures have a dark background and others have a light background and it makes the text hard to read.  Let's use this picture as the static background in the top frame use this photo...'~/Pictures/Stratofencing/WLFY8233.JPEG'

#3  Move the 'Hero photo of me and place it the region closer to my name.

#4  Reverse the color scheme of the Competition History because it is not visible as is.  It currently is a light colored font over light colored background.

#5 In the Title Block change 'Strato Fencing Academy - Millburn, NJ   / FENCING COACH / JON NORMILE' to read 'STRATO FENCING ACADEMY / Millburn, NJ

#6 Use this photo as the header for the Coaching History section....'~/Pictures/Stratofencing/Lesson with Joseph Doan.jpg'

#7 Use this photo as the header for the Competition History section...'~/Pictures/Stratofencing/Normile vs Trevor 2 1988 National Championships.jpg'

#8 add any new photos to the gallery page

#9  Let's stack competition history above coaching history.  Let's separate each section with a frameless picture as referenced previously

#10 ✅ Add the 'hero' photo above the 'About Me' section.   '~/Pictures/Stratofencing/homepage.jpg'
Added homepage.jpg as a full-width parallax photo between the stats bar and the About section.

#11 ✅ Change "Coaching History / Clubs & Programs " to be just "Coaching History"
Changed section-label to "Background" and h2 to "Coaching History".

#12 ↩️ Parallax scrolling — reverted. Photos scroll normally with the page.

#13 ✅ I want to change the home page.
Redesigned: dark hero (no photo, no badges), homepage.jpg at 75% centered below hero, stats bar moved to below About, section photos removed.

  Let's get rid of the first photo.  Let's get rid of the small portratin photo.  Let's have a blank dark background for the title and subtitle "Strato Fencing Academy" & "Épée and foil fencing instruction from an Olympian, World Champion, and member of the US Fencing Hall of Fame. By appointment only in Millburn NJ."  And let's get rid of the 'Millburn, NJ' above the title.  Let's get rid of the 4 blue tiles showing my achievements.  Then let's have my photo.  Let's use a black background for the empty space on either side.  Then, we'll have the About Me section, and then let;s move the strip of tiles ("45+ Years Fencing  20+ Years Coaching 3×U.S. Champion 1992 Olympian  2023 World Champion") from up above to right bleow the About section.  ANd let's get rid of the other two photos too.

#14 ✅ Add an Annotation FAQ page, linked from the "How to Use Xenophon" list
New xenophon-faq.html — content and diagrams sourced from Jon's Google Doc
FAQ, covering Action Sequence, 2nd/3rd Intention, Strip Location (with the
3 strip-zone example diagrams), Initiative, The Four Modes, Appraisal,
Cards, and Comments. Reuses xenophon.html's nav/footer/section styling.
Added item #8 to the "How to Use Xenophon" list on xenophon.html linking
to it ("See here for detailed annotation instructions").

#15 ✅ Move "Book a Lesson" up beside the hero subtitle, remove "View Services"
Hero subtitle and "Book a Lesson" button now sit side by side on one row
(subtitle left, button right), instead of the subtitle above a separate
button row. Removed the "View Services" button entirely (and its now-unused
.btn-outline/.hero-cta styles). Hero title and subtitle row now stretch to
the same width (align-items: stretch on .hero) instead of the subtitle
being capped at 560px. Removing the old button-only row naturally pulls the
photo/About section up — no extra spacing changes needed.

#16 ✅ Add a line break before "By appointment only", move Book a Lesson beside the title
Added <br> before "By appointment only in Millburn, NJ." in the hero
subtitle. Moved the "Book a Lesson" button up out of the subtitle row and
into a new row beside the title (.hero-top), centered both vertically and
horizontally in the black space to the title's right. Subtitle now sits on
its own line below, still spanning the same width as the title. Button font
size doubled to half the title's size (clamp(1.25rem, 3vw, 2.5rem), was
0.85rem) with larger padding to match.

#17 ✅ Add hidden /aristotle questionnaire page (Xenophon Trello #28)
New aristotle.html (not linked from nav, noindex): landing page styled like
xenophon.html (hero, overview, what to expect, "Who was Aristotle?" with
aristotle.jpg in the same namesake layout, Start CTA), then a one-question-per-
screen questionnaire (26 screens incl. the C10 definitional screen and the C11
3x5 matrix) with progress bar and Back / Skip / Next, a review screen where any
answer can be clicked to edit, submit, and a thank-you screen. Answers autosave
(debounced + on blur/navigation + keepalive on tab close) to the Xenophon API
(/api/aristotle/*), are cached in localStorage for resume/offline retry, and a
full snapshot is written on reaching/leaving review and on submit. E2 uses four
% fields each clamped to 0..min(100, 100 - others), with a warning once any is
filled and the total isn't 100%.

#18 ✅ Aristotle questionnaire feedback round 1 (Xenophon Trello #28)
A2 is now two dropdowns (Gender, Weapon); added A3 competition level
(checkboxes) and A4 FencingTracker strength rating; removed Skip buttons;
definitions added under the out-of-distance, in-distance and preparation
questions; C11 matrix flipped to 5 score rows x 3 phase columns, with the
beginning/middle/end definitions repeated on that screen. 28 screens.

#19 ✅ Aristotle landing copy (Xenophon Trello #28 feedback)
Hero title now "The Aristotle Fencing Psychology Project" (font size reduced to
fit); Overview, What to Expect and Who was Aristotle? rewritten with the
supplied text (minor typo fixes); removed the "20 to 30 minutes" line.

#20 ✅ Aristotle link in top nav (Xenophon Trello #28 feedback)
Added "Aristotle" after "Xenophon" in the nav on every page (active on
aristotle.html); removed the noindex meta so the page is public.

#21 ✅ Aristotle community page and accounts (Xenophon Trello #29)
New aristotle-community.html (noindex): log in / create account (Xenophon
accounts, public usernames), curated results per question with one comment
thread each (edit/delete own; admin deletes any), account page (change
username), and super-user admin (include/edit/delete answers, delete
responses, accounts table). Thank-you screen invites users to create an
account and auto-claims their submitted responses. Question definitions and
styles moved to shared aristotle-questions.js / aristotle.css.

#22 ✅ Aristotle landing and questionnaire tweaks (Xenophon Trello #28 feedback)
"What follows is a questionnaire…" paragraph moved to the top of What to
Expect, with a Start button at the bottom of that section; A2 gender options
now Men's / Women's; FencingTracker in A4 links to fencingtracker.com;
definition/help text shown as a "Note" margin aside to the right of the
question (stacked under the question on phones); C11 matrix rows reordered to
Ahead a lot, Ahead a little, Tied, Behind a little, Behind a lot (prompt text
matched).

#23 ✅ Aristotle What to Expect intro reworded (Xenophon Trello #28 feedback)
"What follows is a questionnaire…" paragraph updated to the supplied text
("…for a variety of different fencing situations…"), typo "ffor" fixed.

#24 ✅ Aristotle "no wrong answers" line reworded (Xenophon Trello #28 feedback)
"…how you think than you do." → "…how you think than you."

#25 ✅ Aristotle portrait links to Wikipedia (Xenophon Trello #28 feedback)
Bust image in "Who was Aristotle?" links to en.wikipedia.org/wiki/Aristotle (new tab).

#26 ✅ Aristotle B2 "out of distance" note reworded (Xenophon Trello #28 feedback)
"…at which your opponent would need…" → "…at which you or your opponent would need…".

#27 ✅ Aristotle C1 reworded (Xenophon Trello #28 feedback)
"How much does the previous touch scored affect…" → "How much does the previous touch affect…".

#28 ✅ Aristotle: info screen folded into the matrix question; questions renumbered (Xenophon Trello #28 feedback)
The standalone "define beginning/middle/end" screen (old question 22, C10) is
gone; its definitions are in the matrix question's side note, and the
question now says "as defined in the note". Matrix question renumbered
C11 → C10 (section C is C1–C10), 27 questions total; in-progress answers
saved in the browser under C11 are carried over. Backend: Xenophon #363.

#29 ✅ Aristotle E2 live pie chart (Xenophon Trello #28 feedback)
The allocation question shows a pie that starts empty and fills with a
colored slice per quality as percentages are entered (unallocated share
stays empty); input labels carry matching color swatches. Stacks under the
inputs on phones.

#30 ✅ Aristotle E2 pie labels (Xenophon Trello #28 feedback)
Phys / Ment / Tech / Tact labels sit just outside each wedge at its
mid-angle and glide to the new position as values change (hidden while a
value is 0). More space (4rem) between the inputs and the pie.

#31 ✅ Aristotle E2 reworded (Xenophon Trello #28 feedback)
"…allocate importance between the physical…" → "…allocate the importance of the physical…".

#32 ✅ Aristotle anonymous respondent ID (Xenophon Trello #28 feedback; backend Xenophon #364)
Each browser gets a random id (localStorage `aristotle_respondent`, kept across
submits) sent with every new session. Admin Answers tab has a Respondent filter
(short id · username if claimed · response count); each answer's "Respondent xxxxxxxx"
link filters to that person. Older sessions without an id show as "Respondent unknown".

#33 ✅ Aristotle: existing Xenophon account on Create Account (Xenophon Trello #28 feedback)
If the email is already registered, the page tells the user and tries their password on
that account: on success they are signed in and this browser's submitted questionnaires
are linked to it (existing username kept); otherwise they land on Sign In with the email
pre-filled. Answers are never linked without signing in to the account.

#34 ✅ Aristotle: Sign In link at the top of the landing page (Xenophon Trello #28 feedback)
Outlined "Sign In" button top-right of the hero, linking to aristotle-community.html
(reads "My Account" when already signed in on this browser).

#35 ✅ Aristotle emoji reactions on answers (Xenophon Trello #28 feedback; backend Xenophon #365)
Answers & Discussion: each curated answer has a reaction bar. The 🙂+ button opens a
picker of six emoji (👍 ❤️ 💡 🤔 😂 🎯); chips show counts, the viewer's own reactions are
highlighted, and clicking a chip toggles it.

#36 ✅ Aristotle landing title split (Xenophon Trello #28 feedback)
Hero title now "Aristotle" with "A fencing psychology project" on a second, smaller line.

#37 ✅ Aristotle overview paragraphs reworded (Xenophon Trello #28 feedback)
"physical chess" paragraph: "opponents" → "opponent"; ends "…not a clear idea of how to
think or what to be thinking about during a bout." Second paragraph now "…seeks to better
understand what different fencers think about during their bouts, and then to learn how
different ways of thinking result in victories or defeats." ("This project has several
goals." unchanged.)

#38 ✅ Aristotle "no wrong answers" line reworded (Xenophon Trello #28 feedback)
"…No one knows better how you think than you." → "…No one knows better than you how you think."

#39 ✅ Services page: "basic technique" → "basic techniques" of the Hungarian system
products.html, in both the épée and foil lesson descriptions.

#40 ✅ Services page: new "Xenophon Annotation and Commentary — $30" service
Added after Video Review in products.html; "Xenophon platform" links to xenophon.html.
The credit-against-Video-Analysis line is shown as an italic product note. Typos fixed:
"Analyis" → "Analysis", "is schedule" → "is scheduled". css/style.css: accent color for
links inside .product-desc.

#41 ✅ Services page: Xenophon service credit note names "Video Review and Tactical Analysis"
Replaces "Video Analysis"; the rest of the user's wording is kept as written.

#42 ✅ Aristotle: "Waking up the server" banner instead of a failure while Render cold-starts (Xenophon Trello #28 feedback)
aristotle-questions.js `waitForServer()` polls /api/aristotle/ping (20s timeout, retry every
3s, gives up after 2.5 min). If the wait is longer than 1.5s, a bottom banner explains the
server is starting, with a progress bar and elapsed seconds, and says "Server ready" when done.
Community page: any request that fails with a network error or 502/503/504 waits for the
server and retries once (so sign-in just completes); the page also starts waking the server
on load. Questionnaire: Submit does the same. CSS in aristotle.css (.wake-banner).
