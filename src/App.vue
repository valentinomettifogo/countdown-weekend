<template>
  <main class="app">
    <Language v-model="lang" />

    <h1>{{ t('title') }}</h1>

    <Countdown :time="timeLeft" :t="t" />
    <ProgressBar :progress="progress" :label="t('note')" />
  </main>
</template>

<script setup>
import { onMounted } from 'vue';
import Language from './components/Language.vue';
import Countdown from './components/Countdown.vue';
import ProgressBar from './components/ProgressBar.vue';
import { useHtmlMeta } from './composables/useHtmlMeta.js';
import { useI18n, translations } from './composables/useI18n.js';
import { useCountdown } from './composables/useCountdown.js';

const { lang, t } = useI18n();
useHtmlMeta(lang, translations);

const { timeLeft, progress, updateCountdown } = useCountdown();

onMounted(() => {
  updateCountdown();
  setInterval(updateCountdown, 60 * 1000);
});
</script>
