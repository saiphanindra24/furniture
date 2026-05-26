document.addEventListener('DOMContentLoaded', () => {
    // =========================================
    // UPDATE CART COUNT BADGE
    // =========================================
    const cartCountEl = document.getElementById('cart-count');
    const updateCartCountBadge = () => {
        const cartCount = parseInt(localStorage.getItem('cartCount') || '0');
        if (cartCountEl) {
            cartCountEl.textContent = cartCount;
        }
    };
    updateCartCountBadge();

    // =========================================
    // NAVBAR ICON BUTTONS FUNCTIONALITY
    // =========================================
    const navbarIcons = document.querySelectorAll('.navbar__icons button');
    navbarIcons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const title = btn.getAttribute('title');

            if (title === 'Search') {
                window.location.href = '../Shop/index.html';
            } else if (title === 'Account') {
                window.location.href = '../checkout/contact.html';
            } else if (title === 'Wishlist') {
                window.location.href = '../Wishlist/Wishlist.html';
            } else if (title === 'Cart') {
                window.location.href = '../Home/cart.html';
            }
        });
    });

    // =========================================
    // SMOOTH SCROLL TO SECTIONS
    // =========================================
    const tocLinks = document.querySelectorAll('.policy-toc a');
    tocLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // =========================================
    // HIGHLIGHT ACTIVE TOC SECTION ON SCROLL
    // =========================================
    const sections = document.querySelectorAll('.policy-section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(s => {
            if (window.scrollY >= s.offsetTop - 100) {
                current = s.id;
            }
        });
        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
});
