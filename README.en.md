# NeoDocs

A complete word processor in NeoDex: write, format, insert tables and images, check spelling, then export to PDF or Word. Your documents are saved automatically and synced between your PCs.

*Version française : [README.md](README.md)*

## Comments and versions (new in 1.3.0)

Comment on a passage (💬 or Ctrl+Alt+M), list of comments on the right (go, edit, resolved); version history (on open and every 10 min, 20 at most) with Restore.

## Documents

- The left list shows your documents, newest first, with a search by name. **+ New** creates one, **Open…** imports a file from your PC: Word (`.docx`), web page (`.html`), Markdown (`.md`) or text (`.txt`).
- Right-clicking a document lets you **rename**, **duplicate** or **delete** it (deleting also applies on your other synced PCs).
- Every change is **saved automatically**; if the document was changed on another PC, it updates and tells you.

## Formatting

- **Paragraph styles**: Paragraph, Heading 1, Heading 2, Heading 3, Quote, Code.
- **Font** (Calibri, Segoe UI, Arial, Georgia, Times New Roman, Garamond, Consolas…), **size** in points, text **colour** and **highlight**.
- **Bold** (Ctrl+B), **italic** (Ctrl+I), **underline** (Ctrl+U), strikethrough, superscript and subscript.
- **Alignment**: left, centred, right, justified.
- **Bulleted**, numbered or **task lists** (checkboxes); **Tab** and **Shift+Tab** increase or decrease the indent.
- **Clear formatting** returns the selected text to plain.
- **Undo** (Ctrl+Z) and **Redo** (Ctrl+Y).

## Insert

- **Image** from a file or a link; click an image then choose its size (25% to full width) or delete it.
- **Table** of the size you want (for example 3 x 3).
- **Link** (Ctrl+click to open it in a tab), **horizontal line**, **page break** and **today's date**.

## Tools

- **Find and replace** (Ctrl+H): next, replace, or replace all.
- **Document outline**: the list of headings, to jump straight to a section.
- Page **zoom**.
- French and English **spell checker**: unknown words are underlined, **right-click** to see suggestions.
- The bottom bar counts **words**, **characters**, **pages** (approximately), **reading time** and words to check.

## Comments and versions (1.3.0)

- **💬 Comment** (or Ctrl+Alt+M): select a passage, write your comment. The passage is highlighted in yellow; the right panel lists every comment (click to go there, Edit, Resolved). Comments are left out of exports.
- **🕘 Versions**: a version is kept when the document opens and every 10 minutes of writing (20 at most, on this PC only). "Keep now" adds one; "Restore" goes back, and the current text stays in the versions.

## Export

PDF, Word (`.doc`), web page (`.html`), text (`.txt`) or Markdown (`.md`): the file is saved wherever you like on your PC.

## Data and sync

Your documents are stored by NeoDex, backed up and synced between your PCs when sync is on. The plugin asks for access to your documents to open and export files.

## Install

In NeoDex: **NeoStore → Discover → NeoDocs → Install**.

Building a plugin: see the [NeoDex SDK](https://github.com/NDesumeur/neodex-sdk).

## Full-screen reading

The 📖 toolbar button shows the document alone, full screen, so you can't change it by accident. **A−** and **A+** change the size, **Esc** or **Leave reading** takes you back to editing. On a small screen, the page fits the width (Zoom menu: "Fit to width").
