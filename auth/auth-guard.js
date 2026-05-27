function isLoggedIn() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    return loggedInUser !== null;
}

async function loadPopup() {
    const popupContainer = document.getElementById("popup-container");
    if (!popupContainer) return;

    const response = await fetch("../assets/components/login-popup.html");
    const data = await response.text();
    popupContainer.innerHTML = data;
}

function showLoginPopup() {
    const popup = document.getElementById("login-popup");
    if (popup) {
        popup.classList.remove("hidden");
        const closeBtn = document.getElementById("close-popup");
        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                popup.classList.add("hidden");
            });
        }
    }
}

window.addEventListener("load", async () => {
    await loadPopup();
});