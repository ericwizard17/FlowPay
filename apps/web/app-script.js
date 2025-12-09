// Data Storage
const AppData = {
    transactions: JSON.parse(localStorage.getItem('transactions')) || [],
    budgets: JSON.parse(localStorage.getItem('budgets')) || [],
    goals: JSON.parse(localStorage.getItem('goals')) || [],

    saveTransactions() {
        localStorage.setItem('transactions', JSON.stringify(this.transactions));
    },

    saveBudgets() {
        localStorage.setItem('budgets', JSON.stringify(this.budgets));
    },

    saveGoals() {
        localStorage.setItem('goals', JSON.stringify(this.goals));
    }
};

// Initialize with demo data if empty
if (AppData.transactions.length === 0) {
    AppData.transactions = [
        { id: 1, type: 'income', amount: 15000, category: 'salary', description: 'Maaş', date: '2024-12-01' },
        { id: 2, type: 'expense', amount: 500, category: 'food', description: 'Market alışverişi', date: '2024-12-02' },
        { id: 3, type: 'expense', amount: 200, category: 'transport', description: 'Akbil yükleme', date: '2024-12-03' },
        { id: 4, type: 'income', amount: 2000, category: 'other', description: 'Freelance iş', date: '2024-12-05' },
        { id: 5, type: 'expense', amount: 1500, category: 'bills', description: 'Elektrik faturası', date: '2024-12-07' }
    ];
    AppData.saveTransactions();
}

if (AppData.budgets.length === 0) {
    AppData.budgets = [
        { id: 1, category: 'food', limit: 3000, spent: 1250 },
        { id: 2, category: 'transport', limit: 1000, spent: 450 },
        { id: 3, category: 'entertainment', limit: 1500, spent: 800 }
    ];
    AppData.saveBudgets();
}

if (AppData.goals.length === 0) {
    AppData.goals = [
        { id: 1, name: 'Tatil Fonu', target: 20000, current: 8500, deadline: '2025-06-01' },
        { id: 2, name: 'Acil Durum Fonu', target: 30000, current: 15000, deadline: '2025-12-31' }
    ];
    AppData.saveGoals();
}

// Category Icons and Names
const categoryData = {
    salary: { icon: '💰', name: 'Maaş', color: '#10b981' },
    food: { icon: '🍔', name: 'Yemek', color: '#f59e0b' },
    transport: { icon: '🚗', name: 'Ulaşım', color: '#3b82f6' },
    shopping: { icon: '🛍️', name: 'Alışveriş', color: '#ec4899' },
    bills: { icon: '📄', name: 'Faturalar', color: '#ef4444' },
    entertainment: { icon: '🎮', name: 'Eğlence', color: '#8b5cf6' },
    health: { icon: '🏥', name: 'Sağlık', color: '#06b6d4' },
    other: { icon: '📦', name: 'Diğer', color: '#6b7280' }
};

// Navigation
document.querySelectorAll('.nav-item[data-page]').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const page = item.dataset.page;

        // Update active nav
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');

        // Update active page
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById(`${page}-page`).classList.add('active');

        // Render page content
        if (page === 'dashboard') renderDashboard();
        if (page === 'transactions') renderTransactions();
        if (page === 'budgets') renderBudgets();
        if (page === 'goals') renderGoals();
        if (page === 'reports') renderReports();
    });
});

// Modal Functions
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('.modal').classList.remove('active');
    });
});

// Click outside modal to close
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});

// Transaction Form
document.getElementById('add-transaction-btn').addEventListener('click', () => {
    document.getElementById('transaction-form').reset();
    document.querySelector('input[name="date"]').valueAsDate = new Date();
    openModal('transaction-modal');
});

document.getElementById('transaction-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const transaction = {
        id: Date.now(),
        type: formData.get('type'),
        amount: parseFloat(formData.get('amount')),
        category: formData.get('category'),
        description: formData.get('description'),
        date: formData.get('date')
    };

    AppData.transactions.unshift(transaction);
    AppData.saveTransactions();

    // Update budget if expense
    if (transaction.type === 'expense') {
        const budget = AppData.budgets.find(b => b.category === transaction.category);
        if (budget) {
            budget.spent += transaction.amount;
            AppData.saveBudgets();
        }
    }

    closeModal('transaction-modal');
    renderDashboard();
    renderTransactions();
});

// Budget Form
document.getElementById('add-budget-btn').addEventListener('click', () => {
    document.getElementById('budget-form').reset();
    openModal('budget-modal');
});

document.getElementById('budget-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const budget = {
        id: Date.now(),
        category: formData.get('category'),
        limit: parseFloat(formData.get('limit')),
        spent: 0
    };

    AppData.budgets.push(budget);
    AppData.saveBudgets();

    closeModal('budget-modal');
    renderBudgets();
});

// Goal Form
document.getElementById('add-goal-btn').addEventListener('click', () => {
    document.getElementById('goal-form').reset();
    openModal('goal-modal');
});

document.getElementById('goal-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const goal = {
        id: Date.now(),
        name: formData.get('name'),
        target: parseFloat(formData.get('target')),
        current: parseFloat(formData.get('current')),
        deadline: formData.get('deadline')
    };

    AppData.goals.push(goal);
    AppData.saveGoals();

    closeModal('goal-modal');
    renderGoals();
});

