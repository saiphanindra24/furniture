function getCartItems() {
  try {
    const rawCart = localStorage.getItem('cart') || localStorage.getItem('cartItems');
    if (!rawCart) return [];

    const parsed = JSON.parse(rawCart);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to read cart from localStorage:', error);
    return [];
  }
}

function getCartCount() {
  const storedCount = parseInt(localStorage.getItem('cartCount') || '0', 10);

  if (!Number.isNaN(storedCount) && storedCount >= 0) {
    return storedCount;
  }

  const cartItems = getCartItems();

  return cartItems.reduce((total, item) => total + (item.quantity || item.qty || 1), 0);
}

function updateCartCount() {
  const cartCount = document.getElementById('cart-count');

  if (!cartCount) {
    window.setTimeout(updateCartCount, 100);
    return;
  }

  cartCount.textContent = getCartCount();
}

window.addEventListener('load', updateCartCount);
window.addEventListener('storage', updateCartCount);

updateCartCount();
