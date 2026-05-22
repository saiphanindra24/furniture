/* shop.js – Core interactions for the Shop page */

document.addEventListener('DOMContentLoaded', () => {
    // Cart counter
    const cartCountEl = document.getElementById('cart-count');
    let cartCount = parseInt(localStorage.getItem('cartCount') || '0');
    cartCountEl.textContent = cartCount;
    // No add-to-cart buttons on shop page; use Buy Now for navigation

    // View toggle (grid / list)
    const gridBtn = document.querySelector('.view-btn[title="Grid view"]');
    const listBtn = document.querySelector('.view-btn[title="List view"]');
    const productsSection = document.querySelector('.products-section');

    gridBtn?.addEventListener('click', () => {
        productsSection.classList.remove('list-view');
        gridBtn.classList.add('active');
        listBtn?.classList.remove('active');
    });

    listBtn?.addEventListener('click', () => {
        productsSection.classList.add('list-view');
        listBtn.classList.add('active');
        gridBtn?.classList.remove('active');
    });


    // OPEN SINGLE PRODUCT PAGE -------------------------------------------------
    const openProductPage = (card) => {
        const nameEl = card.querySelector('.product-card__name');
        const imgEl = card.querySelector('.product-card__img-wrap img');
        if (!nameEl || !imgEl) return;

        // Build URL to product page in sibling folder
        const productName = encodeURIComponent(nameEl.textContent.trim());
        const productImg = encodeURIComponent(imgEl.getAttribute('src'));
        const targetUrl = `../singleproduct/product.html?name=${productName}&img=${productImg}`;
        window.location.href = targetUrl;
    };

    // Attach click listeners to product images
    document.querySelectorAll('.product-card').forEach(card => {
        const img = card.querySelector('.product-card__img-wrap img');
        if (img) {
            img.style.cursor = 'pointer';
            img.addEventListener('click', (e) => {
                e.stopPropagation();
                openProductPage(card);
            });
        }
    });

    // Search filter (by product name or description)
    const searchInput = document.getElementById('search-input');
    searchInput?.addEventListener('input', () => {
        const query = searchInput.value.trim().toLowerCase();
        document.querySelectorAll('.product-card').forEach(card => {
            const name = card.querySelector('.product-card__name')?.textContent?.toLowerCase() || '';
            const desc = card.querySelector('.product-card__desc')?.textContent?.toLowerCase() || '';
            const matches = name.includes(query) || desc.includes(query);
            card.style.display = matches ? '' : 'none';
        });
    });

    // Simple sorting (price low→high, high→low)
    const sortSelect = document.getElementById('sort-by');
    sortSelect?.addEventListener('change', () => {
        const option = sortSelect.value;
        const container = document.querySelector('.products-grid');
        const cards = Array.from(container.querySelectorAll('.product-card'));
        if (option === 'Price: Low to High' || option === 'Price: High to Low') {
            cards.sort((a, b) => {
                const aPrice = parseFloat(a.querySelector('.product-card__price')?.textContent?.replace(/[^\d.]/g, '') || '0');
                const bPrice = parseFloat(b.querySelector('.product-card__price')?.textContent?.replace(/[^\d.]/g, '') || '0');
                return option === 'Price: Low to High' ? aPrice - bPrice : bPrice - aPrice;
            });
            container.innerHTML = '';
            cards.forEach(c => container.appendChild(c));
        }
        // Other options (Default, Newest) are left as‑is for now.
    });
});

// Select all Add to Cart buttons
const cartButtons = document.querySelectorAll(".btn-add-cart");

cartButtons.forEach((button) => {
    button.addEventListener("click", () => {

        // Redirect to single product page
        window.location.href = "../singleproduct/single_product.html";

    });
});