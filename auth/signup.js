document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signup-form');
  const signupName = document.getElementById('signup-name');
  const signupEmail = document.getElementById('signup-email');
  const signupPassword = document.getElementById('signup-password');
  const signupConfirmPassword = document.getElementById('signup-confirm-password');

  if (!signupForm) {
    console.error('Signup form not found');
    return;
  }

  signupForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = signupName.value.trim();
    const email = signupEmail.value.trim();
    const password = signupPassword.value;
    const confirmPassword = signupConfirmPassword.value;

    if (!name || !email || !password || !confirmPassword) {
      showError('Please fill in all fields');
      return;
    }

    const nameValidation = AuthUtils.validateName(name);
    if (!nameValidation.valid) {
      showError(nameValidation.message);
      return;
    }

    if (!AuthUtils.validateEmail(email)) {
      showError('Please enter a valid email address');
      return;
    }

    const passwordValidation = AuthUtils.validatePassword(password);
    if (!passwordValidation.valid) {
      showError(passwordValidation.message);
      return;
    }

    if (password !== confirmPassword) {
      showError('Passwords do not match');
      return;
    }

    const existingUser = AuthUtils.findUser(email);
    if (existingUser) {
      showError('Email already registered. Please sign in instead.');
      return;
    }

    const hashedPassword = AuthUtils.hashPassword(password);
    const newUser = {
      id: Date.now(),
      name,
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };

    AuthUtils.saveUser(newUser);
    showSuccess('Account created successfully! Redirecting to login...');

    setTimeout(() => {
      window.location.href = 'signin.html';
    }, 1500);
  });

  function showError(message) {
    const existingError = document.querySelector('.auth-error');
    if (existingError) existingError.remove();

    const errorDiv = document.createElement('div');
    errorDiv.className = 'auth-error';
    errorDiv.textContent = message;
    signupForm.insertBefore(errorDiv, signupForm.firstChild);

    setTimeout(() => errorDiv.remove(), 5000);
  }

  function showSuccess(message) {
    const existingSuccess = document.querySelector('.auth-success');
    if (existingSuccess) existingSuccess.remove();

    const successDiv = document.createElement('div');
    successDiv.className = 'auth-success';
    successDiv.textContent = message;
    signupForm.insertBefore(successDiv, signupForm.firstChild);
  }
});