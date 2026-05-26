// Common utilities and alert system
const AlertManager = {
    show(message, type = 'success', duration = 3000) {
        const alertId = `alert-${Date.now()}`;
        const alert = document.createElement('div');
        alert.id = alertId;
        alert.className = `common-alert alert-${type}`;
        alert.setAttribute('role', 'alert');
        alert.innerHTML = `
            <div class="alert-content">
                <span class="alert-icon">${this.getIcon(type)}</span>
                <span class="alert-message">${message}</span>
                <button class="alert-close" aria-label="Close alert">&times;</button>
            </div>
        `;

        document.body.appendChild(alert);

        // Close button functionality
        alert.querySelector('.alert-close').addEventListener('click', () => {
            alert.remove();
        });

        // Auto remove after duration
        if (duration > 0) {
            setTimeout(() => {
                if (alert.parentElement) {
                    alert.remove();
                }
            }, duration);
        }

        return alert;
    },

    getIcon(type) {
        const icons = {
            success: '✓',
            error: '✕',
            info: 'ℹ',
            warning: '⚠'
        };
        return icons[type] || '•';
    }
};

// Load cart count from localStorage
function updateCartBadge() {
    const cartCount = parseInt(localStorage.getItem('cartCount') || '0');
    const cartBadge = document.getElementById('cart-count');
    if (cartBadge) {
        cartBadge.textContent = cartCount;
        cartBadge.style.display = cartCount > 0 ? 'flex' : 'none';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();

    // Listen for cart changes
    window.addEventListener('storage', (e) => {
        if (e.key === 'cartCount') {
            updateCartBadge();
        }
    });
});
