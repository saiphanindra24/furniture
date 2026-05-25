document.addEventListener('DOMContentLoaded', () => {
    // 1. Redirect to contact page when clicking on 'Contact' links
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        if (link.textContent.trim() === 'Contact') {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = 'contact.html';
            });
        }
    });

    function parsePrice(priceStr) {
        if (!priceStr) return 0;
        if (typeof priceStr === 'number') return priceStr;
        let cleaned = priceStr.replace(/[^0-9.,]/g, '').trim();
        if (cleaned.endsWith('.00') || cleaned.endsWith(',00')) {
            cleaned = cleaned.substring(0, cleaned.length - 3);
        } else if (cleaned.endsWith('.0') || cleaned.endsWith(',0')) {
            cleaned = cleaned.substring(0, cleaned.length - 2);
        }
        cleaned = cleaned.replace(/[^0-9]/g, '');
        return parseInt(cleaned) || 0;
    }

    // 2. Load and render dynamic order summary from localStorage
    function renderOrderSummary() {
        const summaryContainer = document.querySelector('.order-summary');
        if (!summaryContainer) return;

        // Load cart items
        let cart = [];
        try {
            const rawCart = localStorage.getItem('cart') || localStorage.getItem('cartItems');
            if (rawCart) {
                cart = JSON.parse(rawCart);
                if (!Array.isArray(cart)) cart = [];
            }
        } catch (e) {
            console.error("Failed to load cart in checkout:", e);
        }

        // Remove any existing summary-item elements
        const existingItems = summaryContainer.querySelectorAll('.summary-item');
        existingItems.forEach(item => item.remove());

        const header = summaryContainer.querySelector('.summary-header');
        let subtotal = 0;

        if (cart.length === 0) {
            const emptyEl = document.createElement('div');
            emptyEl.className = 'summary-item';
            emptyEl.innerHTML = `
                <span class="product-name" style="color: #999;">Your cart is empty.</span>
                <span class="product-price">Rs. 0.00</span>
            `;
            header.after(emptyEl);
        } else {
            // Render items in order
            let lastInserted = header;
            cart.forEach(item => {
                const numericPrice = (typeof item.price === 'number') ? item.price : parsePrice(item.price);
                const itemQty = parseInt(item.qty || item.quantity || 1, 10);
                const itemSubtotal = numericPrice * itemQty;
                subtotal += itemSubtotal;

                const itemEl = document.createElement('div');
                itemEl.className = 'summary-item';
                itemEl.innerHTML = `
                    <span class="product-name">${item.name} <span class="quantity">x ${itemQty}</span></span>
                    <span class="product-price">${formatCurrency(itemSubtotal)}</span>
                `;
                lastInserted.after(itemEl);
                lastInserted = itemEl;
            });
        }

        // Update Subtotal and Total in UI
        const subtotalEl = document.querySelector('.summary-subtotal span:last-child');
        const totalEl = document.querySelector('.total-price');

        if (subtotalEl) subtotalEl.textContent = formatCurrency(subtotal);
        if (totalEl) totalEl.textContent = formatCurrency(subtotal);
    }

    function formatCurrency(val) {
        return 'Rs. ' + val.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    }

    // Run dynamic summary render
    renderOrderSummary();

    // 3. Form submission for placing order & redirecting to payment page
    const placeOrderBtn = document.querySelector('.place-order-btn');
    
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent actual form submission to handle via JS popup
            
            // Validate form details
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const street = document.getElementById('street').value.trim();
            const city = document.getElementById('city').value.trim();
            const zip = document.getElementById('zip').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const email = document.getElementById('email').value.trim();

            // Check if required details are entered
            if (firstName && lastName && street && city && zip && phone && email) {
                // Save customer billing details in localStorage (premium feature)
                const billingDetails = { firstName, lastName, street, city, zip, phone, email };
                localStorage.setItem('furniro_billing', JSON.stringify(billingDetails));

                alert('Billing details verified! Redirecting to secure payment page to complete your purchase.');
                window.location.href = '../furniro payments/payment.html';
            } else {
                alert('Please fill in all required billing details before placing your order.');
            }
        });
    }
});

function openContact() {
    window.location.href = "contact.html";
}