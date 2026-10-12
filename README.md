# Caden Stewart — academic portfolio

A responsive, dependency-free portfolio for Caden Stewart, a Data Science PhD student at UC San Diego. Forest green mountains, original SVG contour artwork, and warm ivory typography reflect a passion for backcountry backpacking.

## What is included

Research overview and three ongoing projects; four publications with status filters; five presentations and three posters; education and GPAs; six fellowships, scholarships, and awards; three leadership/service roles; email, phone, LinkedIn, and a printable web CV. All academic facts and publication statuses come from the supplied CV. The backpacking section comes from Caden's stated interest. The mountain drawings are original illustrations, not maps of a real location.

## Preview on your computer

Download the repository using Code → Download ZIP on GitHub, unzip it, and open `index.html` in your browser. No installation or build step is needed. Alternatively, from the folder:

```sh
python3 -m http.server 8000
```

Visit http://localhost:8000. Stop the server with Ctrl+C.

## GitHub and Vercel setup

Repository: https://github.com/stewacad000/pers_website

1. Open https://vercel.com/new and sign in to your personal Hobby account.
2. Under **Import Git Repository**, connect GitHub if prompted. Grant Vercel access to `stewacad000/pers_website` and select **Import**. If it is missing, use **Adjust GitHub App Permissions** and authorize this repository.
3. Name the project `caden-stewart` (or another available name).
4. Set **Framework Preset** to **Other**, **Root Directory** to the repository root, leave **Build Command** empty, and set **Output Directory** to `.`. No environment variables are required. The included `vercel.json` supplies the static configuration.
5. Select **Deploy**. Wait for the deployment to become Ready and open its assigned URL. The actual URL is assigned by Vercel; do not assume a name is available.
6. In **Project Settings → Git**, confirm the connected repository is `stewacad000/pers_website` and **Production Branch** is `main`.
7. Open the production URL in a private browser window to confirm that visitors can access it. If sign-in protection is enabled for production, adjust **Settings → Deployment Protection** so the public portfolio is accessible.
8. Check navigation on phone and desktop; try all publication filters; expand presentations, posters, and service; open the printable CV; and verify email and LinkedIn links.

If the project has already been deployed and connected for you, begin at step 6. Do not create a duplicate project.

Vercel Hobby is for personal, non-commercial projects and has usage limits. This static portfolio uses no server functions, database, paid add-ons, or third-party font requests. A free Vercel-assigned domain is enough; purchasing a custom domain is optional.

## Updating from GitHub in your browser

1. Open the repository and select the file you want to update.
2. Select the pencil icon to edit it.
3. Make the change, then select **Commit changes**. A commit is a saved version of the code with a short description, such as “Add new publication”.
4. For a small change, commit to `main`; the connected Vercel project deploys it automatically. For a larger change, create a branch and pull request, inspect its Vercel preview if available, then merge it into `main`.
5. Check Vercel's Deployments page for Ready status, then review the live site.

| What you want to change | File |
| --- | --- |
| Name, bio, advisors, research projects, education, contact links, backpacking text | `index.html` |
| Publications, author lists, statuses, presentations, posters, awards, service | `content.js` |
| Colors, spacing, fonts, mobile layout | `styles.css` |
| Filters and section navigation behavior | `script.js` |
| Printable web CV | `cv.html` |
| Mountain and contour illustrations | `assets/mountains.svg`, `assets/topography.svg` |
| Deployment configuration | `vercel.json` |

Publication entries in `content.js` use this order:

```js
["2026", "Published", "Journal name", "Paper title", "Author One, Caden Stewart", "https://doi.org/example"]
```

Use `Published`, `Under review`, or `Under revision` for the status; leave the final URL as `""` until you have a verified link. When adding presentations or posters, update their counts in `index.html`. Update `cv.html` when changing CV details elsewhere. The original uploaded PDF and phone number are omitted from public source. The printable web CV includes the professional academic record; use Print / save as PDF for an offline copy.

## Updating with Git locally (optional)

Install Git or GitHub Desktop, then authenticate with your own GitHub account. GitHub Desktop offers a browser-based sign-in. If using Git, use an approved credential helper, SSH, or GitHub CLI authentication rather than entering an account password for Git HTTPS.

```sh
git clone https://github.com/stewacad000/pers_website.git
cd pers_website
# Edit the files and preview them in a browser.
git add .
git commit -m "Update research portfolio"
git push origin main
```

Use your GitHub-linked email as your local Git author email so Vercel can recognize you as the Hobby account owner. In GitHub Desktop, configure this in Settings → Git. Never commit credentials or tokens.

## Recovery and custom domain

If a deployment fails, open its build logs. For this project, first confirm Other framework, no build command, repository-root output, and the presence of `index.html`. If a change breaks the content lists, check `content.js` for missing commas or unmatched quotes. Revert that commit in GitHub and Vercel will deploy the corrected source. You can also promote an earlier known-good deployment in Vercel; then correct/revert the source so the next push keeps that fix.

For a custom domain, open **Settings → Domains → Add**, enter a domain you own, and apply the exact DNS records Vercel supplies at your registrar. Wait for verification and HTTPS. Domain registration is a separate cost. No domain is needed for initial launch.

## Verification

JavaScript syntax and local file/anchor references were checked during creation. Browser visual verification was unavailable in the creation environment; complete the launch checks above on the actual deployment. Academic statuses were preserved from the CV rather than independently updated.

## Official documentation

- https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github
- https://vercel.com/docs/git/vercel-for-github
- https://vercel.com/docs/deployments/configure-a-build
- https://vercel.com/docs/plans/hobby
- https://vercel.com/docs/domains/working-with-domains/add-a-domain
