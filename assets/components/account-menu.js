class AccountMenu {
  constructor() {
    this.accountBtn = null;
    this.accountDropdown = null;
    this.userNameEl = null;
    this.userEmailEl = null;
    this.logoutBtn = null;
    this.init();
  }

  init() {
    this.accountBtn = document.querySelector('.site-navbar__account-btn');
    this.accountDropdown = document.querySelector('.site-navbar__account-dropdown');
    this.userNameEl = document.querySelector('.account-dropdown__user-name');
    this.userEmailEl = document.querySelector('.account-dropdown__user-email');
    this.logoutBtn = document.querySelector('.account-dropdown__logout');

    if (!this.accountBtn || !this.accountDropdown) {
      console.warn('Account menu elements not found in DOM');
      return;
    }

    this.attachEventListeners();
    this.updateUserInfo();
  }

  attachEventListeners() {
    this.accountBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleDropdown();
    });

    this.logoutBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      this.handleLogout();
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.site-navbar__account-menu')) {
        this.closeDropdown();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeDropdown();
      }
    });
  }

  toggleDropdown() {
    if (this.accountDropdown.classList.contains('is-active')) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  }

  openDropdown() {
    this.accountDropdown.classList.add('is-active');
    this.accountBtn.setAttribute('aria-expanded', 'true');
  }

  closeDropdown() {
    this.accountDropdown.classList.remove('is-active');
    this.accountBtn.setAttribute('aria-expanded', 'false');
  }

  updateUserInfo() {
    if (typeof AuthUtils === 'undefined') {
      console.warn('AuthUtils not available yet');
      return;
    }

    const loggedInUser = AuthUtils.getLoggedInUser();

    if (loggedInUser) {
      if (this.userNameEl) {
        this.userNameEl.textContent = loggedInUser.name || 'User';
      }
      if (this.userEmailEl) {
        this.userEmailEl.textContent = loggedInUser.email || '';
      }
      if (this.logoutBtn) {
        this.logoutBtn.style.display = 'flex';
      }
    } else {
      if (this.userNameEl) {
        this.userNameEl.textContent = 'Guest User';
      }
      if (this.userEmailEl) {
        this.userEmailEl.textContent = 'Not logged in';
      }
      if (this.logoutBtn) {
        this.logoutBtn.style.display = 'none';
      }
    }
  }

  handleLogout() {
    if (typeof AuthUtils === 'undefined') {
      console.error('AuthUtils not available');
      return;
    }

    AuthUtils.logout();
    this.closeDropdown();
    this.updateUserInfo();

    const toast = document.createElement('div');
    toast.className = 'premium-toast';
    toast.textContent = '👋 Logged out successfully!';
    document.body.appendChild(toast);
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);

    setTimeout(() => {
      window.location.href = '../Home/Home.html';
    }, 1500);
  }
}

function initAccountMenu() {
  const accountMenu = new AccountMenu();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAccountMenu);
} else {
  initAccountMenu();
}

