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
    // SHOW MORE BUTTON FUNCTIONALITY
    // =========================================
    const showMoreBtn = document.querySelector('.show-more-btn');
    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', () => {
            window.location.href = '../Shop/index.html';
        });
    }

    // =========================================
    // TOAST NOTIFICATIONS
    // =========================================
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

        const nameEl = card.querySelector('.product-name');
        const priceEl = card.querySelector('.current-price');
        const imgEl = card.querySelector('.product-image img');
        const descEl = card.querySelector('.product-description');

        if (!nameEl || !priceEl || !imgEl) return;

        const name = nameEl.textContent.trim();
        const price = priceEl.textContent.trim();
        const image = imgEl.getAttribute('src');
        const description = descEl ? descEl.textContent.trim() : '';
        const id = name.toLowerCase().replace(/\s+/g, '-');

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
        if (e.target.classList.contains('overlay-button') && e.target.textContent.trim() === 'Add to cart') {
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

            updateCartCountBadge();

            // Redirect to cart.html
            window.location.href = "cart.html";
        }

        // 2. SPAN ACTIONS (SHARE, COMPARE, LIKE)
        if (e.target.closest('.overlay-actions span')) {
            const actionText = e.target.textContent.trim().toLowerCase();

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
                    category: inferCategory(name)
                };

                localStorage.setItem('compareSelection', JSON.stringify(productData));
                localStorage.removeItem('compareTarget');
                window.location.href = '../Product Comparison/PC.html';
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