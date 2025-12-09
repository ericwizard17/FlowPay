#!/usr/bin/env node

/**
 * FlowPay API Test Script
 * Tests all major endpoints
 */

const BASE_URL = process.env.API_URL || 'http://localhost:3000';

let userId = '';
let token = '';
let transactionId = '';
let budgetId = '';

// Colors for console output
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

async function request(method, endpoint, body = null, headers = {}) {
    const url = `${BASE_URL}${endpoint}`;
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return { status: response.status, data };
    } catch (error) {
        return { status: 500, error: error.message };
    }
}

async function testHealthCheck() {
    log('\n📊 Testing Health Check...', 'blue');
    const { status, data } = await request('GET', '/health');

    if (status === 200) {
        log('✅ Health check passed', 'green');
        log(`   Version: ${data.version}`);
    } else {
        log('❌ Health check failed', 'red');
    }
}

async function testRegister() {
    log('\n🔐 Testing User Registration...', 'blue');
    const { status, data } = await request('POST', '/api/auth/register', {
        email: `test${Date.now()}@example.com`,
        password: 'password123',
        name: 'Test User',
    });

    if (status === 201) {
        log('✅ Registration successful', 'green');
        userId = data.user.id;
        token = data.token;
        log(`   User ID: ${userId}`);
    } else {
        log('❌ Registration failed', 'red');
        log(`   Error: ${JSON.stringify(data)}`);
    }
}

async function testLogin() {
    log('\n🔑 Testing Login...', 'blue');
    const { status, data } = await request('POST', '/api/auth/login', {
        email: 'demo@flowpay.app',
        password: 'password123',
    });

    if (status === 200) {
        log('✅ Login successful', 'green');
        userId = data.user.id;
        token = data.token;
        log(`   User ID: ${userId}`);
    } else {
        log('❌ Login failed', 'red');
        log(`   Error: ${JSON.stringify(data)}`);
    }
}

async function testCreateTransaction() {
    log('\n💰 Testing Create Transaction...', 'blue');
    const { status, data } = await request(
        'POST',
        '/api/transactions',
        {
            amount: -50,
            category: 'Market',
            note: 'Test transaction',
        },
        { 'user-id': userId }
    );

    if (status === 201) {
        log('✅ Transaction created', 'green');
        transactionId = data.id;
        log(`   Transaction ID: ${transactionId}`);
    } else {
        log('❌ Transaction creation failed', 'red');
        log(`   Error: ${JSON.stringify(data)}`);
    }
}

async function testGetTransactions() {
    log('\n📋 Testing Get Transactions...', 'blue');
    const { status, data } = await request(
        'GET',
        '/api/transactions',
        null,
        { 'user-id': userId }
    );

    if (status === 200) {
        log('✅ Transactions retrieved', 'green');
        log(`   Count: ${data.length}`);
    } else {
        log('❌ Failed to get transactions', 'red');
    }
}

async function testCreateBudget() {
    log('\n📊 Testing Create Budget...', 'blue');
    const { status, data } = await request(
        'POST',
        '/api/budgets',
        {
            category: 'Market',
            limitAmount: 1000,
        },
        { 'user-id': userId }
    );

    if (status === 201) {
        log('✅ Budget created', 'green');
        budgetId = data.id;
        log(`   Budget ID: ${budgetId}`);
    } else {
        log('❌ Budget creation failed', 'red');
        log(`   Error: ${JSON.stringify(data)}`);
    }
}

async function testGetDashboard() {
    log('\n📈 Testing Dashboard Stats...', 'blue');
    const { status, data } = await request(
        'GET',
        '/api/dashboard/stats',
        null,
        { 'user-id': userId }
    );

    if (status === 200) {
        log('✅ Dashboard stats retrieved', 'green');
        log(`   Income: ${data.currentMonth.income}`);
        log(`   Expense: ${data.currentMonth.expense}`);
        log(`   Balance: ${data.currentMonth.balance}`);
    } else {
        log('❌ Failed to get dashboard stats', 'red');
    }
}

async function testGetCategories() {
    log('\n🏷️  Testing Get Categories...', 'blue');
    const { status, data } = await request('GET', '/api/categories');

    if (status === 200) {
        log('✅ Categories retrieved', 'green');
        log(`   Expense categories: ${data.expense.length}`);
        log(`   Income categories: ${data.income.length}`);
    } else {
        log('❌ Failed to get categories', 'red');
    }
}

async function testMonthlyReport() {
    log('\n📄 Testing Monthly Report...', 'blue');
    const { status, data } = await request(
        'GET',
        '/api/reports/report/monthly',
        null,
        { 'user-id': userId }
    );

    if (status === 200) {
        log('✅ Monthly report retrieved', 'green');
        log(`   Month: ${data.month}`);
        log(`   Total Income: ${data.summary.totalIncome}`);
        log(`   Total Expense: ${data.summary.totalExpense}`);
    } else {
        log('❌ Failed to get monthly report', 'red');
    }
}

async function runTests() {
    log('\n🚀 ========================================', 'blue');
    log('🚀  FlowPay API Test Suite', 'blue');
    log('🚀 ========================================', 'blue');
    log(`📍 Testing: ${BASE_URL}`, 'yellow');

    await testHealthCheck();
    await testLogin();

    if (userId) {
        await testCreateTransaction();
        await testGetTransactions();
        await testCreateBudget();
        await testGetDashboard();
        await testGetCategories();
        await testMonthlyReport();
    }

    log('\n🚀 ========================================', 'blue');
    log('🚀  Test Suite Completed', 'blue');
    log('🚀 ========================================\n', 'blue');
}

runTests().catch(console.error);
