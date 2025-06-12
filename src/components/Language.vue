<template>
    <div class="lang-wrapper" @click.outside="closeMenu">
        <div class="lang-toggle" @click="toggleMenu" :title="tooltip">
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

const { lang, setLang, availableLangs } = useI18n()

const isOpen = ref(false)

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

const tooltip = computed(() => {
    switch (lang.value) {
        case 'it':
            return 'Cambia lingua'
        case 'fr':
            return 'Changer la langue'
        case 'vn':
            return 'Thay đổi ngôn ngữ'
        default:
            return 'Change language'
    }
})

const flagSrc = computed(() => getFlagSrc(lang.value))

function getFlagSrc(code) {
    switch (code) {
        case 'it':
            return '/flags/flag-it-svgrepo-com.svg'
        case 'fr':
            return '/flags/flag-fra-svgrepo-com.svg'
        case 'vn':
            return '/flags/flag-vn-svgrepo-com.svg'
        case 'en':
        default:
            return '/flags/flag-us-svgrepo-com.svg'
    }
}
</script>

<style scoped>
.lang-wrapper {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
}

.lang-toggle {
    background-color: transparent;
    padding: 0;
    cursor: pointer;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.dropdown {
    position: absolute;
    top: 50px;
    right: 0;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 6px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    padding: 4px;
    gap: 4px;
}

.option {
    padding: 0;
    cursor: pointer;
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
}

.flag {
    width: 36px;
    height: 36px;
    object-fit: cover;
}
</style>
