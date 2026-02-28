/**
 * PRISM PMO Dashboard — Frontend Controller
 * Works with OR without the Node.js backend.
 * If backend is unreachable, falls back to inline demo data.
 */

// ============================================================
// CONFIG
// ============================================================
const API_BASE = 'http://localhost:3000/api';

// ============================================================
// INLINE FALLBACK DATA (used when backend is not running)
// ============================================================
const FALLBACK = {
  summary: {
    totalProjects: 100,
    totalResources: 487,
    avgUtilization: 83,
    atRiskProjects: 12,
    projectsByStatus: { initiated: 28, planned: 22, closed: 34, dropped: 7, 'to-be-initiated': 9 }
  },
  projects: [
    /* ── AI Camera ── */
    { id: 'p1', name: 'AI Camera Optimization', status: 'initiated', projectId: 'proj-ai-camera', teamId: 'team-alpha', teamName: 'Alpha Division', budget: 350000, spent: 198000, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p2', name: 'Image Enhancement Module', status: 'planned', projectId: 'proj-ai-camera', subProjectId: 'sub-image-enhancement', teamId: 'team-alpha', teamName: 'Alpha Division', budget: 95000, spent: 18000, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p3', name: 'HDR Processing Pipeline', status: 'initiated', projectId: 'proj-ai-camera', subProjectId: 'sub-image-enhancement', featureId: 'feat-hdr', teamId: 'team-alpha-ai', teamName: 'AI/ML Engineering', budget: 42000, spent: 31000, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p4', name: 'Super Resolution Engine', status: 'planned', projectId: 'proj-ai-camera', subProjectId: 'sub-image-enhancement', featureId: 'feat-superres', teamId: 'team-alpha-ai', teamName: 'AI/ML Engineering', budget: 38000, spent: 7000, risk: 'medium', riskReason: 'ML model pipeline dependency', delayReason: null },
    { id: 'p5', name: 'Color Correction Engine', status: 'closed', projectId: 'proj-ai-camera', subProjectId: 'sub-image-enhancement', featureId: 'feat-color', teamId: 'team-alpha-ai', teamName: 'AI/ML Engineering', budget: 29000, spent: 28500, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p6', name: 'Low Light Optimization', status: 'initiated', projectId: 'proj-ai-camera', subProjectId: 'sub-low-light', teamId: 'team-alpha-ai', teamName: 'AI/ML Engineering', budget: 62000, spent: 38000, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p7', name: 'Night Mode Enhancer', status: 'initiated', projectId: 'proj-ai-camera', subProjectId: 'sub-low-light', featureId: 'feat-night-mode', teamId: 'team-alpha-ai', teamName: 'AI/ML Engineering', budget: 24000, spent: 17000, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p8', name: 'Noise Reduction Algorithm', status: 'planned', projectId: 'proj-ai-camera', subProjectId: 'sub-low-light', featureId: 'feat-noise-reduce', teamId: 'team-alpha-ai', teamName: 'AI/ML Engineering', budget: 19000, spent: 4000, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p9', name: 'AI Scene Detection', status: 'closed', projectId: 'proj-ai-camera', subProjectId: 'sub-scene-detect', teamId: 'team-alpha-ai', teamName: 'AI/ML Engineering', budget: 58000, spent: 57200, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p10', name: 'Object Detection Framework', status: 'closed', projectId: 'proj-ai-camera', subProjectId: 'sub-scene-detect', featureId: 'feat-object-det', teamId: 'team-alpha-ai', teamName: 'AI/ML Engineering', budget: 31000, spent: 30100, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p11', name: 'Auto Framing System', status: 'to-be-initiated', projectId: 'proj-ai-camera', subProjectId: 'sub-scene-detect', featureId: 'feat-auto-frame', teamId: 'team-alpha-ai', teamName: 'AI/ML Engineering', budget: 22000, spent: 0, risk: 'low', riskReason: null, delayReason: null },

    /* ── Voice Processing ── */
    { id: 'p12', name: 'Voice Processing Engine', status: 'initiated', projectId: 'proj-voice', teamId: 'team-alpha-data', teamName: 'Data Engineering', budget: 210000, spent: 128000, risk: 'medium', riskReason: 'Latency targets not met', delayReason: null },
    { id: 'p13', name: 'Noise Cancellation Module', status: 'initiated', projectId: 'proj-voice', subProjectId: 'sub-noise-cancel', teamId: 'team-alpha-data', teamName: 'Data Engineering', budget: 72000, spent: 48000, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p14', name: 'Environmental Noise Filter', status: 'closed', projectId: 'proj-voice', subProjectId: 'sub-noise-cancel', featureId: 'feat-env-noise', teamId: 'team-alpha-data', teamName: 'Data Engineering', budget: 25000, spent: 24200, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p15', name: 'Wind Noise Suppression', status: 'initiated', projectId: 'proj-voice', subProjectId: 'sub-noise-cancel', featureId: 'feat-wind-noise', teamId: 'team-alpha-data', teamName: 'Data Engineering', budget: 18000, spent: 11000, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p16', name: 'Echo Cancellation', status: 'planned', projectId: 'proj-voice', subProjectId: 'sub-noise-cancel', featureId: 'feat-echo', teamId: 'team-alpha-data', teamName: 'Data Engineering', budget: 22000, spent: 3200, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p17', name: 'Speech Recognition Core', status: 'initiated', projectId: 'proj-voice', subProjectId: 'sub-speech-recog', teamId: 'team-alpha-data', teamName: 'Data Engineering', budget: 92000, spent: 59000, risk: 'high', riskReason: 'Accuracy below 92% threshold', delayReason: 'Model retraining required' },
    { id: 'p18', name: 'Language Model Integration', status: 'planned', projectId: 'proj-voice', subProjectId: 'sub-speech-recog', featureId: 'feat-lang-model', teamId: 'team-alpha-data', teamName: 'Data Engineering', budget: 34000, spent: 6000, risk: 'medium', riskReason: 'Third-party API dependency', delayReason: null },
    { id: 'p19', name: 'Accent Adaptation Engine', status: 'to-be-initiated', projectId: 'proj-voice', subProjectId: 'sub-speech-recog', featureId: 'feat-accent', teamId: 'team-alpha-data', teamName: 'Data Engineering', budget: 28000, spent: 0, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p20', name: 'Wake Word Detection', status: 'planned', projectId: 'proj-voice', subProjectId: 'sub-wake-word', teamId: 'team-alpha-data', teamName: 'Data Engineering', budget: 48000, spent: 9500, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p21', name: 'Keyword Spotting Engine', status: 'planned', projectId: 'proj-voice', subProjectId: 'sub-wake-word', featureId: 'feat-keyword-spot', teamId: 'team-alpha-data', teamName: 'Data Engineering', budget: 21000, spent: 3800, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p22', name: 'Low Power Listener', status: 'to-be-initiated', projectId: 'proj-voice', subProjectId: 'sub-wake-word', featureId: 'feat-low-power-ww', teamId: 'team-alpha-data', teamName: 'Data Engineering', budget: 17000, spent: 0, risk: 'low', riskReason: null, delayReason: null },

    /* ── Memory & Performance ── */
    { id: 'p23', name: 'Memory & Performance Suite', status: 'initiated', projectId: 'proj-memory', teamId: 'team-beta-cloud', teamName: 'Cloud Infrastructure', budget: 195000, spent: 114000, risk: 'medium', riskReason: 'Legacy system dependencies', delayReason: null },
    { id: 'p24', name: 'RAM Optimization Core', status: 'closed', projectId: 'proj-memory', subProjectId: 'sub-ram-opt', teamId: 'team-beta-cloud', teamName: 'Cloud Infrastructure', budget: 52000, spent: 50800, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p25', name: 'Cache Cleaner', status: 'closed', projectId: 'proj-memory', subProjectId: 'sub-ram-opt', featureId: 'feat-cache-clean', teamId: 'team-beta-cloud', teamName: 'Cloud Infrastructure', budget: 18000, spent: 17600, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p26', name: 'Smart Memory Allocation', status: 'initiated', projectId: 'proj-memory', subProjectId: 'sub-ram-opt', featureId: 'feat-smart-alloc', teamId: 'team-beta-cloud', teamName: 'Cloud Infrastructure', budget: 21000, spent: 13500, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p27', name: 'Process Prioritization', status: 'initiated', projectId: 'proj-memory', subProjectId: 'sub-ram-opt', featureId: 'feat-proc-prio', teamId: 'team-beta-cloud', teamName: 'Cloud Infrastructure', budget: 16000, spent: 10200, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p28', name: 'Background Task Control', status: 'planned', projectId: 'proj-memory', subProjectId: 'sub-bg-task', teamId: 'team-beta-cloud', teamName: 'Cloud Infrastructure', budget: 42000, spent: 5200, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p29', name: 'Background App Limiter', status: 'planned', projectId: 'proj-memory', subProjectId: 'sub-bg-task', featureId: 'feat-bg-limit', teamId: 'team-beta-cloud', teamName: 'Cloud Infrastructure', budget: 16000, spent: 2100, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p30', name: 'Doze Mode Optimization', status: 'to-be-initiated', projectId: 'proj-memory', subProjectId: 'sub-bg-task', featureId: 'feat-doze-mode', teamId: 'team-beta-cloud', teamName: 'Cloud Infrastructure', budget: 14000, spent: 0, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p31', name: 'Thermal Performance Tuning', status: 'dropped', projectId: 'proj-memory', subProjectId: 'sub-thermal', teamId: 'team-beta-cloud', teamName: 'Cloud Infrastructure', budget: 38000, spent: 14000, risk: 'low', riskReason: null, delayReason: 'Deprioritized in Q3 roadmap review' },
    { id: 'p32', name: 'CPU Throttle Control', status: 'dropped', projectId: 'proj-memory', subProjectId: 'sub-thermal', featureId: 'feat-throttle', teamId: 'team-beta-cloud', teamName: 'Cloud Infrastructure', budget: 15000, spent: 4200, risk: 'low', riskReason: null, delayReason: 'Merged into parent project' },

    /* ── On-Device AI ── */
    { id: 'p33', name: 'On-Device AI Framework', status: 'initiated', projectId: 'proj-ondevice-ai', teamId: 'team-alpha-ai-nlp', teamName: 'NLP Research', budget: 275000, spent: 148000, risk: 'medium', riskReason: 'NPU driver compatibility issues', delayReason: null },
    { id: 'p34', name: 'Model Compression Suite', status: 'initiated', projectId: 'proj-ondevice-ai', subProjectId: 'sub-model-compress', teamId: 'team-alpha-ai-nlp', teamName: 'NLP Research', budget: 68000, spent: 43000, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p35', name: 'Model Quantization', status: 'closed', projectId: 'proj-ondevice-ai', subProjectId: 'sub-model-compress', featureId: 'feat-quantize', teamId: 'team-alpha-ai-nlp', teamName: 'NLP Research', budget: 29000, spent: 28400, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p36', name: 'Weight Pruning', status: 'to-be-initiated', projectId: 'proj-ondevice-ai', subProjectId: 'sub-model-compress', featureId: 'feat-prune', teamId: 'team-alpha-ai-nlp', teamName: 'NLP Research', budget: 23000, spent: 0, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p37', name: 'Knowledge Distillation', status: 'planned', projectId: 'proj-ondevice-ai', subProjectId: 'sub-model-compress', featureId: 'feat-distill', teamId: 'team-alpha-ai-nlp', teamName: 'NLP Research', budget: 27000, spent: 5500, risk: 'medium', riskReason: 'Research phase incomplete', delayReason: null },
    { id: 'p38', name: 'Edge Model Deployment', status: 'to-be-initiated', projectId: 'proj-ondevice-ai', subProjectId: 'sub-edge-deploy', teamId: 'team-alpha-ai-cv', teamName: 'Computer Vision', budget: 84000, spent: 0, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p39', name: 'OTA Model Updates', status: 'planned', projectId: 'proj-ondevice-ai', subProjectId: 'sub-edge-deploy', featureId: 'feat-ota-model', teamId: 'team-alpha-ai-cv', teamName: 'Computer Vision', budget: 31000, spent: 7200, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p40', name: 'Model Version Control', status: 'planned', projectId: 'proj-ondevice-ai', subProjectId: 'sub-edge-deploy', featureId: 'feat-version-ctrl', teamId: 'team-alpha-ai-cv', teamName: 'Computer Vision', budget: 18000, spent: 3100, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p41', name: 'Runtime Inference Engine', status: 'initiated', projectId: 'proj-ondevice-ai', subProjectId: 'sub-runtime-inf', teamId: 'team-alpha-ai-cv', teamName: 'Computer Vision', budget: 98000, spent: 63000, risk: 'high', riskReason: 'Latency exceeds 50ms on low-end devices', delayReason: 'Hardware profiling delayed' },
    { id: 'p42', name: 'NPU Acceleration', status: 'initiated', projectId: 'proj-ondevice-ai', subProjectId: 'sub-runtime-inf', featureId: 'feat-npu-accel', teamId: 'team-alpha-ai-cv', teamName: 'Computer Vision', budget: 46000, spent: 31000, risk: 'medium', riskReason: 'Chipset support limited', delayReason: null },
    { id: 'p43', name: 'Batch Inference Optimizer', status: 'planned', projectId: 'proj-ondevice-ai', subProjectId: 'sub-runtime-inf', featureId: 'feat-batch-inf', teamId: 'team-alpha-ai-cv', teamName: 'Computer Vision', budget: 22000, spent: 4000, risk: 'low', riskReason: null, delayReason: null },

    /* ── Mobile Platform ── */
    { id: 'p44', name: 'iOS Platform Refresh', status: 'initiated', projectId: 'proj-ai-camera', teamId: 'team-gamma-mobile-ios', teamName: 'iOS Team', budget: 145000, spent: 82000, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p45', name: 'SwiftUI Migration', status: 'initiated', projectId: 'proj-ai-camera', subProjectId: 'sub-image-enhancement', teamId: 'team-gamma-mobile-ios', teamName: 'iOS Team', budget: 55000, spent: 38000, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p46', name: 'Core Data Optimization', status: 'closed', projectId: 'proj-memory', subProjectId: 'sub-ram-opt', teamId: 'team-gamma-mobile-ios', teamName: 'iOS Team', budget: 28000, spent: 27200, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p47', name: 'Push Notification Revamp', status: 'planned', projectId: 'proj-voice', subProjectId: 'sub-wake-word', teamId: 'team-gamma-mobile-ios', teamName: 'iOS Team', budget: 22000, spent: 3500, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p48', name: 'Android Performance Pack', status: 'initiated', projectId: 'proj-memory', teamId: 'team-gamma-mobile-android', teamName: 'Android Team', budget: 138000, spent: 74000, risk: 'medium', riskReason: 'API 34 compatibility issues', delayReason: null },
    { id: 'p49', name: 'Jetpack Compose Adoption', status: 'planned', projectId: 'proj-ai-camera', subProjectId: 'sub-scene-detect', teamId: 'team-gamma-mobile-android', teamName: 'Android Team', budget: 42000, spent: 8800, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p50', name: 'Background Work Manager', status: 'closed', projectId: 'proj-memory', subProjectId: 'sub-bg-task', teamId: 'team-gamma-mobile-android', teamName: 'Android Team', budget: 19000, spent: 18600, risk: 'low', riskReason: null, delayReason: null },

    /* ── Web Frontend ── */
    { id: 'p51', name: 'Dashboard Redesign 2.0', status: 'initiated', projectId: 'proj-ondevice-ai', teamId: 'team-gamma-web-react', teamName: 'React Squad', budget: 88000, spent: 52000, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p52', name: 'Design System v3', status: 'initiated', projectId: 'proj-ai-camera', subProjectId: 'sub-image-enhancement', teamId: 'team-gamma-web-ux', teamName: 'UX Design', budget: 65000, spent: 41000, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p53', name: 'Accessibility Audit & Fix', status: 'closed', projectId: 'proj-ondevice-ai', subProjectId: 'sub-runtime-inf', teamId: 'team-gamma-web-ux', teamName: 'UX Design', budget: 24000, spent: 23100, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p54', name: 'Performance Monitoring UI', status: 'planned', projectId: 'proj-memory', subProjectId: 'sub-bg-task', teamId: 'team-gamma-web-react', teamName: 'React Squad', budget: 31000, spent: 5600, risk: 'low', riskReason: null, delayReason: null },

    /* ── Security ── */
    { id: 'p55', name: 'Security Hardening Sprint', status: 'initiated', projectId: 'proj-ondevice-ai', teamId: 'team-beta-security', teamName: 'Security & Compliance', budget: 112000, spent: 67000, risk: 'high', riskReason: 'Critical CVE discovered mid-sprint', delayReason: 'Patch verification pending' },
    { id: 'p56', name: 'Penetration Testing Q1', status: 'closed', projectId: 'proj-ondevice-ai', subProjectId: 'sub-edge-deploy', teamId: 'team-beta-sec-pentest', teamName: 'Pen Testing', budget: 45000, spent: 44200, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p57', name: 'Penetration Testing Q2', status: 'initiated', projectId: 'proj-ondevice-ai', subProjectId: 'sub-edge-deploy', teamId: 'team-beta-sec-pentest', teamName: 'Pen Testing', budget: 48000, spent: 22000, risk: 'medium', riskReason: 'Scope expanded', delayReason: null },
    { id: 'p58', name: 'SOC 2 Type II Audit Prep', status: 'planned', projectId: 'proj-ondevice-ai', subProjectId: 'sub-runtime-inf', teamId: 'team-beta-sec-audit', teamName: 'Security Audit', budget: 38000, spent: 9200, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p59', name: 'GDPR Compliance Review', status: 'closed', projectId: 'proj-memory', subProjectId: 'sub-thermal', teamId: 'team-beta-sec-audit', teamName: 'Security Audit', budget: 29000, spent: 28500, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p60', name: 'Zero Trust Architecture', status: 'to-be-initiated', projectId: 'proj-ondevice-ai', subProjectId: 'sub-model-compress', teamId: 'team-beta-security', teamName: 'Security & Compliance', budget: 62000, spent: 0, risk: 'low', riskReason: null, delayReason: null },

    /* ── Cloud & Infra ── */
    { id: 'p61', name: 'AWS Migration Phase 2', status: 'initiated', projectId: 'proj-memory', teamId: 'team-beta-cloud-aws', teamName: 'AWS Ops', budget: 185000, spent: 108000, risk: 'medium', riskReason: 'Cost overrun on S3 usage', delayReason: null },
    { id: 'p62', name: 'Multi-Region Failover', status: 'planned', projectId: 'proj-memory', subProjectId: 'sub-ram-opt', teamId: 'team-beta-cloud-aws', teamName: 'AWS Ops', budget: 72000, spent: 14000, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p63', name: 'Azure DevOps Integration', status: 'initiated', projectId: 'proj-ondevice-ai', subProjectId: 'sub-edge-deploy', teamId: 'team-beta-cloud-azure', teamName: 'Azure Ops', budget: 94000, spent: 58000, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p64', name: 'Kubernetes Cluster Upgrade', status: 'closed', projectId: 'proj-memory', subProjectId: 'sub-bg-task', teamId: 'team-beta-cloud-azure', teamName: 'Azure Ops', budget: 41000, spent: 39800, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p65', name: 'CDN Optimization', status: 'closed', projectId: 'proj-ai-camera', subProjectId: 'sub-low-light', teamId: 'team-beta-cloud-aws', teamName: 'AWS Ops', budget: 22000, spent: 21300, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p66', name: 'Service Mesh Implementation', status: 'to-be-initiated', projectId: 'proj-ondevice-ai', subProjectId: 'sub-runtime-inf', teamId: 'team-beta-cloud-azure', teamName: 'Azure Ops', budget: 54000, spent: 0, risk: 'medium', riskReason: 'Vendor evaluation not complete', delayReason: null },

    /* ── Data & Pipeline ── */
    { id: 'p67', name: 'Real-Time Data Pipeline v2', status: 'initiated', projectId: 'proj-voice', teamId: 'team-alpha-data-pipeline', teamName: 'Pipeline Ops', budget: 162000, spent: 95000, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p68', name: 'Event Streaming Platform', status: 'planned', projectId: 'proj-voice', subProjectId: 'sub-speech-recog', teamId: 'team-alpha-data-pipeline', teamName: 'Pipeline Ops', budget: 68000, spent: 11000, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p69', name: 'Data Lake Restructuring', status: 'initiated', projectId: 'proj-memory', subProjectId: 'sub-ram-opt', teamId: 'team-alpha-data-pipeline', teamName: 'Pipeline Ops', budget: 88000, spent: 54000, risk: 'medium', riskReason: 'Schema migration blocking downstream', delayReason: 'ETL rewrite underway' },
    { id: 'p70', name: 'Analytics Dashboard v4', status: 'closed', projectId: 'proj-ondevice-ai', subProjectId: 'sub-runtime-inf', teamId: 'team-alpha-data-viz', teamName: 'Data Viz', budget: 47000, spent: 45900, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p71', name: 'Executive Report Automation', status: 'initiated', projectId: 'proj-ondevice-ai', subProjectId: 'sub-model-compress', teamId: 'team-alpha-data-viz', teamName: 'Data Viz', budget: 34000, spent: 20000, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p72', name: 'ML Feature Store', status: 'planned', projectId: 'proj-ondevice-ai', subProjectId: 'sub-model-compress', teamId: 'team-alpha-data-pipeline', teamName: 'Pipeline Ops', budget: 58000, spent: 9000, risk: 'low', riskReason: null, delayReason: null },

    /* ── Misc Closed & Dropped ── */
    { id: 'p73', name: 'Legacy API Decommission', status: 'closed', projectId: 'proj-memory', subProjectId: 'sub-thermal', teamId: 'team-beta-cloud', teamName: 'Cloud Infrastructure', budget: 35000, spent: 34100, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p74', name: 'Monolith Decomposition P1', status: 'closed', projectId: 'proj-memory', subProjectId: 'sub-bg-task', teamId: 'team-beta-cloud', teamName: 'Cloud Infrastructure', budget: 78000, spent: 76400, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p75', name: 'Monolith Decomposition P2', status: 'initiated', projectId: 'proj-memory', subProjectId: 'sub-bg-task', teamId: 'team-beta-cloud', teamName: 'Cloud Infrastructure', budget: 82000, spent: 48000, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p76', name: 'Dark Mode Implementation', status: 'closed', projectId: 'proj-ai-camera', subProjectId: 'sub-scene-detect', teamId: 'team-gamma-web-ux', teamName: 'UX Design', budget: 18000, spent: 17200, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p77', name: 'i18n Localization Pack', status: 'dropped', projectId: 'proj-voice', subProjectId: 'sub-speech-recog', teamId: 'team-gamma-web-react', teamName: 'React Squad', budget: 26000, spent: 4200, risk: 'low', riskReason: null, delayReason: 'Budget reallocated to Security Hardening' },
    { id: 'p78', name: 'Chatbot Integration', status: 'dropped', projectId: 'proj-ondevice-ai', subProjectId: 'sub-edge-deploy', teamId: 'team-alpha-ai', teamName: 'AI/ML Engineering', budget: 44000, spent: 11000, risk: 'medium', riskReason: 'Vendor contract not renewed', delayReason: 'Vendor contract not renewed' },
    { id: 'p79', name: 'Smart Home SDK', status: 'dropped', projectId: 'proj-ondevice-ai', subProjectId: 'sub-runtime-inf', teamId: 'team-alpha-ai', teamName: 'AI/ML Engineering', budget: 59000, spent: 18000, risk: 'low', riskReason: null, delayReason: 'Market pivot decision' },
    { id: 'p80', name: 'Wearable Device Support', status: 'dropped', projectId: 'proj-ondevice-ai', subProjectId: 'sub-model-compress', teamId: 'team-gamma-mobile', teamName: 'Mobile Development', budget: 72000, spent: 22000, risk: 'low', riskReason: null, delayReason: 'Deprioritized — low market demand' },
    { id: 'p81', name: 'Batch Processing Revamp', status: 'closed', projectId: 'proj-memory', subProjectId: 'sub-ram-opt', teamId: 'team-alpha-data-pipeline', teamName: 'Pipeline Ops', budget: 33000, spent: 32100, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p82', name: 'CI/CD Pipeline Modernization', status: 'closed', projectId: 'proj-ondevice-ai', subProjectId: 'sub-edge-deploy', teamId: 'team-beta-cloud-azure', teamName: 'Azure Ops', budget: 37000, spent: 35800, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p83', name: 'Developer Portal v2', status: 'initiated', projectId: 'proj-ondevice-ai', subProjectId: 'sub-runtime-inf', teamId: 'team-gamma-web-react', teamName: 'React Squad', budget: 54000, spent: 32000, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p84', name: 'SDK Documentation Update', status: 'planned', projectId: 'proj-voice', subProjectId: 'sub-noise-cancel', teamId: 'team-gamma-web-ux', teamName: 'UX Design', budget: 14000, spent: 2200, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p85', name: 'API Rate Limiting Service', status: 'initiated', projectId: 'proj-memory', subProjectId: 'sub-bg-task', teamId: 'team-beta-cloud-aws', teamName: 'AWS Ops', budget: 29000, spent: 17000, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p86', name: 'GraphQL Gateway Migration', status: 'planned', projectId: 'proj-ondevice-ai', subProjectId: 'sub-edge-deploy', teamId: 'team-gamma-web-react', teamName: 'React Squad', budget: 38000, spent: 6500, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p87', name: 'Load Testing Framework', status: 'closed', projectId: 'proj-memory', subProjectId: 'sub-thermal', teamId: 'team-beta-sec-pentest', teamName: 'Pen Testing', budget: 21000, spent: 20400, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p88', name: 'Observability Stack', status: 'initiated', projectId: 'proj-memory', subProjectId: 'sub-bg-task', teamId: 'team-beta-cloud-aws', teamName: 'AWS Ops', budget: 66000, spent: 41000, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p89', name: 'Incident Response Runbook', status: 'closed', projectId: 'proj-ondevice-ai', subProjectId: 'sub-runtime-inf', teamId: 'team-beta-sec-audit', teamName: 'Security Audit', budget: 12000, spent: 11500, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p90', name: 'Capacity Planning Tooling', status: 'planned', projectId: 'proj-memory', subProjectId: 'sub-ram-opt', teamId: 'team-beta-cloud-azure', teamName: 'Azure Ops', budget: 25000, spent: 3800, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p91', name: 'Mobile A/B Testing SDK', status: 'initiated', projectId: 'proj-ai-camera', subProjectId: 'sub-low-light', teamId: 'team-gamma-mobile-android', teamName: 'Android Team', budget: 31000, spent: 18000, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p92', name: 'Cross-Platform Auth Library', status: 'to-be-initiated', projectId: 'proj-ondevice-ai', subProjectId: 'sub-model-compress', teamId: 'team-gamma-mobile', teamName: 'Mobile Development', budget: 28000, spent: 0, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p93', name: 'Crash Analytics Integration', status: 'closed', projectId: 'proj-memory', subProjectId: 'sub-bg-task', teamId: 'team-gamma-mobile-ios', teamName: 'iOS Team', budget: 16000, spent: 15700, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p94', name: 'Feature Flag Service', status: 'initiated', projectId: 'proj-ondevice-ai', subProjectId: 'sub-edge-deploy', teamId: 'team-beta-cloud-aws', teamName: 'AWS Ops', budget: 34000, spent: 19000, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p95', name: 'Data Retention Policy Engine', status: 'planned', projectId: 'proj-memory', subProjectId: 'sub-thermal', teamId: 'team-beta-sec-audit', teamName: 'Security Audit', budget: 22000, spent: 4100, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p96', name: 'Notification Delivery System', status: 'initiated', projectId: 'proj-voice', subProjectId: 'sub-wake-word', teamId: 'team-gamma-mobile', teamName: 'Mobile Development', budget: 41000, spent: 25000, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p97', name: 'User Preference Sync', status: 'closed', projectId: 'proj-voice', subProjectId: 'sub-noise-cancel', teamId: 'team-gamma-web-react', teamName: 'React Squad', budget: 18000, spent: 17400, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p98', name: 'Offline Mode Support', status: 'dropped', projectId: 'proj-ondevice-ai', subProjectId: 'sub-runtime-inf', teamId: 'team-gamma-mobile-android', teamName: 'Android Team', budget: 48000, spent: 14000, risk: 'medium', riskReason: 'Architecture pivot required', delayReason: 'Scope too large for current sprint' },
    { id: 'p99', name: 'Real-Time Collaboration MVP', status: 'to-be-initiated', projectId: 'proj-ondevice-ai', subProjectId: 'sub-edge-deploy', teamId: 'team-gamma-web-react', teamName: 'React Squad', budget: 74000, spent: 0, risk: 'low', riskReason: null, delayReason: null },
    { id: 'p100', name: 'Automated QA Pipeline', status: 'initiated', projectId: 'proj-memory', subProjectId: 'sub-bg-task', teamId: 'team-beta-sec-pentest', teamName: 'Pen Testing', budget: 39000, spent: 22000, risk: 'low', riskReason: null, delayReason: null }
  ],
  risk: {
    total: 100, withRisk: 18, withoutRisk: 82, completed: 28, delayed: 6, atRisk: 8, dropped: 7,
    riskProjects: [
      { name: 'Runtime Inference Engine', status: 'initiated', risk: 'high', riskReason: 'Latency exceeds 50ms on low-end devices', delayReason: 'Hardware profiling delayed', teamId: 'team-alpha-ai-cv', teamName: 'Computer Vision' },
      { name: 'Speech Recognition Core', status: 'initiated', risk: 'high', riskReason: 'Accuracy below 92% threshold', delayReason: 'Model retraining required', teamId: 'team-alpha-data', teamName: 'Data Engineering' },
      { name: 'Security Hardening Sprint', status: 'initiated', risk: 'high', riskReason: 'Critical CVE discovered mid-sprint', delayReason: 'Patch verification pending', teamId: 'team-beta-security', teamName: 'Security & Compliance' },
      { name: 'Voice Processing Engine', status: 'initiated', risk: 'medium', riskReason: 'Latency targets not met', delayReason: null, teamId: 'team-alpha-data', teamName: 'Data Engineering' },
      { name: 'Memory & Performance Suite', status: 'initiated', risk: 'medium', riskReason: 'Legacy system dependencies', delayReason: null, teamId: 'team-beta-cloud', teamName: 'Cloud Infrastructure' },
      { name: 'On-Device AI Framework', status: 'initiated', risk: 'medium', riskReason: 'NPU driver compatibility issues', delayReason: null, teamId: 'team-alpha-ai-nlp', teamName: 'NLP Research' },
      { name: 'AWS Migration Phase 2', status: 'initiated', risk: 'medium', riskReason: 'Cost overrun on S3 usage', delayReason: null, teamId: 'team-beta-cloud-aws', teamName: 'AWS Ops' },
      { name: 'Android Performance Pack', status: 'initiated', risk: 'medium', riskReason: 'API 34 compatibility issues', delayReason: null, teamId: 'team-gamma-mobile-android', teamName: 'Android Team' },
      { name: 'Data Lake Restructuring', status: 'initiated', risk: 'medium', riskReason: 'Schema migration blocking downstream', delayReason: 'ETL rewrite underway', teamId: 'team-alpha-data-pipeline', teamName: 'Pipeline Ops' },
      { name: 'Penetration Testing Q2', status: 'initiated', risk: 'medium', riskReason: 'Scope expanded beyond estimate', delayReason: null, teamId: 'team-beta-sec-pentest', teamName: 'Pen Testing' },
      { name: 'NPU Acceleration', status: 'initiated', risk: 'medium', riskReason: 'Chipset support limited to 2 vendors', delayReason: null, teamId: 'team-alpha-ai-cv', teamName: 'Computer Vision' },
      { name: 'Super Resolution Engine', status: 'planned', risk: 'medium', riskReason: 'ML model pipeline dependency', delayReason: null, teamId: 'team-alpha-ai', teamName: 'AI/ML Engineering' },
      { name: 'Language Model Integration', status: 'planned', risk: 'medium', riskReason: 'Third-party API dependency', delayReason: null, teamId: 'team-alpha-data', teamName: 'Data Engineering' },
      { name: 'Knowledge Distillation', status: 'planned', risk: 'medium', riskReason: 'Research phase incomplete', delayReason: null, teamId: 'team-alpha-ai-nlp', teamName: 'NLP Research' },
      { name: 'Service Mesh Implementation', status: 'to-be-initiated', risk: 'medium', riskReason: 'Vendor evaluation not complete', delayReason: null, teamId: 'team-beta-cloud-azure', teamName: 'Azure Ops' },
      { name: 'Offline Mode Support', status: 'dropped', risk: 'medium', riskReason: 'Architecture pivot required', delayReason: 'Scope too large for current sprint', teamId: 'team-gamma-mobile-android', teamName: 'Android Team' },
      { name: 'Chatbot Integration', status: 'dropped', risk: 'medium', riskReason: 'Vendor contract not renewed', delayReason: 'Vendor contract not renewed', teamId: 'team-alpha-ai', teamName: 'AI/ML Engineering' },
      { name: 'Offline Mode Support (v2)', status: 'planned', risk: 'medium', riskReason: 'Depends on unfinished core APIs', delayReason: null, teamId: 'team-gamma-mobile', teamName: 'Mobile Development' }
    ]
  },
  travel: {
    totalBudget: 420000,
    teams: [
      { teamId: 'team-alpha', teamName: 'Alpha Division', allocated: 105000, used: 68000 },
      { teamId: 'team-alpha-ai', teamName: 'AI/ML Engineering', allocated: 42000, used: 31500 },
      { teamId: 'team-alpha-data', teamName: 'Data Engineering', allocated: 38000, used: 22000 },
      { teamId: 'team-beta', teamName: 'Beta Division', allocated: 95000, used: 80200 },
      { teamId: 'team-beta-cloud', teamName: 'Cloud Infrastructure', allocated: 52000, used: 44800 },
      { teamId: 'team-beta-security', teamName: 'Security & Compliance', allocated: 28000, used: 18400 },
      { teamId: 'team-gamma', teamName: 'Gamma Division', allocated: 88000, used: 49000 },
      { teamId: 'team-gamma-mobile', teamName: 'Mobile Development', allocated: 35000, used: 21000 },
      { teamId: 'team-gamma-web', teamName: 'Web Frontend', allocated: 18000, used: 9400 }
    ]
  },
  hqpl: { sribScore: 0.84, teamScore: 0.81, trend: [0.66, 0.69, 0.72, 0.75, 0.78, 0.81, 0.84] },
  kpis: [
    { id: 'kpi-001', name: 'Core Project Delivery', icon: 'fa-bullseye', currentValue: '76%', target: '85%', trend: '+4%', trendDir: 'up', status: 'at-risk' },
    { id: 'kpi-002', name: 'Local R&D Completion', icon: 'fa-flask', currentValue: '68%', target: '75%', trend: '+6%', trendDir: 'up', status: 'at-risk' },
    { id: 'kpi-003', name: 'R&D Notes Updated', icon: 'fa-file-alt', currentValue: '87 notes', target: '100 notes', trend: '+12', trendDir: 'up', status: 'on-track' },
    { id: 'kpi-004', name: 'Customer Satisfaction', icon: 'fa-smile', currentValue: '4.3/5', target: '4.5/5', trend: '+0.2', trendDir: 'up', status: 'at-risk' },
    { id: 'kpi-005', name: 'Sprint Velocity', icon: 'fa-tachometer-alt', currentValue: '89 pts', target: '95 pts', trend: '+5 pts', trendDir: 'up', status: 'on-track' },
    { id: 'kpi-006', name: 'Bug Resolution Rate', icon: 'fa-bug', currentValue: '91%', target: '95%', trend: '-2%', trendDir: 'down', status: 'at-risk' },
    { id: 'kpi-007', name: 'Code Review Coverage', icon: 'fa-code-branch', currentValue: '84%', target: '90%', trend: '+3%', trendDir: 'up', status: 'at-risk' },
    { id: 'kpi-008', name: 'Deployment Frequency', icon: 'fa-rocket', currentValue: '12/week', target: '15/week', trend: '+2', trendDir: 'up', status: 'on-track' },
    { id: 'kpi-009', name: 'Mean Time to Recovery', icon: 'fa-heartbeat', currentValue: '2.4 hrs', target: '< 2 hrs', trend: '-0.3', trendDir: 'up', status: 'at-risk' },
    { id: 'kpi-010', name: 'Test Automation Coverage', icon: 'fa-vial', currentValue: '72%', target: '80%', trend: '+5%', trendDir: 'up', status: 'on-track' }
  ],
  skills: [
    { id: 'skill-001', name: 'Machine Learning', expert: 12, innovator: 6, advanced: 28, intermediate: 52, beginner: 34 },
    { id: 'skill-002', name: 'Cloud Architecture', expert: 9, innovator: 4, advanced: 22, intermediate: 46, beginner: 31 },
    { id: 'skill-003', name: 'DevOps / CI-CD', expert: 8, innovator: 3, advanced: 25, intermediate: 58, beginner: 38 },
    { id: 'skill-004', name: 'Python Programming', expert: 18, innovator: 8, advanced: 42, intermediate: 68, beginner: 22 },
    { id: 'skill-005', name: 'Data Engineering', expert: 10, innovator: 4, advanced: 30, intermediate: 55, beginner: 35 },
    { id: 'skill-006', name: 'React / Frontend', expert: 13, innovator: 6, advanced: 32, intermediate: 48, beginner: 26 },
    { id: 'skill-007', name: 'Cybersecurity', expert: 6, innovator: 3, advanced: 16, intermediate: 35, beginner: 22 },
    { id: 'skill-008', name: 'NLP / Text Analytics', expert: 5, innovator: 5, advanced: 13, intermediate: 28, beginner: 20 },
    { id: 'skill-009', name: 'Computer Vision', expert: 5, innovator: 4, advanced: 11, intermediate: 24, beginner: 18 },
    { id: 'skill-010', name: 'Agile / Scrum', expert: 24, innovator: 10, advanced: 52, intermediate: 80, beginner: 42 },
    { id: 'skill-011', name: 'SQL / Databases', expert: 15, innovator: 5, advanced: 36, intermediate: 62, beginner: 30 },
    { id: 'skill-012', name: 'Mobile iOS Dev', expert: 8, innovator: 4, advanced: 18, intermediate: 30, beginner: 20 },
    { id: 'skill-013', name: 'Mobile Android Dev', expert: 7, innovator: 3, advanced: 16, intermediate: 28, beginner: 18 },
    { id: 'skill-014', name: 'System Design', expert: 11, innovator: 6, advanced: 24, intermediate: 44, beginner: 25 },
    { id: 'skill-015', name: 'UX / UI Design', expert: 9, innovator: 7, advanced: 20, intermediate: 34, beginner: 22 },
    { id: 'skill-016', name: 'Project Management', expert: 22, innovator: 9, advanced: 48, intermediate: 75, beginner: 33 },
    { id: 'skill-017', name: 'Data Science', expert: 8, innovator: 5, advanced: 22, intermediate: 40, beginner: 28 },
    { id: 'skill-018', name: 'Kubernetes / Docker', expert: 7, innovator: 4, advanced: 20, intermediate: 38, beginner: 30 },
    { id: 'skill-019', name: 'Microservices', expert: 9, innovator: 5, advanced: 25, intermediate: 44, beginner: 24 },
    { id: 'skill-020', name: 'Business Analysis', expert: 14, innovator: 6, advanced: 34, intermediate: 58, beginner: 32 },
    { id: 'skill-021', name: 'TypeScript', expert: 11, innovator: 5, advanced: 30, intermediate: 50, beginner: 28 },
    { id: 'skill-022', name: 'GraphQL', expert: 6, innovator: 3, advanced: 14, intermediate: 30, beginner: 22 },
    { id: 'skill-023', name: 'Rust / Systems Programming', expert: 4, innovator: 2, advanced: 8, intermediate: 18, beginner: 15 },
    { id: 'skill-024', name: 'MLOps', expert: 5, innovator: 3, advanced: 12, intermediate: 25, beginner: 20 },
    { id: 'skill-025', name: 'Prompt Engineering', expert: 4, innovator: 6, advanced: 18, intermediate: 40, beginner: 35 }
  ],
  milestones: [
    { status: 'Q1 Planning Complete', count: 8, target: 8, label: 'All milestones met' },
    { status: 'Q2 Dev Checkpoint', count: 14, target: 18, label: '4 behind schedule' },
    { status: 'Q3 Beta Release', count: 6, target: 10, label: 'In progress' },
    { status: 'Security Audit Passed', count: 3, target: 3, label: '100% complete' },
    { status: 'Performance Benchmarks', count: 5, target: 8, label: 'Testing ongoing' },
    { status: 'Documentation Updated', count: 22, target: 30, label: '73% done' },
    { status: 'Stakeholder Reviews', count: 9, target: 9, label: 'All approved' },
    { status: 'Q4 Production Release', count: 0, target: 12, label: 'Upcoming' }
  ],
  resources: {
    month: '2023-12', label: 'December 2023',
    projects: [
      { projectName: 'AI Camera Optimization', teamId: 'team-alpha', currentPlan: 22, previousMonthPlan: 20, actual: 21, status: 'on-track' },
      { projectName: 'Voice Processing Engine', teamId: 'team-alpha-data', currentPlan: 18, previousMonthPlan: 16, actual: 15, status: 'at-risk' },
      { projectName: 'Memory & Performance Suite', teamId: 'team-beta-cloud', currentPlan: 28, previousMonthPlan: 26, actual: 31, status: 'critical' },
      { projectName: 'On-Device AI Framework', teamId: 'team-alpha-ai-nlp', currentPlan: 20, previousMonthPlan: 18, actual: 19, status: 'on-track' },
      { projectName: 'Speech Recognition Core', teamId: 'team-alpha-data', currentPlan: 22, previousMonthPlan: 20, actual: 22, status: 'on-track' },
      { projectName: 'Model Compression Suite', teamId: 'team-alpha-ai-nlp', currentPlan: 13, previousMonthPlan: 11, actual: 13, status: 'on-track' },
      { projectName: 'Security Hardening Sprint', teamId: 'team-beta-security', currentPlan: 16, previousMonthPlan: 13, actual: 18, status: 'critical' },
      { projectName: 'Dashboard Redesign 2.0', teamId: 'team-gamma-web-react', currentPlan: 10, previousMonthPlan: 9, actual: 9, status: 'on-track' },
      { projectName: 'AWS Migration Phase 2', teamId: 'team-beta-cloud-aws', currentPlan: 18, previousMonthPlan: 17, actual: 18, status: 'on-track' },
      { projectName: 'Real-Time Data Pipeline v2', teamId: 'team-alpha-data-pipeline', currentPlan: 14, previousMonthPlan: 13, actual: 13, status: 'on-track' },
      { projectName: 'Android Performance Pack', teamId: 'team-gamma-mobile-android', currentPlan: 12, previousMonthPlan: 11, actual: 13, status: 'at-risk' },
      { projectName: 'iOS Platform Refresh', teamId: 'team-gamma-mobile-ios', currentPlan: 10, previousMonthPlan: 9, actual: 9, status: 'on-track' },
      { projectName: 'Azure DevOps Integration', teamId: 'team-beta-cloud-azure', currentPlan: 11, previousMonthPlan: 10, actual: 11, status: 'on-track' },
      { projectName: 'Data Lake Restructuring', teamId: 'team-alpha-data-pipeline', currentPlan: 16, previousMonthPlan: 14, actual: 19, status: 'critical' },
      { projectName: 'Runtime Inference Engine', teamId: 'team-alpha-ai-cv', currentPlan: 19, previousMonthPlan: 18, actual: 19, status: 'on-track' },
      { projectName: 'Design System v3', teamId: 'team-gamma-web-ux', currentPlan: 8, previousMonthPlan: 7, actual: 8, status: 'on-track' }
    ]
  },
  // Per-month resource data for all months
  resourcesByMonth: {
    '2023-10': {
      label: 'October 2023',
      projects: [
        { projectName: 'AI Camera Optimization', teamId: 'team-alpha', currentPlan: 18, previousMonthPlan: 16, actual: 17, status: 'on-track' },
        { projectName: 'Voice Processing Engine', teamId: 'team-alpha-data', currentPlan: 15, previousMonthPlan: 13, actual: 14, status: 'on-track' },
        { projectName: 'Memory & Performance Suite', teamId: 'team-beta-cloud', currentPlan: 24, previousMonthPlan: 22, actual: 25, status: 'at-risk' },
        { projectName: 'On-Device AI Framework', teamId: 'team-alpha-ai-nlp', currentPlan: 16, previousMonthPlan: 14, actual: 15, status: 'on-track' },
        { projectName: 'iOS Platform Refresh', teamId: 'team-gamma-mobile-ios', currentPlan: 8, previousMonthPlan: 7, actual: 8, status: 'on-track' },
        { projectName: 'AWS Migration Phase 2', teamId: 'team-beta-cloud-aws', currentPlan: 15, previousMonthPlan: 13, actual: 14, status: 'on-track' },
        { projectName: 'Data Lake Restructuring', teamId: 'team-alpha-data-pipeline', currentPlan: 12, previousMonthPlan: 11, actual: 14, status: 'at-risk' },
        { projectName: 'Runtime Inference Engine', teamId: 'team-alpha-ai-cv', currentPlan: 15, previousMonthPlan: 14, actual: 14, status: 'on-track' }
      ]
    },
    '2023-11': {
      label: 'November 2023',
      projects: [
        { projectName: 'AI Camera Optimization', teamId: 'team-alpha', currentPlan: 20, previousMonthPlan: 18, actual: 19, status: 'on-track' },
        { projectName: 'Voice Processing Engine', teamId: 'team-alpha-data', currentPlan: 16, previousMonthPlan: 15, actual: 13, status: 'at-risk' },
        { projectName: 'Memory & Performance Suite', teamId: 'team-beta-cloud', currentPlan: 26, previousMonthPlan: 24, actual: 28, status: 'critical' },
        { projectName: 'Security Hardening Sprint', teamId: 'team-beta-security', currentPlan: 14, previousMonthPlan: 12, actual: 16, status: 'critical' },
        { projectName: 'On-Device AI Framework', teamId: 'team-alpha-ai-nlp', currentPlan: 18, previousMonthPlan: 16, actual: 18, status: 'on-track' },
        { projectName: 'iOS Platform Refresh', teamId: 'team-gamma-mobile-ios', currentPlan: 9, previousMonthPlan: 8, actual: 8, status: 'on-track' },
        { projectName: 'AWS Migration Phase 2', teamId: 'team-beta-cloud-aws', currentPlan: 16, previousMonthPlan: 15, actual: 16, status: 'on-track' },
        { projectName: 'Data Lake Restructuring', teamId: 'team-alpha-data-pipeline', currentPlan: 14, previousMonthPlan: 12, actual: 17, status: 'critical' },
        { projectName: 'Android Performance Pack', teamId: 'team-gamma-mobile-android', currentPlan: 11, previousMonthPlan: 10, actual: 12, status: 'at-risk' },
        { projectName: 'Runtime Inference Engine', teamId: 'team-alpha-ai-cv', currentPlan: 17, previousMonthPlan: 15, actual: 17, status: 'on-track' }
      ]
    },
    '2023-12': {
      label: 'December 2023',
      projects: [
        { projectName: 'AI Camera Optimization', teamId: 'team-alpha', currentPlan: 22, previousMonthPlan: 20, actual: 21, status: 'on-track' },
        { projectName: 'Voice Processing Engine', teamId: 'team-alpha-data', currentPlan: 18, previousMonthPlan: 16, actual: 15, status: 'at-risk' },
        { projectName: 'Memory & Performance Suite', teamId: 'team-beta-cloud', currentPlan: 28, previousMonthPlan: 26, actual: 31, status: 'critical' },
        { projectName: 'On-Device AI Framework', teamId: 'team-alpha-ai-nlp', currentPlan: 20, previousMonthPlan: 18, actual: 19, status: 'on-track' },
        { projectName: 'Speech Recognition Core', teamId: 'team-alpha-data', currentPlan: 22, previousMonthPlan: 20, actual: 22, status: 'on-track' },
        { projectName: 'Model Compression Suite', teamId: 'team-alpha-ai-nlp', currentPlan: 13, previousMonthPlan: 11, actual: 13, status: 'on-track' },
        { projectName: 'Security Hardening Sprint', teamId: 'team-beta-security', currentPlan: 16, previousMonthPlan: 13, actual: 18, status: 'critical' },
        { projectName: 'Dashboard Redesign 2.0', teamId: 'team-gamma-web-react', currentPlan: 10, previousMonthPlan: 9, actual: 9, status: 'on-track' },
        { projectName: 'AWS Migration Phase 2', teamId: 'team-beta-cloud-aws', currentPlan: 18, previousMonthPlan: 17, actual: 18, status: 'on-track' },
        { projectName: 'Real-Time Data Pipeline v2', teamId: 'team-alpha-data-pipeline', currentPlan: 14, previousMonthPlan: 13, actual: 13, status: 'on-track' },
        { projectName: 'Android Performance Pack', teamId: 'team-gamma-mobile-android', currentPlan: 12, previousMonthPlan: 11, actual: 13, status: 'at-risk' },
        { projectName: 'iOS Platform Refresh', teamId: 'team-gamma-mobile-ios', currentPlan: 10, previousMonthPlan: 9, actual: 9, status: 'on-track' },
        { projectName: 'Azure DevOps Integration', teamId: 'team-beta-cloud-azure', currentPlan: 11, previousMonthPlan: 10, actual: 11, status: 'on-track' },
        { projectName: 'Data Lake Restructuring', teamId: 'team-alpha-data-pipeline', currentPlan: 16, previousMonthPlan: 14, actual: 19, status: 'critical' },
        { projectName: 'Runtime Inference Engine', teamId: 'team-alpha-ai-cv', currentPlan: 19, previousMonthPlan: 18, actual: 19, status: 'on-track' },
        { projectName: 'Design System v3', teamId: 'team-gamma-web-ux', currentPlan: 8, previousMonthPlan: 7, actual: 8, status: 'on-track' }
      ]
    },
    '2024-01': {
      label: 'January 2024',
      projects: [
        { projectName: 'AI Camera Optimization', teamId: 'team-alpha', currentPlan: 25, previousMonthPlan: 22, actual: 23, status: 'on-track' },
        { projectName: 'Voice Processing Engine', teamId: 'team-alpha-data', currentPlan: 18, previousMonthPlan: 15, actual: 14, status: 'at-risk' },
        { projectName: 'Memory & Performance Suite', teamId: 'team-beta-cloud', currentPlan: 30, previousMonthPlan: 28, actual: 32, status: 'critical' },
        { projectName: 'On-Device AI Framework', teamId: 'team-alpha-ai-nlp', currentPlan: 20, previousMonthPlan: 18, actual: 17, status: 'on-track' },
        { projectName: 'Noise Cancellation Module', teamId: 'team-alpha-data', currentPlan: 12, previousMonthPlan: 10, actual: 11, status: 'on-track' },
        { projectName: 'Security Hardening Sprint', teamId: 'team-beta-security', currentPlan: 18, previousMonthPlan: 16, actual: 20, status: 'critical' },
        { projectName: 'AWS Migration Phase 2', teamId: 'team-beta-cloud-aws', currentPlan: 19, previousMonthPlan: 18, actual: 18, status: 'on-track' },
        { projectName: 'iOS Platform Refresh', teamId: 'team-gamma-mobile-ios', currentPlan: 10, previousMonthPlan: 9, actual: 10, status: 'on-track' },
        { projectName: 'Model Compression Suite', teamId: 'team-alpha-ai-nlp', currentPlan: 14, previousMonthPlan: 12, actual: 14, status: 'on-track' },
        { projectName: 'Real-Time Data Pipeline v2', teamId: 'team-alpha-data-pipeline', currentPlan: 15, previousMonthPlan: 14, actual: 14, status: 'on-track' }
      ]
    },
    '2024-02': {
      label: 'February 2024',
      projects: [
        { projectName: 'AI Camera Optimization', teamId: 'team-alpha', currentPlan: 26, previousMonthPlan: 25, actual: 25, status: 'on-track' },
        { projectName: 'Speech Recognition Core', teamId: 'team-alpha-data', currentPlan: 20, previousMonthPlan: 18, actual: 22, status: 'critical' },
        { projectName: 'Memory & Performance Suite', teamId: 'team-beta-cloud', currentPlan: 32, previousMonthPlan: 30, actual: 30, status: 'on-track' },
        { projectName: 'Model Compression Suite', teamId: 'team-alpha-ai-nlp', currentPlan: 14, previousMonthPlan: 12, actual: 14, status: 'on-track' },
        { projectName: 'RAM Optimization Core', teamId: 'team-beta-cloud', currentPlan: 8, previousMonthPlan: 6, actual: 7, status: 'on-track' },
        { projectName: 'Security Hardening Sprint', teamId: 'team-beta-security', currentPlan: 19, previousMonthPlan: 18, actual: 21, status: 'critical' },
        { projectName: 'AWS Migration Phase 2', teamId: 'team-beta-cloud-aws', currentPlan: 19, previousMonthPlan: 18, actual: 18, status: 'on-track' },
        { projectName: 'Android Performance Pack', teamId: 'team-gamma-mobile-android', currentPlan: 13, previousMonthPlan: 11, actual: 14, status: 'at-risk' },
        { projectName: 'Data Lake Restructuring', teamId: 'team-alpha-data-pipeline', currentPlan: 17, previousMonthPlan: 15, actual: 20, status: 'critical' },
        { projectName: 'Runtime Inference Engine', teamId: 'team-alpha-ai-cv', currentPlan: 18, previousMonthPlan: 17, actual: 18, status: 'on-track' }
      ]
    },
    '2024-03': {
      label: 'March 2024',
      projects: [
        { projectName: 'AI Camera Optimization', teamId: 'team-alpha', currentPlan: 26, previousMonthPlan: 26, actual: 24, status: 'at-risk' },
        { projectName: 'Speech Recognition Core', teamId: 'team-alpha-data', currentPlan: 22, previousMonthPlan: 20, actual: 25, status: 'critical' },
        { projectName: 'Runtime Inference Engine', teamId: 'team-alpha-ai-cv', currentPlan: 18, previousMonthPlan: 15, actual: 16, status: 'on-track' },
        { projectName: 'Background Task Control', teamId: 'team-beta-cloud', currentPlan: 6, previousMonthPlan: 0, actual: 5, status: 'on-track' },
        { projectName: 'Wake Word Detection', teamId: 'team-alpha-data', currentPlan: 8, previousMonthPlan: 5, actual: 7, status: 'on-track' },
        { projectName: 'Security Hardening Sprint', teamId: 'team-beta-security', currentPlan: 20, previousMonthPlan: 19, actual: 23, status: 'critical' },
        { projectName: 'AWS Migration Phase 2', teamId: 'team-beta-cloud-aws', currentPlan: 20, previousMonthPlan: 19, actual: 20, status: 'on-track' },
        { projectName: 'iOS Platform Refresh', teamId: 'team-gamma-mobile-ios', currentPlan: 11, previousMonthPlan: 10, actual: 10, status: 'on-track' },
        { projectName: 'Model Compression Suite', teamId: 'team-alpha-ai-nlp', currentPlan: 15, previousMonthPlan: 14, actual: 15, status: 'on-track' },
        { projectName: 'Real-Time Data Pipeline v2', teamId: 'team-alpha-data-pipeline', currentPlan: 16, previousMonthPlan: 15, actual: 15, status: 'on-track' },
        { projectName: 'Azure DevOps Integration', teamId: 'team-beta-cloud-azure', currentPlan: 13, previousMonthPlan: 11, actual: 13, status: 'on-track' },
        { projectName: 'Developer Portal v2', teamId: 'team-gamma-web-react', currentPlan: 9, previousMonthPlan: 7, actual: 9, status: 'on-track' }
      ]
    },
    '2024-04': {
      label: 'April 2024',
      projects: [
        { projectName: 'AI Camera Optimization', teamId: 'team-alpha', currentPlan: 28, previousMonthPlan: 25, actual: 26, status: 'on-track' },
        { projectName: 'Voice Processing Engine', teamId: 'team-alpha-data', currentPlan: 20, previousMonthPlan: 17, actual: 16, status: 'at-risk' },
        { projectName: 'Memory & Performance Suite', teamId: 'team-beta-cloud', currentPlan: 32, previousMonthPlan: 30, actual: 35, status: 'critical' },
        { projectName: 'On-Device AI Framework', teamId: 'team-alpha-ai-nlp', currentPlan: 22, previousMonthPlan: 19, actual: 20, status: 'on-track' },
        { projectName: 'Speech Recognition Core', teamId: 'team-alpha-data', currentPlan: 24, previousMonthPlan: 21, actual: 27, status: 'critical' },
        { projectName: 'Model Compression Suite', teamId: 'team-alpha-ai-nlp', currentPlan: 15, previousMonthPlan: 13, actual: 15, status: 'on-track' },
        { projectName: 'Security Hardening Sprint', teamId: 'team-beta-security', currentPlan: 18, previousMonthPlan: 14, actual: 21, status: 'critical' },
        { projectName: 'Dashboard Redesign 2.0', teamId: 'team-gamma-web-react', currentPlan: 12, previousMonthPlan: 10, actual: 11, status: 'on-track' },
        { projectName: 'AWS Migration Phase 2', teamId: 'team-beta-cloud-aws', currentPlan: 20, previousMonthPlan: 18, actual: 19, status: 'on-track' },
        { projectName: 'Real-Time Data Pipeline v2', teamId: 'team-alpha-data-pipeline', currentPlan: 16, previousMonthPlan: 14, actual: 15, status: 'on-track' },
        { projectName: 'Android Performance Pack', teamId: 'team-gamma-mobile-android', currentPlan: 14, previousMonthPlan: 12, actual: 16, status: 'at-risk' },
        { projectName: 'iOS Platform Refresh', teamId: 'team-gamma-mobile-ios', currentPlan: 11, previousMonthPlan: 9, actual: 10, status: 'on-track' },
        { projectName: 'Azure DevOps Integration', teamId: 'team-beta-cloud-azure', currentPlan: 13, previousMonthPlan: 11, actual: 13, status: 'on-track' },
        { projectName: 'Data Lake Restructuring', teamId: 'team-alpha-data-pipeline', currentPlan: 18, previousMonthPlan: 15, actual: 22, status: 'critical' },
        { projectName: 'Penetration Testing Q2', teamId: 'team-beta-sec-pentest', currentPlan: 8, previousMonthPlan: 7, actual: 8, status: 'on-track' },
        { projectName: 'Runtime Inference Engine', teamId: 'team-alpha-ai-cv', currentPlan: 21, previousMonthPlan: 19, actual: 21, status: 'on-track' }
      ]
    }
  },
  months: [
    { month: '2023-10', label: 'October 2023' },
    { month: '2023-11', label: 'November 2023' },
    { month: '2023-12', label: 'December 2023' },
    { month: '2024-01', label: 'January 2024' },
    { month: '2024-02', label: 'February 2024' },
    { month: '2024-03', label: 'March 2024' },
    { month: '2024-04', label: 'April 2024' }
  ],
  activity: [
    { id: 1, icon: 'fa-check-circle', message: 'Security Hardening Sprint — CVE patch verified & deployed', time: '32 min ago' },
    { id: 2, icon: 'fa-exclamation-triangle', message: 'Runtime Inference Engine flagged High Risk — latency spike 58ms', time: '1 hour ago' },
    { id: 3, icon: 'fa-user-plus', message: '3 engineers onboarded to AWS Migration Phase 2', time: '2 hours ago' },
    { id: 4, icon: 'fa-check', message: 'Model Quantization closed — all acceptance criteria met', time: '4 hours ago' },
    { id: 5, icon: 'fa-play-circle', message: 'Feature Flag Service initiated by Beta Division', time: '5 hours ago' },
    { id: 6, icon: 'fa-dollar-sign', message: 'Beta Division travel budget 85% utilized — Q2 review needed', time: 'Yesterday' },
    { id: 7, icon: 'fa-code-branch', message: 'Design System v3 — PR #142 merged to main', time: 'Yesterday' },
    { id: 8, icon: 'fa-times-circle', message: 'Wearable Device Support dropped — low market demand confirmed', time: '2 days ago' },
    { id: 9, icon: 'fa-rocket', message: 'Kubernetes Cluster Upgrade closed successfully', time: '2 days ago' },
    { id: 10, icon: 'fa-file-alt', message: 'SOC 2 Type II audit preparation kickoff meeting held', time: '3 days ago' }
  ]
};

// Global state
const state = {
  hierarchy: null,
  activeTeamId: null,
  activeTeamName: null,
  activePmId: null,
  activeProjectId: null,
  activeSubProjectId: null,
  activeFeatureId: null,
  currentMonth: '2024-04',
  resourcePage: 1,
  resourcePageSize: 10,
  resourceData: [],
  skillChanges: {},
  charts: {},
  backendAvailable: false,
};

// ============================================================
// UTILITY
// ============================================================

async function apiFetch(endpoint) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`);
    if (!res.ok) throw new Error(`API error ${res.status}`);
    state.backendAvailable = true;
    return await res.json();
  } catch (err) {
    state.backendAvailable = false;
    return null;
  }
}

// Filter fallback data client-side when backend is offline
function filterFallback(items) {
  let data = [...items];
  // Team filter — match exact OR prefix (division/team covers sub-teams)
  if (state.activeTeamId) {
    data = data.filter(p => {
      if (!p.teamId) return false;
      return p.teamId === state.activeTeamId || p.teamId.startsWith(state.activeTeamId);
    });
  }
  if (state.activeProjectId) data = data.filter(p => p.projectId === state.activeProjectId);
  if (state.activeSubProjectId) data = data.filter(p => p.subProjectId === state.activeSubProjectId);
  if (state.activeFeatureId) data = data.filter(p => p.featureId === state.activeFeatureId);
  return data;
}

async function apiPost(endpoint, body) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(`[API POST] ${endpoint}`, err);
    return null;
  }
}

async function apiPut(endpoint, body) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(`[API PUT] ${endpoint}`, err);
    return null;
  }
}

async function apiDelete(endpoint) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(`[API DELETE] ${endpoint}`, err);
    return null;
  }
}

function showToast(message, type = 'info', duration = 3500) {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  const iconMap = { success: 'fa-check-circle', error: 'fa-times-circle', info: 'fa-info-circle' };
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="fas ${iconMap[type] || iconMap.info}"></i> ${message}`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'toastOut 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

function buildFilterParams() {
  const params = new URLSearchParams();
  if (state.activeTeamId) params.append('teamId', state.activeTeamId);
  if (state.activeProjectId) params.append('projectId', state.activeProjectId);
  if (state.activeSubProjectId) params.append('subProjectId', state.activeSubProjectId);
  if (state.activeFeatureId) params.append('featureId', state.activeFeatureId);
  const str = params.toString();
  return str ? `?${str}` : '';
}
function fmtCurrency(val) {
  if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
  if (val >= 1000) return `$${(val / 1000).toFixed(0)}k`;
  return `$${val}`;
}

function getValueClass(value, isActualDiff) {
  if (value === 0) return 'calculated-neutral';
  if (isActualDiff) return value > 0 ? 'calculated-negative' : 'calculated-positive';
  return value > 0 ? 'calculated-positive' : 'calculated-negative';
}

function formatDifference(value) {
  if (value > 0) return `+${value}`;
  if (value < 0) return `${value}`;
  return '0';
}

function getStatusBadge(status) {
  const map = {
    'on-track': { label: 'On Track', icon: 'fa-check-circle' },
    'at-risk': { label: 'At Risk', icon: 'fa-exclamation-circle' },
    'critical': { label: 'Critical', icon: 'fa-times-circle' },
    'planned': { label: 'Planned', icon: 'fa-clock' },
    'initiated': { label: 'Initiated', icon: 'fa-play-circle' },
    'closed': { label: 'Closed', icon: 'fa-check-circle' },
    'dropped': { label: 'Dropped', icon: 'fa-times-circle' },
    'to-be-initiated': { label: 'To Be Initiated', icon: 'fa-hourglass-start' },
  };
  const s = map[status] || { label: status, icon: 'fa-circle' };
  return `<span class="status-badge ${status}"><i class="fas ${s.icon}"></i> ${s.label}</span>`;
}

function closeModal(id) {
  document.getElementById(id).style.display = 'none';
}

function openModal(id) {
  document.getElementById(id).style.display = 'flex';
}

function destroyChart(id) {
  if (state.charts[id]) {
    state.charts[id].destroy();
    delete state.charts[id];
  }
}

function animateCounters() {
  const counters = document.querySelectorAll('.status-info .count, .summary-value');
  counters.forEach(counter => {
    const raw = counter.textContent.replace(/[^0-9]/g, '');
    const target = parseInt(raw);
    if (isNaN(target) || target === 0) return;
    const duration = 1200;
    const step = target / (duration / 16);
    let current = 0;
    const suffix = counter.textContent.replace(/[0-9]/g, '').trim();
    const update = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current) + (suffix ? suffix : '');
        requestAnimationFrame(update);
      } else {
        counter.textContent = target + (suffix ? suffix : '');
      }
    };
    requestAnimationFrame(update);
  });
}

// ============================================================
// FILTER HIERARCHY — Team Hierarchy + Project → Sub Project → Feature
// ============================================================

// Project filter data
const FILTER_DATA = {
  projects: [
    {
      id: 'proj-ai-camera', name: 'AI Camera Optimization',
      subProjects: [
        { id: 'sub-image-enhancement', name: 'Image Enhancement Module', features: [{ id: 'feat-hdr', name: 'HDR Processing' }, { id: 'feat-superres', name: 'Super Resolution' }, { id: 'feat-color', name: 'Color Correction Engine' }] },
        { id: 'sub-low-light', name: 'Low Light Optimization', features: [{ id: 'feat-night-mode', name: 'Night Mode Enhancer' }, { id: 'feat-noise-reduce', name: 'Noise Reduction' }, { id: 'feat-iso-boost', name: 'ISO Boost Algorithm' }] },
        { id: 'sub-scene-detect', name: 'AI Scene Detection', features: [{ id: 'feat-scene-class', name: 'Scene Classifier' }, { id: 'feat-object-det', name: 'Object Detection' }, { id: 'feat-auto-frame', name: 'Auto Framing' }] }
      ]
    },
    {
      id: 'proj-voice', name: 'Voice Processing Engine',
      subProjects: [
        { id: 'sub-noise-cancel', name: 'Noise Cancellation', features: [{ id: 'feat-env-noise', name: 'Environmental Noise Filter' }, { id: 'feat-wind-noise', name: 'Wind Noise Suppression' }, { id: 'feat-echo', name: 'Echo Cancellation' }] },
        { id: 'sub-speech-recog', name: 'Speech Recognition', features: [{ id: 'feat-lang-model', name: 'Language Model Integration' }, { id: 'feat-accent', name: 'Accent Adaptation' }, { id: 'feat-realtime-stt', name: 'Real-Time STT' }] },
        { id: 'sub-wake-word', name: 'Wake Word Detection', features: [{ id: 'feat-keyword-spot', name: 'Keyword Spotting' }, { id: 'feat-false-pos', name: 'False Positive Reduction' }, { id: 'feat-low-power-ww', name: 'Low Power Listener' }] }
      ]
    },
    {
      id: 'proj-memory', name: 'Memory & Performance Management',
      subProjects: [
        { id: 'sub-ram-opt', name: 'RAM Optimization', features: [{ id: 'feat-cache-clean', name: 'Cache Cleaner' }, { id: 'feat-smart-alloc', name: 'Smart Memory Allocation' }, { id: 'feat-proc-prio', name: 'Process Prioritization' }] },
        { id: 'sub-bg-task', name: 'Background Task Control', features: [{ id: 'feat-bg-limit', name: 'Background App Limiter' }, { id: 'feat-task-sched', name: 'Task Scheduler' }, { id: 'feat-doze-mode', name: 'Doze Mode Optimization' }] },
        { id: 'sub-thermal', name: 'Thermal Performance Tuning', features: [{ id: 'feat-throttle', name: 'CPU Throttle Control' }, { id: 'feat-heat-map', name: 'Heat Map Analysis' }, { id: 'feat-cool-algo', name: 'Cooling Algorithm' }] }
      ]
    },
    {
      id: 'proj-ondevice-ai', name: 'On-Device AI Framework',
      subProjects: [
        { id: 'sub-model-compress', name: 'Model Compression', features: [{ id: 'feat-quantize', name: 'Model Quantization' }, { id: 'feat-prune', name: 'Weight Pruning' }, { id: 'feat-distill', name: 'Knowledge Distillation' }] },
        { id: 'sub-edge-deploy', name: 'Edge Model Deployment', features: [{ id: 'feat-ota-model', name: 'OTA Model Updates' }, { id: 'feat-version-ctrl', name: 'Model Version Control' }, { id: 'feat-rollback', name: 'Rollback Engine' }] },
        { id: 'sub-runtime-inf', name: 'Runtime Inference Engine', features: [{ id: 'feat-npu-accel', name: 'NPU Acceleration' }, { id: 'feat-batch-inf', name: 'Batch Inference' }, { id: 'feat-latency-opt', name: 'Latency Optimizer' }] }
      ]
    }
  ],
  // Team hierarchy: Division → Team → Sub-Team
  divisions: [
    {
      id: 'team-alpha', name: 'Alpha Division',
      teams: [
        {
          id: 'team-alpha-ai', name: 'AI/ML Engineering',
          subTeams: [
            { id: 'team-alpha-ai-nlp', name: 'NLP Research' },
            { id: 'team-alpha-ai-cv', name: 'Computer Vision' }
          ]
        },
        {
          id: 'team-alpha-data', name: 'Data Engineering',
          subTeams: [
            { id: 'team-alpha-data-pipeline', name: 'Pipeline Ops' },
            { id: 'team-alpha-data-viz', name: 'Data Viz' }
          ]
        }
      ]
    },
    {
      id: 'team-beta', name: 'Beta Division',
      teams: [
        {
          id: 'team-beta-cloud', name: 'Cloud Infrastructure',
          subTeams: [
            { id: 'team-beta-cloud-aws', name: 'AWS Ops' },
            { id: 'team-beta-cloud-azure', name: 'Azure Ops' }
          ]
        },
        {
          id: 'team-beta-security', name: 'Security & Compliance',
          subTeams: [
            { id: 'team-beta-sec-pentest', name: 'Pen Testing' },
            { id: 'team-beta-sec-audit', name: 'Security Audit' }
          ]
        }
      ]
    },
    {
      id: 'team-gamma', name: 'Gamma Division',
      teams: [
        {
          id: 'team-gamma-mobile', name: 'Mobile Development',
          subTeams: [
            { id: 'team-gamma-mobile-ios', name: 'iOS Team' },
            { id: 'team-gamma-mobile-android', name: 'Android Team' }
          ]
        },
        {
          id: 'team-gamma-web', name: 'Web Frontend',
          subTeams: [
            { id: 'team-gamma-web-react', name: 'React Squad' },
            { id: 'team-gamma-web-ux', name: 'UX Design' }
          ]
        }
      ]
    }
  ]
};

// ---- Helper: populate a select element ----
function populateSelect(sel, items, labelKey = 'name', valueKey = 'id', placeholder = null) {
  const current = sel.value;
  const firstOpt = sel.options[0];
  sel.innerHTML = '';
  if (firstOpt) sel.appendChild(firstOpt);
  items.forEach(item => {
    const opt = document.createElement('option');
    opt.value = item[valueKey];
    opt.textContent = item[labelKey];
    sel.appendChild(opt);
  });
  // Restore value if still valid
  if (current && [...sel.options].some(o => o.value === current)) sel.value = current;
}

// ---- Initialize all dropdowns ----
function initFilterDropdowns() {
  // Project hierarchy
  const projSel = document.getElementById('projectFilter');
  populateSelect(projSel, FILTER_DATA.projects);

  // Team hierarchy — Division dropdown
  const divSel = document.getElementById('divisionFilter');
  if (divSel) populateSelect(divSel, FILTER_DATA.divisions);

  syncSelectStyles();
}

// ---- Team Division cascade: Division → Team → Sub-Team ----
document.getElementById('divisionFilter')?.addEventListener('change', function () {
  const divId = this.value;
  const teamSel = document.getElementById('teamFilter');
  const subTeamSel = document.getElementById('subTeamFilter');

  teamSel.innerHTML = '<option value="">All Teams</option>';
  subTeamSel.innerHTML = '<option value="">All Sub-Teams</option>';
  subTeamSel.disabled = true;

  if (divId) {
    const div = FILTER_DATA.divisions.find(d => d.id === divId);
    if (div) {
      populateSelect(teamSel, div.teams);
      teamSel.disabled = false;
    }
  } else {
    teamSel.disabled = true;
  }
  syncSelectStyles();
});

document.getElementById('teamFilter')?.addEventListener('change', function () {
  const teamId = this.value;
  const divId = document.getElementById('divisionFilter')?.value;
  const subTeamSel = document.getElementById('subTeamFilter');

  subTeamSel.innerHTML = '<option value="">All Sub-Teams</option>';

  if (teamId && divId) {
    const div = FILTER_DATA.divisions.find(d => d.id === divId);
    const team = div?.teams.find(t => t.id === teamId);
    if (team && team.subTeams.length) {
      populateSelect(subTeamSel, team.subTeams);
      subTeamSel.disabled = false;
    } else {
      subTeamSel.disabled = true;
    }
  } else {
    subTeamSel.disabled = true;
  }
  syncSelectStyles();
});

document.getElementById('subTeamFilter')?.addEventListener('change', function () {
  syncSelectStyles();
});

// ---- Project Hierarchy cascade: Project → Sub-Project → Feature ----
document.getElementById('projectFilter').addEventListener('change', function () {
  const projectId = this.value;
  const subSel = document.getElementById('subProjectFilter');
  const featSel = document.getElementById('featureFilter');

  subSel.innerHTML = '<option value="">All Sub-Projects</option>';
  featSel.innerHTML = '<option value="">All Features</option>';
  featSel.disabled = true;

  if (projectId) {
    const project = FILTER_DATA.projects.find(p => p.id === projectId);
    if (project) {
      populateSelect(subSel, project.subProjects);
      subSel.disabled = false;
    }
  } else {
    subSel.disabled = true;
  }
  syncSelectStyles();
});

document.getElementById('subProjectFilter').addEventListener('change', function () {
  const subProjectId = this.value;
  const projectId = document.getElementById('projectFilter').value;
  const featSel = document.getElementById('featureFilter');

  featSel.innerHTML = '<option value="">All Features</option>';

  if (subProjectId && projectId) {
    const project = FILTER_DATA.projects.find(p => p.id === projectId);
    const subProject = project?.subProjects.find(sp => sp.id === subProjectId);
    if (subProject && subProject.features.length) {
      populateSelect(featSel, subProject.features);
      featSel.disabled = false;
    } else {
      featSel.disabled = true;
    }
  } else {
    featSel.disabled = true;
  }
  syncSelectStyles();
});

document.getElementById('featureFilter').addEventListener('change', function () {
  syncSelectStyles();
});

// ---- Mark selects visually when they have a value ----
function syncSelectStyles() {
  ['projectFilter', 'subProjectFilter', 'featureFilter', 'divisionFilter', 'teamFilter', 'subTeamFilter'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.toggle('has-value', !!el.value);
    const wrapper = el.closest('.filter-group');
    if (wrapper) wrapper.classList.toggle('active', !!el.value);
  });
}

// ---- Compute the deepest selected item label & id ----
function getDeepestSelection() {
  // Team hierarchy takes priority if selected
  const subTeamId = document.getElementById('subTeamFilter')?.value;
  const teamId = document.getElementById('teamFilter')?.value;
  const divId = document.getElementById('divisionFilter')?.value;
  const featureId = document.getElementById('featureFilter').value;
  const subProjectId = document.getElementById('subProjectFilter').value;
  const projectId = document.getElementById('projectFilter').value;

  const labelOf = (selId) => {
    const sel = document.getElementById(selId);
    return sel?.options[sel.selectedIndex]?.text || '';
  };

  // Team path deepest first
  if (subTeamId) return { id: subTeamId, label: labelOf('subTeamFilter'), type: 'subTeam' };
  if (teamId) return { id: teamId, label: labelOf('teamFilter'), type: 'team' };
  if (divId) return { id: divId, label: labelOf('divisionFilter'), type: 'division' };
  // Project path deepest first
  if (featureId) return { id: featureId, label: labelOf('featureFilter'), type: 'feature' };
  if (subProjectId) return { id: subProjectId, label: labelOf('subProjectFilter'), type: 'subProject' };
  if (projectId) return { id: projectId, label: labelOf('projectFilter'), type: 'project' };
  return null;
}

// ---- Apply Filter ----
document.getElementById('applyFilterBtn').addEventListener('click', () => {
  const projectId = document.getElementById('projectFilter').value;
  const subProjectId = document.getElementById('subProjectFilter').value;
  const featureId = document.getElementById('featureFilter').value;
  const divId = document.getElementById('divisionFilter')?.value || '';
  const teamId = document.getElementById('teamFilter')?.value || '';
  const subTeamId = document.getElementById('subTeamFilter')?.value || '';

  const selected = getDeepestSelection();

  // Set state — team hierarchy wins for teamId
  state.activeTeamId = subTeamId || teamId || divId || null;
  state.activeProjectId = projectId || null;
  state.activeSubProjectId = subProjectId || null;
  state.activeFeatureId = featureId || null;
  state.activeTeamName = selected?.label || null;

  // Update breadcrumb
  updateBreadcrumb({ projectId, subProjectId, featureId, divId, teamId, subTeamId });

  const tag = document.getElementById('activeFilterTag');
  if (selected) {
    document.getElementById('activeFilterLabel').textContent = selected.label;
    tag.style.display = 'flex';
    document.getElementById('openTeamDetailBtn').disabled = false;
  } else {
    tag.style.display = 'none';
    document.getElementById('openTeamDetailBtn').disabled = true;
  }

  syncSelectStyles();
  showToast(`Filter applied: ${selected?.label || 'All'}`, 'success');
  refreshAllSections();
});

// ---- Update breadcrumb ----
function updateBreadcrumb({ projectId, subProjectId, featureId, divId, teamId, subTeamId }) {
  const fbAll = document.getElementById('fbAll');
  const fbProject = document.getElementById('fbProject');
  const fbSubProject = document.getElementById('fbSubProject');
  const fbFeature = document.getElementById('fbFeature');
  const fbSep1 = document.getElementById('fbSep1');
  const fbSep2 = document.getElementById('fbSep2');
  const fbSep3 = document.getElementById('fbSep3');

  // Reset
  [fbSep1, fbSep2, fbSep3, fbProject, fbSubProject, fbFeature].forEach(el => { if (el) el.style.display = 'none'; });
  if (fbAll) fbAll.classList.add('active');

  const labelOf = (selId) => {
    const sel = document.getElementById(selId);
    return sel?.options[sel.selectedIndex]?.text || '';
  };

  // Build breadcrumb parts: team path OR project path
  const parts = [];
  if (divId) parts.push(labelOf('divisionFilter'));
  if (teamId) parts.push(labelOf('teamFilter'));
  if (subTeamId) parts.push(labelOf('subTeamFilter'));
  // If only project filter (no team filter)
  if (!divId && !teamId && !subTeamId) {
    if (projectId) parts.push(labelOf('projectFilter'));
    if (subProjectId) parts.push(labelOf('subProjectFilter'));
    if (featureId) parts.push(labelOf('featureFilter'));
  }

  if (parts.length > 0) {
    if (fbAll) fbAll.classList.remove('active');
    if (fbProject && parts[0]) { fbProject.textContent = parts[0]; fbProject.style.display = ''; if (fbSep1) fbSep1.style.display = ''; }
    if (fbSubProject && parts[1]) { fbSubProject.textContent = parts[1]; fbSubProject.style.display = ''; if (fbSep2) fbSep2.style.display = ''; }
    if (fbFeature && parts[2]) { fbFeature.textContent = parts[2]; fbFeature.style.display = ''; if (fbSep3) fbSep3.style.display = ''; }
  }
}

// ---- Clear filter ----
document.getElementById('clearFilterBtn').addEventListener('click', () => {
  // Reset project hierarchy
  ['projectFilter', 'subProjectFilter', 'featureFilter'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.value = '';
    el.classList.remove('has-value');
  });
  document.getElementById('subProjectFilter').disabled = true;
  document.getElementById('featureFilter').disabled = true;
  document.getElementById('subProjectFilter').innerHTML = '<option value="">All Sub-Projects</option>';
  document.getElementById('featureFilter').innerHTML = '<option value="">All Features</option>';

  // Reset team hierarchy
  const divSel = document.getElementById('divisionFilter');
  const teamSel = document.getElementById('teamFilter');
  const subTeamSel = document.getElementById('subTeamFilter');
  if (divSel) divSel.value = '';
  if (teamSel) { teamSel.innerHTML = '<option value="">All Teams</option>'; teamSel.disabled = true; }
  if (subTeamSel) { subTeamSel.innerHTML = '<option value="">All Sub-Teams</option>'; subTeamSel.disabled = true; }

  state.activeProjectId = null;
  state.activeSubProjectId = null;
  state.activeFeatureId = null;
  state.activeTeamId = null;
  state.activeTeamName = null;

  document.getElementById('activeFilterTag').style.display = 'none';
  document.getElementById('openTeamDetailBtn').disabled = true;

  // Reset breadcrumb
  const fbAll = document.getElementById('fbAll');
  if (fbAll) fbAll.classList.add('active');
  ['fbSep1', 'fbSep2', 'fbSep3', 'fbProject', 'fbSubProject', 'fbFeature'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });

  syncSelectStyles();
  refreshAllSections();
});

document.getElementById('removeFilterBtn').addEventListener('click', () => {
  document.getElementById('clearFilterBtn').click();
});

document.getElementById('openTeamDetailBtn').addEventListener('click', () => {
  openProjectDetailView();
});

async function openProjectDetailView() {
  const selected = getDeepestSelection();
  if (!selected) return;

  const fp = buildFilterParams();
  let projects = await apiFetch('/projects' + fp);
  if (!projects) projects = filterFallback(FALLBACK.projects);

  document.getElementById('drillDownTitle').textContent = 'Detail View — ' + selected.label;

  const head = document.getElementById('drillDownHead');
  head.innerHTML = '<tr><th>Project Name</th><th>Status</th><th>Budget</th><th>Spent</th><th>Risk</th><th>Risk Reason</th></tr>';

  const body = document.getElementById('drillDownBody');
  body.innerHTML = '';

  if (!projects || !projects.length) {
    body.innerHTML = '<tr><td colspan="6" style="text-align:center;color:var(--text-muted);padding:24px">No projects found for this selection.</td></tr>';
  } else {
    const totalBudget = projects.reduce((s, p) => s + (p.budget || 0), 0);
    const totalSpent = projects.reduce((s, p) => s + (p.spent || 0), 0);
    const highRisk = projects.filter(p => p.risk === 'high').length;
    const initiated = projects.filter(p => p.status === 'initiated').length;

    const summaryRow = document.createElement('tr');
    summaryRow.style.cssText = 'background:var(--bg-hover);font-weight:700;';
    summaryRow.innerHTML =
      '<td colspan="2" style="color:var(--text-secondary);font-size:0.8rem;padding:8px 16px;">' +
      projects.length + ' projects &nbsp;&middot;&nbsp; ' + initiated + ' active &nbsp;&middot;&nbsp; ' + highRisk + ' high risk' +
      '</td>' +
      '<td style="font-weight:700;color:var(--text-primary)">' + fmtCurrency(totalBudget) + '</td>' +
      '<td style="font-weight:700;color:var(--primary-main)">' + fmtCurrency(totalSpent) + '</td>' +
      '<td colspan="2"></td>';
    body.appendChild(summaryRow);

    projects.forEach(function (p) {
      const tr = document.createElement('tr');
      const overspend = p.spent > p.budget;
      tr.innerHTML =
        '<td><span class="project-name"><i class="fas fa-folder-open" style="color:var(--primary-main);margin-right:6px"></i>' + p.name + '</span></td>' +
        '<td>' + getStatusBadge(p.status) + '</td>' +
        '<td>' + fmtCurrency(p.budget || 0) + '</td>' +
        '<td style="' + (overspend ? 'color:#ef4444;font-weight:700' : '') + '">' + fmtCurrency(p.spent || 0) + '</td>' +
        '<td><span class="status-badge ' + (p.risk === 'high' ? 'critical' : p.risk === 'medium' ? 'at-risk' : 'on-track') + '">' + (p.risk || 'low') + '</span></td>' +
        '<td style="color:var(--text-secondary);font-size:0.85rem">' + (p.riskReason || '—') + '</td>';
      body.appendChild(tr);
    });
  }

  openModal('drillDownModal');
}
window.openProjectDetailView = openProjectDetailView;

// ============================================================
// SUMMARY + PROJECT STATUS
// ============================================================

async function loadSummary() {
  let data = await apiFetch(`/summary${buildFilterParams()}`);
  if (!data) {
    // Compute summary from fallback projects
    const projects = filterFallback(FALLBACK.projects);
    data = {
      totalProjects: projects.length,
      totalResources: 487,
      avgUtilization: 83,
      atRiskProjects: projects.filter(p => p.risk !== 'low').length,
      projectsByStatus: {
        initiated: projects.filter(p => p.status === 'initiated').length,
        planned: projects.filter(p => p.status === 'planned').length,
        closed: projects.filter(p => p.status === 'closed').length,
        dropped: projects.filter(p => p.status === 'dropped').length,
        'to-be-initiated': projects.filter(p => p.status === 'to-be-initiated').length,
      }
    };
  }

  document.getElementById('totalProjectsVal').textContent = data.totalProjects;
  if (document.getElementById('totalResourcesVal')) document.getElementById('totalResourcesVal').textContent = data.totalResources;
  if (document.getElementById('avgUtilizationVal')) document.getElementById('avgUtilizationVal').textContent = data.avgUtilization + '%';
  document.getElementById('atRiskVal').textContent = data.atRiskProjects;

  const s = data.projectsByStatus;
  document.getElementById('statusPlanned').textContent = s.planned || 0;
  document.getElementById('statusInitiated').textContent = s.initiated || 0;
  document.getElementById('statusClosed').textContent = s.closed || 0;
  document.getElementById('statusDropped').textContent = s.dropped || 0;
  document.getElementById('statusTBI').textContent = s['to-be-initiated'] || 0;

  // Mini stats in top bar
  if (document.getElementById('miniInitiated')) document.getElementById('miniInitiated').textContent = s.initiated || 0;
  if (document.getElementById('miniInPlan')) document.getElementById('miniInPlan').textContent = s.planned || 0;
  if (document.getElementById('miniYetToBe')) document.getElementById('miniYetToBe').textContent = s['to-be-initiated'] || 0;

  animateCounters();
}

// ============================================================
// DRILL-DOWN (Status / Risk)
// ============================================================

async function openStatusDrillDown(status) {
  const fp = buildFilterParams();
  const sep = fp ? '&' : '?';
  let projects = await apiFetch(`/projects${fp}${sep}status=${status}`);
  if (!projects) {
    projects = filterFallback(FALLBACK.projects).filter(p => p.status === status);
  }
  if (!projects) return;

  const titles = {
    planned: 'Planned Projects',
    initiated: 'Initiated Projects',
    closed: 'Closed Projects',
    dropped: 'Dropped Projects',
    'to-be-initiated': 'To Be Initiated Projects',
  };

  document.getElementById('drillDownTitle').textContent = titles[status] || 'Projects';

  const head = document.getElementById('drillDownHead');
  head.innerHTML = `<tr>
    <th>Project Name</th><th>Budget</th><th>Spent</th><th>Risk</th><th>Status</th>
    ${status === 'dropped' ? '<th>Drop Reason</th>' : ''}
  </tr>`;

  const body = document.getElementById('drillDownBody');
  body.innerHTML = '';

  if (!projects.length) {
    body.innerHTML = `<tr><td colspan="6" style="text-align:center;color:var(--text-muted);padding:24px">No projects found.</td></tr>`;
  } else {
    projects.forEach(p => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><span class="project-name">${p.name}</span></td>
        <td>${fmtCurrency(p.budget)}</td>
        <td>${fmtCurrency(p.spent)}</td>
        <td><span class="status-badge ${p.risk === 'high' ? 'critical' : p.risk === 'medium' ? 'at-risk' : 'on-track'}">${p.risk}</span></td>
        <td>${getStatusBadge(p.status)}</td>
        ${status === 'dropped' ? `<td>${p.dropReason || '—'}</td>` : ''}
      `;
      body.appendChild(tr);
    });
  }

  openModal('drillDownModal');
}

window.openStatusDrillDown = openStatusDrillDown;

async function openRiskDrillDown(type) {
  let riskData = await apiFetch(`/risk${buildFilterParams()}`);
  if (!riskData) {
    const projects = filterFallback(FALLBACK.projects);
    riskData = {
      total: projects.length,
      completed: projects.filter(p => p.status === 'closed').length,
      delayed: projects.filter(p => p.delayReason).length,
      atRisk: projects.filter(p => p.risk === 'high').length,
      dropped: projects.filter(p => p.status === 'dropped').length,
      riskProjects: projects
    };
  }

  let projects = riskData.riskProjects || [];
  let title = 'Risk Projects';
  let showDropReason = false;
  let showDelayReason = true;

  if (type === 'closed') {
    projects = projects.filter(p => p.status === 'closed');
    title = 'Completed Projects';
  } else if (type === 'delayed') {
    projects = projects.filter(p => p.delayReason);
    title = 'Delayed Projects';
  } else if (type === 'at-risk') {
    projects = projects.filter(p => p.risk === 'high');
    title = 'At-Risk Projects';
  } else if (type === 'dropped') {
    projects = projects.filter(p => p.status === 'dropped');
    title = 'Dropped Projects';
    showDropReason = true;
    showDelayReason = false;
  }

  document.getElementById('drillDownTitle').textContent = title;

  const head = document.getElementById('drillDownHead');
  head.innerHTML = `<tr>
    <th>Project Name</th><th>Status</th><th>Risk Level</th><th>Risk Reason</th>
    ${showDropReason ? '<th>Drop Reason</th>' : ''}
    ${showDelayReason ? '<th>Delay Reason</th>' : ''}
  </tr>`;

  const body = document.getElementById('drillDownBody');
  body.innerHTML = '';
  const colSpan = 4 + (showDropReason ? 1 : 0) + (showDelayReason ? 1 : 0);

  if (!projects.length) {
    body.innerHTML = `<tr><td colspan="${colSpan}" style="text-align:center;color:var(--text-muted);padding:24px">No projects found.</td></tr>`;
  } else {
    projects.forEach(p => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><span class="project-name">${p.name}</span></td>
        <td>${getStatusBadge(p.status)}</td>
        <td><span class="status-badge ${p.risk === 'high' ? 'critical' : p.risk === 'medium' ? 'at-risk' : 'on-track'}">${p.risk}</span></td>
        <td>${p.riskReason || '—'}</td>
        ${showDropReason ? `<td>${p.dropReason || '—'}</td>` : ''}
        ${showDelayReason ? `<td>${p.delayReason || '—'}</td>` : ''}
      `;
      body.appendChild(tr);
    });
  }

  openModal('drillDownModal');
}

window.openRiskDrillDown = openRiskDrillDown;

async function openDrillDown(type) {
  if (type === 'high-risk') openRiskDrillDown('at-risk');
}

window.openDrillDown = openDrillDown;

// ============================================================
// RISK MANAGEMENT
// ============================================================

async function loadRisk() {
  let data = await apiFetch(`/risk${buildFilterParams()}`);
  if (!data) {
    const projects = filterFallback(FALLBACK.projects);
    data = {
      total: projects.length,
      withRisk: projects.filter(p => p.risk !== 'low' || p.delayReason).length,
      withoutRisk: projects.filter(p => p.risk === 'low' && !p.delayReason).length,
      completed: projects.filter(p => p.status === 'closed').length,
      delayed: projects.filter(p => p.delayReason).length,
      atRisk: projects.filter(p => p.risk === 'high').length,
      dropped: projects.filter(p => p.status === 'dropped').length,
      riskProjects: projects
    };
  }

  // Stat cards
  const highCount = (data.riskProjects || []).filter(p => p.risk === 'high').length;
  const medCount = (data.riskProjects || []).filter(p => p.risk === 'medium').length;
  if (document.getElementById('riskCompleted')) document.getElementById('riskCompleted').textContent = data.completed;
  if (document.getElementById('riskDelayed')) document.getElementById('riskDelayed').textContent = data.delayed;
  if (document.getElementById('riskDropped')) document.getElementById('riskDropped').textContent = data.dropped || 0;
  if (document.getElementById('riskAtRisk')) document.getElementById('riskAtRisk').textContent = highCount;
  if (document.getElementById('riskMedium')) document.getElementById('riskMedium').textContent = medCount;
  if (document.getElementById('riskTotal')) document.getElementById('riskTotal').textContent = data.total;

  // Populate At Risk Projects table (always visible)
  const tbody = document.getElementById('riskProjectsBody');
  if (!tbody) return;

  const atRiskProjects = (data.riskProjects || []).filter(p => p.risk === 'high' || p.risk === 'medium');

  if (!atRiskProjects.length) {
    tbody.innerHTML = `<tr><td colspan="5" class="rm-empty">No at-risk projects found.</td></tr>`;
    return;
  }

  tbody.innerHTML = atRiskProjects.map(p => {
    const isHigh = p.risk === 'high';
    const impact = isHigh ? 'High' : 'Medium';
    const impactCls = isHigh ? 'rm-impact-high' : 'rm-impact-medium';
    const badgeCls = isHigh ? 'rm-status-badge critical' : 'rm-status-badge warning';
    const badgeLabel = isHigh ? 'Critical' : 'At Risk';
    const badgeIcon = isHigh ? 'fa-times-circle' : 'fa-exclamation-triangle';
    const teamName = p.teamName || p.teamId || '—';
    return `
      <tr class="${isHigh ? 'rm-row-critical' : ''}">
        <td><span class="rm-project-name"><i class="fas fa-folder-open"></i> ${p.name}</span></td>
        <td>${teamName}</td>
        <td>${p.riskReason || p.delayReason || '—'}</td>
        <td><span class="${impactCls}">${impact}</span></td>
        <td><span class="${badgeCls}"><i class="fas ${badgeIcon}"></i> ${badgeLabel}</span></td>
      </tr>
    `;
  }).join('');
}

// ============================================================
// TRAVEL COST
// ============================================================

async function loadTravelCost() {
  let data = await apiFetch(`/travel${buildFilterParams()}`);
  if (!data) {
    let teams = [...FALLBACK.travel.teams];
    // Filter by active team if set
    if (state.activeTeamId) {
      teams = teams.filter(t => t.teamId === state.activeTeamId || t.teamId.startsWith(state.activeTeamId));
    }
    const totalBudget = teams.length ? teams.reduce((s, t) => s + t.allocated, 0) : FALLBACK.travel.totalBudget;
    data = { totalBudget, teams };
  }

  // Compute totals
  const totalUtilized = data.teams.reduce((s, t) => s + (t.used || 0), 0);
  // Estimate "ongoing" as ~20% of remaining, "remaining" as what's left
  const totalAllocated = data.teams.reduce((s, t) => s + (t.allocated || 0), 0);
  const totalRemaining = totalAllocated - totalUtilized;
  const totalOngoing = Math.round(totalRemaining * 0.33);

  const el = (id) => document.getElementById(id);
  if (el('travelTotalBudget')) el('travelTotalBudget').textContent = fmtCurrency(totalAllocated);
  if (el('travelUtilized')) el('travelUtilized').textContent = fmtCurrency(totalUtilized);
  if (el('travelOngoing')) el('travelOngoing').textContent = fmtCurrency(totalOngoing);
  if (el('travelRemaining')) el('travelRemaining').textContent = fmtCurrency(totalRemaining - totalOngoing);

  const tbody = document.getElementById('travelTeamsBody');
  if (!tbody) return;

  if (!data.teams.length) {
    tbody.innerHTML = `<tr><td colspan="6" class="tc-empty">No travel data available.</td></tr>`;
    return;
  }

  tbody.innerHTML = data.teams.map(team => {
    const remaining = team.allocated - team.used;
    const ongoing = Math.round(remaining * 0.33);
    const actualRemaining = remaining - ongoing;
    const usedPct = (team.used / team.allocated) * 100;
    const isAtRisk = usedPct > 80;
    const statusCls = isAtRisk ? 'tc-status-risk' : 'tc-status-ok';
    const statusIcon = isAtRisk ? 'fa-exclamation-circle' : 'fa-check-circle';
    const statusLabel = isAtRisk ? 'At Risk' : 'On Track';
    return `
      <tr>
        <td><span class="tc-team-name"><i class="fas fa-layer-group"></i> ${team.teamName}</span></td>
        <td>${fmtCurrency(team.allocated)}</td>
        <td>${fmtCurrency(team.used)}</td>
        <td>${fmtCurrency(ongoing)}</td>
        <td class="tc-remaining-col" style="color:${actualRemaining < 2000 ? '#ef4444' : '#10b981'};font-weight:700">${fmtCurrency(actualRemaining)}</td>
        <td><span class="${statusCls}"><i class="fas ${statusIcon}"></i> ${statusLabel}</span></td>
      </tr>
    `;
  }).join('');
}

// ============================================================
// HQ PL SCORE
// ============================================================

async function loadHQPLScore() {
  let data = await apiFetch(`/hqpl${buildFilterParams()}`);
  if (!data) {
    // Per-team HQPL scores
    const teamScores = {
      'team-alpha': { sribScore: 0.85, teamScore: 0.83, trend: [0.72, 0.75, 0.78, 0.80, 0.82, 0.85, 0.85] },
      'team-alpha-ai': { sribScore: 0.88, teamScore: 0.86, trend: [0.75, 0.78, 0.81, 0.83, 0.85, 0.87, 0.88] },
      'team-alpha-ai-nlp': { sribScore: 0.90, teamScore: 0.87, trend: [0.76, 0.79, 0.82, 0.84, 0.86, 0.88, 0.90] },
      'team-alpha-ai-cv': { sribScore: 0.86, teamScore: 0.85, trend: [0.74, 0.77, 0.80, 0.82, 0.83, 0.85, 0.86] },
      'team-alpha-data': { sribScore: 0.82, teamScore: 0.80, trend: [0.70, 0.73, 0.76, 0.78, 0.79, 0.81, 0.82] },
      'team-alpha-data-pipeline': { sribScore: 0.80, teamScore: 0.79, trend: [0.68, 0.71, 0.74, 0.76, 0.77, 0.79, 0.80] },
      'team-alpha-data-viz': { sribScore: 0.83, teamScore: 0.81, trend: [0.71, 0.74, 0.77, 0.79, 0.80, 0.82, 0.83] },
      'team-beta': { sribScore: 0.79, teamScore: 0.77, trend: [0.66, 0.68, 0.71, 0.73, 0.75, 0.77, 0.79] },
      'team-beta-cloud': { sribScore: 0.81, teamScore: 0.79, trend: [0.68, 0.70, 0.73, 0.75, 0.77, 0.79, 0.81] },
      'team-beta-cloud-aws': { sribScore: 0.78, teamScore: 0.76, trend: [0.65, 0.67, 0.70, 0.72, 0.74, 0.76, 0.78] },
      'team-beta-cloud-azure': { sribScore: 0.80, teamScore: 0.78, trend: [0.67, 0.69, 0.72, 0.74, 0.76, 0.78, 0.80] },
      'team-beta-security': { sribScore: 0.75, teamScore: 0.72, trend: [0.62, 0.64, 0.67, 0.69, 0.70, 0.72, 0.75] },
      'team-beta-sec-pentest': { sribScore: 0.76, teamScore: 0.74, trend: [0.63, 0.65, 0.68, 0.70, 0.71, 0.73, 0.76] },
      'team-beta-sec-audit': { sribScore: 0.77, teamScore: 0.75, trend: [0.64, 0.66, 0.69, 0.71, 0.72, 0.74, 0.77] },
      'team-gamma': { sribScore: 0.87, teamScore: 0.85, trend: [0.74, 0.77, 0.80, 0.82, 0.83, 0.85, 0.87] },
      'team-gamma-mobile': { sribScore: 0.86, teamScore: 0.84, trend: [0.73, 0.76, 0.79, 0.81, 0.82, 0.84, 0.86] },
      'team-gamma-mobile-ios': { sribScore: 0.89, teamScore: 0.87, trend: [0.76, 0.79, 0.82, 0.84, 0.85, 0.87, 0.89] },
      'team-gamma-mobile-android': { sribScore: 0.84, teamScore: 0.82, trend: [0.71, 0.74, 0.77, 0.79, 0.80, 0.82, 0.84] },
      'team-gamma-web': { sribScore: 0.88, teamScore: 0.86, trend: [0.75, 0.78, 0.81, 0.83, 0.84, 0.86, 0.88] },
      'team-gamma-web-react': { sribScore: 0.90, teamScore: 0.88, trend: [0.77, 0.80, 0.83, 0.85, 0.86, 0.88, 0.90] },
      'team-gamma-web-ux': { sribScore: 0.86, teamScore: 0.85, trend: [0.73, 0.76, 0.79, 0.81, 0.82, 0.84, 0.86] }
    };
    data = (state.activeTeamId && teamScores[state.activeTeamId])
      ? teamScores[state.activeTeamId]
      : { ...FALLBACK.hqpl };
  }

  const sribPct = Math.round(data.sribScore * 100);
  const teamPct = Math.round(data.teamScore * 100);

  document.getElementById('sribScoreVal').textContent = `${sribPct}%`;
  document.getElementById('teamScoreVal').textContent = `${teamPct}%`;

  // Rebuild score charts
  destroyChart('sribScoreChart');
  destroyChart('teamScoreChart');
  destroyChart('hqTrendChart');

  const makeGauge = (id, pct, color) => {
    const ctx = document.getElementById(id);
    if (!ctx) return;
    state.charts[id] = new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [pct, 100 - pct],
          backgroundColor: [color, '#e2e8f0'],
          borderWidth: 0,
          cutout: '80%',
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        animation: { animateScale: true, animateRotate: true }
      }
    });
  };

  makeGauge('sribScoreChart', sribPct, '#6366f1');
  makeGauge('teamScoreChart', teamPct, '#8b5cf6');

  // Trend sparkline
  if (data.trend) {
    const trendCtx = document.getElementById('hqTrendChart');
    if (trendCtx) {
      state.charts['hqTrendChart'] = new Chart(trendCtx, {
        type: 'line',
        data: {
          labels: data.trend.map((_, i) => `M${i + 1}`),
          datasets: [{
            data: data.trend.map(v => Math.round(v * 100)),
            borderColor: '#6366f1',
            backgroundColor: 'rgba(99,102,241,0.08)',
            borderWidth: 2,
            pointRadius: 3,
            tension: 0.4,
            fill: true,
          }]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { display: false },
            y: { display: false }
          }
        }
      });
    }
  }
}

