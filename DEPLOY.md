# Deploying your portfolio — a first-timer's guide

You already know .NET and React, so most of this will feel familiar. The only new ideas are
**hosting** (a computer that serves your files 24/7), **DNS** (the internet's phone book), and
**HTTPS** (the padlock). Modern hosts handle almost all of it for you.

**What you're deploying:** a *static site*. When you run `npm run build`, Vite turns your React
app into plain HTML/CSS/JS files in a `dist/` folder. There is no server to run — any host that can
serve files can serve your site. That is why this is cheap (free) and simple.

**The plan (about 30–45 minutes):**

1. Personalize and test locally
2. Put the code on GitHub
3. Deploy on Vercel (free, auto-redeploys when you push)
4. *(Optional)* Buy a domain and connect it
5. Final checks

---

## Step 0 — Install what you need

1. **Node.js (LTS)** — download from <https://nodejs.org>. Check it worked:
   ```bash
   node -v
   npm -v
   ```
2. **Git** — download from <https://git-scm.com/downloads>. Check:
   ```bash
   git --version
   ```
3. **A GitHub account** — sign up free at <https://github.com/signup> (you likely have one: `PouyaBasiri`).

---

## Step 1 — Personalize and test locally

1. Unzip the project and open the `portfolio` folder in VS Code (or Visual Studio / Rider).
2. In a terminal inside that folder:
   ```bash
   npm install
   npm run dev
   ```
3. Open <http://localhost:5173>. You should see the site.
4. Open **`src/data.ts`** and replace everything marked `TODO`:
   - `email`, `linkedin`, `resumeUrl`
   - `stats` (the numbers shown in the counters are placeholders — make them true)
   - `experience`, extra `projects`, `achievements`
5. *(Optional)* Put your résumé PDF in the `public/` folder as `resume.pdf` and set
   `resumeUrl: "/resume.pdf"`.
6. Check the production build works — this is exactly what the host will run:
   ```bash
   npm run build
   npm run preview
   ```
   Open the URL it prints. If `npm run build` shows a red error, fix it now; the host will fail the same way.

> **Never put secrets in this project** (API keys, passwords). Everything in a React app is visible to anyone who opens browser dev tools.

---

## Step 2 — Put the code on GitHub

Hosts deploy *from a Git repository*, so the code has to live on GitHub first.

1. Go to <https://github.com/new>.
   - Repository name: `portfolio`
   - Visibility: **Public** (or Private — Vercel works with both)
   - **Do not** tick "Add a README" or ".gitignore" (the project already has them)
   - Click **Create repository**.
2. In your terminal, inside the `portfolio` folder, run (replace the URL with the one GitHub shows you):
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/PouyaBasiri/portfolio.git
   git push -u origin main
   ```
3. If Git asks you to log in, a browser window will open — approve it. (If it asks for a password in the terminal, GitHub no longer accepts account passwords; use the browser login or a Personal Access Token.)
4. Refresh the GitHub page — you should see your files. The `.gitignore` keeps `node_modules` and `dist` out, which is correct.

---

## Step 3 — Deploy on Vercel (recommended)

Vercel is free for personal projects, gives you HTTPS automatically, and redeploys every time you push to GitHub.

1. Go to <https://vercel.com/signup> and choose **Continue with GitHub**.
2. Click **Add New… → Project**.
3. Find `portfolio` in the list and click **Import**. (If you don't see it, click *Adjust GitHub App Permissions* and grant access to the repo.)
4. Vercel auto-detects Vite. Confirm these settings:

   | Setting | Value |
   |---|---|
   | Framework Preset | **Vite** |
   | Build Command | `npm run build` |
   | Output Directory | `dist` |
   | Install Command | `npm install` |
   | Root Directory | `./` |

5. Click **Deploy**. After ~1 minute you get a URL like `https://portfolio-xxxx.vercel.app`.
6. Open it. **Your site is live on the internet.**

**From now on:** edit code → `git add . && git commit -m "Update" && git push` → Vercel rebuilds and publishes automatically in about a minute.

**Change the free URL:** Project → *Settings → Domains* lets you pick something nicer like `pouya-basiri.vercel.app` if it's available.

### Alternative hosts (same idea)

- **Netlify** — <https://app.netlify.com/start>: *Import from Git* → pick the repo → Build command `npm run build`, Publish directory `dist`.
- **GitHub Pages** (free, no extra account): because it serves from `https://<user>.github.io/<repo>/`, the site needs a base path. This project already supports it through the `VITE_BASE` variable:
  1. Create `.github/workflows/deploy.yml`:
     ```yaml
     name: Deploy to GitHub Pages
     on:
       push:
         branches: [main]
     permissions:
       contents: read
       pages: write
       id-token: write
     jobs:
       build:
         runs-on: ubuntu-latest
         steps:
           - uses: actions/checkout@v4
           - uses: actions/setup-node@v4
             with:
               node-version: 22
               cache: npm
           - run: npm ci
           - run: npm run build
             env:
               VITE_BASE: /portfolio/
           - uses: actions/upload-pages-artifact@v3
             with:
               path: dist
       deploy:
         needs: build
         runs-on: ubuntu-latest
         environment:
           name: github-pages
           url: ${{ steps.deployment.outputs.page_url }}
         steps:
           - id: deployment
             uses: actions/deploy-pages@v4
     ```
  2. In the repo: *Settings → Pages → Source → GitHub Actions*.
  3. Push. The site appears at `https://pouyabasiri.github.io/portfolio/`.
  4. Tip: if you name the repo `PouyaBasiri.github.io`, the site lives at the root and you should set `VITE_BASE: /`.

---

## Step 4 — (Optional) Use your own domain

A domain like `pouyabasiri.com` looks far more professional on a CV. It costs roughly **$10–15 per year**.

1. **Buy it** from a registrar: Cloudflare Registrar, Namecheap, Porkbun, or Google/Squarespace Domains. Search the name, check out, and turn on the free *WHOIS privacy* option if offered.
2. **Add it to Vercel:** Project → *Settings → Domains* → type `pouyabasiri.com` → **Add**.
3. Vercel now shows the DNS records you need. Typically:

   | Type | Name / Host | Value |
   |---|---|---|
   | `A` | `@` | the IP address Vercel shows (e.g. `76.76.21.21`) |
   | `CNAME` | `www` | the target Vercel shows (e.g. `cname.vercel-dns.com`) |

   > Always copy the values Vercel displays for *your* project — they can change.
4. **Add those records** at your registrar: open the domain → *DNS* (or *Advanced DNS*) → *Add record*. Remove any conflicting default `A`/`CNAME` records for `@` and `www`.
5. **Wait.** DNS changes take from a few minutes up to a few hours. Vercel's Domains page shows a green check when it works.
6. Vercel automatically issues a free **HTTPS certificate**. Visit `https://pouyabasiri.com` and look for the padlock.
7. Make `www` redirect to the main domain (or vice-versa) using the redirect option in the same Domains screen.

---

## Step 5 — Final checks before you share the link

- [ ] Opens on your phone (the layout is responsive — test it).
- [ ] All `TODO` placeholders in `src/data.ts` are gone, and every number/claim is true.
- [ ] Email, GitHub and LinkedIn links go where you expect.
- [ ] Browser tab shows the title and the **PB** icon.
- [ ] Paste the URL into LinkedIn/Slack/WhatsApp — the preview should show your title and description.
- [ ] Run a free audit: open Chrome DevTools → *Lighthouse* → *Analyze page load*.
- [ ] Add the link to your GitHub profile, LinkedIn and CV.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `npm run build` fails on Vercel but works locally | Make sure you committed everything (`git status`). Check the Node version: in Vercel *Settings → General → Node.js Version* choose 22.x. |
| Blank white page on GitHub Pages | You forgot `VITE_BASE`. It must equal `/<repo-name>/`. |
| Domain shows "Invalid configuration" | DNS hasn't propagated yet or a record is wrong. Compare values with Vercel and re-check at <https://dnschecker.org>. |
| Old version still showing after a push | Hard refresh (Ctrl/Cmd + Shift + R) and confirm the deployment finished in the Vercel dashboard. |
| `git push` rejected | Run `git pull --rebase origin main`, then push again. |

## Optional upgrades later

- **Analytics:** Vercel Analytics (one toggle) or Plausible/Umami for privacy-friendly stats.
- **Contact form:** the site uses a simple `mailto:` link. For a real form without a backend, use Formspree or Web3Forms.
- **Preview image:** add a 1200×630 `og-image.png` to `public/` and an `<meta property="og:image">` tag in `index.html` for nicer link previews.
- **Your .NET backend:** if you later want a live demo of SurinRayan, the API needs a *server* host (Azure App Service, Railway, Fly.io, or a VPS with Docker). The portfolio itself can stay static and just link to it.
