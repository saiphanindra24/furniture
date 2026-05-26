function updateCartCount(){

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartCount = document.getElementById("cart-count");

    if(cartCount){

        cartCount.textContent = cart.length;

    }

}

document.addEventListener("DOMContentLoaded", updateCartCount);
function updateCartCount(){

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartCount = document.getElementById("cart-count");

    if(cartCount){

        cartCount.textContent = cart.length;

    }

}

/* ADD TO CART FUNCTION */

function addToCart(product){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

}

/* LOAD COUNT AFTER NAVBAR LOADS */

window.addEventListener("load", () => {

    setTimeout(updateCartCount, 300);

});
const addButtons = document.querySelectorAll(".overlay-button");

addButtons.forEach((button, index) => {

    button.addEventListener("click", () => {

        const productCard = button.closest(".product-card");

        const product = {

            id: index + 1,

            name: productCard.querySelector(".product-name").innerText,

            price: productCard.querySelector(".current-price").innerText,

            image: productCard.querySelector("img").src

        };

        addToCart(product);

        alert("Product added to cart");

    });

});