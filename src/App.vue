<template>

  <Sky v-bind="skyProps" />
  <Language v-model="lang" />

  <!-- 🧪 Pannello di Testing (visibile solo in dev) -->
  <DebugPanel 
    title="Time Tester"
    :options="debugOptions"
    :current-value="hour"
    :info="debugInfo"
    reset-label="Real Time"
    @option-selected="handleDebugOption"
    @reset="handleDebugReset"
  />

  <main class="app">
    
    <h1>{{ t('title') }}</h1>

    <template v-if="isWeekend">
      <p class="weekend-msg">🎉 {{ t('weekend') }} 🎉</p>
    </template>
    <template v-else>
      <Countdown :time="timeLeft" :t="t" />
    </template>

    <ProgressBar :progress="progress" :label="t('note')" />

  </main>

  <Footer />

</template>

<script setup>
import { onMounted, onUnmounted, computed } from 'vue';

// Components 
import Language from './components/Language.vue';
import Countdown from './components/Countdown.vue';
import ProgressBar from './components/ProgressBar.vue';
import Footer from './components/Footer.vue'
import Sky from './components/Sky.vue'
import DebugPanel from './components/DebugPanel.vue'

// Composables
import { useHtmlMeta } from './composables/useHtmlMeta.js';
import { useI18n } from './composables/useI18n.js';
import { useCountdown } from './composables/useCountdown.js';
import { useSkyState } from './composables/useSkyState.js';
import { useDebug } from './composables/useDebug.js';

// Core app state
const { lang, t } = useI18n();
useHtmlMeta(lang);
const { timeLeft, progress, isWeekend, updateCountdown } = useCountdown();

// Sky state unified
const { hour, sunrise, sunset, setTestHour, initApproximateLocation, isDay, skyProps } = useSkyState();

// Debug utilities
const { createTimeOptions, resetToRealTime } = useDebug();

// 🧪 Debug setup ottimizzato
const debugOptions = createTimeOptions([2, 6, 8, 12, 14, 18, 20, 22]);
const debugInfo = computed(() => 
  `Current: ${hour.value}:00 | Sunrise: ${sunrise.value}:00 | Sunset: ${sunset.value}:00 | ${isDay.value ? '☀️ Day' : '🌙 Night'}`
);

// Handlers ottimizzati
const handleDebugOption = (testHour) => setTestHour(testHour);
const handleDebugReset = () => resetToRealTime();

// Gestione lifecycle ottimizzata
let countdownInterval = null;

onMounted(() => {
  initApproximateLocation();
  updateCountdown();
  
  // Cleanup automatico dell'interval
  countdownInterval = setInterval(updateCountdown, 60 * 1000);
});

// Cleanup quando il componente viene smontato
onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval);
    countdownInterval = null;
  }
});
</script>

<style scoped>
.weekend-msg {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-success);
  text-align: center;
  padding: 1.5rem;
  border: 2px solid var(--color-success);
  border-radius: var(--radius-md);
  background: rgba(16, 185, 129, 0.05);
  animation: gentle-pulse 2s ease-in-out infinite alternate;
  margin: 0;
}

@keyframes gentle-pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  
  100% {
    transform: scale(1.02);
    opacity: 0.9;
  }
}

@media (max-width: 640px) {
  .weekend-msg {
    font-size: 1.25rem;
    padding: 1rem;
  }
}
</style>