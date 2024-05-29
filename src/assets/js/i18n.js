async function loadTranslations(lang) {
    const response = await fetch(`/locales/${lang}.json`);
    return response.json();
}

function setTranslations(translations) {
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        el.textContent = translations[key] || el.textContent;
    });
}

function getLangFromLocalStorage() {
    return localStorage.getItem('lang') || 'fr';
}

function setLangInLocalStorage(lang) {
    localStorage.setItem('lang', lang);
}

function updateSelectLang(lang) {
    const selectElement = document.getElementById('language-selector');
    selectElement.value = lang;
}

document.addEventListener('DOMContentLoaded', async () => {
    let lang = getLangFromLocalStorage();
    updateSelectLang(lang);
    const translations = await loadTranslations(lang);
    setTranslations(translations);

    document.getElementById('language-selector').addEventListener('change', async (e) => {
        lang = e.target.value;
        setLangInLocalStorage(lang);
        const translations = await loadTranslations(lang);
        setTranslations(translations);
    });
});