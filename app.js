/* ===========================================================================
   All The Reasons — interaction, no-repeat logic, animation orchestration
   Vanilla JS, no dependencies. Expects `NOTES` from notes.js (loaded first).
   =========================================================================== */

(function () {
  'use strict';

  var STORAGE_KEY = 'hundred-reasons:seen:v1';

  /* Total length of each sequence. Must stay >= the longest animation defined
     in style.css — full: emerge ends 1480ms, retract 440ms; reduced-motion:
     the fades end at 560ms and 240ms. */
  var EMERGE_MS = 1480;
  var RETRACT_MS = 440;
  var EMERGE_MS_REDUCED = 560;
  var RETRACT_MS_REDUCED = 240;

  var scene       = document.getElementById('scene');
  var jarBtn      = document.getElementById('jar');
  var jarMouth    = document.getElementById('jar-mouth');
  var noteLayer   = document.getElementById('note-layer');
  var scroll      = document.getElementById('scroll');
  var paper       = document.getElementById('paper');
  var paperText   = document.getElementById('paper-text');
  var paperFigure = document.getElementById('paper-figure');
  var paperImage  = document.getElementById('paper-image');
  var returnBtn   = document.getElementById('return');
  var cycleNote   = document.getElementById('cycle-note');

  /* Read live rather than once, so toggling the OS setting takes effect
     without a reload. */
  var motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  function emergeMs()  { return motionQuery.matches ? EMERGE_MS_REDUCED  : EMERGE_MS; }
  function retractMs() { return motionQuery.matches ? RETRACT_MS_REDUCED : RETRACT_MS; }

  var busy = false;
  var noteOut = false;
  var lastShownId = null;
  var timers = [];

  /* --- guard: nothing to show --------------------------------------------- */

  if (typeof NOTES === 'undefined' || !Array.isArray(NOTES) || NOTES.length === 0) {
    noteLayer.hidden = false;
    scene.classList.add('has-note');
    paperText.textContent = 'The jar is empty right now — add some notes in notes.js 💌';
    returnBtn.hidden = true;
    return;
  }

  /* --- dev sanity: warn on duplicate ids ---------------------------------- */

  (function checkIds() {
    var seenIds = Object.create(null);
    for (var i = 0; i < NOTES.length; i++) {
      if (NOTES[i].id in seenIds) {
        console.warn('[reasons] duplicate note id "' + NOTES[i].id +
                     '" — no-repeat tracking needs unique ids.');
      }
      seenIds[NOTES[i].id] = true;
    }
  })();

  /* --- localStorage helpers ----------------------------------------------- */

  function loadSeen() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      var parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(function (id) { return typeof id === 'string'; });
    } catch (e) {
      return []; // corrupt value, private mode, etc. — just start fresh
    }
  }

  function saveSeen(ids) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch (e) {
      /* quota / private mode: the app still works, it just won't remember */
    }
  }

  /* --- the draw ------------------------------------------------------------
     Pick a random note not yet seen this cycle. When every note has been seen,
     wipe the set and start a fresh cycle. Notes added to notes.js between
     visits join the eligible pool automatically; removed ones are pruned from
     the stored set. No migration ever needed.
  ------------------------------------------------------------------------- */

  function draw() {
    var validIds = Object.create(null);
    NOTES.forEach(function (n) { validIds[n.id] = true; });

    var seen = loadSeen().filter(function (id) { return validIds[id]; });
    var pool = NOTES.filter(function (n) { return seen.indexOf(n.id) === -1; });

    if (pool.length === 0) {
      seen = [];
      pool = NOTES.slice();
      // don't repeat the last note straight across the cycle boundary
      if (lastShownId && pool.length > 1) {
        pool = pool.filter(function (n) { return n.id !== lastShownId; });
      }
    }

    var note = pool[Math.floor(Math.random() * pool.length)];
    seen.push(note.id);
    saveSeen(seen);
    lastShownId = note.id;

    return {
      note: note,
      seenCount: seen.length,
      total: NOTES.length,
      cycleComplete: seen.length === NOTES.length
    };
  }

  /* --- rendering ---------------------------------------------------------- */

  function renderNote(result) {
    var note = result.note;

    paperText.textContent = note.text || '';

    if (note.type === 'image' && note.image) {
      paperFigure.hidden = true;
      paperImage.hidden = true;
      paperImage.alt = note.text || 'a picture';
      paperImage.onload = function () {
        paperFigure.hidden = false;
        paperImage.hidden = false;
      };
      paperImage.onerror = function () {
        // missing / broken image — quietly fall back to text only
        paperFigure.hidden = true;
        paperImage.hidden = true;
      };
      paperImage.src = note.image;
    } else {
      paperFigure.hidden = true;
      paperImage.hidden = true;
      paperImage.removeAttribute('src');
    }

    if (result.cycleComplete) {
      cycleNote.textContent = 'that’s every reason for now — the jar just refilled ✨';
      cycleNote.hidden = false;
    } else {
      cycleNote.hidden = true;
      cycleNote.textContent = '';
    }
  }

  /* --- animation helpers -------------------------------------------------- */

  function restart(el, className) {
    el.classList.remove(className);
    void el.offsetWidth; // force reflow so the animation replays every time
    el.classList.add(className);
  }

  function after(ms, fn) {
    timers.push(window.setTimeout(fn, ms));
  }

  function clearTimers() {
    timers.forEach(window.clearTimeout);
    timers = [];
  }

  /* How far the note has to travel up to sit at the jar's mouth. Measured
     live so it stays right on any screen size or orientation. */
  function setMouthOffset() {
    var mouth = jarMouth.getBoundingClientRect();
    var here = scroll.getBoundingClientRect();
    if (!here.height) return;
    var dy = (mouth.top + mouth.height / 2) - (here.top + here.height / 2);
    scroll.style.setProperty('--mouth-offset', Math.round(dy) + 'px');
  }

  /* --- the sequence ------------------------------------------------------- */

  function emerge() {
    busy = true;
    renderNote(draw());

    noteLayer.hidden = false;
    scroll.classList.remove('is-emerging', 'is-retracting');
    void scroll.offsetWidth;

    setMouthOffset();          // measure before the jar dims (no transform on it)
    scene.classList.add('has-note');
    noteOut = true;

    restart(jarBtn, 'is-opening');
    scroll.classList.add('is-emerging');

    after(emergeMs(), function () {
      scroll.classList.remove('is-emerging'); // base styles == final keyframe
      jarBtn.classList.remove('is-opening');
      busy = false;
      paper.focus({ preventScroll: true }); // so screen readers announce the note
    });
  }

  function retract() {
    busy = true;
    scroll.classList.remove('is-emerging');
    restart(scroll, 'is-retracting');

    after(retractMs(), function () {
      scroll.classList.remove('is-retracting');
      noteLayer.hidden = true;
      scene.classList.remove('has-note');
      noteOut = false;
      busy = false;
      jarBtn.focus({ preventScroll: true });
    });
  }

  /* One note at a time, deliberately: the only way to another reason is to
     tuck this one back and open the jar again. There's no "pull another"
     shortcut — the jar itself is the only draw. */
  function pull() {
    if (busy || noteOut) return;
    clearTimers();
    emerge();
  }

  function tuckBack() {
    if (busy || !noteOut) return;
    clearTimers();
    retract();
  }

  /* --- wire up ------------------------------------------------------------ */

  jarBtn.addEventListener('click', pull);
  returnBtn.addEventListener('click', tuckBack);

  // keep the travel distance honest across rotation / resize
  window.addEventListener('resize', function () {
    if (noteOut && !busy) setMouthOffset();
  });

  /* --- maintainer convenience --------------------------------------------- */
  /* Run  __resetJar()  in the browser console to clear progress and reload. */
  window.__resetJar = function () {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
    location.reload();
  };
})();
