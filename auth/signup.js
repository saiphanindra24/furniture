const signupForm = document.getElementById("signup-form");

signupForm.addEventListener("submit", (event) => {

    event.preventDefault();

    /* GET VALUES */

    const name =
    document.getElementById("signup-name").value;

    const email =
    document.getElementById("signup-email").value;

    const password =
    document.getElementById("signup-password").value;

    const confirmPassword =
    document.getElementById("signup-confirm-password").value;

    /* PASSWORD VALIDATION */

    if(password !== confirmPassword){

        alert("Passwords do not match");

        return;

    }

    /* USER OBJECT */

    const user = {

        name: name,

        email: email,

        password: password

    };

    /* GET EXISTING USERS */

    const users =
    JSON.parse(localStorage.getItem("users")) || [];

    /* CHECK EXISTING USER */

    const existingUser =
    users.find(user => user.email === email);

    if(existingUser){

        alert("User already exists");

        return;

    }

    /* ADD USER */

    users.push(user);

    /* SAVE USERS */

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    /* SUCCESS MESSAGE */

    alert("Signup successful");

    /* REDIRECT TO SIGNIN PAGE */

    window.location.href = "signin.html";

});