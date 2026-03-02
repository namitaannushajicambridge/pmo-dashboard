/**
 * PRISM PMO Dashboard - Backend API Server
 * Node.js + Express
 */

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, 'data', 'db.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// --- DB Helpers ---
function readDB() {
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
}
function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// ============================================================
// ROUTES
// ============================================================

// GET /api/health
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ---- Filter Hierarchy (Project → Sub Project → Feature) ----
// GET /api/filter-hierarchy
app.get('/api/filter-hierarchy', (req, res) => {
  const db = readDB();
  res.json(db.filterHierarchy);
});

// ---- Hierarchy ----
// GET /api/hierarchy
app.get('/api/hierarchy', (req, res) => {
  const db = readDB();
  res.json(db.hierarchy);
});

// ---- Dashboard Summary ----
// GET /api/summary?teamId=xxx&projectId=xxx&subProjectId=xxx&featureId=xxx
app.get('/api/summary', (req, res) => {
  const db = readDB();
  const { teamId, projectId, subProjectId, featureId } = req.query;

  let projects = db.projects;
  if (teamId) projects = projects.filter(p => p.teamId === teamId || p.teamId.startsWith(teamId));
  if (projectId) projects = projects.filter(p => p.projectId === projectId);
  if (subProjectId) projects = projects.filter(p => p.subProjectId === subProjectId);
  if (featureId) projects = projects.filter(p => p.featureId === featureId);

  const summary = {
    totalProjects: projects.length,
    totalResources: 234, // Aggregate from resources
    avgUtilization: 87,
    atRiskProjects: projects.filter(p => p.risk !== 'low').length,
    projectsByStatus: {
      initiated: projects.filter(p => p.status === 'initiated').length,
      planned: projects.filter(p => p.status === 'planned').length,
      closed: projects.filter(p => p.status === 'closed').length,
      dropped: projects.filter(p => p.status === 'dropped').length,
      'to-be-initiated': projects.filter(p => p.status === 'to-be-initiated').length,
    }
  };

  res.json(summary);
});

// ---- Projects ----
// GET /api/projects?status=xxx&teamId=xxx&projectId=xxx&subProjectId=xxx&featureId=xxx
app.get('/api/projects', (req, res) => {
  const db = readDB();
  let { status, teamId, projectId, subProjectId, featureId } = req.query;
  let projects = db.projects;

  if (status) projects = projects.filter(p => p.status === status);
  if (teamId) projects = projects.filter(p => p.teamId === teamId || p.teamId.startsWith(teamId));
  if (projectId) projects = projects.filter(p => p.projectId === projectId);
  if (subProjectId) projects = projects.filter(p => p.subProjectId === subProjectId);
  if (featureId) projects = projects.filter(p => p.featureId === featureId);

  res.json(projects);
});

// GET /api/projects/:id
app.get('/api/projects/:id', (req, res) => {
  const db = readDB();
  const project = db.projects.find(p => p.id === req.params.id);
  if (!project) return res.status(404).json({ error: 'Project not found' });
  res.json(project);
});

// POST /api/projects
app.post('/api/projects', (req, res) => {
  const db = readDB();
  const newProject = {
    id: `proj-${Date.now()}`,
    ...req.body,
    createdAt: new Date().toISOString()
  };
  db.projects.push(newProject);
  writeDB(db);
  res.status(201).json(newProject);
});

// ---- Resources ----
// GET /api/resources?month=2024-01&teamId=xxx&projectId=xxx
app.get('/api/resources', (req, res) => {
  const db = readDB();
  const { month, teamId, projectId, subProjectId } = req.query;

  let monthlyData = db.resources.monthly;
  const targetMonth = month || monthlyData[monthlyData.length - 1].month;
  const monthRecord = monthlyData.find(m => m.month === targetMonth);

  if (!monthRecord) return res.status(404).json({ error: 'Month not found' });

  let projects = monthRecord.projects;
  if (teamId) projects = projects.filter(p => p.teamId === teamId || p.teamId.startsWith(teamId));
  if (projectId) projects = projects.filter(p => p.projectId === projectId);
  if (subProjectId) projects = projects.filter(p => p.subProjectId === subProjectId);

  // Build December "fixed" baseline map (year-end committed headcount target)
  const decRecord = monthlyData.find(m => m.month === '2023-12');
  const decPlanMap = {};
  if (decRecord) {
    decRecord.projects.forEach(p => { decPlanMap[p.projectName] = p.currentPlan; });
  }
  projects = projects.map(p => ({
    ...p,
    decPlan: p.decPlan ?? decPlanMap[p.projectName] ?? null
  }));

  res.json({ month: monthRecord.month, label: monthRecord.label, projects });
});

// GET /api/resources/months - list available months
app.get('/api/resources/months', (req, res) => {
  const db = readDB();
  const months = db.resources.monthly.map(m => ({ month: m.month, label: m.label }));
  res.json(months);
});

// ---- KPIs ----
// GET /api/kpis
app.get('/api/kpis', (req, res) => {
  const db = readDB();
  res.json(db.kpis);
});

