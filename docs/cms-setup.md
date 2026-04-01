# CMS Setup Guide

This documentation site has a custom browser-based admin panel at `/admin`. Editors can create, edit, and delete docs pages without touching `.md` files directly. Changes are committed to the `cms/preview` branch via the GitHub API, and promoted to `production` (triggering a deploy) via the **Publish** button.

---

## How it works

1. Editor visits `/admin` and logs in with their GitHub account (Device Flow — no redirect needed)
2. They create/edit/delete pages via the admin panel
3. On save, changes are committed to the `cms/preview` branch via the GitHub Contents API
4. When ready to go live, click **Publish** — this fast-forwards `production` to the preview SHA
5. GitHub Actions triggers, rebuilds the Docusaurus site, and deploys to GitHub Pages

No separate CMS server on hosted. Content lives in the repo as `.md` files.

---

## One-time setup: Register a GitHub OAuth App

Required so editors can log in at `/admin` using GitHub Device Flow. Takes ~2 minutes.

1. Go to **GitHub → Settings → Developer settings → OAuth Apps → New OAuth App**

2. Fill in:
   | Field | Value |
   |---|---|
   | Application name | `Pendle Docs CMS` |
   | Homepage URL | `docs.pendle.finacnce` |
   | Authorization callback URL | `{hosted auth server URL}` |

3. Click **Register application**

4. On the next screen, set **Application type** to **Public** (this allows Device Flow without a client secret)

5. Copy the **Client ID**

6. Open [`static/admin/admin.js`](../static/admin/admin.js) and set:
   ```js
   const GH_CLIENT_ID = 'YOUR_CLIENT_ID_HERE';
   ```

7. Commit and push to `master` — the CMS login is now live

> **Access control**: Only GitHub users with **write access** to the repo can save changes. Manage access via GitHub repo collaborators — no CMS-specific user management needed.

---

## Local development

The admin panel detects `localhost` automatically and skips GitHub auth, using the local proxy server instead (reads/writes your local filesystem directly).

**Terminal 1 — run Docusaurus:**
```bash
yarn start
```

**Terminal 2 — run the CMS proxy:**
```bash
yarn cms:proxy
```

Then visit `http://localhost:3000/admin`

Any page you create/edit/save will immediately write to your local `docs/` folder and Docusaurus hot-reload will pick it up. No token needed.

---

## Branch topology

| Branch | Purpose |
|---|---|
| `cms/preview` | All CMS edits land here |
| `master` | Triggers GitHub Actions deploy — only updated via Publish button |

---

## Managing sidebar order

Sidebars are defined in each section's `sidebars.js` file. The admin panel manages this automatically — reorder pages by dragging in the sidebar, then click **Save order**.

---

## Doc sections

| Section | Folder | Route |
|---|---|---|
| Pendle V2 Docs | `docs/pendle-docs/` | `/pendle-v2/` |
| Pendle Academy | `docs/pendle-academy/` | `/pendle-academy/` |
| Pendle V2 Dev | `docs/pendle-dev-docs/` | `/pendle-dev/` |
| Boros Docs | `docs/boros-docs/` | `/boros/` |
| Boros Academy | `docs/boros-academy/` | `/boros-academy/` |
| Boros Dev | `docs/boros-dev-docs/` | `/boros-dev/` |