// Render Dashboard
function renderDashboard() {
    const totalIncome = AppData.transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = AppData.transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpense;
    const savings = balance * 0.2; // Assume 20% savings

    document.getElementById('total-income').textContent = `₺${totalIncome.toLocaleString('tr-TR')}`;
    document.getElementById('total-expense').textContent = `₺${totalExpense.toLocaleString('tr-TR')}`;
    document.getElementById('balance').textContent = `₺${balance.toLocaleString('tr-TR')}`;
    document.getElementById('savings').textContent = `₺${savings.toLocaleString('tr-TR')}`;

    // Recent transactions
    const recentList = document.getElementById('recent-list');
    const recentTransactions = AppData.transactions.slice(0, 5);

    recentList.innerHTML = recentTransactions.map(t => {
        const cat = categoryData[t.category] || categoryData.other;
        return `
            <div class="transaction-item">
                <div class="transaction-icon" style="background: ${cat.color}20; color: ${cat.color}">
                    ${cat.icon}
                </div>
                <div class="transaction-info">
                    <h4>${t.description}</h4>
                    <p>${cat.name} • ${new Date(t.date).toLocaleDateString('tr-TR')}</p>
                </div>
                <div class="transaction-amount ${t.type}">
                    ${t.type === 'income' ? '+' : '-'}₺${t.amount.toLocaleString('tr-TR')}
                </div>
            </div>
        `;
    }).join('');

    // Render charts
    renderMonthlyChart();
    renderCategoryChart();
}

// Render Transactions
function renderTransactions() {
    const list = document.getElementById('transactions-list');
    const filterType = document.getElementById('filter-type').value;
    const filterCategory = document.getElementById('filter-category').value;

    let filtered = AppData.transactions;

    if (filterType !== 'all') {
        filtered = filtered.filter(t => t.type === filterType);
    }

    if (filterCategory !== 'all') {
        filtered = filtered.filter(t => t.category === filterCategory);
    }

    list.innerHTML = filtered.map(t => {
        const cat = categoryData[t.category] || categoryData.other;
        return `
            <div class="transaction-item">
                <div class="transaction-icon" style="background: ${cat.color}20; color: ${cat.color}">
                    ${cat.icon}
                </div>
                <div class="transaction-info">
                    <h4>${t.description}</h4>
                    <p>${cat.name} • ${new Date(t.date).toLocaleDateString('tr-TR')}</p>
                </div>
                <div class="transaction-amount ${t.type}">
                    ${t.type === 'income' ? '+' : '-'}₺${t.amount.toLocaleString('tr-TR')}
                </div>
            </div>
        `;
    }).join('');
}

// Render Budgets
function renderBudgets() {
    const list = document.getElementById('budgets-list');

    list.innerHTML = AppData.budgets.map(b => {
        const cat = categoryData[b.category] || categoryData.other;
        const percentage = Math.min((b.spent / b.limit) * 100, 100);
        const remaining = Math.max(b.limit - b.spent, 0);

        return `
            <div class="budget-item">
                <div class="budget-header">
                    <h3>${cat.icon} ${cat.name}</h3>
                    <span class="budget-amount">₺${b.limit.toLocaleString('tr-TR')}</span>
                </div>
                <div class="budget-progress">
                    <div class="budget-progress-bar" style="width: ${percentage}%"></div>
                </div>
                <div class="budget-stats">
                    <span>Harcanan: ₺${b.spent.toLocaleString('tr-TR')}</span>
                    <span>Kalan: ₺${remaining.toLocaleString('tr-TR')}</span>
                </div>
            </div>
        `;
    }).join('');
}

// Render Goals
function renderGoals() {
    const list = document.getElementById('goals-list');

    list.innerHTML = AppData.goals.map(g => {
        const percentage = Math.min((g.current / g.target) * 100, 100);
        const remaining = Math.max(g.target - g.current, 0);

        return `
            <div class="goal-item">
                <div class="goal-header">
                    <h3>🎯 ${g.name}</h3>
                    <span class="goal-deadline">${new Date(g.deadline).toLocaleDateString('tr-TR')}</span>
                </div>
                <div class="goal-progress">
                    <div class="goal-progress-bar" style="width: ${percentage}%"></div>
                </div>
                <div class="goal-stats">
                    <div class="goal-amount">₺${g.current.toLocaleString('tr-TR')} / ₺${g.target.toLocaleString('tr-TR')}</div>
                    <div class="goal-percentage">${percentage.toFixed(1)}%</div>
                </div>
            </div>
        `;
    }).join('');
}

// Render Charts
function renderMonthlyChart() {
    const ctx = document.getElementById('monthlyChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz'],
            datasets: [{
                label: 'Gelir',
                data: [12000, 15000, 13000, 17000, 16000, 18000],
                borderColor: '#10b981',
                backgroundColor: '#10b98120',
                tension: 0.4
            }, {
                label: 'Gider',
                data: [8000, 9000, 8500, 10000, 9500, 11000],
                borderColor: '#ef4444',
                backgroundColor: '#ef444420',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function renderCategoryChart() {
    const ctx = document.getElementById('categoryChart');
    if (!ctx) return;

    const categoryTotals = {};
    AppData.transactions
        .filter(t => t.type === 'expense')
        .forEach(t => {
            categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
        });

    const labels = Object.keys(categoryTotals).map(cat => categoryData[cat]?.name || cat);
    const data = Object.values(categoryTotals);
    const colors = Object.keys(categoryTotals).map(cat => categoryData[cat]?.color || '#6b7280');

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Render Reports
function renderReports() {
    // Similar to charts but with different data
    renderMonthlyChart();
    renderCategoryChart();
}

// Filters
document.getElementById('filter-type').addEventListener('change', renderTransactions);
document.getElementById('filter-category').addEventListener('change', renderTransactions);
document.getElementById('filter-month').addEventListener('change', renderTransactions);

// Initialize
renderDashboard();
renderTransactions();
renderBudgets();
renderGoals();
