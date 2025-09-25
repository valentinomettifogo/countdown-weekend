/**
 * 🚀 Performance Optimizations Summary
 * 
 * Ottimizzazioni implementate per migliorare le performance dell'app:
 */

// 1. 🧹 MEMORY LEAK FIXES
// - Aggiunto onUnmounted() per cleanup degli interval
// - Gestione corretta delle risorse

// 2. ⚡ COMPUTED OPTIMIZATIONS  
// - Memoizzazione migliorata con computed()
// - Evitati re-calcoli inutili
// - Centralizzati stati computati

// 3. 🔄 PURE FUNCTIONS
// - Funzioni pure per calcoli data/tempo
// - Costanti estratte per performance
// - Ridotti side effects

// 4. 📦 CODE SPLITTING
// - Composables specializzati e riutilizzabili
// - Separazione di responsabilità
// - Bundle size ottimizzato

// 5. 🎯 PROP OPTIMIZATIONS
// - v-bind con oggetti per ridurre props
// - Computed props centralizati
// - Evitata prop drilling

// 6. 💾 CACHING STRATEGIES
// - Costanti per valori fissi
// - Computed cache per expensive operations
// - Date operations ottimizzate

export const PERFORMANCE_CONSTANTS = {
  // Timing
  UPDATE_INTERVAL: 60 * 1000, // 1 minuto
  WEEKEND_START_HOUR: 18,
  
  // Date calculations
  MS_PER_MINUTE: 1000 * 60,
  MINUTES_PER_HOUR: 60,
  HOURS_PER_DAY: 24,
  DAYS_IN_WEEK: 7,
  
  // Weekend days
  FRIDAY: 5,
  SUNDAY: 0,
  
  // Debug
  DEFAULT_TEST_HOURS: [2, 6, 8, 12, 14, 18, 20, 22]
};

// Utility per performance monitoring (solo in dev)
export const createPerformanceMonitor = () => {
  if (import.meta.env.DEV) {
    const timers = {};
    
    return {
      start: (label) => {
        timers[label] = performance.now();
      },
      end: (label) => {
        if (timers[label]) {
          const duration = performance.now() - timers[label];
          console.log(`⏱️ ${label}: ${duration.toFixed(2)}ms`);
          delete timers[label];
        }
      }
    };
  }
  
  return { start: () => {}, end: () => {} };
};