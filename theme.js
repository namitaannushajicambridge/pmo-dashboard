// ===== Team Color Identity System =====

// Team theme configuration
const teamThemes = {
    ALPHA: {
        name: 'Team Alpha',
        primary: '#2563eb',
        primaryLight: '#60a5fa',
        primaryDark: '#1d4ed8',
        secondary: '#93c5fd',
        accent: '#1e40af',
        icon: 'fa-rocket',
        pattern: 'pattern-alpha',
        gradient: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
        glowRgb: '37, 99, 235',
        brandBlue: '#2563eb',
        brandPurple: '#60a5fa',
        brandTeal: '#93c5fd'
    },
    BETA: {
        name: 'Team Beta',
        primary: '#7c3aed',
        primaryLight: '#a78bfa',
        primaryDark: '#5b21b6',
        secondary: '#c4b5fd',
        accent: '#6d28d9',
        icon: 'fa-shield-alt',
        pattern: 'pattern-beta',
        gradient: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
        glowRgb: '124, 58, 237',
        brandBlue: '#7c3aed',
        brandPurple: '#a78bfa',
        brandTeal: '#c4b5fd'
    },
    GAMMA: {
        name: 'Team Gamma',
        primary: '#059669',
        primaryLight: '#34d399',
        primaryDark: '#047857',
        secondary: '#a7f3d0',
        accent: '#065f46',
        icon: 'fa-leaf',
        pattern: 'pattern-gamma',
        gradient: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
        glowRgb: '5, 150, 105',
        brandBlue: '#059669',
        brandPurple: '#34d399',
        brandTeal: '#a7f3d0'
    },
    DELTA: {
        name: 'Team Delta',
        primary: '#ea580c',
        primaryLight: '#fb923c',
        primaryDark: '#c2410c',
        secondary: '#fed7aa',
        accent: '#9a3412',
        icon: 'fa-fire',
        pattern: 'pattern-delta',
        gradient: 'linear-gradient(135deg, #ea580c 0%, #f97316 100%)',
        glowRgb: '234, 88, 12',
        brandBlue: '#ea580c',
        brandPurple: '#fb923c',
        brandTeal: '#fed7aa'
    },
    EXEC: {
        name: 'Executive View',
        primary: '#1e293b',
        primaryLight: '#475569',
        primaryDark: '#0f172a',
        secondary: '#cbd5e1',
        accent: '#334155',
        icon: 'fa-crown',
        pattern: '',
        gradient: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #059669 75%, #ea580c 100%)',
        glowRgb: '30, 41, 59',
        brandBlue: '#2563eb',
        brandPurple: '#7c3aed',
        brandTeal: '#059669'
    }
};

// Default theme values (to restore when clearing)
const defaultTheme = {
    primary: '#6366f1',
    primaryLight: '#818cf8',
    primaryDark: '#4338ca',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    glowRgb: '99, 102, 241',
    brandBlue: '#3b82f6',
    brandPurple: '#8b5cf6',
    brandTeal: '#14b8a6'
};

let currentTheme = null;

