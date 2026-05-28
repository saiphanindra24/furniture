const AUTH_USER_KEY = 'loggedInUser';

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem('users') || '[]');
  } catch (error) {
    console.error('Failed to parse users list:', error);
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

function getLoggedInUser() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_USER_KEY) || 'null');
  } catch (error) {
    console.error('Failed to parse loggedInUser:', error);
    return null;
  }
}

function setLoggedInUser(user) {
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
}

function logoutUser() {
  localStorage.removeItem(AUTH_USER_KEY);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
