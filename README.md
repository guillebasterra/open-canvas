                              ┌───────────────────────────┐
                              │      CONTRIBUTORS         │
                              │───────────────────────────│
                              │  • Add ASCII file (.txt)  │
                              │  • Commit message = title │
                              │  • PR → auto-merge        │
                              └──────────────┬────────────┘
                                             │
                                             ▼
                   ┌────────────────────────────────────────────────┐
                   │                GITHUB ACTIONS                   │
                   │────────────────────────────────────────────────│
                   │ 1. Validate PR:                                 │
                   │    - 1 file, ASCII only                         │
                   │    - size & char limits                         │
                   │                                                 │
                   │ 2. On merge:                                    │
                   │    - Append entry to archive/ledger.jsonl       │
                   │    - Move file → archive/YYYY-MM/               │
                   │    - Keep only 10 newest in /ascii/             │
                   │    - Rebuild ascii/latest.json                  │
                   │    - (Optional) Zip monthly archive folder      │
                   │                                                 │
                   │ 3. Commit & push changes                        │
                   └──────────────┬──────────────────────────────────┘
                                  │
                                  ▼
              ┌──────────────────────────────────────────────────────────┐
              │                   REPOSITORY STRUCTURE                   │
              │──────────────────────────────────────────────────────────│
              │  /ascii/          →  latest 10 visible drawings          │
              │  /archive/        →  historical records & backups        │
              │     ├── ledger.jsonl   (append-only metadata ledger)     │
              │     ├── latest.json    (quick-access for frontend)       │
              │     ├── YYYY-MM/       (raw txt files for each month)    │
              │     └── YYYY-MM.zip    (optional compressed backup)      │
              └──────────────┬───────────────────────────────────────────┘
                             │
                             ▼
           ┌─────────────────────────────────────────────────────────────┐
           │                        FRONTEND SITE                         │
           │─────────────────────────────────────────────────────────────│
           │  Static HTML/CSS/JS (GitHub Pages / Netlify / Vercel)        │
           │  ────────────────────────────────────────────────────────── │
           │  • “Latest” view → fetches ascii/latest.json                │
           │       - displays grid of 10 newest drawings                 │
           │       - shows title (commit msg), author, timestamp         │
           │                                                             │
           │  • “Collaborative” view → larger canvases                   │
           │  • “Archive” view → reads ledger.jsonl (all-time feed)      │
           │                                                             │
           │  (Optional) Back-end API for pagination / analytics later   │
           └─────────────────────────────────────────────────────────────┘
