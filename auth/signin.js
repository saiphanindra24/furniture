const signinForm =
document.getElementById("signin-form");

signinForm.addEventListener("submit", (event) => {

    event.preventDefault();

    /* GET INPUT VALUES */

    const email =
    document.getElementById("signin-email").value;

    const password =
    document.getElementById("signin-password").value;

    /* GET USERS */

    const users =
    JSON.parse(localStorage.getItem("users")) || [];

    /* FIND MATCHING USER */

    const matchedUser = users.find(user =>

        user.email === email &&
        user.password === password

    );

    /* VALIDATION */

    if(matchedUser){

        /* STORE LOGGED IN USER */

        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(matchedUser)
        );

        alert("Login Successful");

        window.location.href =
        "../Home/Home.html";

    }else{

        alert("Invalid Email or Password");

    }

});