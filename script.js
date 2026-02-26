// ===== PMO Dashboard JavaScript =====

// Sample data for Resource Management table
const resourceData = [
    {
        projectName: "Enterprise Resource Planning",
        currentPlan: 25,
        previousMonthPlan: 22,
        actual: 23,
        status: "on-track",
        team: "ALPHA"
    },
    {
        projectName: "Customer Portal Redesign",
        currentPlan: 18,
        previousMonthPlan: 15,
        actual: 14,
        status: "at-risk",
        team: "BETA"
    },
    {
        projectName: "Data Analytics Platform",
        currentPlan: 30,
        previousMonthPlan: 28,
        actual: 32,
        status: "critical",
        team: "GAMMA"
    },
    {
        projectName: "Mobile App Development",
        currentPlan: 12,
        previousMonthPlan: 12,
        actual: 12,
        status: "on-track",
        team: "DELTA"
    },
    {
        projectName: "Cloud Migration Initiative",
        currentPlan: 20,
        previousMonthPlan: 18,
        actual: 17,
        status: "on-track",
        team: "ALPHA"
    }
];

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', function () {
    initializeResourceTable();
    initializeStatusChart();
    initializeRiskChart();
    initializeScoreCharts();
    initializeSkillChart();
    initializeAnimations();
});

// ... (Existing functions: initializeResourceTable, getValueClass, formatDifference, getStatusBadge, initializeStatusChart) ...

// Initialize Risk Chart (Donut)
function initializeRiskChart() {
    const ctx = document.getElementById('riskChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['With Risk', 'Without Risk'],
            datasets: [{
                data: [40, 0], // Data from Excel
                backgroundColor: ['#ef4444', '#10b981'],
                borderWidth: 0,
                cutout: '75%'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: { enabled: true }
            }
        }
    });
}

// Initialize Score Charts (Gauge-like using Doughnut)
function initializeScoreCharts() {
    const createScoreChart = (id, score, color) => {
        const ctx = document.getElementById(id);
        if (!ctx) return;

        // Score is 0-1, map to percentage
        const percentage = score * 100;
        const remaining = 100 - percentage;

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Score', 'Remaining'],
                datasets: [{
                    data: [percentage, remaining],
                    backgroundColor: [color, '#e2e8f0'],
                    borderWidth: 0,
                    cutout: '80%',
                    circumference: 360
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false }
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        });
    };

    createScoreChart('sribScoreChart', 0.8, '#6366f1'); // Indigo
    createScoreChart('teamScoreChart', 0.8, '#8b5cf6'); // Purple
}

// Initialize Skill Chart (Bar)
function initializeSkillChart() {
    const ctx = document.getElementById('skillChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Novice', 'Practitioner', 'Competent', 'Expert', 'Innovator'],
            datasets: [
                {
                    label: 'Grade A',
                    data: [51, 131, 194, 118, 34],
                    backgroundColor: '#6366f1',
                    borderRadius: 4
                },
                {
                    label: 'Grade B',
                    data: [16, 108, 181, 167, 55],
                    backgroundColor: '#8b5cf6',
                    borderRadius: 4
                },
                {
                    label: 'Grade C',
                    data: [19, 85, 148, 106, 10],
                    backgroundColor: '#14b8a6',
                    borderRadius: 4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    align: 'end',
                    labels: {
                        usePointStyle: true,
                        boxWidth: 8
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(30, 41, 59, 0.9)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderWidth: 1
                }
            },
            scales: {
                x: {
                    stacked: true,
                    grid: { display: false },
                    ticks: {
                        color: '#64748b'
                    }
                },
                y: {
                    stacked: true,
                    grid: {
                        color: '#f1f5f9',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#64748b',
                        stepSize: 50
                    }
                }
            }
        }
    });
}


// Populate Resource Management Table
function initializeResourceTable() {
    const tableBody = document.getElementById('resourceTableBody');

    if (!tableBody) return;

    tableBody.innerHTML = '';

    resourceData.forEach((row, index) => {
        // Calculate derived values
        const currentMinusActual = row.currentPlan - row.actual;
        const currentMinusPrevMonth = row.currentPlan - row.previousMonthPlan;

        // Determine CSS classes for calculated columns
        const actualDiffClass = getValueClass(currentMinusActual, true);
        const prevMonthDiffClass = getValueClass(currentMinusPrevMonth, false);

        // Get status badge
        const statusBadge = getStatusBadge(row.status);

        const tr = document.createElement('tr');
        tr.setAttribute('data-team', row.team || '');
        tr.innerHTML = `
            <td class="project-name">${row.projectName}</td>
            <td>${row.currentPlan}</td>
            <td>${row.previousMonthPlan}</td>
            <td>${row.actual}</td>
            <td class="${actualDiffClass}">${formatDifference(currentMinusActual)}</td>
            <td class="${prevMonthDiffClass}">${formatDifference(currentMinusPrevMonth)}</td>
            <td>${statusBadge}</td>
        `;

        // Add staggered animation
        tr.style.opacity = '0';
        tr.style.transform = 'translateY(20px)';
        setTimeout(() => {
            tr.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            tr.style.opacity = '1';
            tr.style.transform = 'translateY(0)';
        }, index * 100);

        tableBody.appendChild(tr);
    });

    // Update counts
    const showingCount = document.getElementById('showingCount');
    const totalCount = document.getElementById('totalCount');
    if (showingCount) showingCount.textContent = resourceData.length;
    if (totalCount) totalCount.textContent = resourceData.length;
}

