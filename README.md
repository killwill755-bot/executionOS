# ⚡ Execution OS — The 24-Hour AI Profit Engine

> **$299 Dashboard** | React + Google Apps Script | AI-Powered Business Launch System

---

## 🚀 Quick Start (3 commands)

```bash
npm install
npm start
# Opens at http://localhost:3000
```

---

## 📁 Project Structure

```
execution-os/
├── public/
│   └── index.html
├── src/
│   ├── App.js               ← Root component + layout
│   ├── AppContext.js         ← Global state (React Context)
│   ├── config.js            ← ⚙️ YOUR GAS URL IS HERE
│   ├── data.js              ← Demo data + static content
│   ├── gasService.js        ← All Google Sheet API calls
│   ├── index.js             ← React entry point
│   └── components/
│       ├── UI.js            ← Glass, Btn, Badge, Spinner
│       ├── Confetti.js      ← Launch confetti effect
│       ├── Sidebar.js       ← Navigation + progress
│       ├── ActionDrawer.js  ← AI Tool-Kit per hour
│       ├── IdeaModal.js     ← 5-step questionnaire + 20 idea cards
│       ├── LaunchpadTab.js  ← 7-Hour timeline + Nuclear button
│       ├── ScriptsTab.js    ← Script Vault (Reddit/Twitter/DM/etc)
│       ├── RoadmapTab.js    ← Gantt + Pie charts + Bottleneck alert
│       └── NoteAndResourceTabs.js ← Scratchpad + Resource links
├── ExecutionOS_Backend.gs   ← Google Apps Script backend (100 ideas)
├── package.json
└── README.md
```

---

## ⚙️ Configuration

Open `src/config.js` — your GAS URL is already set:

```js
GAS_URL: "https://script.google.com/macros/s/AKfycbw.../exec"
```

**If you ever re-deploy GAS**, just update this one line.

---

## 🔌 Google Apps Script Setup

1. Open [Google Sheets](https://sheets.google.com) → create new sheet → name it **"Execution OS"**
2. **Extensions → Apps Script**
3. Delete all existing code, paste contents of `ExecutionOS_Backend.gs`
4. Click **Save** (Ctrl+S), name project "Execution OS"
5. Select `setup` in the function dropdown → click **▶ Run**
6. Allow permissions when prompted
7. ✅ All 4 sheets auto-created with 100 ideas
8. **Deploy → New deployment**
   - Type: Web app
   - Execute as: **Me**
   - Who has access: **Anyone**
9. Copy Web App URL → paste in `src/config.js`

---

## 📊 Sheet Architecture

| Sheet | Purpose |
|-------|---------|
| `Master_DB` | 100 pre-populated AI business ideas |
| `User_Inputs` | Stores questionnaire answers + selected idea |
| `Active_Roadmap` | Live task workspace with status tracking |
| `Analytics_Data` | Progress % per phase → feeds pie charts |

### Column Mappings (Master_DB)
```
Col 0 → ID          Col 5 → 7H Launch Action Plan
Col 1 → Category    Col 6 → 24H Marketing Script
Col 2 → Idea Name   Col 7 → 30D Scaling Roadmap
Col 3 → USP         Col 8 → Confidence Score
Col 4 → Difficulty  Col 9 → Last Updated
```

---

## 🧩 Features

| Feature | Description |
|---------|-------------|
| **Idea Magic Modal** | 5-step questionnaire → AI ranks top 20 ideas with confidence scores |
| **7-Hour Launchpad** | Hour-by-hour tasks with AI Tool-Kit drawer (Claude API) |
| **Script Vault** | One-click AI scripts: Reddit, Twitter, Cold DM, LinkedIn, Email |
| **30-Day Roadmap** | 4-phase task grid + dual Recharts pie charts + bottleneck detection |
| **Scratchpad** | Markdown notes with 60-second auto-save to Google Sheet |
| **Resource Vault** | 16 pre-linked tools — no Googling required |
| **Nuclear Button** | Confetti launch + unlocks scaling phase |
| **GAS Sync** | Real-time read/write with Google Sheets backend |

---

## 🛠 Tech Stack

- **React 18** — UI framework
- **Recharts** — Pie charts
- **Google Apps Script** — Backend + data persistence
- **Claude API** — AI copy generation (Action Drawers + Script Vault)
- **CSS-in-JS** — Zero external CSS dependencies

---

## 🚢 Deploy to Production

### Vercel (Recommended — Free)
```bash
npm run build
npx vercel --prod
```

### Netlify
```bash
npm run build
# Drag & drop the /build folder to netlify.com
```

---

## 📝 License
Private — for personal/commercial use by the purchaser.
