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
  { id: "001", type: "text", text: "How you make sure I am eating enough." },
  { id: "002", type: "image", text: "How you fall asleep so fast in any moving vehicle.", image: "images/nap.jpg"},
  { id: "003", type: "image", text: "Your quiet little snores.", image: "images/snore.jpg"},
  { id: "004", type: "text", text: "The way seeing your beautiful face always gives me butterflies."},
  { id: "005", type: "text", text: "We always have fun together."},
  { id: "006", type: "text", text: "Our dreams for the future are the same 🏠👨‍👩‍👧‍👦✈️🌅🌊"},
  { id: "007", type: "text", text: "You always hold my hand or arm when we are out."},
  { id: "008", type: "image", text: "You like eating as much as I do.", image: "images/food.jpg"},
  { id: "009", type: "image", text: "You love my biceps.", image: "images/biceps.jpg"},
  { id: "010", type: "image", text: "You love taking selfies with me.", image: "images/selfies.jpg"},
  { id: "011", type: "text", text: "You motivate me to improve myself."},
  { id: "012", type: "text", text: "You are the best at looking after me."},
  { id: "013", type: "text", text: "You always make me laugh."},
  { id: "014", type: "text", text: "The way you kiss me and bite my lips."},
  { id: "015", type: "text", text: "You make me so excited for the future."},
  { id: "016", type: "image", text: "You talk to me every night. Even when your wi-fi is bad.", image: "images/blur.jpg"},
  { id: "017", type: "text", text: "You always know the right thing to say to make me feel loved."},
  { id: "018", type: "text", text: "How you make me feel like the most handsome man in the world."},
  { id: "019", type: "text", text: "You are such an honest person."},
  { id: "020", type: "text", text: "You send me so many hot selfies 😍😍"},
  { id: "021", type: "image", text: "Your kind and loving family.", image: "images/family.jpg"},
  { id: "022", type: "text", text: "The way you always ask me to explain things."},
  { id: "023", type: "image", text: "You like watching movies with me.", image: "images/movies.jpg"},
  { id: "024", type: "image", text: "We are such a cool couple 😎", image: "images/cool.jpg"},
  { id: "025", type: "image", text: "All of your funny faces.", image: "images/faces.jpg"},
  { id: "026", type: "text", text: "Your funny theories about why things are happening."},
  { id: "027", type: "text", text: ""},
  { id: "028", type: "text", text: ""},
  { id: "029", type: "text", text: ""},
  { id: "030", type: "text", text: ""},
];
