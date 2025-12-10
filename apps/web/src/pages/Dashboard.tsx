import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Line, Pie, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { dashboardService } from '../services/dashboardService';
import { useAuthStore } from '../store/authStore';
import { DashboardData } from '../types';
import './Dashboard.css';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

export default function Dashboard() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const dashboardData = await dashboardService.getDashboardData();
            setData(dashboardData);
        } catch (error) {
            console.error('Failed to load dashboard:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Yükleniyor...</p>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="error-container">
                <p>Dashboard verileri yüklenemedi</p>
                <button onClick={loadData}>Tekrar Dene</button>
            </div>
        );
    }

    const categoryLabels = Object.keys(data.categoryBreakdown);
    const categoryValues = Object.values(data.categoryBreakdown);

    return (
        <div className="dashboard-container">
            {/* Header */}
            <header className="dashboard-header">
                <div className="header-left">
                    <h1>💰 FlowPay</h1>
                    <p>Hoş geldin, {user?.name}</p>
                </div>
                <div className="header-right">
                    <button onClick={() => navigate('/transactions')} className="btn-secondary">
                        İşlemler
                    </button>
                    <button onClick={() => navigate('/budgets')} className="btn-secondary">
                        Bütçeler
                    </button>
                    <button onClick={handleLogout} className="btn-outline">
                        Çıkış
                    </button>
                </div>
            </header>

            {/* Stats Cards */}
            <div className="stats-grid">
                <div className="stat-card balance">
                    <div className="stat-icon">💵</div>
                    <div className="stat-content">
                        <h3>Bakiye</h3>
                        <p className="stat-value">₺{data.balance.toLocaleString('tr-TR')}</p>
                    </div>
                </div>

                <div className="stat-card income">
                    <div className="stat-icon">📈</div>
                    <div className="stat-content">
                        <h3>Gelir</h3>
                        <p className="stat-value success">₺{data.income.toLocaleString('tr-TR')}</p>
                    </div>
                </div>

                <div className="stat-card expense">
                    <div className="stat-icon">📉</div>
                    <div className="stat-content">
                        <h3>Gider</h3>
                        <p className="stat-value error">₺{data.expense.toLocaleString('tr-TR')}</p>
                    </div>
                </div>

                <div className="stat-card transactions">
                    <div className="stat-icon">📊</div>
                    <div className="stat-content">
                        <h3>İşlemler</h3>
                        <p className="stat-value">{data.recentTransactions.length}</p>
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div className="charts-grid">
                {/* Monthly Trend */}
                {data.monthlyTrend && data.monthlyTrend.length > 0 && (
                    <div className="chart-card">
                        <h3>Aylık Trend</h3>
                        <Bar
                            data={{
                                labels: data.monthlyTrend.map(t => t.month),
                                datasets: [
                                    {
                                        label: 'Gelir',
                                        data: data.monthlyTrend.map(t => t.income),
                                        backgroundColor: 'rgba(16, 185, 129, 0.6)',
                                        borderColor: 'rgba(16, 185, 129, 1)',
                                        borderWidth: 1,
                                    },
                                    {
                                        label: 'Gider',
                                        data: data.monthlyTrend.map(t => t.expense),
                                        backgroundColor: 'rgba(239, 68, 68, 0.6)',
                                        borderColor: 'rgba(239, 68, 68, 1)',
                                        borderWidth: 1,
                                    },
                                ],
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: { position: 'top' },
                                },
                            }}
                        />
                    </div>
                )}

                {/* Category Breakdown */}
                {categoryLabels.length > 0 && (
                    <div className="chart-card">
                        <h3>Kategori Dağılımı</h3>
                        <Pie
                            data={{
                                labels: categoryLabels,
                                datasets: [{
                                    data: categoryValues,
                                    backgroundColor: [
                                        '#667eea',
                                        '#764ba2',
                                        '#10b981',
                                        '#f59e0b',
                                        '#ef4444',
                                        '#8b5cf6',
                                        '#ec4899',
                                    ],
                                }],
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: { position: 'right' },
                                },
                            }}
                        />
                    </div>
                )}
            </div>

            {/* Recent Transactions */}
            <div className="recent-transactions">
                <div className="section-header">
                    <h3>Son İşlemler</h3>
                    <button onClick={() => navigate('/transactions')} className="btn-link">
                        Tümünü Gör →
                    </button>
                </div>
                <div className="transactions-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Kategori</th>
                                <th>Not</th>
                                <th>Tarih</th>
                                <th>Tutar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.recentTransactions.slice(0, 5).map(t => (
                                <tr key={t.id}>
                                    <td>
                                        <span className="category-badge">{t.category}</span>
                                    </td>
                                    <td>{t.note || '-'}</td>
                                    <td>{new Date(t.date).toLocaleDateString('tr-TR')}</td>
                                    <td className={t.amount > 0 ? 'amount-positive' : 'amount-negative'}>
                                        {t.amount > 0 ? '+' : ''}₺{Math.abs(t.amount).toLocaleString('tr-TR')}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
