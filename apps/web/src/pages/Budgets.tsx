import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { budgetService } from '../services/budgetService';
import { Budget } from '../types';
import './Budgets.css';

export default function Budgets() {
    const [budgets, setBudgets] = useState<Budget[]>([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        category: 'Market',
        limitAmount: '',
    });

    useEffect(() => {
        loadBudgets();
    }, []);

    const loadBudgets = async () => {
        try {
            setLoading(true);
            const data = await budgetService.getAll();
            setBudgets(data);
        } catch (error) {
            console.error('Load error:', error);
            alert('Bütçeler yüklenemedi');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const limit = parseFloat(formData.limitAmount);
            if (isNaN(limit) || limit <= 0) {
                alert('Geçerli bir tutar girin');
                return;
            }

            const newBudget = await budgetService.create({
                category: formData.category,
                limitAmount: limit,
            });

            setBudgets([...budgets, newBudget]);
            setShowModal(false);
            setFormData({ category: 'Market', limitAmount: '' });
        } catch (error: any) {
            alert(error.response?.data?.error || 'Bütçe eklenemedi');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Bu bütçeyi silmek istediğinizden emin misiniz?')) return;

        try {
            await budgetService.delete(id);
            setBudgets(budgets.filter(b => b.id !== id));
        } catch (error) {
            alert('Bütçe silinemedi');
        }
    };

    const getStatusColor = (percentage: number) => {
        if (percentage >= 90) return '#ef4444';
        if (percentage >= 70) return '#f59e0b';
        return '#10b981';
    };

    return (
        <div className="budgets-container">
            <header className="page-header">
                <div>
                    <button onClick={() => navigate('/')} className="btn-back">← Dashboard</button>
                    <h1>Bütçeler</h1>
                </div>
                <button onClick={() => setShowModal(true)} className="btn-primary">
                    + Yeni Bütçe
                </button>
            </header>

            {loading ? (
                <div className="loading">Yükleniyor...</div>
            ) : (
                <div className="budgets-grid">
                    {budgets.map(budget => {
                        const spent = budget.spent || 0;
                        const percentage = budget.percentage ? parseFloat(budget.percentage) : 0;
                        const remaining = budget.remaining || budget.limitAmount;
                        const statusColor = getStatusColor(percentage);

                        return (
                            <div key={budget.id} className="budget-card">
                                <div className="budget-header">
                                    <h3>{budget.category}</h3>
                                    <span className="percentage" style={{ color: statusColor }}>
                                        {percentage.toFixed(0)}%
                                    </span>
                                </div>

                                <div className="budget-amounts">
                                    <span className="spent">₺{spent.toLocaleString('tr-TR')}</span>
                                    <span className="limit">/ ₺{budget.limitAmount.toLocaleString('tr-TR')}</span>
                                </div>

                                <div className="progress-bar">
                                    <div
                                        className="progress-fill"
                                        style={{
                                            width: `${Math.min(percentage, 100)}%`,
                                            backgroundColor: statusColor,
                                        }}
                                    />
                                </div>

                                <div className="budget-footer">
                                    <span className={remaining >= 0 ? 'remaining positive' : 'remaining negative'}>
                                        {remaining >= 0 ? 'Kalan: ' : 'Aşım: '}
                                        ₺{Math.abs(remaining).toLocaleString('tr-TR')}
                                    </span>
                                    <button onClick={() => handleDelete(budget.id)} className="btn-delete">
                                        Sil
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Add Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h2>Yeni Bütçe</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Kategori</label>
                                <select
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option>Market</option>
                                    <option>Ulaşım</option>
                                    <option>Eğlence</option>
                                    <option>Faturalar</option>
                                    <option>Diğer</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Limit Tutarı (₺)</label>
                                <input
                                    type="number"
                                    value={formData.limitAmount}
                                    onChange={e => setFormData({ ...formData, limitAmount: e.target.value })}
                                    placeholder="2000"
                                    required
                                />
                            </div>

                            <div className="modal-buttons">
                                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary">
                                    İptal
                                </button>
                                <button type="submit" className="btn-primary">Kaydet</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