// ============================================================
// KPI MANAGEMENT
// ============================================================

async function loadKPIs() {
  let data = await apiFetch('/kpis');
  if (!data) data = [...FALLBACK.kpis];
  renderKPITable(data);
}

function renderKPITable(kpis) {
  const body = document.getElementById('kpiTableBody');
  body.innerHTML = '';

  kpis.forEach(kpi => {
    const tr = document.createElement('tr');
    const trendClass = kpi.trendDir === 'up' ? 'up' : kpi.trendDir === 'down' ? 'down' : 'neutral';
    const trendIcon = kpi.trendDir === 'up' ? 'fa-arrow-up' : kpi.trendDir === 'down' ? 'fa-arrow-down' : 'fa-minus';

    tr.innerHTML = `
      <td><span class="project-name"><i class="fas ${kpi.icon || 'fa-chart-line'}"></i> ${kpi.name}</span></td>
      <td>${kpi.currentValue}</td>
      <td>${kpi.target}</td>
      <td class="${kpi.currentValue < kpi.target ? 'calculated-negative' : 'calculated-positive'}">
        ${computeVariance(kpi.currentValue, kpi.target)}
      </td>
      <td><span class="trend-indicator ${trendClass}"><i class="fas ${trendIcon}"></i> ${kpi.trend}</span></td>
      <td>${getStatusBadge(kpi.status)}</td>
      <td>
        <button class="btn-icon" title="Delete KPI" onclick="deleteKpi('${kpi.id}')">
          <i class="fas fa-trash-alt"></i>
        </button>
      </td>
    `;
    body.appendChild(tr);
  });
}

