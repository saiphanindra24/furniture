const AUTH_STORAGE_KEY = 'loggedInUser';
const UNPROTECTED_PAGE_PATTERNS = [
  /(^|\/)Home\/Home\.html$/i,
  /(^|\/)auth\/signin\.html$/i,
  /(^|\/)auth\/signup\.html$/i,
];

function getLoggedInUser() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) || 'null');
  } catch (error) {
    console.error('Failed to parse loggedInUser:', error);
    return null;
  }
}

function isLoggedIn() {
  return !!getLoggedInUser();
}

function showLoginPopup(redirectUrl) {
  const popup = document.getElementById('login-popup');
  if (!popup) {
    return;
  }

  const signInButton = popup.querySelector('#login-signin-btn');
  if (signInButton && redirectUrl) {
    signInButton.href = `../auth/signin.html?redirect=${encodeURIComponent(redirectUrl)}`;
  }

  popup.classList.remove('hidden');
  document.body.classList.add('no-scroll');
}

function hideLoginPopup() {
  if (!isLoggedIn() && currentPageNeedsLogin()) {
    window.location.href = '../Home/Home.html';
    return;
  }

  const popup = document.getElementById('login-popup');
  if (popup) {
    popup.classList.add('hidden');
  }
  document.body.classList.remove('no-scroll');
}

async function loadPopup() {
  const popupContainer = document.getElementById('popup-container');
  if (!popupContainer) {
    return;
  }

  const response = await fetch('../assets/components/login-popup.html');
  if (!response.ok) {
    console.error('Failed to load login popup:', response.status);
    return;
  }

  popupContainer.innerHTML = await response.text();

  const closeButton = document.getElementById('close-popup');
  if (closeButton) {
    closeButton.addEventListener('click', hideLoginPopup);
  }

  const popup = document.getElementById('login-popup');
  if (popup) {
    popup.addEventListener('click', (event) => {
      if (event.target === popup) {
        hideLoginPopup();
      }
    });
  }
}

function currentPageNeedsLogin() {
  const path = window.location.pathname || window.location.href;
  const isUnprotected = UNPROTECTED_PAGE_PATTERNS.some(pattern => pattern.test(path));
  return !isUnprotected;
}

window.addEventListener('load', async () => {
  await loadPopup();

  if (!isLoggedIn() && currentPageNeedsLogin()) {
    showLoginPopup(window.location.href);
  }
});
