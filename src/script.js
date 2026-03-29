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