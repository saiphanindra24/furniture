const signupForm = document.getElementById("signup-form");

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
});
