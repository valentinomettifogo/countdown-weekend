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
  font-size: 1.8rem;
  font-weight: bold;
  color: #ffffff;
  text-shadow: 1px 1px 2px #000000aa;
  text-align: center;
  padding: 1rem;
  border-radius: 12px;
  /* background: linear-gradient(135deg, #ffe082, #ff8a65, #f06292); */
  animation: flash 1s infinite, pop 3s infinite alternate;
  box-shadow: 0 0 10px #ff4081, 0 0 20px #ff80ab;
}

@keyframes flash {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}

@keyframes pop {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(1.05) rotate(1deg);
  }
}
</style>