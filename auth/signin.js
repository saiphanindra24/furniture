document.addEventListener('DOMContentLoaded', () => {
  const signinForm = document.getElementById('signin-form');
  const signinEmail = document.getElementById('signin-email');
  const signinPassword = document.getElementById('signin-password');

  signinForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = signinEmail.value.trim();
    const password = signinPassword.value;

    if (!email || !password) {
      showError('Please fill in all fields');
      return;
    }

    if (!AuthUtils.validateEmail(email)) {
      showError('Please enter a valid email address');
      return;
    }

    const user = AuthUtils.findUser(email);

    if (!user) {
      showError('Email not registered. Please sign up first.');
      return;
    }

    if (!AuthUtils.verifyPassword(password, user.password)) {
      showError('Invalid password. Please try again.');
      return;
    }

    AuthUtils.setLoggedInUser(user);
    showSuccess('Login successful! Redirecting...');

    setTimeout(() => {
      window.location.href = '../Home/Home.html';
    }, 1500);
  });

  function showError(message) {
    const existingError = document.querySelector('.auth-error');
    if (existingError) existingError.remove();

    const errorDiv = document.createElement('div');
    errorDiv.className = 'auth-error';
    errorDiv.textContent = message;
    signinForm.insertBefore(errorDiv, signinForm.firstChild);

    setTimeout(() => errorDiv.remove(), 5000);
  }

  function showSuccess(message) {
    const existingSuccess = document.querySelector('.auth-success');
    if (existingSuccess) existingSuccess.remove();

    const successDiv = document.createElement('div');
    successDiv.className = 'auth-success';
    successDiv.textContent = message;
    signinForm.insertBefore(successDiv, signinForm.firstChild);
  }
});