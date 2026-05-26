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
    navbarIcons.forEach((btn) => {
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
    // FAQ ACCORDION
    // =========================================
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.faq-item');
            const isOpen = item.classList.contains('open');
            document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
            if (!isOpen) item.classList.add('open');
        });
    });
});