// Apply theme to the entire dashboard
function applyTheme(themeKey) {
    const root = document.documentElement;
    const container = document.querySelector('.dashboard-container');
    const sidebar = document.querySelector('.sidebar');
    const sidebarIcon = document.getElementById('sidebarIcon');
    const teamBadge = document.getElementById('teamNameBadge');
    const indicator = document.getElementById('teamIndicator');

    // Add transition class for smooth theme change
    document.body.classList.add('theme-transitioning');

    // Clear old pattern classes
    container.classList.remove('has-pattern', 'pattern-alpha', 'pattern-beta', 'pattern-gamma', 'pattern-delta');
    sidebar.classList.remove('themed', 'exec-mode');

    if (!themeKey || !teamThemes[themeKey]) {
        // Reset to default
        resetTheme(root, container, sidebar, sidebarIcon, teamBadge, indicator);
        currentTheme = null;
    } else {
        const theme = teamThemes[themeKey];
        currentTheme = themeKey;

        // Set CSS variables
        root.style.setProperty('--primary-main', theme.primary);
        root.style.setProperty('--primary-light', theme.primaryLight);
        root.style.setProperty('--primary-dark', theme.primaryDark);
        root.style.setProperty('--gradient-primary', theme.gradient);
        root.style.setProperty('--gradient-glow', `linear-gradient(135deg, rgba(${theme.glowRgb}, 0.1) 0%, rgba(${theme.glowRgb}, 0.05) 100%)`);
        root.style.setProperty('--brand-blue', theme.brandBlue);
        root.style.setProperty('--brand-purple', theme.brandPurple);
        root.style.setProperty('--brand-teal', theme.brandTeal);

        // Update sidebar
        sidebar.classList.add('themed');
        if (themeKey === 'EXEC') {
            sidebar.classList.add('exec-mode');
        }

        // Update sidebar icon
        sidebarIcon.className = `fas ${theme.icon}`;

        // Update team badge
        teamBadge.textContent = theme.name;
        teamBadge.classList.add('visible');

        // Update team indicator
        indicator.style.backgroundColor = theme.primary;
        indicator.classList.add('active');

        // Apply background pattern
        if (theme.pattern) {
            container.classList.add('has-pattern', theme.pattern);
        }

        // Update dynamic inline elements
        updateInlineThemeElements(theme);
    }

    // Filter data by team
    filterDataByTeam(themeKey);

    // Remove transition class after animation completes
    setTimeout(() => {
        document.body.classList.remove('theme-transitioning');
    }, 600);
}

// Reset theme to defaults
function resetTheme(root, container, sidebar, sidebarIcon, teamBadge, indicator) {
    root.style.setProperty('--primary-main', defaultTheme.primary);
    root.style.setProperty('--primary-light', defaultTheme.primaryLight);
    root.style.setProperty('--primary-dark', defaultTheme.primaryDark);
    root.style.setProperty('--gradient-primary', defaultTheme.gradient);
    root.style.setProperty('--gradient-glow', `linear-gradient(135deg, rgba(${defaultTheme.glowRgb}, 0.1) 0%, rgba(${defaultTheme.glowRgb}, 0.05) 100%)`);
    root.style.setProperty('--brand-blue', defaultTheme.brandBlue);
    root.style.setProperty('--brand-purple', defaultTheme.brandPurple);
    root.style.setProperty('--brand-teal', defaultTheme.brandTeal);

    // Reset sidebar icon
    sidebarIcon.className = 'fas fa-chart-line';

    // Hide team badge
    teamBadge.classList.remove('visible');
    teamBadge.textContent = '';

    // Hide indicator
    indicator.classList.remove('active');
    indicator.style.backgroundColor = '';
}

// Update elements with inline styles that reference theme colors
function updateInlineThemeElements(theme) {
    // Update section header icons background
    document.querySelectorAll('.section-header h2 i').forEach(icon => {
        icon.style.color = theme.primary;
        icon.style.background = `rgba(${theme.glowRgb}, 0.1)`;
    });

    // Update project names color in tables
    document.querySelectorAll('.resource-table .project-name').forEach(name => {
        name.style.color = theme.primary;
    });

    // Update avatar gradient
    const avatar = document.querySelector('.avatar');
    if (avatar) {
        avatar.style.background = theme.gradient;
    }

    // Update logo icon gradient
    const logoIcon = document.querySelector('.logo-icon');
    if (logoIcon) {
        logoIcon.style.background = theme.gradient;
    }

    // Update active nav item
    document.querySelectorAll('.nav-item.active').forEach(item => {
        item.style.background = `linear-gradient(90deg, rgba(${theme.glowRgb}, 0.1), transparent)`;
        item.style.color = theme.primary;
        item.style.borderLeftColor = theme.primary;
    });

    // Update support button
    const supportBtn = document.querySelector('.support-btn');
    if (supportBtn) {
        supportBtn.style.background = theme.gradient;
    }
}

