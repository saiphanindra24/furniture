function getWishlist() {
    return JSON.parse(localStorage.getItem('wishlist') || '[]');
}

function saveWishlist(wishlist) {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('cartItems', JSON.stringify(cart));
}

function removeFromWishlist(productId) {
    let wishlist = getWishlist();
    wishlist = wishlist.filter(item => item.id !== productId);
    saveWishlist(wishlist);
    displayWishlist();
}

function addToCart(productId) {
    const wishlist = getWishlist();
    const item = wishlist.find(wishItem => wishItem.id === productId);
    if (!item) return;

    const cart = getCart();
    const existingItem = cart.find(cartItem => cartItem.id === item.id || cartItem.name === item.name);

    if (existingItem) {
        existingItem.quantity = (existingItem.quantity || existingItem.qty || 1) + 1;
        existingItem.qty = existingItem.quantity;
    } else {
        cart.push({
            id: item.id,
            name: item.name,
            description: item.description || '',
            price: item.price,
            originalPrice: item.originalPrice || '',
            image: item.image,
            quantity: 1,
            qty: 1
        });
    }

    saveCart(cart);

    // Update cartCount in localStorage
    const newCartCount = cart.reduce((sum, cartItem) => sum + (cartItem.quantity || cartItem.qty || 1), 0);
    localStorage.setItem('cartCount', newCartCount);

    alert(item.name + ' has been added to your cart!');
}

function displayWishlist() {
    const wishlist = getWishlist();
    const wishlistContent = document.getElementById('wishlist-content');

    if (!wishlistContent) return;

    if (wishlist.length === 0) {
        wishlistContent.innerHTML = `
            <div class="empty-wishlist" style="grid-column: 1 / -1;">
                <h2>Your Wishlist is Empty</h2>
                <p>Add items to your wishlist to save them for later.</p>
                <button class="buy-btn continue-btn" onclick="goHome()">Continue Shopping</button>
            </div>
        `;
        return;
    }

    wishlistContent.innerHTML = wishlist.map(item => {
        // Fix image path - add Shop folder prefix if not already present
        let imagePath = item.image;
        if (!imagePath.includes('../') && !imagePath.startsWith('http')) {
            imagePath = '../Shop/' + imagePath;
        }

        return `
        <div class="wishlist-item">
            <div class="wishlist-item-product">
                <div class="wishlist-item-thumb">
                    <img src="${encodeURI(imagePath)}" alt="${item.name}">
                </div>
                <div class="wishlist-item-info">
                    <h3 class="wishlist-item-name">${item.name}</h3>
                    <p class="wishlist-item-description">${item.description || ''}</p>
                </div>
            </div>
            <div class="wishlist-item-price">${item.price}</div>
            <div class="wishlist-item-actions">
                <button class="add-to-cart-btn" onclick="addToCart('${item.id}')">Add to Cart</button>
                <button class="remove-btn" onclick="removeFromWishlist('${item.id}')">Remove</button>
            </div>
        </div>
    `;
    }).join('');
}

function goCart() {
    window.location.href = '../Home/cart.html';
}

function goHome() {
    window.location.href = '../Home/Home.html';
}

document.addEventListener('DOMContentLoaded', function () {
    displayWishlist();
});
