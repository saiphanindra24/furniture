document.addEventListener('DOMContentLoaded', () => {

    const cartTableWrapper = document.querySelector('.cart-table-wrapper');
    const cartLayout = document.querySelector('.cart-layout');
    const subtotalEl = document.querySelector('.cart-totals-row:not(.total) span:last-child');
    const totalEl = document.querySelector('.cart-totals-row.total span:last-child');
    const cartCountEl = document.getElementById('cart-count');
    const checkoutButton = document.querySelector('.checkout-button');

    // =========================================
    // PRICE PARSING AND FORMATTING
    // =========================================
    function parsePrice(priceStr) {
        // Strip trailing decimals like .00 if present
        let cleaned = priceStr.split('.')[0]; 
        cleaned = cleaned.replace(/[^\d]/g, '');
        return parseInt(cleaned) || 0;
    }

    function formatPrice(number, originalPriceStr) {
        const hasRp = originalPriceStr.toLowerCase().includes('rp');
        if (hasRp) {
            return 'Rp ' + number.toLocaleString('id-ID');
        } else {
            return 'Rs. ' + number.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }
    }

    function getNormalizedImgSrc(src) {
        if (!src) return 'Images/Sofa.png';
        if (src.startsWith('Images/')) {
            return src;
        }
        if (src.startsWith('../Shop/') || src.startsWith('http')) {
            return src;
        }
        return `../Shop/${src}`;
    }

    // =========================================
    // RENDER CART ITEMS
    // =========================================
    function renderCart() {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');

        // Update Nav Cart Count
        const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        localStorage.setItem('cartCount', totalItemsCount);
        if (cartCountEl) {
            cartCountEl.textContent = totalItemsCount;
        }

        // Empty Cart State
        if (cart.length === 0) {
            cartLayout.innerHTML = `
                <div class="empty-cart-container" style="grid-column: span 2; text-align: center; padding: 80px 20px; font-family: 'Poppins', sans-serif;">
                    <svg viewBox="0 0 24 24" style="width: 80px; height: 80px; fill: none; stroke: #B88E2F; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; margin: 0 auto 24px;">
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                    <h2 style="font-size: 28px; font-weight: 600; color: #242424; margin-bottom: 12px;">Your Cart is Empty</h2>
                    <p style="color: #898989; font-size: 16px; margin-bottom: 30px; max-width: 400px; margin-left: auto; margin-right: auto;">Explore our elegant collection and add items to your cart.</p>
                    <a href="../Shop/index.html" class="checkout-button" style="display: inline-block; width: auto; padding: 14px 40px; text-decoration: none; color: #000000; border: 1px solid #000000; border-radius: 15px; font-weight: 600; transition: background 0.3s, color 0.3s; background: #FAF3EA;">Go To Shop</a>
                </div>
            `;
            return;
        }

        // Retain heading in table
        cartTableWrapper.innerHTML = `
            <div class="cart-table-heading">
                <span>Product</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Subtotal</span>
            </div>
        `;

        let cartSubtotal = 0;
        let originalCurrencyStr = "Rs. "; // Default fallback

        cart.forEach((item, index) => {
            const numericPrice = parsePrice(item.price);
            const itemSubtotal = numericPrice * item.quantity;
            cartSubtotal += itemSubtotal;
            originalCurrencyStr = item.price; // Save to format properly at the end

            const imgSrc = getNormalizedImgSrc(item.image);

            const itemHTML = `
                <div class="cart-item" data-index="${index}">
                    <div class="cart-item-product">
                        <div class="cart-item-thumb">
                            <img src="${imgSrc}" alt="${item.name}">
                        </div>
                        <div class="cart-item-info">
                            <p class="product-name">${item.name}</p>
                        </div>
                    </div>
                    <div class="cart-item-price">${item.price}</div>
                    <div class="cart-item-quantity">
                        <input type="number" value="${item.quantity}" min="1" class="qty-input">
                    </div>
                    <div class="cart-item-subtotal">${formatPrice(itemSubtotal, item.price)}</div>
                    <div class="cart-item-remove">
                        <button type="button" aria-label="Remove item" class="remove-btn">🗑</button>
                    </div>
                </div>
            `;
            cartTableWrapper.insertAdjacentHTML('beforeend', itemHTML);
        });

        // Update Summary Totals on the Right Panel
        if (subtotalEl) {
            subtotalEl.textContent = formatPrice(cartSubtotal, originalCurrencyStr);
        }
        if (totalEl) {
            totalEl.textContent = formatPrice(cartSubtotal, originalCurrencyStr);
        }

        // Add Listeners to Dynamically Rendered Elements
        attachItemEventListeners();
    }

    // =========================================
    // EVENT LISTENERS FOR QUANTITY & REMOVE
    // =========================================
    function attachItemEventListeners() {
        // Quantity input listeners
        const qtyInputs = document.querySelectorAll('.qty-input');
        qtyInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                const cartItemEl = e.target.closest('.cart-item');
                const index = parseInt(cartItemEl.getAttribute('data-index'));
                let newQty = parseInt(e.target.value);

                if (isNaN(newQty) || newQty < 1) {
                    newQty = 1;
                    e.target.value = 1;
                }

                const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                if (cart[index]) {
                    cart[index].quantity = newQty;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    renderCart(); // Re-render to update all subtotals/totals cleanly
                }
            });
        });

        // Remove item button listeners
        const removeButtons = document.querySelectorAll('.remove-btn');
        removeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const cartItemEl = e.target.closest('.cart-item');
                const index = parseInt(cartItemEl.getAttribute('data-index'));

                let cart = JSON.parse(localStorage.getItem('cart') || '[]');
                cart.splice(index, 1); // Delete that item
                localStorage.setItem('cart', JSON.stringify(cart));
                
                renderCart(); // Re-render
            });
        });
    }

    // =========================================
    // CHECKOUT REDIRECTION
    // =========================================
    checkoutButton?.addEventListener('click', () => {
        window.location.href = "../checkout/chekout.html";
    });

    // Run on Load
    renderCart();
});
