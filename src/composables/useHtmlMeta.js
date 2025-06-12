import { watch } from 'vue';

export function useHtmlMeta(lang, translations) {
    watch(lang, (newLang) => {
        // Cambia l'attributo lang nell'html
        document.documentElement.lang = newLang;

        // Aggiorna i meta tag
        const t = translations[newLang];

        document.title = t.metaTitle;

        const description = document.querySelector('meta[name="description"]');
        if (description) description.setAttribute('content', t.metaDescription);

        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute('content', t.metaTitle);

        const ogDescription = document.querySelector('meta[property="og:description"]');
        if (ogDescription) ogDescription.setAttribute('content', t.metaDescription);

        const twitterTitle = document.querySelector('meta[name="twitter:title"]');
        if (twitterTitle) twitterTitle.setAttribute('content', t.metaTitle);

        const twitterDescription = document.querySelector('meta[name="twitter:description"]');
        if (twitterDescription) twitterDescription.setAttribute('content', t.metaDescription);
    }, { immediate: true });
}
