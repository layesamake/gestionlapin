import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, TrendingUp, TrendingDown, Trash2 } from 'lucide-react';
import { useStore, type Transaction } from '../store/useStore';

export const NouvelleTransaction: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const { addTransaction, updateTransaction, removeTransaction, transactions } = useStore();
  const existingTransaction = isEditMode ? transactions.find(t => t.id === id) : null;

  const [type, setType] = useState<'INCOME' | 'EXPENSE'>(existingTransaction?.type || 'EXPENSE');
  const [date, setDate] = useState(existingTransaction?.date || new Date().toISOString().split('T')[0]);
  const [amount, setAmount] = useState(existingTransaction ? existingTransaction.amount.toString() : '');
  const [category, setCategory] = useState(existingTransaction?.category || '');
  const [description, setDescription] = useState(existingTransaction?.description || '');

  const expenseCategories = ['Alimentation (Granulés/Foin)', 'Pharmacie / Médicaments', 'Matériel / Équipement', 'Achat Animaux', 'Autre'];
  const incomeCategories = ['Vente Lapins de Chair', 'Vente Reproducteurs', 'Vente Fumier', 'Autre'];

  const categories = type === 'EXPENSE' ? expenseCategories : incomeCategories;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category) return;

    const transactionData = {
      date,
      type,
      category,
      amount: parseFloat(amount),
      description
    };

    if (isEditMode && id) {
      updateTransaction(id, transactionData);
    } else {
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        ...transactionData
      };
      addTransaction(newTransaction);
    }
    navigate(-1);
  };

  const handleDelete = () => {
    if (isEditMode && id) {
      if (window.confirm("Voulez-vous vraiment supprimer définitivement cette transaction ?")) {
        removeTransaction(id);
        navigate('/finance');
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen pb-24">
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-4 h-16 bg-background border-b border-border">
        <button onClick={() => navigate(-1)} className="text-muted active:scale-95 transition-transform">
          Annuler
        </button>
        <h1 className="text-foreground font-headline font-bold text-lg tracking-tight">
          {isEditMode ? 'Modifier la Transaction' : 'Nouvelle Transaction'}
        </h1>
        <button onClick={handleSubmit} className="text-primary font-bold active:scale-95 transition-transform">
          Enregistrer
        </button>
      </header>

      <main className="flex-grow pt-20 px-4 space-y-6 max-w-lg mx-auto w-full">
        {/* Type Selector */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-surface border border-border rounded-xl">
          <button 
            type="button"
            onClick={() => {
              setType('INCOME');
              setCategory('');
            }}
            className={`py-3 flex items-center justify-center gap-2 rounded-lg font-bold text-sm transition-all ${
              type === 'INCOME' ? 'bg-secondary/10 text-secondary border border-secondary/20' : 'text-muted hover:bg-border/50'
            }`}
          >
            <TrendingUp className="w-4 h-4" /> Revenu
          </button>
          <button 
            type="button"
            onClick={() => {
              setType('EXPENSE');
              setCategory('');
            }}
            className={`py-3 flex items-center justify-center gap-2 rounded-lg font-bold text-sm transition-all ${
              type === 'EXPENSE' ? 'bg-danger/10 text-danger border border-danger/20' : 'text-muted hover:bg-border/50'
            }`}
          >
            <TrendingDown className="w-4 h-4" /> Dépense
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Amount */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-muted">Montant (FCFA) *</label>
            <input 
              className={`w-full bg-surface border border-border rounded-xl px-4 py-4 text-2xl font-mono font-bold focus:ring-2 outline-none transition-all ${
                type === 'INCOME' ? 'text-secondary focus:border-secondary focus:ring-secondary/20' : 'text-danger focus:border-danger focus:ring-danger/20'
              }`} 
              type="number" 
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              min="0"
            />
          </div>

          {/* Date */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-muted">Date *</label>
            <input 
              className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-foreground font-mono focus:ring-1 focus:ring-primary outline-none [color-scheme:light]" 
              type="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-muted">Catégorie *</label>
            <select 
              className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-foreground font-mono focus:ring-1 focus:ring-primary outline-none" 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" disabled>Sélectionner une catégorie</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-muted">Description / Notes</label>
            <textarea 
              className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-foreground focus:ring-1 focus:ring-primary outline-none resize-none" 
              placeholder="Détails de la transaction..." 
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 space-y-3">
            <button 
              type="submit"
              className={`w-full text-background font-bold py-4 rounded-xl active:scale-[0.98] transition-all flex justify-center items-center gap-2 shadow-lg ${
                type === 'INCOME' ? 'bg-secondary shadow-secondary/20' : 'bg-danger shadow-danger/20'
              }`}
            >
              <Save className="w-5 h-5 fill-current" /> Enregistrer la transaction
            </button>

            {isEditMode && (
              <button 
                type="button"
                onClick={handleDelete}
                className="w-full border border-danger/50 bg-danger/10 hover:bg-danger/20 text-danger font-bold py-3.5 rounded-xl active:scale-[0.98] transition-all flex justify-center items-center gap-2"
              >
                <Trash2 className="w-5 h-5" /> Supprimer la transaction
              </button>
            )}
          </div>
        </form>
      </main>
    </div>
  );
};
