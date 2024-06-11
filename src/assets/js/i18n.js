async function loadTranslations(lang) {
    const response = await fetch(`./locales/${lang}.json`);
    return response.json();
}

function setTranslations(translations) {
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        el.firstChild.textContent = translations[key] || el.firstChild.textContent;
    });
}

function getLangFromLocalStorage() {
    return localStorage.getItem('lang') || getPreferredLanguage();
}

function setLangInLocalStorage(lang) {
    localStorage.setItem('lang', lang);
}

function updateSelectLang(lang) {
    const selectElement = document.getElementById('lang-'+lang);
    selectElement.click();
}

async function changeLang(lang){
    setLangInLocalStorage(lang);
    const translations = await loadTranslations(lang);
    setTranslations(translations);
}

function getPreferredLanguage() {
    const languages = navigator.languages || [navigator.language || navigator.userLanguage];
    for (let lang of languages) {
        if (lang.startsWith("fr")) return "fr";
        if (lang.startsWith("es")) return "es";
    }
    return 'fr';
}

document.addEventListener('DOMContentLoaded', async () => {
    const customSelect = document.querySelector(".custom-select-language");
    const customSelectTrigger = customSelect.querySelector(".custom-select-trigger");
    const customOptions = customSelect.querySelector(".custom-options");
    const customOptionElements = customOptions.querySelectorAll(".custom-option");

    customSelectTrigger.addEventListener("click", function() {
        customSelect.classList.toggle("open");
    });

    customOptionElements.forEach(function(option) {
        option.addEventListener("click", function() {
            customSelectTrigger.innerHTML = option.innerHTML;
            customSelect.classList.remove("open");
        });
    });

    document.addEventListener("click", function(e) {
        if (!customSelect.contains(e.target)) {
            customSelect.classList.remove("open");
        }
    });

    let lang = getLangFromLocalStorage();
    updateSelectLang(lang);
    const translations = await loadTranslations(lang);
    setTranslations(translations);
});