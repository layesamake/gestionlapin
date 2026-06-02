import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useStore } from '../store/useStore';

export const generatePDFRegister = () => {
  const state = useStore.getState();
  const doc = new jsPDF();
  
  // Titre
  doc.setFontSize(20);
  doc.setTextColor(33, 37, 41);
  doc.text('Registre d\'élevage - Gestion Lapins', 14, 22);
  
  // Date et informations
  doc.setFontSize(10);
  doc.setTextColor(108, 117, 125);
  doc.text(`Généré le : ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}`, 14, 30);
  
  let currentY = 40;

  // 1. Inventaire du Cheptel
  doc.setFontSize(14);
  doc.setTextColor(33, 37, 41);
  doc.text('1. Inventaire du Cheptel', 14, currentY);
  
  const cheptelData = state.animals.map(a => [
    a.id,
    a.name || '-',
    a.gender === 'M' ? 'Mâle' : 'Femelle',
    a.race || '-',
    a.status,
    a.location
  ]);

  autoTable(doc, {
    startY: currentY + 5,
    head: [['ID', 'Nom', 'Sexe', 'Race', 'Statut', 'Emplacement']],
    body: cheptelData,
    theme: 'striped',
    headStyles: { fillColor: [40, 167, 69] }, // Brand primary color approx
    styles: { fontSize: 9 }
  });
  
  currentY = (doc as any).lastAutoTable.finalY + 15;

  // 2. Historique des Saillies
  if (currentY > 250) {
    doc.addPage();
    currentY = 20;
  }
  doc.setFontSize(14);
  doc.text('2. Historique des Saillies', 14, currentY);
  
  const sailliesData = state.saillies.map(s => [
    s.id.toString(),
    s.female,
    s.male,
    s.date,
    s.expectedDate || '-',
    s.status
  ]);

  autoTable(doc, {
    startY: currentY + 5,
    head: [['N°', 'Femelle', 'Mâle', 'Date Saillie', 'Prévu le', 'Statut']],
    body: sailliesData,
    theme: 'striped',
    headStyles: { fillColor: [23, 162, 184] },
    styles: { fontSize: 9 }
  });

  currentY = (doc as any).lastAutoTable.finalY + 15;

  // 3. Portées
  if (currentY > 250) {
    doc.addPage();
    currentY = 20;
  }
  doc.setFontSize(14);
  doc.text('3. Suivi des Portées', 14, currentY);
  
  const porteesData = state.portees.map(p => [
    p.id,
    p.female,
    p.effectif,
    p.age || '-',
    p.sevrage || '-',
    p.status
  ]);

  autoTable(doc, {
    startY: currentY + 5,
    head: [['ID Portée', 'Mère', 'Effectif', 'Âge', 'Sevrage', 'Statut']],
    body: porteesData,
    theme: 'striped',
    headStyles: { fillColor: [255, 193, 7] },
    styles: { fontSize: 9 }
  });

  currentY = (doc as any).lastAutoTable.finalY + 15;

  // 4. Bilan Financier (Transactions)
  if (currentY > 250) {
    doc.addPage();
    currentY = 20;
  }
  doc.setFontSize(14);
  doc.text('4. Bilan Financier', 14, currentY);
  
  const transactionsData = state.transactions.map(t => [
    new Date(t.date).toLocaleDateString('fr-FR'),
    t.type === 'INCOME' ? 'Revenu' : 'Dépense',
    t.category,
    t.description,
    `${t.amount} FCFA`
  ]);

  autoTable(doc, {
    startY: currentY + 5,
    head: [['Date', 'Type', 'Catégorie', 'Description', 'Montant']],
    body: transactionsData,
    theme: 'striped',
    headStyles: { fillColor: [108, 117, 125] },
    styles: { fontSize: 9 },
    didParseCell: function(data) {
      if (data.section === 'body' && data.column.index === 1) {
        if (data.cell.raw === 'Revenu') {
          data.cell.styles.textColor = [40, 167, 69]; // Vert
          data.cell.styles.fontStyle = 'bold';
        } else {
          data.cell.styles.textColor = [220, 53, 69]; // Rouge
          data.cell.styles.fontStyle = 'bold';
        }
      }
    }
  });

  // Somme totale finance
  const totalRevenus = state.transactions.filter(t => t.type === 'INCOME').reduce((sum, t) => sum + t.amount, 0);
  const totalDepenses = state.transactions.filter(t => t.type === 'EXPENSE').reduce((sum, t) => sum + t.amount, 0);
  const solde = totalRevenus - totalDepenses;
  
  currentY = (doc as any).lastAutoTable.finalY + 10;
  if (currentY > 270) {
    doc.addPage();
    currentY = 20;
  }
  doc.setFontSize(11);
  doc.setTextColor(33, 37, 41);
  doc.text(`Total Revenus : ${totalRevenus} FCFA`, 14, currentY);
  doc.text(`Total Dépenses : ${totalDepenses} FCFA`, 14, currentY + 7);
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  if (solde >= 0) {
    doc.setTextColor(40, 167, 69);
  } else {
    doc.setTextColor(220, 53, 69);
  }
  doc.text(`Solde Global : ${solde} FCFA`, 14, currentY + 16);

  // Sauvegarde
  doc.save(`registre-elevage-${new Date().toISOString().split('T')[0]}.pdf`);
};
