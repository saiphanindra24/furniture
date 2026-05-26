// Load shared navbar on all pages
function loadSharedNavbar() {
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/').filter(p => p);

    // Determine correct relative path to assets
    let assetsPath = './assets/';
    let homeUrl = './Home/Home.html';
    let shopUrl = './Shop/index.html';
    let aboutUrl = './blog/blog.html';
    let contactUrl = './checkout/contact.html';
    let wishlistUrl = './Wishlist/Wishlist.html';
    let cartUrl = './Home/cart.html';
    let accountUrl = './checkout/contact.html';

    // Adjust paths based on current location
    if (pathParts.includes('Home') || pathParts.includes('Home.html')) {
        assetsPath = '../assets/';
        homeUrl = 'Home.html';
        shopUrl = '../Shop/index.html';
        aboutUrl = '../blog/blog.html';
        contactUrl = '../checkout/contact.html';
        wishlistUrl = '../Wishlist/Wishlist.html';
        cartUrl = 'cart.html';
        accountUrl = '../checkout/contact.html';
    } else if (pathParts.includes('Shop')) {
        assetsPath = '../assets/';
        homeUrl = '../Home/Home.html';
        shopUrl = 'index.html';
        aboutUrl = '../blog/blog.html';
        contactUrl = '../checkout/contact.html';
        wishlistUrl = '../Wishlist/Wishlist.html';
        cartUrl = '../Home/cart.html';
        accountUrl = '../checkout/contact.html';
    } else if (pathParts.includes('Wishlist')) {
        assetsPath = '../assets/';
        homeUrl = '../Home/Home.html';
        shopUrl = '../Shop/index.html';
        aboutUrl = '../blog/blog.html';
        contactUrl = '../checkout/contact.html';
        wishlistUrl = 'Wishlist.html';
        cartUrl = '../Home/cart.html';
        accountUrl = '../checkout/contact.html';
    } else if (pathParts.includes('checkout') || pathParts.includes('chekout')) {
        assetsPath = '../assets/';
        homeUrl = '../Home/Home.html';
        shopUrl = '../Shop/index.html';
        aboutUrl = '../blog/blog.html';
        contactUrl = 'contact.html';
        wishlistUrl = '../Wishlist/Wishlist.html';
        cartUrl = '../Home/cart.html';
        accountUrl = 'contact.html';
    } else if (pathParts.includes('Returns') || pathParts.includes('Privacy')) {
        assetsPath = '../assets/';
        homeUrl = '../Home/Home.html';
        shopUrl = '../Shop/index.html';
        aboutUrl = '../blog/blog.html';
        contactUrl = '../checkout/contact.html';
        wishlistUrl = '../Wishlist/Wishlist.html';
        cartUrl = '../Home/cart.html';
        accountUrl = '../checkout/contact.html';
    } else if (pathParts.includes('singleproduct')) {
        assetsPath = '../assets/';
        homeUrl = '../Home/Home.html';
        shopUrl = '../Shop/index.html';
        aboutUrl = '../blog/blog.html';
        contactUrl = '../checkout/contact.html';
        wishlistUrl = '../Wishlist/Wishlist.html';
        cartUrl = '../Home/cart.html';
        accountUrl = '../checkout/contact.html';
    } else if (pathParts.includes('blog') || pathParts.includes('payments')) {
        assetsPath = '../assets/';
        homeUrl = '../Home/Home.html';
        shopUrl = '../Shop/index.html';
        aboutUrl = 'blog.html';
        contactUrl = '../checkout/contact.html';
        wishlistUrl = '../Wishlist/Wishlist.html';
        cartUrl = '../Home/cart.html';
        accountUrl = '../checkout/contact.html';
    }

    fetch(assetsPath + 'navbar.html')
        .then(response => response.text())
        .then(html => {
            const temp = document.createElement('div');
            temp.innerHTML = html;
            const navbarElement = temp.querySelector('header');

            // Update navigation links
            const navMap = {
                'home': homeUrl,
                'shop': shopUrl,
                'about': aboutUrl,
                'contact': contactUrl,
                'account': accountUrl,
                'wishlist': wishlistUrl,
                'cart': cartUrl
            };

            // Update navbar links
            navbarElement.querySelectorAll('[data-nav]').forEach(link => {
                const navType = link.getAttribute('data-nav');
                if (navMap[navType]) {
                    link.href = navMap[navType];
                }
            });

            // Brand link
            navbarElement.querySelector('.site-navbar__brand').href = homeUrl;

            // Insert navbar at the beginning
            const existingNav = document.querySelector('header');
            if (existingNav && existingNav.classList.contains('site-navbar')) {
                existingNav.replaceWith(navbarElement);
            } else {
                document.body.insertBefore(navbarElement, document.body.firstChild);
            }

            // Initialize navbar interactions
            initNavbarInteractions();
        })
        .catch(error => console.error('Failed to load navbar:', error));
}

// Initialize navbar interactions
function initNavbarInteractions() {
    // Mobile menu toggle
    const mobileToggle = document.querySelector('.site-navbar__mobile-toggle');
    const menu = document.querySelector('.site-navbar__menu');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            menu.classList.toggle('active');
            mobileToggle.setAttribute('aria-expanded',
                mobileToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
        });
    }

    // Search functionality
    const searchInput = document.getElementById('navbar-search');
    const searchBtn = document.querySelector('.site-navbar__search-btn');

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            // Store search query
            localStorage.setItem('searchQuery', query);
            // Redirect to shop page with search
            const shopUrl = document.querySelector('[data-nav="shop"]').href;
            window.location.href = shopUrl + '?search=' + encodeURIComponent(query);
        }
    }

    // Update cart count
    updateCartBadge();
}

// Load navbar when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadSharedNavbar);
} else {
    loadSharedNavbar();
}
