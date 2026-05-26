async function loadComponent(id, file, callback) {

    const response = await fetch(file);

    const data = await response.text();

    const target = document.getElementById(id);

    if (!target) {
        return;
    }

    target.innerHTML = data;

    if (typeof callback === 'function') {
        callback(target);
    }
}

function setNewsletterStatus(form, message, isSuccess = true) {
    const status = form.querySelector('.newsletter-status');

    if (!status) {
        return;
    }

    status.textContent = message;
    status.className = `newsletter-status ${isSuccess ? 'success' : 'error'}`;
}

function handleFooterNewsletterSubmit(event) {
    const form = event.target.closest('.newsletter-form');

    if (!form) {
        return;
    }

    const emailInput = form.querySelector('input[type="email"]');
    const email = emailInput?.value.trim() || '';

    event.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        setNewsletterStatus(form, 'Please enter a valid email address.', false);
        return;
    }

    setNewsletterStatus(form, 'Subscribed successfully!', true);
    form.reset();
}

function attachFooterNewsletterHandler() {
    const form = document.querySelector('.footer .newsletter-form');

    if (!form) {
        return;
    }

    form.removeEventListener('submit', handleFooterNewsletterSubmit);
    form.addEventListener('submit', handleFooterNewsletterSubmit);
}

loadComponent("navbar", "../assets/components/navbar.html");

loadComponent("footer", "../assets/components/footer.html", attachFooterNewsletterHandler);

loadComponent("cart-count", "../assets/components/cart-count.html");

loadComponent("search-bar", "../assets/components/search-bar.html");


loadComponent('returns', '../Returns/Returns.html')