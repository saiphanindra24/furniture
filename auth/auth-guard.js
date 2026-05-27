function isLoggedIn(){

    const loggedInUser =
    localStorage.getItem("loggedInUser");

    return loggedInUser !== null;

}

/* LOAD POPUP */

async function loadPopup(){

    const popupContainer =
    document.getElementById("popup-container");

    if(!popupContainer) return;

    const response = await fetch(
        "../assets/components/login-popup.html"
    );

    const data = await response.text();

    popupContainer.innerHTML = data;

}

/* SHOW POPUP */

function showLoginPopup(){

    const popup =
    document.getElementById("login-popup");

    if(popup){

        popup.classList.remove("hidden");

    }

}

/* INITIALIZE */

window.addEventListener("load", async () => {

    await loadPopup();

    /* TEMP TEST */

    setTimeout(() => {

        showLoginPopup();

    }, 1000);

});