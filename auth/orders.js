const ordersList = document.getElementById('orders-list');
const noOrdersMessage = document.getElementById('no-orders-message');

function loadOrders() {
  const user = getLoggedInUser();

  if (!user) {
    window.location.href = '../auth/signin.html';
    return;
  }

  try {
    const orders = JSON.parse(localStorage.getItem('userOrders') || '{}');
    const userOrders = orders[user.email] || [];

    if (userOrders.length === 0) {
      ordersList.style.display = 'none';
      noOrdersMessage.style.display = 'block';
      return;
    }

    ordersList.innerHTML = '';
    noOrdersMessage.style.display = 'none';

    userOrders.forEach((order) => {
      const orderCard = createOrderCard(order);
      ordersList.appendChild(orderCard);
    });
  } catch (error) {
    console.error('Failed to load orders:', error);
    noOrdersMessage.style.display = 'block';
  }
}

function createOrderCard(order) {
  const card = document.createElement('div');
  card.className = 'order-card';

  const statusClass = `order-status--${order.status.toLowerCase().replace(' ', '-')}`;
  const itemsTotal = order.items ? order.items.length : 0;

  const orderDate = new Date(order.createdAt);
  const formattedDate = orderDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const itemsHTML = order.items
    ? order.items.map((item) => {
        return `
          <div class="order-item">
            <div class="order-item-image">
              <i class="fa fa-cube"></i>
            </div>
            <div class="order-item-details">
              <div>
                <div class="order-item-name">${item.name || 'Product'}</div>
                <div class="order-item-meta">Qty: ${item.quantity || 1}</div>
              </div>
              <div class="order-item-price">
                <div class="order-item-total">Rs. ${(item.price || 0).toFixed(2)}</div>
              </div>
            </div>
          </div>
        `;
      })
    .join('')
    : '';

  card.innerHTML = `
    <div class="order-card-header">
      <div class="order-info">
        <span class="order-info-label">Order ID</span>
        <span class="order-info-value">#${order.id}</span>
      </div>
      <div class="order-info">
        <span class="order-info-label">Order Date</span>
        <span class="order-info-value">${formattedDate}</span>
      </div>
      <div class="order-info">
        <span class="order-info-label">Total Amount</span>
        <span class="order-info-value">Rs. ${(order.totalAmount || 0).toFixed(2)}</span>
      </div>
      <span class="order-status ${statusClass}">${order.status}</span>
    </div>
    
    <div class="order-card-body">
      <div class="order-items">
        <div class="order-items-title">
          <i class="fa fa-box"></i>
          Items (${itemsTotal})
        </div>
        ${itemsHTML}
      </div>

      <div class="order-summary">
        <div class="summary-item">
          <span class="summary-label">Subtotal</span>
          <span class="summary-value">Rs. ${(order.subtotal || 0).toFixed(2)}</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">Shipping</span>
          <span class="summary-value">Rs. ${(order.shipping || 0).toFixed(2)}</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">Tax</span>
          <span class="summary-value">Rs. ${(order.tax || 0).toFixed(2)}</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">Total</span>
          <span class="summary-value summary-value--total">Rs. ${(order.totalAmount || 0).toFixed(2)}</span>
        </div>
      </div>
    </div>

    <div class="order-card-footer">
      <div class="order-date">Placed on ${formattedDate}</div>
      <div class="order-actions">
        <button type="button" class="btn btn-secondary" onclick="trackOrder('${order.id}')">
          <i class="fa fa-location-arrow"></i> Track
        </button>
      </div>
    </div>
  `;

  return card;
}

function trackOrder(orderId) {
  alert(`Tracking order #${orderId}\n\nThis feature will be updated with real tracking information.`);
}

window.addEventListener('load', loadOrders);
