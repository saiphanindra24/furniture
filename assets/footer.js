// Toast notification function
function showToast(message, type = 'info') {
    let toast = document.querySelector('.newsletter-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'newsletter-toast';
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 9999;
            font-size: 14px;
            font-weight: 500;
            opacity: 0;
            transform: translateY(-20px);
            transition: all 0.3s ease;
        `;
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-20px)';
    }, 3000);
}

// Load shared footer on all pages
function loadSharedFooter() {
    // Detect current page location to set correct relative paths
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/').filter(p => p);

    // Determine the correct relative path to assets
    let assetsPath = './assets/';
    let homePath = './Home/Home.html';
    let shopPath = './Shop/index.html';
    let aboutPath = './blog/blog.html';
    let contactPath = './checkout/contact.html';
    let returnsPath = './Returns/Returns.html';
    let paymentPath = './payments/payment.html';
    let wishlistPath = './Wishlist/Wishlist.html';
    let privacyPath = './Privacy Policy/Privacy.html';
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
        aboutPath = '../blog/blog.html';
        contactPath = '../checkout/contact.html';
        returnsPath = '../Returns/Returns.html';
        paymentPath = '../payments/payment.html';
        wishlistPath = '../Wishlist/Wishlist.html';
        privacyPath = '../Privacy Policy/Privacy.html';
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

    fetch(assetsPath + 'components/footer.html')
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

            // Initialize newsletter subscription
            initNewsletterSubscription();
        })
        .catch(error => console.error('Failed to load footer:', error));
}

// Newsletter subscription handler
function initNewsletterSubscription() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = form.querySelector('.newsletter-input');
        const email = emailInput.value.trim();

        if (!email) {
            showToast('Please enter your email address', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showToast('Please enter a valid email address', 'error');
            return;
        }

        // Store subscription
        let subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
        if (!subscribers.includes(email)) {
            subscribers.push(email);
            localStorage.setItem('subscribers', JSON.stringify(subscribers));
            showToast('🎉 Subscribed to FURNIRO', 'success');
            emailInput.value = '';
        } else {
            showToast('This email is already subscribed!', 'info');
        }
    });
}

// Load footer when ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadSharedFooter);
} else {
    loadSharedFooter();
}