// POST /api/kpis
app.post('/api/kpis', (req, res) => {
  const db = readDB();
  const newKpi = {
    id: `kpi-${Date.now()}`,
    icon: 'fa-chart-line',
    trendDir: 'neutral',
    status: 'on-track',
    ...req.body
  };
  db.kpis.push(newKpi);
  writeDB(db);
  res.status(201).json(newKpi);
});

// PUT /api/kpis/:id
app.put('/api/kpis/:id', (req, res) => {
  const db = readDB();
  const idx = db.kpis.findIndex(k => k.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'KPI not found' });
  db.kpis[idx] = { ...db.kpis[idx], ...req.body };
  writeDB(db);
  res.json(db.kpis[idx]);
});

// DELETE /api/kpis/:id
app.delete('/api/kpis/:id', (req, res) => {
  const db = readDB();
  const idx = db.kpis.findIndex(k => k.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'KPI not found' });
  db.kpis.splice(idx, 1);
  writeDB(db);
  res.json({ success: true });
});

// ---- Skill Matrix ----
// GET /api/skills
app.get('/api/skills', (req, res) => {
  const db = readDB();
  res.json(db.skillMatrix);
});

// PUT /api/skills/:id
app.put('/api/skills/:id', (req, res) => {
  const db = readDB();
  const idx = db.skillMatrix.findIndex(s => s.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Skill not found' });
  db.skillMatrix[idx] = { ...db.skillMatrix[idx], ...req.body };
  writeDB(db);
  res.json(db.skillMatrix[idx]);
});

// ---- Travel Cost ----
// GET /api/travel?teamId=xxx
app.get('/api/travel', (req, res) => {
  const db = readDB();
  const { teamId } = req.query;
  const travel = db.travelCost;

  if (teamId) {
    const teamData = travel.teams.find(t => t.teamId === teamId);
    if (teamData) {
      return res.json({
        totalBudget: teamData.allocated,
        teams: [teamData]
      });
    }
  }

  res.json(travel);
});

// ---- HQ PL Score ----
// GET /api/hqpl?teamId=xxx
app.get('/api/hqpl', (req, res) => {
  const db = readDB();
  const { teamId } = req.query;
  const scores = db.hqPlScores;

  if (teamId && scores.teams[teamId]) {
    return res.json(scores.teams[teamId]);
  }

  res.json(scores.global);
});

// ---- Risk Management ----
// GET /api/risk?teamId=xxx
app.get('/api/risk', (req, res) => {
  const db = readDB();
  const { teamId } = req.query;

  let projects = db.projects;
  if (teamId) {
    projects = projects.filter(p => p.teamId === teamId || p.teamId.startsWith(teamId));
  }

  const withRisk = projects.filter(p => p.risk !== 'low' || p.delayReason);

  res.json({
    total: projects.length,
    withRisk: withRisk.length,
    withoutRisk: projects.length - withRisk.length,
    completed: projects.filter(p => p.status === 'closed').length,
    delayed: projects.filter(p => p.delayReason).length,
    atRisk: projects.filter(p => p.risk === 'high').length,
    dropped: projects.filter(p => p.status === 'dropped').length,
    riskProjects: projects.map(p => ({
      id: p.id,
      name: p.name,
      risk: p.risk,
      riskReason: p.riskReason,
      delayReason: p.delayReason,
      dropReason: p.dropReason || null,
      status: p.status,
      budget: p.budget,
      spent: p.spent,
      teamId: p.teamId,
      teamName: p.teamName || null,
      startDate: p.startDate,
      endDate: p.endDate
    }))
  });
});

// ---- Milestones ----
// GET /api/milestones
app.get('/api/milestones', (req, res) => {
  const db = readDB();
  res.json(db.milestones);
});

// ---- Team Detail (for new tab view) ----
// GET /api/team/:teamId
app.get('/api/team/:teamId', (req, res) => {
  const db = readDB();
  const { teamId } = req.params;

  // Find team in hierarchy
  function findTeam(teams, id) {
    for (const team of teams) {
      if (team.id === id) return team;
      if (team.subTeams) {
        const found = findTeam(team.subTeams, id);
        if (found) return found;
      }
    }
    return null;
  }

  let team = null;
  for (const pm of db.hierarchy.projectManagers) {
    team = findTeam(pm.teams, teamId);
    if (team) break;
  }

  if (!team) return res.status(404).json({ error: 'Team not found' });

  const projects = db.projects.filter(p => p.teamId === teamId || p.teamId.startsWith(teamId));
  const risk = {
    high: projects.filter(p => p.risk === 'high').length,
    medium: projects.filter(p => p.risk === 'medium').length,
    low: projects.filter(p => p.risk === 'low').length
  };

  res.json({ team, projects, risk });
});

// ---- Activity ----
// GET /api/activity
app.get('/api/activity', (req, res) => {
  const db = readDB();
  res.json(db.activity);
});

// Serve frontend for any non-API routes and non-static files
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ PRISM PMO API running at http://localhost:${PORT}`);
  console.log(`   API Base: http://localhost:${PORT}/api`);
});

module.exports = app;