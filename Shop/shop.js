/* shop.js – Complete Shop Page Functionality */

document.addEventListener('DOMContentLoaded', () => {

    // =========================================
    // CATEGORY URL PARAMETER
    // =========================================
    const urlParams = new URLSearchParams(window.location.search);
    const categoryFilter = urlParams.get('category')?.toLowerCase();

    if (categoryFilter) {
        const formattedCategory = categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1);
        
        // Update document title
        document.title = `Shop - ${formattedCategory} — Furniture`;
        
        // Update Hero Title
        const heroH1 = document.querySelector('.hero__content h1');
        if (heroH1) {
            heroH1.textContent = `Shop - ${formattedCategory}`;
        }
        
        // Update Breadcrumb
        const breadcrumb = document.querySelector('.breadcrumb');
        if (breadcrumb) {
            breadcrumb.innerHTML = `
                <a href="../Home/Home.html">Home</a>
                <span class="breadcrumb__sep"></span>
                <a href="index.html">Shop</a>
                <span class="breadcrumb__sep"></span>
                <span>${formattedCategory}</span>
            `;
        }
    }

    // =========================================
    // CHANGE BUTTON TEXT
    // =========================================

    document.querySelectorAll('.btn-add-cart').forEach(button => {
        button.textContent = 'Add to cart';
    });

    // =========================================
    // CART COUNT
    // =========================================

    const cartCountEl =
        document.getElementById('cart-count');

    let cartCount =
        parseInt(localStorage.getItem('cartCount') || '0');

    if (cartCountEl) {
        cartCountEl.textContent = cartCount;
    }

    // =========================================
    // GRID / LIST VIEW
    // =========================================

    const gridBtn =
        document.querySelector('.view-btn[title="Grid view"]');

    const listBtn =
        document.querySelector('.view-btn[title="List view"]');

    const productsSection =
        document.querySelector('.products-section');

    gridBtn?.addEventListener('click', () => {

        productsSection.classList.remove('list-view');

        gridBtn.classList.add('active');

        listBtn.classList.remove('active');

    });

    listBtn?.addEventListener('click', () => {

        productsSection.classList.add('list-view');

        listBtn.classList.add('active');

        gridBtn.classList.remove('active');

    });

    // =========================================
    // OPEN PRODUCT PAGE
    // =========================================

    function openProductPage(card) {

        const nameEl =
            card.querySelector('.product-card__name');

        const imgEl =
            card.querySelector('.product-card__img-wrap img');

        if (!nameEl || !imgEl) return;

        const productName =
            encodeURIComponent(nameEl.textContent.trim());

        const productImg =
            encodeURIComponent(imgEl.getAttribute('src'));

        window.location.href =
            `../singleproduct/product.html?name=${productName}&img=${productImg}`;
    }

    // =========================================
    // PRODUCT IMAGE CLICK
    // =========================================

    document.querySelectorAll('.product-card').forEach(card => {

        const img =
            card.querySelector('.product-card__img-wrap img');

        if (img) {

            img.style.cursor = 'pointer';

            img.addEventListener('click', (e) => {

                e.stopPropagation();

                openProductPage(card);

            });
        }
    });

    // =========================================
    // PRODUCTS GRID
    // =========================================

    const productsGrid =
        document.querySelector('.products-grid');

    // =========================================
    // CREATE TOTAL 50 PRODUCTS
    // =========================================

    const originalProducts =
        Array.from(document.querySelectorAll('.product-card'));

    while (
        document.querySelectorAll('.product-card').length < 50
    ) {

        originalProducts.forEach(product => {

            if (
                document.querySelectorAll('.product-card').length < 50
            ) {

                const clone =
                    product.cloneNode(true);

                const btn =
                    clone.querySelector('.btn-add-cart');

                if (btn) {
                    btn.textContent = 'Add to cart';
                }

                productsGrid.appendChild(clone);
            }

        });
    }

    // =========================================
    // PRODUCTS
    // =========================================

    let allProducts =
        Array.from(document.querySelectorAll('.product-card'));

    let filteredProducts = [...allProducts];

    // =========================================
    // ELEMENTS
    // =========================================

    const showCountSelect =
        document.getElementById('show-count');

    const resultsCount =
        document.querySelector('.results-count');

    const searchInput =
        document.getElementById('search-input');

    const discountFilter =
        document.getElementById('discount-filter');

    const newFilter =
        document.getElementById('new-filter');

    const priceRange =
        document.getElementById('price-range');

    const priceValue =
        document.getElementById('price-value');

    const sortSelect =
        document.getElementById('sort-by');

    // =========================================
    // PAGINATION
    // =========================================

    let currentPage = 1;

    // =========================================
    // UPDATE PRODUCTS DISPLAY
    // =========================================

    function updateProductsDisplay() {

        const productsPerPage =
            parseInt(showCountSelect.value);

        const totalPages =
            Math.ceil(
                filteredProducts.length / productsPerPage
            );

        // FIX PAGE
        if (currentPage > totalPages) {
            currentPage = 1;
        }

        // START & END
        const start =
            (currentPage - 1) * productsPerPage;

        const end =
            start + productsPerPage;

        // HIDE ALL
        allProducts.forEach(product => {
            product.style.display = 'none';
        });

        // SHOW PRODUCTS
        filteredProducts
            .slice(start, end)
            .forEach(product => {

                product.style.display = '';

            });

        // RESULTS TEXT
        const visibleEnd =
            Math.min(end, filteredProducts.length);

        resultsCount.innerHTML =
            `Showing <strong>${start + 1}-${visibleEnd}</strong> of ${filteredProducts.length} results`;

        updatePagination(totalPages);
    }

    // =========================================
    // UPDATE PAGINATION
    // =========================================

    function updatePagination(totalPages) {

        const pagination =
            document.querySelector('.pagination');

        pagination.innerHTML = '';

        // PAGE BUTTONS
        for (let i = 1; i <= totalPages; i++) {

            const btn =
                document.createElement('button');

            btn.classList.add('page-btn');

            if (i === currentPage) {
                btn.classList.add('active');
            }

            btn.textContent = i;

            btn.addEventListener('click', () => {

                currentPage = i;

                updateProductsDisplay();

                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });

            });

            pagination.appendChild(btn);
        }

        // NEXT BUTTON
        if (currentPage < totalPages) {

            const nextBtn =
                document.createElement('button');

            nextBtn.classList.add(
                'page-btn',
                'page-btn--next'
            );

            nextBtn.textContent = 'Next';

            nextBtn.addEventListener('click', () => {

                currentPage++;

                updateProductsDisplay();

                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });

            });

            pagination.appendChild(nextBtn);
        }
    }

    // =========================================
    // APPLY FILTERS
    // =========================================

    function applyFilters() {

        const searchQuery =
            searchInput?.value.toLowerCase() || '';

        const showDiscounts =
            discountFilter.checked;

        const showNew =
            newFilter.checked;

        const maxPrice =
            parseInt(priceRange.value);

        // PRICE TEXT
        priceValue.textContent =
            `Rp ${maxPrice.toLocaleString()}`;

        filteredProducts = allProducts.filter(card => {

            // NAME
            const name =
                card.querySelector('.product-card__name')
                    ?.textContent
                    ?.toLowerCase() || '';

            // DESC
            const desc =
                card.querySelector('.product-card__desc')
                    ?.textContent
                    ?.toLowerCase() || '';

            // SEARCH
            const matchesSearch =
                name.includes(searchQuery) ||
                desc.includes(searchQuery);

            // DISCOUNT
            const hasDiscount =
                card.querySelector(
                    '.product-card__badge--discount'
                );

            // NEW
            const hasNew =
                card.querySelector(
                    '.product-card__badge--new'
                );

            // PRICE
            const priceText =
                card.querySelector('.product-card__price')
                    ?.textContent
                    ?.replace(/[^\d]/g, '') || '0';

            const productPrice =
                parseInt(priceText);

            // CATEGORY MATCH
            const productCategory = card.getAttribute('data-category')?.toLowerCase();
            const categoryMatch = !categoryFilter || productCategory === categoryFilter;

            // CONDITIONS
            const discountMatch =
                !showDiscounts || hasDiscount;

            const newMatch =
                !showNew || hasNew;

            const priceMatch =
                productPrice <= maxPrice;

            return (
                matchesSearch &&
                discountMatch &&
                newMatch &&
                priceMatch &&
                categoryMatch
            );

        });

        // SORTING
        const option = sortSelect.value;

        if (option === 'Price: Low to High') {

            filteredProducts.sort((a, b) => {

                const aPrice =
                    parseInt(
                        a.querySelector('.product-card__price')
                            ?.textContent
                            ?.replace(/[^\d]/g, '') || '0'
                    );

                const bPrice =
                    parseInt(
                        b.querySelector('.product-card__price')
                            ?.textContent
                            ?.replace(/[^\d]/g, '') || '0'
                    );

                return aPrice - bPrice;

            });

        }

        if (option === 'Price: High to Low') {

            filteredProducts.sort((a, b) => {

                const aPrice =
                    parseInt(
                        a.querySelector('.product-card__price')
                            ?.textContent
                            ?.replace(/[^\d]/g, '') || '0'
                    );

                const bPrice =
                    parseInt(
                        b.querySelector('.product-card__price')
                            ?.textContent
                            ?.replace(/[^\d]/g, '') || '0'
                    );

                return bPrice - aPrice;

            });

        }

        // RESET PAGE
        currentPage = 1;

        updateProductsDisplay();
    }

    // =========================================
    // EVENTS
    // =========================================

    searchInput?.addEventListener(
        'input',
        applyFilters
    );

    discountFilter?.addEventListener(
        'change',
        applyFilters
    );

    newFilter?.addEventListener(
        'change',
        applyFilters
    );

    priceRange?.addEventListener(
        'input',
        applyFilters
    );

    showCountSelect?.addEventListener(
        'change',
        applyFilters
    );

    sortSelect?.addEventListener(
        'change',
        applyFilters
    );

    // =========================================
    // FILTER TOGGLE
    // =========================================

    const filterToggle =
        document.getElementById('filter-toggle');

    const advancedFilters =
        document.getElementById('advanced-filters');

    filterToggle?.addEventListener('click', () => {

        advancedFilters.classList.toggle('active');

    });

    // =========================================
    // TOAST NOTIFICATIONS & DYNAMIC STYLES
    // =========================================
    const styleEl = document.createElement('style');
    styleEl.textContent = `
        .premium-toast {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: #B88E2F;
            color: #ffffff;
            padding: 15px 30px;
            border-radius: 12px;
            font-family: 'Poppins', sans-serif;
            font-size: 15px;
            font-weight: 500;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
            z-index: 99999;
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.3s ease, transform 0.3s ease;
            pointer-events: none;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .premium-toast.show {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(styleEl);

    function showToast(message) {
        let toast = document.querySelector('.premium-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'premium-toast';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // =========================================
    // PRODUCT OVERLAY ACTIONS (CART, SHARE, COMPARE, LIKE)
    // =========================================
    document.addEventListener('click', (e) => {
        const card = e.target.closest('.product-card');
        if (!card) return;

        const nameEl = card.querySelector('.product-card__name');
        const priceEl = card.querySelector('.product-card__price');
        const imgEl = card.querySelector('.product-card__img-wrap img');
        const descEl = card.querySelector('.product-card__desc');

        if (!nameEl || !priceEl || !imgEl) return;

        const name = nameEl.textContent.trim();
        const price = priceEl.textContent.trim();
        const image = imgEl.getAttribute('src');
        const description = descEl ? descEl.textContent.trim() : '';
        const id = name.toLowerCase().replace(/\s+/g, '-');
        const category = card.getAttribute('data-category') || 'living';

        const inferCategory = (productName) => {
            const normalized = productName.toLowerCase();
            if (['syltherine', 'leviosa', 'respira', 'virgo', 'muggo'].some(keyword => normalized.includes(keyword))) {
                return 'dining';
            }
            if (['pingky', 'grifo'].some(keyword => normalized.includes(keyword))) {
                return 'bedroom';
            }
            return 'living';
        };

        // 1. ADD TO CART
        if (e.target.classList.contains('btn-add-cart')) {
            let cart = JSON.parse(localStorage.getItem('cart') || '[]');
            const existingItem = cart.find(item => item.id === id || item.name === name);
            if (existingItem) {
                existingItem.quantity = (existingItem.quantity || existingItem.qty || 1) + 1;
                existingItem.qty = existingItem.quantity;
            } else {
                cart.push({
                    id: id,
                    name: name,
                    price: price,
                    image: image,
                    quantity: 1,
                    qty: 1
                });
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            localStorage.setItem('cartItems', JSON.stringify(cart));
            
            const newCartCount = cart.reduce((sum, item) => sum + (item.quantity || item.qty || 1), 0);
            localStorage.setItem('cartCount', newCartCount);
            
            if (cartCountEl) {
                cartCountEl.textContent = newCartCount;
            }
            
            // Redirect to cart.html
            window.location.href = "../Home/cart.html";
        }

        // 2. OVERLAY LINK ACTIONS (SHARE, COMPARE, LIKE)
        const overlayActionLink = e.target.closest('.overlay-action');
        if (overlayActionLink) {
            e.preventDefault();
            const actionText = overlayActionLink.textContent.trim().toLowerCase();

            if (actionText === 'like') {
                let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
                const alreadyInWishlist = wishlist.some(item => item.id === id || item.name === name);
                if (!alreadyInWishlist) {
                    wishlist.push({
                        id: id,
                        name: name,
                        price: price,
                        image: image,
                        description: description
                    });
                    localStorage.setItem('wishlist', JSON.stringify(wishlist));
                    showToast(`❤️ Added ${name} to Wishlist!`);
                } else {
                    showToast(`😊 ${name} is already in your Wishlist!`);
                }
            } else if (actionText === 'share') {
                const productName = encodeURIComponent(name);
                const productImg = encodeURIComponent(image);
                const productUrl = `${window.location.origin}/singleproduct/product.html?name=${productName}&img=${productImg}`;
                
                navigator.clipboard.writeText(productUrl).then(() => {
                    showToast('🔗 Product link copied to clipboard!');
                }).catch(err => {
                    console.error('Clipboard copy failed:', err);
                    showToast('Failed to copy link.');
                });
            } else if (actionText === 'compare') {
                const productData = {
                    id,
                    name,
                    price,
                    image,
                    description,
                    category: category || inferCategory(name)
                };

                localStorage.setItem('compareSelection', JSON.stringify(productData));
                localStorage.removeItem('compareTarget');
                window.location.href = '../Product Comparison/PC.html';
            }
        }
    });

    // =========================================
    // INITIAL LOAD
    // =========================================

    applyFilters();

});