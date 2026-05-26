document.addEventListener('DOMContentLoaded', () => {
    // Default fallback e-commerce items
    const defaultItems = [
        { id: 'syltherine', name: 'Syltherine', qty: 1, unitPrice: 2500000, img: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=150&auto=format&fit=crop', sub: 'Furniture Item' },
        { id: 'muggo', name: 'Muggo', qty: 1, unitPrice: 150000, img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=150&auto=format&fit=crop', sub: 'Furniture Item' }
    ];
    const fallbackImage = '../Home/Images/Sofa.png';

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

    function normalizeImageSrc(src) {
        if (!src) {
            return fallbackImage;
        }

        if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) {
            return src;
        }

        if (src.startsWith('../') || src.startsWith('./') || src.startsWith('/')) {
            return src;
        }

        if (src.startsWith('Images/')) {
            return `../Home/${src}`;
        }

        if (src.startsWith('Home/Images/')) {
            return `../${src}`;
        }

        if (src.startsWith('assets/')) {
            return `../${src}`;
        }

        if (src.startsWith('Shop/')) {
            return `../${src}`;
        }

        return `../${src}`;
    }

    function loadCartItems() {
        try {
            const rawCart = localStorage.getItem('cart') || localStorage.getItem('cartItems');
            if (rawCart) {
                const parsed = JSON.parse(rawCart);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return parsed.map((item, idx) => ({
                        id: item.id || `item-${idx}`,
                        name: item.name || item.title || `Item ${idx + 1}`,
                        qty: parseInt(item.qty || item.quantity || 1, 10),
                        unitPrice: (typeof item.price === 'number') ? item.price : parsePrice(item.price || item.unitPrice || '0'),
                        img: normalizeImageSrc(item.image || item.img || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=150&auto=format&fit=crop&q=80'),
                        sub: item.sub || item.category || 'Furniture Item'
                    }));
                }
            }
        } catch (e) {
            console.error("Failed to parse cart items from localStorage:", e);
        }
        return defaultItems;
    }

    const state = {
        items: loadCartItems(),
        shippingCharge: 15000,
        appliedCoupon: null, 
        activeTab: 'card'
    };

    const orderItemsContainer = document.getElementById('order-items-container');

    const subtotalValEl = document.getElementById('subtotal-val');
    const shippingValEl = document.getElementById('shipping-val');
    const discountRowEl = document.getElementById('discount-display-row');
    const discountValEl = document.getElementById('discount-val');
    const taxValEl = document.getElementById('tax-val');
    const totalValEl = document.getElementById('total-val');
    const paySubmitBtn = document.getElementById('pay-submit-btn');

    const couponInput = document.getElementById('coupon-code');
    const applyCouponBtn = document.getElementById('apply-coupon-btn');
    const couponMsgEl = document.getElementById('coupon-msg');
    const tagSave10 = document.getElementById('tag-save10');
    const tagFlat20 = document.getElementById('tag-flat20');
    const tagFreeship = document.getElementById('tag-freeship');

    const cardNumberInput = document.getElementById('card-number');
    const cardHolderInput = document.getElementById('card-holder-name');
    const cardExpiryInput = document.getElementById('card-expiry');
    const cardCvvInput = document.getElementById('card-cvv');

    const cardNumDisplay = document.getElementById('card-num-display');
    const cardHolderDisplay = document.getElementById('card-holder-display');
    const cardExpiryDisplay = document.getElementById('card-expiry-display');
    const virtualCard = document.getElementById('virtual-card');

    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-content');

    const toastContainer = document.getElementById('toast-container');

    const checkoutForm = document.getElementById('checkout-form');

    /**
     * Formats a numeric value into the specific Rupiah Indian grouping format shown in the mockup
     * Example: 2500000 -> "Rp. 25,00,000.00"
     * @param {number} value - The number to format
     * @returns {string} - Formatted Rupiah string
     */
    function formatRupiah(value) {
        const formattedNum = value.toLocaleString('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        return `Rp. ${formattedNum}`;
    }

    /**
     * Creates and triggers a custom float-up warning/success toast message
     * @param {string} message - Message text
     */
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;

        // Append to container
        toastContainer.appendChild(toast);

        // Force a layout reflow to allow transition
        toast.offsetHeight;

        // Add class to animate in
        toast.classList.add('show');

        // Automatically hide and remove after 3s
        setTimeout(() => {
            toast.classList.remove('show');
            // Wait for transition to complete before removing from DOM
            toast.addEventListener('transitionend', () => {
                toast.remove();
            });
        }, 3000);
    }

    // --- Reactive Rendering & Calculation ---

    /**
     * Recalculates subtotal, discount, tax, shipping, and total. Updates UI elements.
     */
    function updatePrices() {
        // Calculate Subtotal dynamically over all loaded items
        const subtotal = state.items.reduce((acc, item) => acc + (item.qty * item.unitPrice), 0);

        // Calculate Discount
        let discount = 0;
        let shipping = state.shippingCharge;

        if (state.appliedCoupon === 'SAVE10') {
            discount = subtotal * 0.10;
        } else if (state.appliedCoupon === 'FLAT20') {
            discount = subtotal * 0.20;
        } else if (state.appliedCoupon === 'FREESHIP') {
            shipping = 0;
        }

        const taxableBase = Math.max(0, subtotal - discount);
        const tax = taxableBase * 0.10;
        const total = taxableBase + shipping + tax;

        // Render Values in UI
        subtotalValEl.textContent = formatRupiah(subtotal);
        shippingValEl.textContent = formatRupiah(shipping);

        // Manage Discount Row visibility
        if (discount > 0) {
            discountValEl.textContent = `-${formatRupiah(discount)}`;
            discountRowEl.style.display = 'flex';
        } else {
            discountRowEl.style.display = 'none';
        }

        taxValEl.textContent = formatRupiah(tax);
        totalValEl.textContent = formatRupiah(total);

        // Update Pay button label text
        paySubmitBtn.querySelector('span').textContent = `Proceed to Pay ${formatRupiah(total)}`;
    }

    function saveCartItemsToStorage() {
        try {
            localStorage.setItem('cart', JSON.stringify(state.items));
            localStorage.setItem('cartItems', JSON.stringify(state.items));
        } catch (e) {
            console.error("Failed to write e-commerce cart items to storage:", e);
        }
    }

    /**
     * Renders cart items dynamically into the DOM
     */
    function renderCartItems() {
        orderItemsContainer.innerHTML = '';
        
        if (state.items.length === 0) {
            orderItemsContainer.innerHTML = `
                <div class="placeholder-panel" style="padding: 1.5rem; border-style: solid;">
                    <p style="margin-bottom: 0; font-weight: 600;">Your cart is empty.</p>
                </div>
            `;
            return;
        }

        state.items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.id = `item-${item.id}`;
            card.innerHTML = `
                <img src="${item.img}" alt="${item.name}" class="product-image" onerror="this.onerror=null; this.src='${fallbackImage}'">
                <div class="product-details">
                    <div class="product-info">
                        <h3 class="product-name">${item.name}</h3>
                        <p class="product-sub">${item.sub}</p>
                    </div>
                    <div class="product-pricing">
                        <span class="product-price">${formatRupiah(item.unitPrice)}</span>
                        <div class="quantity-controller">
                            <button class="qty-btn minus" id="minus-${item.id}" aria-label="Decrease ${item.name} quantity">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                            </button>
                            <span class="qty-val" id="qty-${item.id}">${item.qty}</span>
                            <button class="qty-btn plus" id="plus-${item.id}" aria-label="Increase ${item.name} quantity">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                            </button>
                        </div>
                    </div>
                </div>
            `;
            orderItemsContainer.appendChild(card);

            // Wire up event listeners dynamically
            const minusBtn = card.querySelector(`#minus-${item.id}`);
            const plusBtn = card.querySelector(`#plus-${item.id}`);
            const qtyValEl = card.querySelector(`#qty-${item.id}`);

            minusBtn.addEventListener('click', () => {
                if (item.qty > 1) {
                    item.qty--;
                    qtyValEl.textContent = item.qty;
                    saveCartItemsToStorage();
                    updatePrices();
                } else {
                    minusBtn.classList.add('active-warning');
                    showToast("Minimum quantity is 1");
                    setTimeout(() => {
                        minusBtn.classList.remove('active-warning');
                    }, 300);
                }
            });

            plusBtn.addEventListener('click', () => {
                item.qty++;
                qtyValEl.textContent = item.qty;
                saveCartItemsToStorage();
                updatePrices();
            });
        });
    }

    // --- Coupon Codes System ---

    /**
     * Validates and applies a coupon code.
     * @param {string} code - The input coupon string
     */
    function applyCoupon(code) {
        const normalizedCode = code.trim().toUpperCase();
        couponMsgEl.className = 'coupon-status'; // Reset classes

        if (!normalizedCode) {
            couponMsgEl.textContent = "Please enter a coupon code.";
            couponMsgEl.classList.add('error');
            return;
        }

        if (normalizedCode === 'SAVE10' || normalizedCode === 'FLAT20' || normalizedCode === 'FREESHIP') {
            state.appliedCoupon = normalizedCode;
            couponMsgEl.textContent = `Coupon "${normalizedCode}" applied successfully!`;
            couponMsgEl.classList.add('success');
            updatePrices();
        } else {
            state.appliedCoupon = null;
            couponMsgEl.textContent = "Invalid coupon code! Try SAVE10, FLAT20, or FREESHIP.";
            couponMsgEl.classList.add('error');
            updatePrices();
        }
    }

    // Event Listeners for Coupons
    applyCouponBtn.addEventListener('click', () => {
        applyCoupon(couponInput.value);
    });

    couponInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            applyCoupon(couponInput.value);
        }
    });

    // Auto-fill tags when clicked
    [tagSave10, tagFlat20, tagFreeship].forEach(tag => {
        tag.addEventListener('click', () => {
            const code = tag.textContent;
            couponInput.value = code;
            applyCoupon(code);
        });
    });

    // --- Payment Tabs Switching ---

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            state.activeTab = targetTab;

            // Toggle active class on tab buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Show matching panel and hide others
            tabPanels.forEach(panel => {
                if (panel.id === `panel-${targetTab}`) {
                    panel.classList.remove('hidden');
                } else {
                    panel.classList.add('hidden');
                }
            });
        });
    });

    // --- Credit Card Mockup Synchronizer ---

    /**
     * Restricts inputs to numbers only
     * @param {string} val - String value
     * @returns {string} - Cleaned digits-only string
     */
    function cleanDigits(val) {
        return val.replace(/\D/g, '');
    }

    // Card Number Input formatter & mirror
    cardNumberInput.addEventListener('input', (e) => {
        let val = cleanDigits(e.target.value);
        
        // Format with space every 4 digits
        let formatted = '';
        for (let i = 0; i < val.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formatted += ' ';
            }
            formatted += val[i];
        }
        
        e.target.value = formatted;

        // Mirror to virtual card
        if (formatted.length > 0) {
            // Fill remaining numbers with dots
            let dotsCount = 16 - val.length;
            let displayVal = formatted;
            for (let i = 0; i < dotsCount; i++) {
                if ((val.length + i) % 4 === 0 && (val.length + i) > 0) {
                    displayVal += ' ';
                }
                displayVal += '•';
            }
            cardNumDisplay.textContent = displayVal;
        } else {
            cardNumDisplay.textContent = '•••• •••• •••• ••••';
        }
    });

    // Card Holder Input mirror
    cardHolderInput.addEventListener('input', (e) => {
        let val = e.target.value.toUpperCase();
        
        // Remove numeric/special characters for realistic names (optional, let's keep it relaxed but uppercase)
        cardHolderDisplay.textContent = val.length > 0 ? val : 'FULL NAME';
    });

    // Card Expiry Date formatter & mirror
    cardExpiryInput.addEventListener('input', (e) => {
        let val = cleanDigits(e.target.value);
        let formatted = val;

        if (val.length > 2) {
            formatted = val.substring(0, 2) + '/' + val.substring(2, 4);
        }

        e.target.value = formatted;

        // Mirror
        if (formatted.length > 0) {
            let displayVal = formatted;
            if (val.length === 1) displayVal += 'M/YY';
            else if (val.length === 2) displayVal += '/YY';
            else if (val.length === 3) displayVal += 'Y';
            cardExpiryDisplay.textContent = displayVal;
        } else {
            cardExpiryDisplay.textContent = 'MM/YY';
        }
    });

    // CVV input restriction (only numbers)
    cardCvvInput.addEventListener('input', (e) => {
        e.target.value = cleanDigits(e.target.value);
    });

    // Card visual interactive hover effects on focus
    const cardInputs = [cardNumberInput, cardHolderInput, cardExpiryInput, cardCvvInput];
    cardInputs.forEach(input => {
        input.addEventListener('focus', () => {
            virtualCard.style.transform = 'translateY(-10px) rotateX(4deg) scale(1.03)';
            virtualCard.style.boxShadow = '0 30px 60px rgba(184, 142, 47, 0.2), 0 0 20px rgba(184, 142, 47, 0.1)';
        });

        input.addEventListener('blur', () => {
            virtualCard.style.transform = '';
            virtualCard.style.boxShadow = '';
        });
    });

    // --- Form Checkout Submission & Validation ---

    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // 1. Check card number
        const cardNoClean = cleanDigits(cardNumberInput.value);
        if (cardNoClean.length < 16) {
            showToast("Invalid card number. Must be 16 digits.");
            cardNumberInput.focus();
            return;
        }

        // 2. Check Card Holder
        if (cardHolderInput.value.trim().length < 2) {
            showToast("Please enter a valid cardholder name.");
            cardHolderInput.focus();
            return;
        }

        // 3. Check Expiry format
        const expiryVal = cardExpiryInput.value;
        if (expiryVal.length < 5 || !expiryVal.includes('/')) {
            showToast("Invalid expiry date. Use MM/YY format.");
            cardExpiryInput.focus();
            return;
        }

        const expMonth = parseInt(expiryVal.split('/')[0], 10);
        if (expMonth < 1 || expMonth > 12) {
            showToast("Invalid expiry month.");
            cardExpiryInput.focus();
            return;
        }

        // 4. Check CVV
        const cvvVal = cardCvvInput.value;
        if (cvvVal.length < 3) {
            showToast("Invalid CVV. Must be 3 digits.");
            cardCvvInput.focus();
            return;
        }

        // Calculate current total
        const subtotal = state.items.reduce((acc, item) => acc + (item.qty * item.unitPrice), 0);
        let discount = 0;
        let shipping = state.shippingCharge;
        if (state.appliedCoupon === 'SAVE10') discount = subtotal * 0.10;
        else if (state.appliedCoupon === 'FLAT20') discount = subtotal * 0.20;
        else if (state.appliedCoupon === 'FREESHIP') shipping = 0;
        const total = Math.max(0, subtotal - discount) * 1.10 + shipping;

        // Success message
        alert(`🎉 Payment of ${formatRupiah(total)} successfully processed! Thank you for purchasing from Furniro.`);
        
        // Reset form & states
        checkoutForm.reset();
        state.items.forEach(item => item.qty = 1);
        saveCartItemsToStorage();
        renderCartItems();
        state.appliedCoupon = null;
        couponInput.value = '';
        couponMsgEl.textContent = '';
        cardNumDisplay.textContent = '•••• •••• •••• ••••';
        cardHolderDisplay.textContent = 'FULL NAME';
        cardExpiryDisplay.textContent = 'MM/YY';
        updatePrices();
    });

    // --- Initial Setup Call ---
    renderCartItems();
    updatePrices();
});
