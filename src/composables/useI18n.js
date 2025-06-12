import { ref, watch } from 'vue';

export const translations = {
    en: {
        title: 'How much time until the weekend?',
        note: 'Weekend starts on Friday at 6:00 PM',
        d: 'd',
        h: 'h',
        m: 'm',
        metaTitle: 'Countdown to the Weekend',
        metaDescription: 'Find out how much time is left until the weekend. A simple and fast way to countdown to relaxation.'
    },
    it: {
        title: 'Quanto manca al weekend?',
        note: 'Il weekend inizia venerdì alle 18:00',
        d: 'g',
        h: 'h',
        m: 'm',
        metaTitle: 'Countdown Weekend',
        metaDescription: 'Scopri quanto manca al weekend con Countdown Weekend. Una pagina semplice e veloce per rilassarsi.'
    },
    fr: {
        title: 'Combien de temps avant le week-end ?',
        note: 'Le week-end commence vendredi à 18h00',
        d: 'j',
        h: 'h',
        m: 'm',
        metaTitle: 'Compte à rebours du week-end',
        metaDescription: 'Découvrez combien de temps il reste avant le week-end. Un outil simple et rapide pour se détendre.'
    },
    vn: {
        title: 'Còn bao lâu nữa đến cuối tuần?',
        note: 'Cuối tuần bắt đầu vào thứ Sáu lúc 18:00',
        d: 'n',
        h: 'g',
        m: 'p',
        metaTitle: 'Đếm ngược đến cuối tuần',
        metaDescription: 'Xem còn bao lâu nữa là đến cuối tuần. Một trang đơn giản, nhanh chóng để đếm ngược đến lúc nghỉ ngơi.'
    }
};

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

export function useI18n() {
    return {
        lang,
        t,
        setLang,
        availableLangs: Object.keys(translations)
    };
}