function computeVariance(current, target) {
  const cNum = parseFloat(current);
  const tNum = parseFloat(target);
  if (isNaN(cNum) || isNaN(tNum)) return '—';
  const diff = cNum - tNum;
  return `${diff >= 0 ? '+' : ''}${diff.toFixed(1)}`;
}

async function deleteKpi(id) {
  if (!confirm('Delete this KPI?')) return;
  const res = await apiDelete(`/kpis/${id}`);
  if (res && res.success) {
    showToast('KPI deleted.', 'success');
    loadKPIs();
  } else {
    showToast('Failed to delete KPI.', 'error');
  }
}

window.deleteKpi = deleteKpi;

async function submitNewKpi() {
  const name = document.getElementById('kpiName').value.trim();
  const currentValue = document.getElementById('kpiCurrentValue').value.trim();
  const target = document.getElementById('kpiTarget').value.trim();
  const status = document.getElementById('kpiStatus').value;

  if (!name || !currentValue || !target) {
    showToast('Please fill all KPI fields.', 'error');
    return;
  }

  const result = await apiPost('/kpis', { name, currentValue, target, status, trend: '0%', trendDir: 'neutral' });
  if (result) {
    showToast(`KPI "${name}" added!`, 'success');
    closeModal('addKpiModal');
    document.getElementById('kpiName').value = '';
    document.getElementById('kpiCurrentValue').value = '';
    document.getElementById('kpiTarget').value = '';
    loadKPIs();
  } else {
    showToast('Failed to add KPI.', 'error');
  }
}