// Initialize team code input listener
function initializeThemeSystem() {
    const input = document.getElementById('teamCodeInput');
    if (!input) return;

    let debounceTimer;

    input.addEventListener('input', function (e) {
        clearTimeout(debounceTimer);
        const code = e.target.value.trim().toUpperCase();

        debounceTimer = setTimeout(() => {
            if (teamThemes[code]) {
                applyTheme(code);
                // Brief flash effect on the input
                input.parentElement.style.borderColor = teamThemes[code].primary;
                input.parentElement.style.boxShadow = `0 0 0 4px rgba(${teamThemes[code].glowRgb}, 0.2)`;
            } else if (code === '') {
                applyTheme(null);
                input.parentElement.style.borderColor = '';
                input.parentElement.style.boxShadow = '';
            }
        }, 300);
    });

    // Also handle Enter key
    input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            clearTimeout(debounceTimer);
            const code = e.target.value.trim().toUpperCase();
            if (teamThemes[code]) {
                applyTheme(code);
            }
        }
    });

    // Handle clear (Escape key)
    input.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            e.target.value = '';
            applyTheme(null);
            e.target.parentElement.style.borderColor = '';
            e.target.parentElement.style.boxShadow = '';
        }
    });
}

// Hook into DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
    initializeThemeSystem();
});

// ===== Team-Based Data Filtering =====
// When a team code is entered, show only that team's data
// EXEC and empty code show all data

function filterDataByTeam(teamCode) {
    const isFiltered = teamCode && teamCode !== 'EXEC' && teamThemes[teamCode];

    // Filter all table rows with data-team attribute
    document.querySelectorAll('[data-team]').forEach(row => {
        if (!isFiltered) {
            row.style.display = '';
        } else {
            row.style.display = row.getAttribute('data-team') === teamCode ? '' : 'none';
        }
    });

    // Filter travel cost team table rows by matching team name
    const teamNameMap = {
        'ALPHA': 'Team Alpha',
        'BETA': 'Team Beta',
        'GAMMA': 'Team Gamma',
        'DELTA': 'Team Delta'
    };

    // Travel cost table rows (no data-team attr, match by text content)
    document.querySelectorAll('.resource-table tbody tr').forEach(row => {
        // Skip rows that already have data-team (handled above)
        if (row.hasAttribute('data-team')) return;

        const nameCell = row.querySelector('.project-name');
        if (!nameCell) return;
        const rowText = nameCell.textContent.trim();

        if (!isFiltered) {
            row.style.display = '';
        } else {
            const teamName = teamNameMap[teamCode] || '';
            // Show row if it contains the team name, or if it doesn't seem team-related
            const isTeamRow = Object.values(teamNameMap).some(tn => rowText.includes(tn));
            if (isTeamRow) {
                row.style.display = rowText.includes(teamName) ? '' : 'none';
            }
            // Non-team rows (milestones, KPIs, skills) stay visible
        }
    });

    // Update visible count for resource table
    const resourceBody = document.getElementById('resourceTableBody');
    if (resourceBody) {
        const visibleRows = resourceBody.querySelectorAll('tr:not([style*="display: none"])');
        const showingCount = document.getElementById('showingCount');
        const totalCount = document.getElementById('totalCount');
        if (showingCount) showingCount.textContent = visibleRows.length;
        if (totalCount) totalCount.textContent = isFiltered ? visibleRows.length : resourceBody.querySelectorAll('tr').length;
    }

    // Update risk management team filter dropdown
    const riskFilter = document.getElementById('riskTeamFilter');
    if (riskFilter && isFiltered) {
        riskFilter.value = teamCode.toLowerCase();
    } else if (riskFilter) {
        riskFilter.value = 'all';
    }

    // Update subtitle to show team context
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        if (isFiltered) {
            subtitle.textContent = `${teamNameMap[teamCode] || teamCode} — Dashboard View`;
        } else if (teamCode === 'EXEC') {
            subtitle.textContent = 'Executive Overview — All Teams';
        } else {
            subtitle.textContent = 'Organization Level Metrics & Reporting';
        }
    }
}
