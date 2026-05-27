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

function showNewsletterPopup(message) {
  const existingModal = document.getElementById('newsletter-modal');

  if (existingModal) {
    existingModal.remove();
  }

  const overlay = document.createElement('div');
  overlay.id = 'newsletter-modal';
  overlay.className = 'newsletter-modal';

  const modal = document.createElement('div');
  modal.className = 'newsletter-modal__card';

  const icon = document.createElement('div');
  icon.className = 'newsletter-modal__icon';
  icon.textContent = '✓';

  const title = document.createElement('h3');
  title.className = 'newsletter-modal__title';
  title.textContent = 'Subscription Successful!';

  const text = document.createElement('p');
  text.className = 'newsletter-modal__text';
  text.textContent = message;

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'newsletter-modal__button';
  button.textContent = 'Continue';

  const closeModal = () => {
    overlay.remove();
  };

  button.addEventListener('click', closeModal);
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
      closeModal();
    }
  });

  modal.append(icon, title, text, button);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  requestAnimationFrame(() => {
    overlay.classList.add('is-visible');
  });
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
  showNewsletterPopup(`Thank you for subscribing with ${email}. You will now receive updates from Furniro.`);
}

function attachFooterNewsletterHandler() {
  const form = document.querySelector('.footer .newsletter-form');

  if (!form) {
    return;
  }

  form.removeEventListener('submit', handleFooterNewsletterSubmit);
  form.addEventListener('submit', handleFooterNewsletterSubmit);
}

loadComponent('navbar', '../assets/components/navbar.html', () => {
  // Load auth-utils first
  const authScript = document.createElement('script');
  authScript.src = '../auth/auth-utils.js';
  authScript.onload = () => {
    // Then load account-menu after auth-utils is ready
    const script = document.createElement('script');
    script.src = '../assets/components/account-menu.js';
    document.head.appendChild(script);
  };
  document.head.appendChild(authScript);
});

if (!/signin\.html$/i.test(window.location.pathname) && !/signup\.html$/i.test(window.location.pathname)) {
  loadComponent('footer', '../assets/components/footer.html', attachFooterNewsletterHandler);
}
