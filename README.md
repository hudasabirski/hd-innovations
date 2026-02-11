# HD Innovations — Website

Static, standalone marketing site for **HD Innovations** (kept separate from the rest of this repo).

## Run locally

From `c:\darelwasl\hd-innovations-website`:

```powershell
python -m http.server 5173
```

Then open:

`http://localhost:5173`

## Deploy to GitHub Pages

This repo includes a deploy script that:
1) creates a GitHub repo under your account (if needed),
2) pushes the site, and
3) enables GitHub Pages.

From `c:\darelwasl\hd-innovations-website`:

```powershell
.\deploy-gh-pages-interactive.ps1 -Owner hudasabirski -Repo hd-innovations -Open
```

Notes:
- Use a fine-grained PAT with the minimum required permissions (repo + pages).
- The script does not write the token to disk or to the git remote URL.
- Re-running the script updates the existing repo by default. To force a new repo name, add `-CreateNewIfExists`.

## Files

- `hd-innovations-website/index.html`
- `hd-innovations-website/styles.css`
- `hd-innovations-website/scripts.js`
- `hd-innovations-website/assets/`
- Photo credits: `hd-innovations-website/CREDITS.md`
