async function loadComponent(id, file, callback) {
  try {
    const response = await fetch(file);

    if (!response.ok) {
      throw new Error(`Failed to load ${file}: ${response.status}`);
    }

    const data = await response.text();
    const element = document.getElementById(id);

    if (!element) {
      return;
    }

    element.innerHTML = data;

    if (typeof callback === 'function') {
      callback(element);
    }
  } catch (error) {
    console.error('Error loading component:', error);
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
  event.preventDefault();

  const form = event.target.closest('.newsletter-form');

  if (!form) {
    return;
  }

  const emailInput = form.querySelector('input[type="email"]');
  const email = emailInput?.value.trim() || '';
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

loadComponent('navbar', '../assets/components/navbar.html');
loadComponent('footer', '../assets/components/footer.html', attachFooterNewsletterHandler);