window.submitNewKpi = submitNewKpi;

// ============================================================
// SKILL MATRIX (20×6) — Row-click edit mode
// ============================================================

async function loadSkillMatrix() {
  let data = await apiFetch('/skills');
  if (!data) data = [...FALLBACK.skills];
  renderSkillMatrix(data);
}

function renderSkillMatrix(skills) {
  const body = document.getElementById('skillMatrixBody');
  body.innerHTML = '';
  const cols = ['expert', 'innovator', 'advanced', 'intermediate', 'beginner'];

  skills.forEach(skill => {
    const total = cols.reduce((s, c) => s + (parseInt(skill[c]) || 0), 0);
    const tr = document.createElement('tr');
    tr.dataset.skillId = skill.id;
    tr.setAttribute('data-skill-id', skill.id);

    // Store original values for cancel
    tr.dataset.original = JSON.stringify(skill);

    let cells = `<td><span class="project-name">${skill.name}</span></td>`;
    cols.forEach(col => {
      cells += `
        <td>
          <input type="number" class="skill-editable"
            data-skill="${skill.id}" data-col="${col}"
            value="${skill[col] || 0}" min="0"
            onchange="onSkillChange(this)">
        </td>`;
    });

    // Total cell + row action buttons
    cells += `
      <td class="calculated skill-total" id="total-${skill.id}">
        <span class="total-display">${total}</span>
        <span class="row-edit-actions">
          <button class="row-save-btn" onclick="saveSkillRow(event, '${skill.id}')">
            <i class="fas fa-check"></i> Save
          </button>
          <button class="row-cancel-btn" onclick="cancelSkillRow(event, '${skill.id}')">
            Cancel
          </button>
        </span>
      </td>`;

    tr.innerHTML = cells;

    // Click anywhere on row to enter edit mode
    tr.addEventListener('click', function (e) {
      // Don't trigger if clicking buttons or inputs inside an already-editing row
      if (e.target.closest('.row-save-btn') || e.target.closest('.row-cancel-btn')) return;
      if (this.classList.contains('row-editing')) return;
      enterRowEditMode(this);
    });

    body.appendChild(tr);
  });
}

