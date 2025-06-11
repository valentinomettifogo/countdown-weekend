<template>
  <main class="app">
    <Language v-model="lang" />


    <h1>{{ t('title') }}</h1>

    <div class="countdown">
      <span>{{ timeLeft.days }}{{ t('d') }}</span>
      <span>{{ timeLeft.hours }}{{ t('h') }}</span>
      <span>{{ timeLeft.minutes }}{{ t('m') }}</span>
    </div>

    <ProgressBar :progress="progress" :label="t('note')" />

  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import Language from './components/Language.vue'
import ProgressBar from './components/ProgressBar.vue'


// === LANGUAGE LOGIC ===
const lang = ref('en');

const translations = {
  en: {
    title: 'How much time until the weekend?',
    note: 'Weekend starts on Friday at 6:00 PM',
    d: 'd',
    h: 'h',
    m: 'm'
  },
  it: {
    title: 'Quanto manca al weekend?',
    note: 'Il weekend inizia venerdì alle 18:00',
    d: 'g',
    h: 'h',
    m: 'm'
  },
  fr: {
    title: 'Combien de temps avant le week-end ?',
    note: 'Le week-end commence vendredi à 18h00',
    d: 'j',
    h: 'h',
    m: 'm'
  },
  vn: {
    title: 'Còn bao lâu nữa đến cuối tuần?',
    note: 'Cuối tuần bắt đầu vào thứ Sáu lúc 18:00',
    d: 'n',
    h: 'g',
    m: 'p'
  }
};


const t = (key) => translations[lang.value][key] || key;

const toggleLanguage = () => {
  lang.value = lang.value === 'en' ? 'it' : 'en';
};

// === COUNTDOWN LOGIC ===
const timeLeft = ref({ days: 0, hours: 0, minutes: 0 });
const progress = ref(0);

function getNextWeekendStart() {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday ... 6 = Saturday
  const target = new Date(now);

  const daysUntilFriday = (5 - day + 7) % 7;
  target.setDate(now.getDate() + daysUntilFriday);
  target.setHours(18, 0, 0, 0); // Friday at 18:00

  if (now > target) {
    target.setDate(target.getDate() + 7);
  }

  return target;
}

function updateCountdown() {
  const now = new Date();
  const weekendStart = getNextWeekendStart();

  const diffMs = weekendStart - now;
  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  timeLeft.value = {
    days,
    hours: hours % 24,
    minutes: minutes % 60
  };

  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - ((now.getDay() + 6) % 7)); // Monday
  weekStart.setHours(0, 0, 0, 0);

  const totalWeekMs = getNextWeekendStart() - weekStart;
  const elapsedMs = now - weekStart;

  progress.value = Math.min(100, Math.floor((elapsedMs / totalWeekMs) * 100));
}

onMounted(() => {
  updateCountdown();
  setInterval(updateCountdown, 60 * 1000);
});
</script>

<style scoped>
.countdown {
  font-size: 2.5rem;
  font-weight: 600;
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
}
</style>
