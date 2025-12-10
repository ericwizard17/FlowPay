import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { transactionService } from '../services/transactionService';
import { Transaction } from '../types';
import './Transactions.css';

export default function Transactions() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        amount: '',
        category: 'Market',
        note: '',
        type: 'expense' as 'income' | 'expense',
    });

    useEffect(() => {
        loadTransactions();
    }, [filter]);

    const loadTransactions = async () => {
        try {
            setLoading(true);
            const filters = filter !== 'all' ? { type: filter } : undefined;
            const data = await transactionService.getAll(filters);
            setTransactions(data);
        } catch (error) {
            console.error('Load error:', error);
            alert('İşlemler yüklenemedi');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const amount = parseFloat(formData.amount);
            const finalAmount = formData.type === 'expense' ? -amount : amount;

            const newTransaction = await transactionService.create({
                amount: finalAmount,
                category: formData.category,
                note: formData.note || undefined,
            });

            setTransactions([newTransaction, ...transactions]);
            setShowModal(false);
            setFormData({ amount: '', category: 'Market', note: '', type: 'expense' });
        } catch (error: any) {
            alert(error.response?.data?.error || 'İşlem eklenemedi');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Bu işlemi silmek istediğinizden emin misiniz?')) return;

        try {
            await transactionService.delete(id);
            setTransactions(transactions.filter(t => t.id !== id));
        } catch (error) {
            alert('İşlem silinemedi');
        }
    };

    return (
        <div className="transactions-container">
            <header className="page-header">
                <div>
                    <button onClick={() => navigate('/')} className="btn-back">← Dashboard</button>
                    <h1>İşlemler</h1>
                </div>
                <button onClick={() => setShowModal(true)} className="btn-primary">
                    + Yeni İşlem
                </button>
            </header>

            {/* Filters */}
            <div className="filters">
                <button
                    className={filter === 'all' ? 'filter-btn active' : 'filter-btn'}
                    onClick={() => setFilter('all')}
                >
                    Tümü
                </button>
                <button
                    className={filter === 'income' ? 'filter-btn active' : 'filter-btn'}
                    onClick={() => setFilter('income')}
                >
                    Gelir
                </button>
                <button
                    className={filter === 'expense' ? 'filter-btn active' : 'filter-btn'}
                    onClick={() => setFilter('expense')}
                >
                    Gider
                </button>
            </div>

            {/* Transactions List */}
            {loading ? (
                <div className="loading">Yükleniyor...</div>
            ) : (
                <div className="transactions-list">
                    {transactions.map(t => (
                        <div key={t.id} className="transaction-item">
                            <div className="transaction-info">
                                <span className="category">{t.category}</span>
                                <span className="note">{t.note || new Date(t.date).toLocaleDateString('tr-TR')}</span>
                            </div>
                            <div className="transaction-actions">
                                <span className={t.amount > 0 ? 'amount positive' : 'amount negative'}>
                                    {t.amount > 0 ? '+' : ''}₺{Math.abs(t.amount).toLocaleString('tr-TR')}
                                </span>
                                <button onClick={() => handleDelete(t.id)} className="btn-delete">Sil</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Add Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h2>Yeni İşlem</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Tür</label>
                                <div className="type-selector">
                                    <button
                                        type="button"
                                        className={formData.type === 'income' ? 'type-btn active' : 'type-btn'}
                                        onClick={() => setFormData({ ...formData, type: 'income' })}
                                    >
                                        Gelir
                                    </button>
                                    <button
                                        type="button"
                                        className={formData.type === 'expense' ? 'type-btn active' : 'type-btn'}
                                        onClick={() => setFormData({ ...formData, type: 'expense' })}
                                    >
                                        Gider
                                    </button>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Tutar (₺)</label>
                                <input
                                    type="number"
                                    value={formData.amount}
                                    onChange={e => setFormData({ ...formData, amount: e.target.value })}
                                    placeholder="0.00"
                                    required
                                />
                            </div>

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
                                    <option>Maaş</option>
                                    <option>Diğer</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Not (Opsiyonel)</label>
                                <input
                                    type="text"
                                    value={formData.note}
                                    onChange={e => setFormData({ ...formData, note: e.target.value })}
                                    placeholder="Açıklama ekle..."
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
