# All The Reasons

A little virtual jar of notes. Tap the jar — the lid pops open, a rolled-up
paper rises out and unravels in front of it, and a reason appears. No repeats
until the whole jar has been seen, then it quietly refills.

One note at a time, on purpose: the only way to another reason is **tuck it
back in the jar** and open it again. There's deliberately no "pull another"
shortcut, so the jar can't be binged in one sitting.

Static site: plain HTML/CSS/JS, no build step, no backend. Hosted on GitHub Pages.

---

## Adding a new note (the only maintenance you ever do)

1. Open **`notes.js`**.
2. Copy the last line, paste it below, and bump the `id` by one
   (`"013"` → `"014"`). **Never reuse or renumber an id** — that's what keeps
   "already seen" tracking honest.
3. Write the note.

   **Text note:**
   ```js
   { id: "014", type: "text", text: "The thing you want her to read." },
   ```

   **Image note:**
   ```js
   { id: "015", type: "image", text: "A caption for the photo.", image: "images/015.jpg" },
   ```
   Then drop the image file into the **`images/`** folder with a matching name.
   Keep images rare — about 1 in every 15 notes.

4. Save, commit, push:
   ```bash
   git add notes.js images/
   git commit -m "Add reason 014"
   git push
   ```
   GitHub Pages redeploys automatically in a minute or two.

That's it. The app never has a hardcoded count — everything scales off
`NOTES.length`. New notes just join the pool on her next visit.

---

## Image tips

- Resize to about **1200px** on the long edge and compress (aim for well under
  ~300 KB each) — she'll often open this on mobile data.
- JPG for photos, PNG for anything with text/graphics. `.jpg`, `.png`, `.webp`,
  `.gif`, `.svg` all work.
- If an image is ever missing or broken, that note just shows its text — nothing
  breaks.

## Deploying (one-time setup)

1. Push this folder to a GitHub repo.
2. Repo **Settings → Pages → Build and deployment → Source: Deploy from a
   branch**, branch `main`, folder `/ (root)`.
3. Share the `https://<user>.github.io/<repo>/` link.

## Files

| File | What it is |
|------|------------|
| `index.html` | Markup and the jar SVG (the *"all the reasons i love you"* label lives here) |
| `style.css`  | All styling + the lid-open / rise / unravel animation |
| `app.js`     | Draw logic, no-repeat tracking (localStorage), animation sequencing |
| `notes.js`   | **The notes array — the file you edit** |
| `images/`    | Note images, referenced by filename from `notes.js` |

### Changing the jar

- **Label text** — the two `<text>` lines inside `index.html`'s jar SVG.
- **Jar size** — the `--jar-w` variable at the top of `style.css` (and again in
  the `min-width: 640px` block for desktop).
- **Animation speed** — the delays and durations in the *emerge sequence* block
  of `style.css`. If you change the last one to finish later, bump `EMERGE_MS`
  in `app.js` to match, or the animation gets cut short.

## Resetting progress

Progress lives in `localStorage` under `hundred-reasons:seen:v1`. To wipe it,
open the site, open the browser console, and run:
```js
__resetJar()
```
