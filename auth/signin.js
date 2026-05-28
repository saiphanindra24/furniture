const signinForm = document.getElementById("signin-form");

if (!signinForm) {
    throw new Error('Signin form not found');
}

if (localStorage.getItem("loggedInUser")) {
    window.location.href = "../Home/Home.html";
}

signinForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("signin-email").value.trim();
    const password = document.getElementById("signin-password").value;

    const users = JSON.parse(localStorage.getItem("users") || '[]');
    const matchedUser = users.find(user =>
        user.email === email &&
        user.password === password
    );

    if (matchedUser) {
        localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));

        const redirectUrl = new URLSearchParams(window.location.search).get('redirect');
        window.location.href = redirectUrl ? decodeURIComponent(redirectUrl) : "../Home/Home.html";
    } else {
        alert("Invalid Email or Password");
    }
});
