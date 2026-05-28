function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function formatRupiah(value) {
  return `Rp. ${Number(value).toLocaleString('en-IN', {minimumFractionDigits:2, maximumFractionDigits:2})}`;
}

function loadOrder() {
  const orderId = getQueryParam('orderId') || localStorage.getItem('lastOrderId');
  if (!orderId) {
    document.getElementById('confirmation-sub').textContent = 'No recent order found.';
    return;
  }

  const allOrders = JSON.parse(localStorage.getItem('userOrders') || '{}');
  const currentUser = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
  const userKey = currentUser && currentUser.email ? currentUser.email : '_guest_';
  const userOrders = allOrders[userKey] || [];

  const order = userOrders.find(o => o.id === orderId) || null;

  if (!order) {
    document.getElementById('confirmation-sub').textContent = 'Order not found in your account.';
    return;
  }

  const detailsEl = document.getElementById('order-details');
  detailsEl.innerHTML = `
    <div class="order-summary">
      <div><strong>Order ID:</strong> ${order.id}</div>
      <div><strong>Placed:</strong> ${new Date(order.createdAt).toLocaleString()}</div>
      <div><strong>Status:</strong> ${order.status}</div>
      <div><strong>Total:</strong> ${formatRupiah(order.totalAmount)}</div>
    </div>
    <div class="order-items">
      <h3>Items</h3>
      ${order.items.map(item => `
        <div class="oc-item">
          <div class="oc-item-name">${item.name}</div>
          <div class="oc-item-meta">Qty: ${item.quantity} • Rs. ${Number(item.price).toFixed(2)}</div>
        </div>
      `).join('')}
    </div>
  `;
}

window.addEventListener('load', loadOrder);
