import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Wallet, Plus } from 'lucide-react';
import { FAB } from '../components/ui/FAB';

export const Finance: React.FC = () => {
  const transactions = useStore(state => state.transactions);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'BILAN' | 'REVENUS' | 'DEPENSES'>('BILAN');

  const revenus = transactions.filter(t => t.type === 'INCOME');
  const depenses = transactions.filter(t => t.type === 'EXPENSE');

  const totalRevenus = revenus.reduce((acc, t) => acc + t.amount, 0);
  const totalDepenses = depenses.reduce((acc, t) => acc + t.amount, 0);
  const solde = totalRevenus - totalDepenses;

  const getFilteredTransactions = () => {
    if (activeTab === 'REVENUS') return revenus;
    if (activeTab === 'DEPENSES') return depenses;
    return transactions;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <>
      {/* Top Banner Bilan */}
      <section className="bg-surface border border-border rounded-xl p-5 mb-6 shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg ${solde >= 0 ? 'bg-primary/10 text-primary' : 'bg-danger/10 text-danger'}`}>
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-muted uppercase tracking-wider font-bold">Bénéfice Net</p>
              <h2 className={`text-3xl font-extrabold font-mono ${solde >= 0 ? 'text-primary' : 'text-danger'}`}>
                {formatCurrency(solde)}
              </h2>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div>
            <p className="text-xs text-muted uppercase font-medium flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3 text-secondary" /> Revenus
            </p>
            <p className="text-lg font-bold font-mono text-foreground mt-1">{formatCurrency(totalRevenus)}</p>
          </div>
          <div>
            <p className="text-xs text-muted uppercase font-medium flex items-center gap-1">
              <ArrowDownRight className="w-3 h-3 text-danger" /> Dépenses
            </p>
            <p className="text-lg font-bold font-mono text-foreground mt-1">{formatCurrency(totalDepenses)}</p>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="flex bg-surface border border-border rounded-xl p-1 mb-6">
        <button 
          onClick={() => setActiveTab('BILAN')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${activeTab === 'BILAN' ? 'bg-background shadow-sm text-foreground' : 'text-muted'}`}
        >
          Toutes
        </button>
        <button 
          onClick={() => setActiveTab('REVENUS')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${activeTab === 'REVENUS' ? 'bg-secondary/10 text-secondary shadow-sm' : 'text-muted'}`}
        >
          Revenus
        </button>
        <button 
          onClick={() => setActiveTab('DEPENSES')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${activeTab === 'DEPENSES' ? 'bg-danger/10 text-danger shadow-sm' : 'text-muted'}`}
        >
          Dépenses
        </button>
      </div>



      {/* Transactions List */}
      <section className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted mb-2">Historique</h3>
        {getFilteredTransactions().length === 0 ? (
          <div className="text-center py-8 text-muted border border-dashed border-border rounded-xl">
            <p className="text-sm font-medium">Aucune transaction trouvée.</p>
          </div>
        ) : (
          getFilteredTransactions().map(t => (
            <div 
              key={t.id} 
              onClick={() => navigate(`/finance/modifier/${t.id}`)}
              className="bg-surface border border-border rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:border-primary/30 active:scale-[0.99] transition-all"
            >
              <div className={`p-3 rounded-full flex-shrink-0 ${t.type === 'INCOME' ? 'bg-secondary/10 text-secondary' : 'bg-danger/10 text-danger'}`}>
                {t.type === 'INCOME' ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-foreground">{t.category}</h4>
                  <span className={`font-mono font-bold ${t.type === 'INCOME' ? 'text-secondary' : 'text-danger'}`}>
                    {t.type === 'INCOME' ? '+' : '-'}{formatCurrency(t.amount)}
                  </span>
                </div>
                <p className="text-sm text-muted mt-0.5 line-clamp-1">{t.description}</p>
                <p className="text-xs text-muted font-mono mt-1">{t.date}</p>
              </div>
            </div>
          ))
        )}
      </section>

      {/* FAB for quick actions */}
      <FAB 
        actions={[
          {
            icon: <TrendingUp className="w-5 h-5" />,
            label: 'Nouveau revenu',
            onClick: () => navigate('/finance/nouvelle'),
            variant: 'secondary'
          },
          {
            icon: <TrendingDown className="w-5 h-5" />,
            label: 'Nouvelle dépense',
            onClick: () => navigate('/finance/nouvelle'),
            variant: 'warning'
          }
        ]}
        mainIcon={<Plus className="w-6 h-6" />}
      />
    </>
  );
};
