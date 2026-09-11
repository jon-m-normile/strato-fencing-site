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

