const COMPONENT_BASE_URL = (() => {
  const script = document.currentScript || Array.from(document.scripts).find(s => s.src && s.src.endsWith('/layout.js'));
  if (script && script.src) {
    return new URL('.', script.src).href;
  }

  try {
    const pageUrl = new URL(window.location.href);
    const segments = pageUrl.pathname.replace(/\/+$|[^/]*$/, '').split('/').filter(Boolean);
    if (segments.length >= 1) {
      segments.pop();
      const fallbackPath = '/' + segments.join('/') + '/assets/components/';
      pageUrl.pathname = fallbackPath;
      return pageUrl.href;
    }
  } catch (error) {
    console.warn('Failed to derive component base URL from page location:', error);
  }

  return '/assets/components/';
})();

function getComponentUrl(file) {
  try {
    return new URL(file, COMPONENT_BASE_URL).href;
  } catch (error) {
    console.warn('Failed to resolve component URL for', file, 'using base', COMPONENT_BASE_URL, error);
    return file;
  }
}

async function loadComponent(id, file, callback) {
  const candidates = [
    getComponentUrl(file),
    file,
    `../assets/components/${file}`,
    `./assets/components/${file}`,
    `/assets/components/${file}`
  ];

  let response = null;
  let attemptedUrl = null;

  for (const candidate of candidates) {
    if (!candidate) continue;

    try {
      const res = await fetch(candidate);
      if (res.ok) {
        response = res;
        attemptedUrl = candidate;
        break;
      }
    } catch (fetchError) {
      console.warn(`Component fetch failed for ${candidate}:`, fetchError);
    }
  }

  if (!response) {
    console.error('Error loading component:', file, 'none of the candidate URLs worked:', candidates);
    return;
  }

  try {
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
    console.error('Error processing component HTML:', file, error);
  }
}

function getLoggedInUser() {
  try {
    return JSON.parse(localStorage.getItem('loggedInUser') || 'null');
  } catch (error) {
    console.error('Failed to parse loggedInUser:', error);
    return null;
  }
}

function logoutUser() {
  localStorage.removeItem('loggedInUser');
  window.location.reload();
}

function updateNavbarAuthState(navbarElement) {
  const authLink = navbarElement.querySelector('#auth-link');
  const authMenu = navbarElement.querySelector('#auth-menu');
  const profileName = navbarElement.querySelector('#profile-name');
  const profileViewBtn = navbarElement.querySelector('#profile-view-btn');
  const logoutBtn = navbarElement.querySelector('#logout-btn');

  if (!authLink) {
    return;
  }

  const user = getLoggedInUser();
  const profileBadge = navbarElement.querySelector('#profile-badge');

  function closeAuthMenu() {
    if (authMenu) {
      authMenu.classList.add('hidden');
    }
    authLink.setAttribute('aria-expanded', 'false');
  }

  function toggleAuthMenu() {
    if (!authMenu) {
      return;
    }

    authMenu.classList.toggle('hidden');
    const expanded = authMenu.classList.contains('hidden') ? 'false' : 'true';
    authLink.setAttribute('aria-expanded', expanded);
  }

  if (user && user.name) {
    authLink.type = 'button';
    authLink.title = `Account for ${user.name}`;

    if (profileBadge) {
      if (user.profilePic && user.profilePic !== '../assets/default-profile.png') {
        profileBadge.innerHTML = `<img src="${user.profilePic}" alt="${user.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
        profileBadge.classList.remove('profile-badge--initial');
      } else {
        const userInitial = user.name.trim().charAt(0).toUpperCase() || 'U';
        profileBadge.textContent = userInitial;
        profileBadge.classList.add('profile-badge--initial');
      }
    } else {
      authLink.innerHTML = '<i class="fa fa-user"></i>';
    }

    if (authMenu) {
      profileName.textContent = user.name;
      authMenu.classList.add('hidden');
    }

    if (authLink._authHandler) {
      authLink.removeEventListener('click', authLink._authHandler);
    }

    authLink._authHandler = (event) => {
      event.preventDefault();
      toggleAuthMenu();
    };
    authLink.addEventListener('click', authLink._authHandler);

    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        logoutUser();
      });
    }

    if (profileViewBtn) {
      profileViewBtn.addEventListener('click', () => {
        closeAuthMenu();
        window.location.href = '../auth/profile.html';
      });
    }

    const ordersViewBtn = navbarElement.querySelector('#orders-view-btn');
    if (ordersViewBtn) {
      ordersViewBtn.addEventListener('click', () => {
        closeAuthMenu();
        window.location.href = '../auth/orders.html';
      });
    }

    if (!window.__navbarProfileCloseListenerAdded) {
      window.__navbarProfileCloseListenerAdded = true;
      document.addEventListener('click', (event) => {
        if (!event.target.closest('#auth-profile-container')) {
          closeAuthMenu();
        }
      });
    }
  } else {
    authLink.type = 'button';
    authLink.title = 'Sign in';

    if (profileBadge) {
      profileBadge.innerHTML = '<i class="fa fa-user"></i>';
      profileBadge.classList.remove('profile-badge--initial');
    } else {
      authLink.innerHTML = '<i class="fa fa-user"></i>';
    }

    if (authMenu) {
      authMenu.classList.add('hidden');
    }

    if (authLink._authHandler) {
      authLink.removeEventListener('click', authLink._authHandler);
      delete authLink._authHandler;
    }

    authLink.addEventListener('click', () => {
      window.location.href = '../auth/signin.html';
    });
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

loadComponent('navbar', 'navbar.html', updateNavbarAuthState);

if (!/signin\.html$/i.test(window.location.pathname) && !/signup\.html$/i.test(window.location.pathname)) {
  loadComponent('footer', 'footer.html', attachFooterNewsletterHandler);
}
