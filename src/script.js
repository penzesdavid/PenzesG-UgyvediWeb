const mobileToggle = document.querySelector('#mobile-menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');
const menuIcon = document.querySelector('#menu-icon');
const closeIcon = document.querySelector('#close-icon');
const menuItems = document.querySelectorAll('.mobile-nav-link, .btn-mobile-consult');

const syncMobileMenuUi = () => {
    const isOpen = mobileMenu.classList.contains('active');
    mobileToggle.setAttribute('aria-expanded', String(isOpen));
    mobileToggle.setAttribute('aria-label', isOpen ? 'Menü bezárása' : 'Menü megnyitása');
    menuIcon.classList.toggle('hidden', isOpen);
    closeIcon.classList.toggle('hidden', !isOpen);
};

mobileToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    syncMobileMenuUi();
});

menuItems.forEach((item) => {
    item.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        syncMobileMenuUi();
    });
});

document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        mobileMenu.classList.remove('active');
        syncMobileMenuUi();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        syncMobileMenuUi();
        mobileToggle.focus();
    }
});

window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 768px)').matches && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        syncMobileMenuUi();
    }
});

syncMobileMenuUi();

// Scroll Reveal
const revealElements = document.querySelectorAll('.reveal');
const revealOnScroll = () => {
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
            el.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initial check

//Cookie Consent
// Ez a rész a cookie consent kezeléséért felelős


document.addEventListener("DOMContentLoaded", () => {
    // --- ELEMEK KIJELÖLÉSE ---
    const cookieBanner = document.querySelector(".cookie");
    const cookieModal = document.getElementById("cookie-modal");
    
    const acceptAllBtn = document.getElementById("cookie-elfogad");
    const openSettingsBtn = document.getElementById("cookie-beallitasok");
    const saveSettingsBtn = document.getElementById("save-settings");
    const mapsCheckbox = document.getElementById("check-maps");
    
    // Opcionális: láblécben elhelyezett "Módosítás" linkhez
    const reopenBtn = document.getElementById("reopen-cookie-settings");

    const mapFrame = document.getElementById("google-map");
    const mapPlaceholder = document.getElementById("map-placeholder");

    // --- 1. FUNKCIÓ: TARTALOM AKTIVÁLÁSA ---
    function activateContent() {
        if (mapFrame && mapFrame.getAttribute('data-src')) {
            // Csak akkor töltjük be az src-t, ha még üres vagy más
            if (mapFrame.src !== mapFrame.getAttribute('data-src')) {
                mapFrame.src = mapFrame.getAttribute('data-src');
            }
            mapFrame.style.display = "block";
            if (mapPlaceholder) mapPlaceholder.style.display = "none";
        }
        // Ha később lesz Google Analytics, annak az indító kódja is ide jön
    }

    // --- 2. FUNKCIÓ: TARTALOM ELREJTÉSE (Visszavonás esetén) ---
    function deactivateContent() {
        if (mapFrame) {
            mapFrame.style.display = "none";
            mapFrame.src = ""; // Megállítjuk a hálózati forgalmat
            if (mapPlaceholder) mapPlaceholder.style.display = "flex";
        }
    }

    // --- 3. ALAPÉRTELMEZETT ÁLLAPOT ELLENŐRZÉSE ---
    const currentConsent = localStorage.getItem("cookieConsent");

    if (currentConsent === "accepted") {
        if (cookieBanner) cookieBanner.style.display = "none";
        if (mapsCheckbox) mapsCheckbox.checked = true;
        activateContent();
    } else if (currentConsent === "rejected") {
        if (cookieBanner) cookieBanner.style.display = "flex";
        if (mapsCheckbox) mapsCheckbox.checked = false;
        deactivateContent();
    }

    // --- 4. ESEMÉNYKEZELŐK ---

    // "Elfogadom" gomb a fő banneren
    if (acceptAllBtn) {
        acceptAllBtn.addEventListener("click", () => {
            localStorage.setItem("cookieConsent", "accepted");
            if (mapsCheckbox) mapsCheckbox.checked = true;
            cookieBanner.style.display = "none";
            activateContent();
        });
    }

    // "Süti beállítások" megnyitása
    if (openSettingsBtn) {
        openSettingsBtn.addEventListener("click", () => {
            cookieModal.style.display = "block";
        });
    }

    // "Módosítás" link a láblécben
    if (reopenBtn) {
        reopenBtn.addEventListener("click", (e) => {
            e.preventDefault();
            cookieModal.style.display = "block";
        });
    }

    // "Mentés" gomb a modálban
    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener("click", () => {
            if (mapsCheckbox && mapsCheckbox.checked) {
                localStorage.setItem("cookieConsent", "accepted");
                activateContent();
            } else {
                localStorage.setItem("cookieConsent", "rejected");
                deactivateContent();
            }
            
            cookieModal.style.display = "none";
            if (cookieBanner) cookieBanner.style.display = "none";
        });
    }

    // Modál bezárása ha mellé kattintanak
    window.addEventListener("click", (event) => {
        if (event.target === cookieModal) {
            cookieModal.style.display = "none";
        }
    });
});