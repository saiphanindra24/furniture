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
    // BROWSE SECTION REDIRECTS
    // =========================================
    const cards = document.querySelectorAll('.browse-section .card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const textDiv = card.querySelector('div');
            if (textDiv) {
                const category = textDiv.textContent.trim().toLowerCase();
                window.location.href = `../Shop/index.html?category=${category}`;
            }
        });
    });

    // =========================================
    // ADD TO CART FROM HOME PAGE
    // =========================================
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('overlay-button') && e.target.textContent.trim() === 'Add to cart') {
            const card = e.target.closest('.product-card');
            if (card) {
                const nameEl = card.querySelector('.product-name');
                const priceEl = card.querySelector('.current-price');
                const imgEl = card.querySelector('.product-image img');
                
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
                    
                    updateCartCountBadge();
                    
                    // Redirect to cart.html
                    window.location.href = "cart.html";
                }
            }
        }
    });

    // =========================================
    // EXPLORE MORE BUTTON REDIRECT
    // =========================================
    const exploreBtn = document.querySelector('.explore-btn');
    exploreBtn?.addEventListener('click', () => {
        window.location.href = '../Shop/index.html';
    });

    // =========================================
    // ROOM INSPIRATION CAROUSEL
    // =========================================
    const rooms = [
        {
            meta: "01 — Bed Room",
            title: "Inner Peace",
            image: "Images/InspirationMain.png"
        },
        {
            meta: "02 — Living Room",
            title: "Creative Cozy",
            image: "Images/InspirationSide1.png"
        },
        {
            meta: "03 — Dining Room",
            title: "Modern Dining",
            image: "Images/InspirationSide2.png"
        },
        {
            meta: "04 — Bed Room",
            title: "Chic Comfort",
            image: "Images/Bed Room.png"
        }
    ];

    let currentIdx = 0;

    const mainCardImg = document.querySelector('.inspiration-main-card img');
    const mainMeta = document.querySelector('.inspiration-meta');
    const mainTitle = document.querySelector('.inspiration-main-copy h3');
    const sideCardImg = document.querySelector('.inspiration-side-image img');
    const previewImg = document.querySelector('.inspiration-preview-image img');
    const dots = document.querySelectorAll('.inspiration-dots .dot');

    const updateCarousel = (nextIdx) => {
        currentIdx = nextIdx;

        const sideIdx = (currentIdx + 1) % rooms.length;
        const previewIdx = (currentIdx + 2) % rooms.length;

        const imgs = [mainCardImg, sideCardImg, previewImg];
        imgs.forEach(img => img?.classList.add('fading'));

        setTimeout(() => {
            if (mainCardImg) mainCardImg.src = rooms[currentIdx].image;
            if (mainCardImg) mainCardImg.alt = rooms[currentIdx].title;
            if (mainMeta) mainMeta.textContent = rooms[currentIdx].meta;
            if (mainTitle) mainTitle.textContent = rooms[currentIdx].title;

            if (sideCardImg) sideCardImg.src = rooms[sideIdx].image;
            if (sideCardImg) sideCardImg.alt = rooms[sideIdx].title;
            if (previewImg) previewImg.src = rooms[previewIdx].image;
            if (previewImg) previewImg.alt = rooms[previewIdx].title;

            dots.forEach((dot, idx) => {
                if (idx === currentIdx) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });

            imgs.forEach(img => img?.classList.remove('fading'));
        }, 300);
    };

    // Attach listeners to arrows
    const nextButtons = document.querySelectorAll('.inspiration-card-button, .inspiration-circle-button');
    nextButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const nextIdx = (currentIdx + 1) % rooms.length;
            updateCarousel(nextIdx);
        });
    });

    // Attach listeners to dots
    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            if (idx !== currentIdx) {
                updateCarousel(idx);
            }
        });
    });
});
