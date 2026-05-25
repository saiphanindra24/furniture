async function loadComponent(id, file){

    const response = await fetch(file);

    const data = await response.text();

    document.getElementById(id).innerHTML = data;
}

loadComponent("navbar", "../assets/components/navbar.html");

loadComponent("footer", "../assets/components/footer.html");