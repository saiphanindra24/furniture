function openCheckout() {
    console.log('Opening checkout page');
    window.location.href = "../checkout/chekout.html";
}

document.getElementById('checkoutBtn')?.addEventListener('click', openCheckout);