import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, TrendingUp, TrendingDown, Trash2, Plus, X, ChevronDown } from 'lucide-react';
import { useStore, type Transaction } from '../store/useStore';
import { useToast } from '../components/ui/Toast';
import { ConfirmDialog } from '../components/ui/Modal';

export const NouvelleTransaction: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const { 
    addTransaction, 
    updateTransaction, 
    removeTransaction, 
    transactions,
    expenseCategories,
    incomeCategories,
    addExpenseCategory,
    addIncomeCategory
  } = useStore();
  const { showToast } = useToast();

  const existingTransaction = isEditMode ? transactions.find(t => t.id === id) : null;

  const [type, setType] = useState<'INCOME' | 'EXPENSE'>(existingTransaction?.type || 'EXPENSE');
  const [date, setDate] = useState(existingTransaction?.date || new Date().toISOString().split('T')[0]);
  const [amount, setAmount] = useState(existingTransaction ? existingTransaction.amount.toString() : '');
  const [category, setCategory] = useState(existingTransaction?.category || '');
  const [description, setDescription] = useState(existingTransaction?.description || '');

  // Add categories modal state
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const categories = type === 'EXPENSE' 
    ? (expenseCategories || ['Alimentation (Granulés/Foin)', 'Pharmacie / Médicaments', 'Matériel / Équipement', 'Achat Animaux', 'Autre']) 
    : (incomeCategories || ['Vente Lapins de Chair', 'Vente Reproducteurs', 'Vente Fumier', 'Autre']);

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
      showToast('Transaction modifiée ✓', 'success');
    } else {
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        ...transactionData
      };
      addTransaction(newTransaction);
      showToast('Transaction ajoutée ✓', 'success');
    }
    navigate(-1);
  };

  const handleDelete = () => {
    if (isEditMode && id) {
      removeTransaction(id);
      showToast('Transaction supprimée', 'warning');
      navigate('/finance');
    }
  };

  const handleAddNewCategory = () => {
    const cleaned = newCategoryName.trim();
    if (cleaned) {
      if (type === 'EXPENSE') {
        addExpenseCategory(cleaned);
      } else {
        addIncomeCategory(cleaned);
      }
      setCategory(cleaned);
      setNewCategoryName('');
      setIsAddingCategory(false);
    }
  };

  const handleCategoryKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddNewCategory();
    }
  };

  return (
    <div className="pb-8">
      <div className="space-y-6">
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

          {/* Category Dropdown */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-muted">Catégorie *</label>
            <div className="flex gap-2">
              <div className="relative flex-grow">
                <select 
                  className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground appearance-none font-mono focus:ring-1 focus:ring-primary outline-none transition-all" 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="" disabled>Sélectionner une catégorie</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted w-5 h-5" />
              </div>
              <button
                type="button"
                onClick={() => setIsAddingCategory(true)}
                className="flex-shrink-0 bg-surface border border-border hover:border-primary/50 text-primary px-3.5 rounded-xl active:scale-95 transition-all flex items-center justify-center"
                title="Ajouter une nouvelle catégorie"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
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
                onClick={() => setShowDeleteConfirm(true)}
                className="w-full border border-danger/50 bg-danger/10 hover:bg-danger/20 text-danger font-bold py-3.5 rounded-xl active:scale-[0.98] transition-all flex justify-center items-center gap-2"
              >
                <Trash2 className="w-5 h-5" /> Supprimer la transaction
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Modal d'ajout de catégorie */}
      {isAddingCategory && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-surface border border-border rounded-2xl w-full max-w-sm p-6 space-y-6 shadow-2xl relative">
            <div className="flex justify-between items-center">
              <h3 className="text-foreground font-display font-bold text-lg">Nouvelle catégorie</h3>
              <button 
                type="button" 
                onClick={() => {
                  setIsAddingCategory(false);
                  setNewCategoryName('');
                }}
                className="p-1.5 text-muted hover:text-foreground rounded-lg active:scale-95 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted uppercase tracking-wider" htmlFor="new-category-name">
                  Nom de la catégorie ({type === 'INCOME' ? 'Revenu' : 'Dépense'}) *
                </label>
                <input 
                  type="text"
                  id="new-category-name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  onKeyDown={handleCategoryKeyDown}
                  placeholder="ex: Vente de peaux, Emballage..."
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-neutral"
                  autoFocus
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button 
                type="button"
                onClick={() => {
                  setIsAddingCategory(false);
                  setNewCategoryName('');
                }}
                className="flex-1 bg-transparent border border-border text-muted py-3 rounded-xl font-medium active:scale-95 transition-all text-sm"
              >
                Annuler
              </button>
              <button 
                type="button"
                onClick={handleAddNewCategory}
                disabled={!newCategoryName.trim()}
                className="flex-1 bg-primary text-background py-3 rounded-xl font-bold active:scale-95 transition-all text-sm shadow-lg shadow-primary/10 disabled:opacity-50 disabled:pointer-events-none"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title="Supprimer la transaction"
        message="Voulez-vous vraiment supprimer définitivement cette transaction ?"
        confirmText="Supprimer"
        cancelText="Annuler"
        variant="danger"
      />
    </div>
  );
};