function enterRowEditMode(tr) {
  // Cancel any other open edit row first
  document.querySelectorAll('#skillMatrixTable tbody tr.row-editing').forEach(r => {
    if (r !== tr) cancelSkillRow(null, r.dataset.skillId);
  });

  tr.classList.add('row-editing');

  // Focus first input
  const firstInput = tr.querySelector('.skill-editable');
  if (firstInput) {
    setTimeout(() => firstInput.focus(), 0);
  }
}

function cancelSkillRow(e, skillId) {
  if (e) e.stopPropagation();
  const tr = document.querySelector(`tr[data-skill-id="${skillId}"]`) ||
    document.querySelector(`tr[data-skill-id]`) ||
    [...document.querySelectorAll('#skillMatrixTable tbody tr')]
      .find(r => r.dataset.skillId === skillId);

  if (!tr) return;

  // Restore original values
  const original = JSON.parse(tr.dataset.original || '{}');
  const cols = ['expert', 'innovator', 'advanced', 'intermediate', 'beginner'];
  cols.forEach(col => {
    const input = tr.querySelector(`[data-col="${col}"]`);
    if (input) input.value = original[col] || 0;
  });

  // Restore total
  const total = cols.reduce((s, c) => s + (parseInt(original[c]) || 0), 0);
  const totalSpan = tr.querySelector('.total-display');
  if (totalSpan) totalSpan.textContent = total;

  // Remove change tracking
  delete state.skillChanges[skillId];

  tr.classList.remove('row-editing');
}

