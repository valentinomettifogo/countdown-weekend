<template>
    <div class="lang-wrapper" @click.outside="closeMenu">
        <div class="lang-toggle" @click="toggleMenu" :title="t('changeLanguage')">
            <img :src="flagSrc" class="flag" />
        </div>

        <div v-if="isOpen" class="dropdown">
            <div class="option" v-for="code in availableLangs" :key="code" @click="changeLang(code)">
                <img :src="getFlagSrc(code)" class="flag" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../composables/useI18n.js'

const { lang, setLang, availableLangs, t, flags } = useI18n()
const isOpen = ref(false)
const flagSrc = computed(() => flags[lang.value] || flags['en']);

function toggleMenu(event) {
  event.stopPropagation()
  isOpen.value = !isOpen.value
}

function closeMenu() {
  isOpen.value = false
}

function changeLang(code) {
  setLang(code)
  isOpen.value = false
}

function getFlagSrc(code) {
  return flags[code] || flags['en'];
}
</script>

<style scoped>
.lang-wrapper {
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 100;
}

.lang-toggle {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    padding: 0.5rem;
    cursor: pointer;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: var(--shadow-subtle);
}

.lang-toggle:hover {
    border-color: var(--color-accent);
    transform: translateY(-1px);
    box-shadow: var(--shadow-soft);
}

.dropdown {
    position: absolute;
    top: 3rem;
    right: 0;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    box-shadow: var(--shadow-soft);
    z-index: 1000;
    padding: 0.25rem;
    min-width: 2.5rem;
}

.option {
    padding: 0.5rem;
    cursor: pointer;
    border-radius: calc(var(--radius-sm) - 2px);
    transition: background-color 0.15s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.option:hover {
    background-color: var(--color-background);
}

.flag {
    width: 1.5rem;
    height: 1.5rem;
    object-fit: cover;
    border-radius: 2px;
}
</style>
