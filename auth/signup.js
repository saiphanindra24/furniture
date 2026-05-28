<<<<<<< Updated upstream
﻿const signupForm = document.getElementById("signup-form");

if (!signupForm) {
    throw new Error('Signup form not found');
}

signupForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById("signup-confirm-password").value;

    if (!name || !email || !password || !confirmPassword) {
        alert("Please fill in all fields.");
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users") || '[]');
    const existingUser = users.find(existing => existing.email === email);

    if (existingUser) {
        alert("A user with that email already exists.");
        return;
    }

    users.push({
        name,
        email,
        password,
        createdAt: new Date().toISOString()
    });

    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup successful. You can now sign in.");
    window.location.href = "signin.html";
=======
document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signup-form');
  const signupName = document.getElementById('signup-name');
  const signupEmail = document.getElementById('signup-email');
  const signupPassword = document.getElementById('signup-password');
  const signupConfirmPassword = document.getElementById('signup-confirm-password');

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
      name: name,
      email: email,
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
>>>>>>> Stashed changes
});