window.cancelSkillRow = cancelSkillRow;

async function saveSkillRow(e, skillId) {
  if (e) e.stopPropagation();

  const tr = [...document.querySelectorAll('#skillMatrixTable tbody tr')]
    .find(r => r.dataset.skillId === skillId);

  if (!tr || !state.skillChanges[skillId]) {
    // No changes — just exit edit mode
    if (tr) tr.classList.remove('row-editing');
    return;
  }

  const res = await apiPut(`/skills/${skillId}`, state.skillChanges[skillId]);
  if (res) {
    // Update stored original to new saved values
    const original = JSON.parse(tr.dataset.original || '{}');
    tr.dataset.original = JSON.stringify({ ...original, ...state.skillChanges[skillId] });
    delete state.skillChanges[skillId];
    tr.classList.remove('row-editing');
    showToast('Skill row saved!', 'success');
  } else {
    showToast('Failed to save. Try again.', 'error');
  }
}

window.saveSkillRow = saveSkillRow;

function onSkillChange(input) {
  const id = input.dataset.skill;
  const col = input.dataset.col;
  if (!state.skillChanges[id]) state.skillChanges[id] = {};
  state.skillChanges[id][col] = parseInt(input.value) || 0;

  // Recalculate row total live
  const cols = ['expert', 'innovator', 'advanced', 'intermediate', 'beginner'];
  const row = input.closest('tr');
  let total = 0;
  cols.forEach(c => {
    const inp = row.querySelector(`[data-col="${c}"]`);
    total += parseInt(inp?.value) || 0;
  });
  const totalSpan = row.querySelector('.total-display');
  if (totalSpan) totalSpan.textContent = total;
}

