/**
 * i18n.js — Sistema di internazionalizzazione leggero per il portfolio
 * Supporta: IT (default) e EN
 * Uso: aggiungi data-i18n="sezione.chiave" agli elementi HTML
 *      aggiungi data-i18n-html="sezione.chiave" per contenuti con HTML (es. bio)
 *      aggiungi data-i18n-aria="sezione.chiave" per aria-label
 */

const SUPPORTED_LANGS = ['it', 'en'];
const DEFAULT_LANG = 'it';

/**
 * Restituisce la lingua corrente da localStorage,
 * oppure quella del browser se supportata, altrimenti il default.
 */
function getCurrentLang() {
    const stored = localStorage.getItem('lang');
    if (stored && SUPPORTED_LANGS.includes(stored)) return stored;

    const browser = navigator.language.slice(0, 2).toLowerCase();
    return SUPPORTED_LANGS.includes(browser) ? browser : DEFAULT_LANG;
}

/**
 * Naviga nel JSON usando una chiave dotted (es. "hero.greeting")
 */
function getNestedValue(obj, key) {
    return key.split('.').reduce((acc, part) => acc && acc[part], obj);
}

/**
 * Applica le traduzioni a tutta la pagina
 */
function applyTranslations(translations, lang) {
    // Attributo lang sull'elemento <html>
    document.documentElement.lang = lang;

    // Testo semplice: data-i18n="chiave"
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const value = getNestedValue(translations, key);
        if (value !== undefined) el.textContent = value;
    });

    // HTML interno: data-i18n-html="chiave" (per la bio con <strong> ecc.)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const key = el.getAttribute('data-i18n-html');
        const value = getNestedValue(translations, key);
        if (value !== undefined) el.innerHTML = value;
    });

    // aria-label: data-i18n-aria="chiave"
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
        const key = el.getAttribute('data-i18n-aria');
        const value = getNestedValue(translations, key);
        if (value !== undefined) el.setAttribute('aria-label', value);
    });

    // Meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        const val = getNestedValue(translations, 'meta.description');
        if (val) metaDesc.setAttribute('content', val);
    }

    // Aggiorna l'icona/testo del bottone lingua
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
        langBtn.textContent = lang === 'it' ? '🇬🇧 EN' : '🇮🇹 IT';
        langBtn.setAttribute('aria-label', lang === 'it' ? 'Switch to English' : 'Passa all\'italiano');
    }

    // Aggiorna le stringhe del typewriter se già inizializzato
    if (typeof updateTypewriterRoles === 'function') {
        updateTypewriterRoles(translations);
    }
}

/**
 * Carica il file JSON della lingua e applica le traduzioni
 */
async function loadLanguage(lang) {
    try {
        // Calcola il percorso relativo correttamente sia da index.html che da src/*.html
        const isSubpage = window.location.pathname.includes('/src/');
        const base = isSubpage ? '../' : './';
        const response = await fetch(`${base}src/i18n/${lang}.json`);
        if (!response.ok) throw new Error(`Cannot load ${lang}.json`);
        const translations = await response.json();
        applyTranslations(translations, lang);
        localStorage.setItem('lang', lang);
        // Salva le traduzioni in memoria per riuso (es. typewriter)
        window._i18nTranslations = translations;
        window._i18nLang = lang;
    } catch (err) {
        console.warn(`[i18n] Errore nel caricamento di ${lang}:`, err);
    }
}

/**
 * Cambia la lingua corrente (toggle IT ↔ EN)
 */
function toggleLang() {
    const current = getCurrentLang();
    const next = current === 'it' ? 'en' : 'it';
    loadLanguage(next);
}

// Avvia il sistema al caricamento del DOM
document.addEventListener('DOMContentLoaded', () => {
    loadLanguage(getCurrentLang());
});
