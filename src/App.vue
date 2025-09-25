<template>

  <Sky :hour="hour" :sunrise="sunrise" :sunset="sunset" />
  <Language v-model="lang" />

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
import { onMounted } from 'vue';

// Components 
import Language from './components/Language.vue';
import Countdown from './components/Countdown.vue';
import ProgressBar from './components/ProgressBar.vue';
import Footer from './components/Footer.vue'
import Sky from './components/Sky.vue'

// Composable
import { useHtmlMeta } from './composables/useHtmlMeta.js';
import { useI18n } from './composables/useI18n.js';
import { useCountdown } from './composables/useCountdown.js';
import { useSunTimes } from './composables/useSunTimes.js'


const { lang, t } = useI18n();
useHtmlMeta(lang);
const { timeLeft, progress, isWeekend, updateCountdown } = useCountdown();

onMounted(() => {
  updateCountdown();
  setInterval(updateCountdown, 60 * 1000);
});

const { hour, sunrise, sunset } = useSunTimes();
// console.log(`hour: ${hour.value}, sunrise: ${sunrise.value}, sunset: ${sunset.value}`);

// onMounted(() => {
//   initWithGeolocation();
// });
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