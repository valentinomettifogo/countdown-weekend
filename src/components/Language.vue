<template>
    <div class="lang-wrapper" @click.outside="closeMenu">
        <div class="lang-toggle" @click="toggleMenu" :title="tooltip">
            <img :src="flagSrc" class="flag" />
        </div>


        <div v-if="isOpen" class="dropdown">
            <div class="option" @click="setLanguage('en')">
                <img src="/flags/flag-us-svgrepo-com.svg" class="flag" />
            </div>
            <div class="option" @click="setLanguage('it')">
                <img src="/flags/flag-it-svgrepo-com.svg" class="flag" />
            </div>
            <div class="option" @click="setLanguage('fr')">
                <img src="/flags/flag-fra-svgrepo-com.svg" class="flag" />
            </div>
            <div class="option" @click="setLanguage('vn')">
                <img src="/flags/flag-vn-svgrepo-com.svg" class="flag" />
            </div>

        </div>

    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// props e emit per v-model
const props = defineProps({ modelValue: String })
const emit = defineEmits(['update:modelValue'])

// stato apertura menu
const isOpen = ref(false)

// toggle menu on/off
function toggleMenu(event) {
    event.stopPropagation() // evita che il click si propaghi e chiuda subito il menu
    isOpen.value = !isOpen.value
}

// chiudi menu
function closeMenu() {
    isOpen.value = false
}

// cambia lingua e chiudi menu
function setLanguage(langCode) {
    emit('update:modelValue', langCode)
    isOpen.value = false
}

// tooltip in base a lingua attuale
const tooltip = computed(() =>
    'Change language'
)

const flagSrc = computed(() => {
  switch (props.modelValue) {
    case 'en':
      return '/flags/flag-us-svgrepo-com.svg'
    case 'it':
      return '/flags/flag-it-svgrepo-com.svg'
    case 'fr':
      return '/flags/flag-fra-svgrepo-com.svg'
    case 'vn':
      return '/flags/flag-vn-svgrepo-com.svg'
    default:
      return '/flags/flag-us-svgrepo-com.svg'
  }
})

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
    box-shadow: none;
    border-radius: 0;
    transition: none;
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
    width: auto;
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
