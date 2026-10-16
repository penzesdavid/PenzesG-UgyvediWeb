// ==========================================
// Mobil Menü Kezelés
// ==========================================
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
document.documentElement.classList.add('js-reveal');
const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
} else {
    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.92) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll, { passive: true });
    window.addEventListener('resize', revealOnScroll, { passive: true });
    window.addEventListener('load', revealOnScroll);
    revealOnScroll();
}

// Vissza a tetejére gomb kezelése
const backToTopBtn = document.querySelector('#back-to-top');
if (backToTopBtn) {
    const toggleBackToTop = () => {
        if (window.scrollY > 350) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    };

    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    window.addEventListener('load', toggleBackToTop);
    document.addEventListener('DOMContentLoaded', toggleBackToTop);
    toggleBackToTop();

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


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

    // --- 5. HÁTTÉRVIDEÓ KEZELÉSE ---
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        heroVideo.muted = true;
        const playVideo = () => {
            const playPromise = heroVideo.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {});
            }
        };

        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            heroVideo.pause();
        } else {
            playVideo();
        }

        if (window.matchMedia) {
            window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
                if (e.matches) {
                    heroVideo.pause();
                } else {
                    playVideo();
                }
            });
        }
    }
});