const AuthUtils = {
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  validatePassword(password) {
    if (password.length < 6) {
      return { valid: false, message: 'Password must be at least 6 characters' };
    }
    return { valid: true };
  },

  validateName(name) {
    if (name.trim().length < 2) {
      return { valid: false, message: 'Name must be at least 2 characters' };
    }
    return { valid: true };
  },

  hashPassword(password) {
    return btoa(password);
  },

  verifyPassword(password, hash) {
    return btoa(password) === hash;
  },

  getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
  },

  saveUser(user) {
    const users = this.getUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  },

  findUser(email) {
    return this.getUsers().find(user => user.email === email);
  },

  setLoggedInUser(user) {
    const { password, ...userWithoutPassword } = user;
    localStorage.setItem('loggedInUser', JSON.stringify(userWithoutPassword));
  },

  getLoggedInUser() {
    const user = localStorage.getItem('loggedInUser');
    return user ? JSON.parse(user) : null;
  },

  isLoggedIn() {
    return this.getLoggedInUser() !== null;
  },

  logout() {
    localStorage.removeItem('loggedInUser');
  }
};
