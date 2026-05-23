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
    // ADD TO CART
    // =========================================

    document.addEventListener('click', (e) => {

        if (
            e.target.classList.contains('btn-add-cart')
        ) {
            const card = e.target.closest('.product-card');
            if (card) {
                const nameEl = card.querySelector('.product-card__name');
                const priceEl = card.querySelector('.product-card__price');
                const imgEl = card.querySelector('.product-card__img-wrap img');
                
                if (nameEl && priceEl && imgEl) {
                    const name = nameEl.textContent.trim();
                    const price = priceEl.textContent.trim();
                    const image = imgEl.getAttribute('src');
                    
                    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
                    const existingItem = cart.find(item => item.name === name);
                    if (existingItem) {
                        existingItem.quantity += 1;
                    } else {
                        cart.push({
                            name: name,
                            price: price,
                            image: image,
                            quantity: 1
                        });
                    }
                    localStorage.setItem('cart', JSON.stringify(cart));
                    
                    const newCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
                    localStorage.setItem('cartCount', newCartCount);
                    
                    if (cartCountEl) {
                        cartCountEl.textContent = newCartCount;
                    }
                    
                    // Redirect to cart.html
                    window.location.href = "../Home/cart.html";
                }
            }
        }

    });

    // =========================================
    // INITIAL LOAD
    // =========================================

    applyFilters();

});