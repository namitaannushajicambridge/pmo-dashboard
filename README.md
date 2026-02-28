# PRISM PMO Dashboard — Full Stack

## Architecture

```
prism-pmo/
├── backend/
│   ├── server.js          ← Express API server (Node.js)
│   └── data/
│       └── db.json        ← JSON flat-file database (demo data)
├── frontend/
│   ├── index.html         ← Enhanced dashboard (all features)
│   ├── team-detail.html   ← Team drill-down (opens in new tab)
│   ├── styles.css         ← Original PRISM theme (unchanged)
│   ├── dashboard-enhancements.css  ← New UI components
│   └── script.js          ← Full frontend controller (API-driven)
└── package.json
```

## Setup & Run

### 1. Install dependencies
```bash
cd prism-pmo
npm install
```

### 2. Start backend server
```bash
npm start
# → API running at http://localhost:3000/api
# → Frontend served at http://localhost:3000
```

### 3. Open in browser
```
http://localhost:3000
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/hierarchy | PM → Team → Sub Team → Nested Sub Team |
| GET | /api/summary?teamId= | Dashboard summary cards |
| GET | /api/projects?status=&teamId= | Projects with filters |
| POST | /api/projects | Create new project |
| GET | /api/resources?month=&teamId= | Resource plan vs actual |
| GET | /api/resources/months | Available month list |
| GET | /api/kpis | All KPIs |
| POST | /api/kpis | Add KPI |
| PUT | /api/kpis/:id | Update KPI |
| DELETE | /api/kpis/:id | Delete KPI |
| GET | /api/skills | Skill matrix (20 skills) |
| PUT | /api/skills/:id | Update skill row |
| GET | /api/travel?teamId= | Travel cost budget |
| GET | /api/hqpl?teamId= | HQ PL Score |
| GET | /api/risk?teamId= | Risk management data |
| GET | /api/milestones | Milestone data |
| GET | /api/team/:teamId | Team detail page data |
| GET | /api/activity | Recent activity feed |

---

## Features Implemented

### ✅ 1. All Buttons Functional
- New Project → Modal form → POST /api/projects
- Add KPI → Modal → POST /api/kpis
- Delete KPI → DELETE /api/kpis/:id
- Export Resources → CSV download
- Refresh KPIs, Review Status → Live data
- Filter, Clear, Apply → Full hierarchy cascade

### ✅ 2. Real Backend
- Node.js + Express
- JSON flat-file DB (easy to swap for MongoDB)
- Full REST API with CORS support

### ✅ 3. Hierarchical Filter
- PM → Main Team → Sub Team → Nested Sub Team (4 levels)
- Cascading dropdowns (each level depends on parent)
- "Team Detail" button opens dedicated page in new tab

### ✅ 4. Project Status (clickable)
- All 5 statuses: Planned / Initiated / Closed / Dropped / To Be Initiated
- Click → modal with project list, budget, risk, reason

### ✅ 5. Resource Management
- Month selector dropdown
- December reference month included
- Plan vs Actual with variance columns
- Export to CSV

### ✅ 6. SRI-B KPIs
- Add KPI button → form → persists to backend
- Delete per row → live removal
- No page reload

### ✅ 7. Skill Matrix (20×6)
- 20 skills × 6 columns (Expert/Innovator/Advanced/Intermediate/Beginner/Total)
- Editable cells, auto-calc totals
- Save button → PUT /api/skills/:id for each changed row

### ✅ 8. Travel Cost
- Total budget + team-wise Allocated / Used / Remaining
- Progress bars update on team filter

### ✅ 9. HQ PL Score
- % format gauges (SRIB + Team score)
- Trend sparkline chart
- Updates when team filter changes

### ✅ 10. Risk Management
- Total / Completed / Delayed / At Risk (clickable)
- Click → modal with project list + risk reason + delay reason

### ✅ 11. Drill-Down Logic
- Status cards → project list modal
- Risk stats → filtered project list
- At-Risk summary card → high risk projects

---

## To Use MongoDB Instead of JSON

Replace the `readDB()` / `writeDB()` helpers in `server.js` with mongoose models. The API route structure stays identical.