window.onSkillChange = onSkillChange;

// ============================================================
// MILESTONES
// ============================================================

async function loadMilestones() {
  let data = await apiFetch('/milestones');
  if (!data) data = [...FALLBACK.milestones];

  const body = document.getElementById('milestonesBody');
  body.innerHTML = '';

  const iconMap = {
    Planned: 'fa-calendar-check', Completed: 'fa-trophy',
    Delayed: 'fa-exclamation-triangle', Upcoming: 'fa-clock'
  };
  const statusMap = {
    Planned: 'on-track', Completed: 'on-track',
    Delayed: 'critical', Upcoming: 'at-risk'
  };

  data.forEach(row => {
    const pct = row.target > 0 ? Math.round((row.count / row.target) * 100) : '—';
    const pctClass = typeof pct === 'number' ? (pct >= 100 ? 'calculated-positive' : pct >= 80 ? 'calculated-neutral' : 'calculated-negative') : 'calculated-neutral';
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><span class="project-name"><i class="fas ${iconMap[row.status] || 'fa-circle'}"></i> ${row.status}</span></td>
      <td>${row.count}</td>
      <td>${row.target}</td>
      <td class="${pctClass}">${typeof pct === 'number' ? pct + '%' : pct}</td>
      <td><span class="status-badge ${statusMap[row.status] || 'on-track'}"><i class="fas fa-check"></i> ${row.label}</span></td>
    `;
    body.appendChild(tr);
  });
}

// ============================================================
// RESOURCE MANAGEMENT
// ============================================================

async function loadResourceMonths() {
  let months = await apiFetch('/resources/months');
  if (!months) months = [...FALLBACK.months];

  const sel = document.getElementById('monthSelector');
  sel.innerHTML = '';
  months.forEach(m => {
    const opt = document.createElement('option');
    opt.value = m.month;
    opt.textContent = m.label;
    sel.appendChild(opt);
  });

  // Always default to December 2023 as the fixed starting month
  const defaultMonth = '2023-12';
  const hasDefault = months.some(m => m.month === defaultMonth);
  if (hasDefault) {
    sel.value = defaultMonth;
    state.currentMonth = defaultMonth;
  } else if (months.length > 0) {
    sel.value = months[0].month;
    state.currentMonth = months[0].month;
  }
  loadResources();
}

async function loadResources() {
  const month = state.currentMonth || '2023-12';
  const fp = buildFilterParams();
  const sep = fp ? '&' : '?';
  let data = await apiFetch(`/resources${fp}${sep}month=${month}`);

  if (!data) {
    // Use per-month fallback data
    const monthData = FALLBACK.resourcesByMonth[month] || FALLBACK.resourcesByMonth['2023-12'];
    let projects = [...monthData.projects];

    // Filter by team if active
    if (state.activeTeamId) {
      projects = projects.filter(p => p.teamId && (p.teamId === state.activeTeamId || p.teamId.startsWith(state.activeTeamId)));
    }
    data = { month, label: monthData.label, projects };
  }

  state.resourceData = data.projects;
  document.getElementById('resourceMonthLabel').textContent =
    `Showing resource plan for: ${data.label || month}`;

  renderResourceTable();
}

function renderResourceTable() {
  const body = document.getElementById('resourceTableBody');
  body.innerHTML = '';

  const start = (state.resourcePage - 1) * state.resourcePageSize;
  const pageData = state.resourceData.slice(start, start + state.resourcePageSize);

  pageData.forEach((row, index) => {
    const currentMinusActual = row.currentPlan - row.actual;
    const currentMinusPrevMonth = row.currentPlan - row.previousMonthPlan;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="project-name">${row.projectName}</td>
      <td>${row.currentPlan}</td>
      <td>${row.previousMonthPlan}</td>
      <td>${row.actual}</td>
      <td class="${getValueClass(currentMinusActual, true)}">${formatDifference(currentMinusActual)}</td>
      <td class="${getValueClass(currentMinusPrevMonth, false)}">${formatDifference(currentMinusPrevMonth)}</td>
      <td>${getStatusBadge(row.status)}</td>
    `;
    tr.style.opacity = '0';
    tr.style.transform = 'translateY(20px)';
    setTimeout(() => {
      tr.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      tr.style.opacity = '1';
      tr.style.transform = 'translateY(0)';
    }, index * 80);

    body.appendChild(tr);
  });

  document.getElementById('showingCount').textContent = pageData.length;
  document.getElementById('totalCount').textContent = state.resourceData.length;
  document.getElementById('currentPage').textContent = state.resourcePage;
  document.getElementById('prevPage').disabled = state.resourcePage <= 1;
  document.getElementById('nextPage').disabled = start + state.resourcePageSize >= state.resourceData.length;
}

