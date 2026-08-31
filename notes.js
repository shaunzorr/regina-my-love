/* ===========================================================================
   100 Reasons — the notes
   ---------------------------------------------------------------------------
   This is the ONLY file you edit to add notes. See README.md.

   Each note is an object:

     { id: "004", type: "text",  text: "Something you want her to read." }
     { id: "005", type: "image", text: "A caption for the picture.", image: "images/005.jpg" }

   Rules of thumb:
     - id      : a unique string. Just keep counting up: "014", "015", ...
                 Never reuse or renumber an id — that's how "already seen"
                 tracking stays correct.
     - type    : "text" or "image".
     - text    : always present. For image notes it's the caption.
     - image   : only for type "image". Path relative to this file,
                 e.g. "images/014.jpg". Drop the file in the images/ folder.
     - Keep images rare — roughly 1 in every 15 notes.

   Add a note -> save -> commit -> push. GitHub Pages redeploys on its own.
   =========================================================================== */

const NOTES = [
  { id: "001", type: "text", text: "The way you laugh at your own jokes before you finish telling them." },
  { id: "002", type: "text", text: "You always save me the last bite, even when you say you don't want it." },
  { id: "003", type: "text", text: "How you text me the second something good happens, before you tell anyone else." },
  { id: "004", type: "image", text: "Six months since this one. I'd do all of it again.", image: "images/sample-heart.svg" },
  { id: "005", type: "text", text: "You remember the tiny things I mention once and never expected you to keep." },
  { id: "006", type: "text", text: "Coffee made exactly how I like it, handed to me before I ask." },
  { id: "007", type: "text", text: "The little hum you do when you're concentrating, with no idea you're doing it." },
  { id: "008", type: "text", text: "You make ordinary Tuesdays feel like they're worth writing down." },
  { id: "009", type: "image", text: "This sky reminded me of you — quietly making everything better.", image: "images/sample-sunrise.svg" },
  { id: "010", type: "text", text: "How steady \"I'm here\" sounds when you say it." },
  { id: "011", type: "text", text: "You argue out loud with movie plots and I hope you never stop." },
  { id: "012", type: "text", text: "The way you hold my hand a little tighter in crowds." },
  { id: "013", type: "text", text: "Half a year in, and you still send me songs that say what you're feeling." },
];
