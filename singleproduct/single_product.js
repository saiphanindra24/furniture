document.addEventListener('DOMContentLoaded', () => {
    // Gallery Logic
    const mainImg = document.querySelector('.main-image img');
    const thumbnails = document.querySelectorAll('.thumbnails .thumb');

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            mainImg.src = this.getAttribute('data-main-src') || this.src;
        });
    });

    // Quantity Logic on Main Product
    const qtySpan = document.querySelector('.qty span');
    const qtyButtons = document.querySelectorAll('.qty button');
    let currentQty = 1;

    qtyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.textContent.trim() === '+') {
                currentQty++;
            } else if (btn.textContent.trim() === '-') {
                if (currentQty > 1) currentQty--;
            }
            if (qtySpan) qtySpan.textContent = currentQty;
        });
    });

    // Cart State
    let cart = []; 

    function parsePrice(priceStr) {
        return parseFloat(priceStr.replace(/[^0-9.-]+/g, ''));
    }

    function formatPrice(price) {
        return 'Rs. ' + price.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    }

    function updateCartUI() {
        const cartItemsContainer = document.querySelector('.cart-items');
        const subtotalAmt = document.querySelector('.subtotal-amt');
        if (!cartItemsContainer) return;

        cartItemsContainer.innerHTML = '';
        let subtotal = 0;

        const cartFooter = document.querySelector('.cart-footer');
        if (cartFooter) {
            cartFooter.style.display = cart.length === 0 ? 'none' : 'block';
        }

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p style="text-align:center; margin-top:20px; color:#888;">Your cart is empty. Shop more!</p>';
        } else {
            cart.forEach((item, index) => {
                subtotal += item.price * item.qty;

                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" />
                    <div class="cart-item-info">
                        <p class="item-name">${item.name}</p>
                        <p class="item-qty">${item.qty} x <span class="price-gold">${formatPrice(item.price)}</span></p>
                    </div>
                    <i class="fa-solid fa-circle-xmark remove-item" data-index="${index}" style="cursor: pointer;"></i>
                `;
                cartItemsContainer.appendChild(cartItem);
            });
        }

        if (subtotalAmt) {
            subtotalAmt.textContent = formatPrice(subtotal);
        }

        // Remove item logic
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                cart.splice(index, 1);
                updateCartUI();
            });
        });
    }

    updateCartUI(); // Initialize empty cart

    // Add to Cart Logic
    const addToCartBtn = document.querySelector('.btn-cart');
    
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const productNameEl = document.querySelector('.product-info h1');
            const productPriceEl = document.querySelector('.product-info .price');
            
            if (!productNameEl || !productPriceEl) return;

            const productName = productNameEl.textContent.trim();
            const productPrice = parsePrice(productPriceEl.textContent);
            const productImgSrc = mainImg.src;
            
            // Check if item already exists in cart
            const existingItem = cart.find(item => item.name === productName);
            if (existingItem) {
                existingItem.qty += currentQty;
            } else {
                cart.push({
                    name: productName,
                    price: productPrice,
                    qty: currentQty,
                    image: productImgSrc
                });
            }
            
            updateCartUI();
            openCart().then(updateCartUI);
        });
    }

    // Sidebar Toggle Logic (dynamic: loads cart.html when needed)
    async function openCart(){
        let sidebar = document.getElementById('cart-sidebar');
        let overlay = document.getElementById('cart-overlay');

        if (!sidebar) {
            try {
                const res = await fetch('cart.html');
                const text = await res.text();
                const tmp = document.createElement('div');
                tmp.innerHTML = text;

                const loadedSidebar = tmp.querySelector('.cart-sidebar') || tmp.querySelector('#cart-sidebar');
                if (loadedSidebar) {
                    document.body.appendChild(loadedSidebar);
                }

                // create overlay
                overlay = document.createElement('div');
                overlay.id = 'cart-overlay';
                overlay.className = 'cart-overlay';
                document.body.appendChild(overlay);

                // ensure cart stylesheet is loaded
                if (!document.querySelector('link[href="cart.css"]')) {
                    const link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = 'cart.css';
                    document.head.appendChild(link);
                }

                sidebar = document.getElementById('cart-sidebar');

                // bind close handlers
                const closeBtn = document.getElementById('close-cart-btn') || document.querySelector('.cart-header i');
                if (closeBtn) closeBtn.addEventListener('click', closeCart);
                if (overlay) overlay.addEventListener('click', closeCart);
            } catch (err) {
                console.error('Failed to load cart.html', err);
            }
        }

        if (sidebar) sidebar.classList.add('open');
        if (overlay) overlay.classList.add('open');
        updateCartUI();
    }

    function closeCart(){
        const sidebar = document.getElementById('cart-sidebar');
        const overlay = document.getElementById('cart-overlay');
        if (sidebar) {
            sidebar.classList.remove('open');
            // remove from DOM after closing
            sidebar.remove();
        }
        if (overlay) {
            overlay.classList.remove('open');
            overlay.remove();
        }
    }

    // Nav bar cart icon
    const navCartBtn = document.querySelector('.cart-btn');
    if (navCartBtn) {
        navCartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openCart();
        });
    }

    // Tabs Logic
    const tabs = document.querySelectorAll('.tabs .tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Hide all tab contents
            tabContents.forEach(content => {
                content.style.display = 'none';
                content.classList.remove('active');
            });

            // Add active to current tab
            tab.classList.add('active');
            
            // Show current target content
            const targetId = tab.getAttribute('data-target');
            if (targetId) {
                const targetContent = document.getElementById(targetId);
                if (targetContent) {
                    targetContent.style.display = 'block';
                    targetContent.classList.add('active');
                }
            }
        });
    });

    // Show More / Back Logic
    const showMoreBtn = document.querySelector('.toggle-btn');
    const backBtn = document.querySelector('.back-btn');
    const grid = document.querySelector('.grid');
    const extraCards = document.querySelectorAll('.extra-card');
    const relatedSection = document.getElementById('related-section');

    if (showMoreBtn && backBtn && grid && extraCards.length) {
        showMoreBtn.addEventListener('click', () => {
            extraCards.forEach(card => card.classList.add('visible'));
            backBtn.classList.remove('hidden');
            showMoreBtn.classList.add('hidden');
        });

        backBtn.addEventListener('click', () => {
            extraCards.forEach(card => card.classList.remove('visible'));
            backBtn.classList.add('hidden');
            showMoreBtn.classList.remove('hidden');
            if (relatedSection) {
                relatedSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
});