// Get appropriate CSS class for calculated values
function getValueClass(value, isActualDiff) {
    if (value === 0) return 'calculated-neutral';
    if (isActualDiff) {
        // For Current - Actual: positive means under-resourced, negative means over-resourced
        return value > 0 ? 'calculated-negative' : 'calculated-positive';
    } else {
        // For Current - Previous: positive means increase in planning
        return value > 0 ? 'calculated-positive' : value < 0 ? 'calculated-negative' : 'calculated-neutral';
    }
}

// Format difference value with sign
function formatDifference(value) {
    if (value > 0) return `+${value}`;
    if (value < 0) return `${value}`;
    return '0';
}

// Get status badge HTML
function getStatusBadge(status) {
    const statusMap = {
        'on-track': { label: 'On Track', icon: 'fa-check-circle' },
        'at-risk': { label: 'At Risk', icon: 'fa-exclamation-circle' },
        'critical': { label: 'Critical', icon: 'fa-times-circle' }
    };

    const statusInfo = statusMap[status] || statusMap['on-track'];

    return `<span class="status-badge ${status}">
        <i class="fas ${statusInfo.icon}"></i>
        ${statusInfo.label}
    </span>`;
}

// Initialize Status Distribution Chart
function initializeStatusChart() {
    const ctx = document.getElementById('statusChart');

    if (!ctx) return;

    const data = {
        labels: ['Planned', 'Initiated', 'Closed', 'Dropped', 'To Be Initiated'],
        datasets: [{
            data: [12, 8, 45, 3, 7],
            backgroundColor: [
                '#8b5cf6',  // Planned - Purple
                '#0ea5e9',  // Initiated - Sky Blue
                '#10b981',  // Closed - Emerald
                '#ef4444',  // Dropped - Red
                '#f59e0b'   // To Be Initiated - Amber
            ],
            borderColor: '#ffffff',
            borderWidth: 3,
            hoverOffset: 10
        }]
    };

    const config = {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: true,
            cutout: '60%',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(30, 27, 75, 0.9)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    padding: 12,
                    cornerRadius: 8,
                    displayColors: true,
                    callbacks: {
                        label: function (context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((context.raw / total) * 100).toFixed(1);
                            return ` ${context.label}: ${context.raw} (${percentage}%)`;
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 1500,
                easing: 'easeOutQuart'
            }
        }
    };

    new Chart(ctx, config);
}

// Initialize animations for cards and sections
function initializeAnimations() {
    // Animate status cards on scroll
    const statusCards = document.querySelectorAll('.status-card');
    const summaryCards = document.querySelectorAll('.summary-card');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Set initial state and observe
    [...statusCards, ...summaryCards].forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });

    // Animate counts
    animateCounters();
}

// Animate counter numbers
function animateCounters() {
    const counters = document.querySelectorAll('.status-info .count, .summary-value');

    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        if (isNaN(target)) return;

        const duration = 1500;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
                // Add percentage sign back if needed
                if (counter.dataset.suffix) {
                    counter.textContent += counter.dataset.suffix;
                }
            }
        };

        // Delay start for staggered effect
        setTimeout(updateCounter, 300);
    });
}

// Handle navigation item clicks
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function (e) {
        e.preventDefault();

        // Remove active class from all items
        document.querySelectorAll('.nav-item').forEach(navItem => {
            navItem.classList.remove('active');
        });

        // Add active class to clicked item
        this.classList.add('active');
    });
});

// Handle quick action button clicks
document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        // Add ripple effect
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);

        // Show notification (placeholder)
        const actionName = this.querySelector('span').textContent;
        console.log(`Action clicked: ${actionName}`);
    });
});

// Search functionality
const searchInput = document.querySelector('.search-box input');
if (searchInput) {
    searchInput.addEventListener('input', function (e) {
        const searchTerm = e.target.value.toLowerCase();
        const tableRows = document.querySelectorAll('#resourceTableBody tr');

        tableRows.forEach(row => {
            const projectName = row.querySelector('.project-name')?.textContent.toLowerCase() || '';
            if (projectName.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });

        // Update showing count
        const visibleRows = document.querySelectorAll('#resourceTableBody tr:not([style*="display: none"])');
        const showingCount = document.getElementById('showingCount');
        if (showingCount) {
            showingCount.textContent = visibleRows.length;
        }
    });
}

// Export table to CSV (placeholder functionality)
function exportTableToCSV() {
    const rows = [
        ['Project Name', 'Current Plan', 'Previous Month Plan', 'Actual', 'Current - Actual', 'Current - Prev Month', 'Status']
    ];

    resourceData.forEach(row => {
        rows.push([
            row.projectName,
            row.currentPlan,
            row.previousMonthPlan,
            row.actual,
            row.currentPlan - row.actual,
            row.currentPlan - row.previousMonthPlan,
            row.status
        ]);
    });

    const csvContent = rows.map(row => row.join(',')).join('\n');
    console.log('CSV Export:', csvContent);
    // In real implementation, trigger download
}

// Utility: Format number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
