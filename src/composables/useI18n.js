import { ref, watch } from 'vue';
import translations from '../assets/translations.json';

function getInitialLang() {
    const stored = localStorage.getItem('lang');
    if (stored && translations[stored]) return stored;

    const browserLang = navigator.language.slice(0, 2);
    if (translations[browserLang]) return browserLang;

    return 'en';
}

const lang = ref(getInitialLang());

watch(lang, (newLang) => {
    localStorage.setItem('lang', newLang);
});

const t = (key) => translations[lang.value][key] || key;

function setLang(newLang) {
    if (translations[newLang]) {
        lang.value = newLang;
    }
}

export const flags = Object.fromEntries(
  Object.entries(translations).map(([code, data]) => [code, data.flag])
);

export function useI18n() {
    return {
        lang,
        t,
        setLang,
        availableLangs: Object.keys(translations),
        flags
    };
}