document.getElementById('monthSelector').addEventListener('change', function () {
  state.currentMonth = this.value;
  state.resourcePage = 1;
  loadResources();
});

document.getElementById('prevPage').addEventListener('click', () => {
  if (state.resourcePage > 1) {
    state.resourcePage--;
    renderResourceTable();
  }
});

document.getElementById('nextPage').addEventListener('click', () => {
  const total = state.resourceData.length;
  if (state.resourcePage * state.resourcePageSize < total) {
    state.resourcePage++;
    renderResourceTable();
  }
});

document.getElementById('exportResourceBtn').addEventListener('click', () => {
  if (!state.resourceData.length) {
    showToast('No data to export.', 'error');
    return;
  }
  const headers = ['Project Name', 'Current Plan', 'Prev Month Plan', 'Actual', 'Curr-Actual', 'Curr-Prev', 'Status'];
  const rows = state.resourceData.map(r => [
    r.projectName, r.currentPlan, r.previousMonthPlan, r.actual,
    r.currentPlan - r.actual, r.currentPlan - r.previousMonthPlan, r.status
  ]);
  const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `resources_${state.currentMonth || 'export'}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('CSV exported!', 'success');
});

// ============================================================
// ACTIVITY FEED
// ============================================================

async function loadActivity() {
  let data = await apiFetch('/activity');
  if (!data) data = [...FALLBACK.activity];

  const list = document.getElementById('activityList');
  list.innerHTML = '';

  data.forEach(item => {
    list.innerHTML += `
      <div class="activity-item">
        <div class="activity-icon"><i class="fas ${item.icon}"></i></div>
        <div class="activity-content">
          <p>${item.message}</p>
          <span class="activity-time">${item.time}</span>
        </div>
      </div>
    `;
  });
}

// ============================================================
// BUTTON WIRING
// ============================================================

document.getElementById('addKpiBtn').addEventListener('click', () => openModal('addKpiModal'));
document.getElementById('saveSkillMatrixBtn').addEventListener('click', () => {
  showToast('Click any row to edit it, then Save or Cancel on that row.', 'info');
});
document.getElementById('refreshKpiBtn').addEventListener('click', () => { loadKPIs(); showToast('KPIs refreshed.', 'info'); });
document.getElementById('newProjectBtn')?.addEventListener('click', () => openModal('newProjectModal'));

document.getElementById('filterProjectsBtn')?.addEventListener('click', () => {
  showToast('Use the filter bar at the top to filter projects by team.', 'info');
});

document.getElementById('viewTimelineBtn').addEventListener('click', () => {
  showToast('Timeline view coming soon!', 'info');
});

document.getElementById('addResourceBtn').addEventListener('click', () => {
  showToast('Add Resource: Coming soon.', 'info');
});

document.getElementById('generateReportBtn').addEventListener('click', () => {
  showToast('Generating report... (feature coming soon)', 'info');
});
document.getElementById('scheduleMeetingBtn').addEventListener('click', () => {
  showToast('Meeting scheduler: Coming soon.', 'info');
});
document.getElementById('assignResourceBtn').addEventListener('click', () => {
  showToast('Resource assignment: Coming soon.', 'info');
});
document.getElementById('reviewStatusBtn').addEventListener('click', () => {
  showToast('Opening status review...', 'info');
  openStatusDrillDown('initiated');
});

document.getElementById('notificationBell').addEventListener('click', () => {
  showToast('3 pending notifications', 'info');
});

// Pill selectors for new project modal
function selectNpmStatus(btn) {
  document.querySelectorAll('#npmStatusPills .npm-pill').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('newProjStatus').value = btn.dataset.val;
}
function selectNpmRisk(btn) {
  document.querySelectorAll('#npmRiskPills .npm-risk-pill').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('newProjRisk').value = btn.dataset.val;
}
window.selectNpmStatus = selectNpmStatus;
window.selectNpmRisk = selectNpmRisk;

async function submitNewProject() {
  const name = document.getElementById('newProjName').value.trim();
  const status = document.getElementById('newProjStatus').value || 'initiated';
  const budget = parseInt(document.getElementById('newProjBudget').value) || 0;
  const risk = document.getElementById('newProjRisk').value || 'low';
  const teamId = document.getElementById('newProjTeam')?.value || state.activeTeamId || 'team-alpha';
  const desc = document.getElementById('newProjDesc')?.value?.trim() || '';

  if (!name) {
    showToast('Project name is required.', 'error');
    return;
  }

  const saveBtn = document.querySelector('.npm-btn-save');
  if (saveBtn) { saveBtn.disabled = true; saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating...'; }

  const result = await apiPost('/projects', { name, status, budget, spent: 0, risk, teamId, description: desc });

  if (saveBtn) { saveBtn.disabled = false; saveBtn.innerHTML = '<i class="fas fa-check"></i> Create Project'; }

  if (result) {
    showToast('Project "' + name + '" created successfully!', 'success');
    closeModal('newProjectModal');
    // Reset form
    ['newProjName', 'newProjBudget', 'newProjDesc', 'newProjId', 'newProjStart', 'newProjEnd'].forEach(id => {
      const el = document.getElementById(id); if (el) el.value = '';
    });
    document.getElementById('newProjTeam').value = '';
    // Reset pills to defaults
    document.querySelectorAll('#npmStatusPills .npm-pill').forEach(b => b.classList.remove('active'));
    document.querySelector('#npmStatusPills .npm-pill[data-val="initiated"]')?.classList.add('active');
    document.getElementById('newProjStatus').value = 'initiated';
    document.querySelectorAll('#npmRiskPills .npm-risk-pill').forEach(b => b.classList.remove('active'));
    document.querySelector('#npmRiskPills .npm-risk-pill[data-val="low"]')?.classList.add('active');
    document.getElementById('newProjRisk').value = 'low';
    loadSummary();
  } else {
    showToast('Failed to create project. Check the server connection.', 'error');
  }
}

window.submitNewProject = submitNewProject;

// ============================================================
// SEARCH
// ============================================================

document.getElementById('globalSearch').addEventListener('input', function (e) {
  const term = e.target.value.toLowerCase().trim();
  const rows = document.querySelectorAll('#resourceTableBody tr');
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = term === '' || text.includes(term) ? '' : 'none';
  });
  const visible = [...rows].filter(r => r.style.display !== 'none');
  document.getElementById('showingCount').textContent = visible.length;
});

// ============================================================
// SIDEBAR NAVIGATION — Scroll-to + Scroll Spy
// ============================================================

const NAV_SECTIONS = [
  'summarySection',
  'projectStatusSection',
  'riskSection',
  'travelSection',
  'skillSection',
  'kpiSection',
  'resourceSection',
];

function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId);
  if (!el) return;
  // Use el.getBoundingClientRect for accurate position relative to viewport
  const rect = el.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const targetY = rect.top + scrollTop - 80; // 80px offset for sticky header
  window.scrollTo({ top: targetY, behavior: 'smooth' });
}

function setActiveNavItem(sectionId) {
  document.querySelectorAll('.nav-item[data-scroll]').forEach(item => {
    item.classList.toggle('active', item.dataset.scroll === sectionId);
  });
}

// Wire up nav clicks
document.querySelectorAll('.nav-item[data-scroll]').forEach(item => {
  item.addEventListener('click', function (e) {
    e.preventDefault();
    const target = this.dataset.scroll;
    scrollToSection(target);
    setActiveNavItem(target);
  });
});

// Scroll spy — throttled with requestAnimationFrame for zero jank
function initScrollSpy() {
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        let currentSection = NAV_SECTIONS[0];

        for (const id of NAV_SECTIONS) {
          const el = document.getElementById(id);
          if (el && el.offsetTop - 120 <= scrollTop) {
            currentSection = id;
          }
        }

        setActiveNavItem(currentSection);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

// Close modal on overlay click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', function (e) {
    if (e.target === this) this.style.display = 'none';
  });
});

// ============================================================
// REFRESH ALL SECTIONS
// ============================================================

function refreshAllSections() {
  loadSummary();
  loadRisk();
  loadTravelCost();
  loadHQPLScore();
  loadResources();
}

// ============================================================
// INIT
// ============================================================

async function init() {
  // Init cascading filter dropdowns
  initFilterDropdowns();

  // Then load all sections
  await Promise.all([
    loadSummary(),
    loadRisk(),
    loadTravelCost(),
    loadHQPLScore(),
    loadKPIs(),
    loadSkillMatrix(),
    loadMilestones(),
    loadActivity(),
    loadResourceMonths(),
  ]);

  // Scroll animations
  initScrollAnimations();
  initScrollSpy();
}

function initScrollAnimations() {
  // Use requestAnimationFrame to batch DOM reads/writes and avoid layout thrashing
  const cards = document.querySelectorAll('.pso-card, .pso-wrapper, .summary-card');

  // Set initial hidden state all at once (single reflow)
  cards.forEach(card => {
    card.style.cssText += 'opacity:0;transform:translateY(24px) translateZ(0);transition:opacity 0.35s ease,transform 0.35s ease;';
  });

  // Single IntersectionObserver for all cards — much cheaper than per-element observers
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = i * 60; // shorter stagger = snappier feel
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0) translateZ(0)';
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' }); // lower threshold = triggers earlier

  cards.forEach(card => observer.observe(card));
}

document.addEventListener('DOMContentLoaded', init);