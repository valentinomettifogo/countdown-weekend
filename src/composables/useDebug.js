import { computed } from 'vue';

export function useDebug() {
  const isDev = import.meta.env.DEV;
  
  // Opzioni di debug riutilizzabili
  const createTimeOptions = (hours) => 
    hours.map(hour => ({ value: hour, label: `${hour}:00` }));
  

  
  // Reset ottimizzato
  const resetToRealTime = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };
  
  return {
    isDev,
    createTimeOptions,
    resetToRealTime
  };
}