// Load shared footer on all pages
function loadSharedFooter() {
    // Detect current page location to set correct relative paths
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/').filter(p => p);

    // Determine the correct relative path to assets
    let assetsPath = './assets/';
    let homePath = './Home/Home.html';
    let shopPath = './Shop/index.html';
    let aboutPath = './Home/Home.html';
    let contactPath = './checkout/contact.html';
    let returnsPath = './Returns/returns.html';
    let paymentPath = './payments/payment.html';
    let wishlistPath = './Wishlist/Wishlist.html';
    let cartPath = './Home/cart.html';

    // Adjust paths based on current location
    if (pathParts.includes('Home')) {
        assetsPath = '../assets/';
        homePath = 'Home.html';
        shopPath = '../Shop/index.html';
        aboutPath = 'Home.html';
        contactPath = '../checkout/contact.html';
        returnsPath = '../Returns/returns.html';
        paymentPath = '../payments/payment.html';
        wishlistPath = '../Wishlist/Wishlist.html';
        cartPath = 'cart.html';
    } else if (pathParts.includes('Shop')) {
        assetsPath = '../assets/';
        homePath = '../Home/Home.html';
        shopPath = 'index.html';
        aboutPath = '../Home/Home.html';
        contactPath = '../checkout/contact.html';
        returnsPath = '../Returns/returns.html';
        paymentPath = '../payments/payment.html';
        wishlistPath = '../Wishlist/Wishlist.html';
        cartPath = '../Home/cart.html';
    } else if (pathParts.includes('Wishlist')) {
        assetsPath = '../assets/';
        homePath = '../Home/Home.html';
        shopPath = '../Shop/index.html';
        aboutPath = '../Home/Home.html';
        contactPath = '../checkout/contact.html';
        returnsPath = '../Returns/returns.html';
        paymentPath = '../payments/payment.html';
        wishlistPath = 'Wishlist.html';
        cartPath = '../Home/cart.html';
    } else if (pathParts.includes('checkout')) {
        assetsPath = '../assets/';
        homePath = '../Home/Home.html';
        shopPath = '../Shop/index.html';
        aboutPath = '../Home/Home.html';
        contactPath = 'contact.html';
        returnsPath = '../Returns/returns.html';
        paymentPath = '../payments/payment.html';
        wishlistPath = '../Wishlist/Wishlist.html';
        cartPath = '../Home/cart.html';
    } else if (pathParts.includes('Returns')) {
        assetsPath = '../assets/';
        homePath = '../Home/Home.html';
        shopPath = '../Shop/index.html';
        aboutPath = '../Home/Home.html';
        contactPath = '../checkout/contact.html';
        returnsPath = 'returns.html';
        paymentPath = '../payments/payment.html';
        wishlistPath = '../Wishlist/Wishlist.html';
        cartPath = '../Home/cart.html';
    } else if (pathParts.includes('payments')) {
        assetsPath = '../assets/';
        homePath = '../Home/Home.html';
        shopPath = '../Shop/index.html';
        aboutPath = '../Home/Home.html';
        contactPath = '../checkout/contact.html';
        returnsPath = '../Returns/returns.html';
        paymentPath = 'payment.html';
        wishlistPath = '../Wishlist/Wishlist.html';
        cartPath = '../Home/cart.html';
    } else if (pathParts.includes('singleproduct')) {
        assetsPath = '../assets/';
        homePath = '../Home/Home.html';
        shopPath = '../Shop/index.html';
        aboutPath = '../Home/Home.html';
        contactPath = '../checkout/contact.html';
        returnsPath = '../Returns/returns.html';
        paymentPath = '../payments/payment.html';
        wishlistPath = '../Wishlist/Wishlist.html';
        cartPath = '../Home/cart.html';
    } else if (pathParts.includes('blog')) {
        assetsPath = '../assets/';
        homePath = '../Home/Home.html';
        shopPath = '../Shop/index.html';
        aboutPath = '../Home/Home.html';
        contactPath = '../checkout/contact.html';
        returnsPath = '../Returns/returns.html';
        paymentPath = '../payments/payment.html';
        wishlistPath = '../Wishlist/Wishlist.html';
        cartPath = '../Home/cart.html';
    }

    fetch(assetsPath + 'footer.html')
        .then(response => response.text())
        .then(html => {
            // Create temporary container to parse HTML
            const temp = document.createElement('div');
            temp.innerHTML = html;
            const footerElement = temp.querySelector('footer');

            // Update links with correct paths
            const linkMap = {
                'Home': homePath,
                'Shop': shopPath,
                'About': aboutPath,
                'Contact': contactPath,
                'Payment Options': paymentPath,
                'Returns': returnsPath,
                'Privacy Policies': './Home/Home.html',
                'Wishlist': wishlistPath,
                'Cart': cartPath
            };

            // Update all footer links
            footerElement.querySelectorAll('a').forEach(link => {
                const text = link.textContent.trim();
                if (linkMap[text]) {
                    link.href = linkMap[text];
                }
            });

            // Replace or insert footer
            const existingFooter = document.querySelector('footer');
            if (existingFooter) {
                existingFooter.replaceWith(footerElement);
            } else {
                document.body.appendChild(footerElement);
            }
        })
        .catch(error => console.error('Failed to load footer:', error));
}

// Load footer when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadSharedFooter);
} else {
    loadSharedFooter();
}
