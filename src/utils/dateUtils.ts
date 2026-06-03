/**
 * Calcule l'âge d'un animal sous forme de chaîne de caractères lisible en français.
 * @param birthDateStr La date de naissance au format YYYY-MM-DD
 * @returns L'âge formaté (ex: "14 mois", "12 jours", "Nouveau-né")
 */
export const calculateAge = (birthDateStr?: string): string => {
  if (!birthDateStr) return 'Âge inconnu';
  const birthDate = new Date(birthDateStr);
  if (isNaN(birthDate.getTime())) return 'Date invalide';
  
  const today = new Date();
  let months = (today.getFullYear() - birthDate.getFullYear()) * 12 + today.getMonth() - birthDate.getMonth();
  
  // Ajuster si le jour du mois actuel est inférieur au jour de naissance
  if (today.getDate() < birthDate.getDate()) {
    months--;
  }
  
  if (months < 0) return 'Nouveau-né';
  
  if (months === 0) {
    const diffTime = Math.abs(today.getTime() - birthDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} jour${diffDays > 1 ? 's' : ''}`;
  }
  
  return `${months} mois`;
};
