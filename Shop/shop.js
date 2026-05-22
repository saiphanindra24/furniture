/* shop.js – Complete Shop Page Functionality */

document.addEventListener('DOMContentLoaded', () => {

    // =========================================
    // CHANGE ALL BUTTONS TEXT
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
    // ALL PRODUCTS
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
    // UPDATE DISPLAY
    // =========================================

    function updateProductsDisplay() {

        const showCount =
            parseInt(showCountSelect.value);

        // HIDE ALL
        allProducts.forEach(product => {
            product.style.display = 'none';
        });

        // SHOW FILTERED
        filteredProducts
            .slice(0, showCount)
            .forEach(product => {

                product.style.display = '';

            });

        // RESULTS TEXT
        const visibleCount =
            Math.min(showCount, filteredProducts.length);

        resultsCount.innerHTML =
            `Showing <strong>1-${visibleCount}</strong> of ${filteredProducts.length} results`;
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

        // UPDATE PRICE TEXT
        priceValue.textContent =
            `Rp ${maxPrice.toLocaleString()}`;

        filteredProducts = allProducts.filter(card => {

            // NAME
            const name =
                card.querySelector('.product-card__name')
                    ?.textContent
                    ?.toLowerCase() || '';

            // DESCRIPTION
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
                priceMatch
            );

        });

        // APPLY SORT
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
        updateProductsDisplay
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
    // ADD TO CART
    // =========================================

    document.addEventListener('click', (e) => {

        if (
            e.target.classList.contains('btn-add-cart')
        ) {

            cartCount++;

            localStorage.setItem(
                'cartCount',
                cartCount
            );

            cartCountEl.textContent = cartCount;

            window.location.href =
                "../home/cart.html";
        }

    });

    // =========================================
    // INITIAL LOAD
    // =========================================

    applyFilters();

});