async function loadComponent(id, file, callback){
    try {
        const response = await fetch(file);
        const data = await response.text();
        const element = document.getElementById(id);
        if (element) {
            element.innerHTML = data;
            if (typeof callback === 'function') {
                callback(element);
            }
        }
    } catch (e) {
        console.error("Error loading component:", e);
    }
}

function showNewsletterPopup(success, data) {
    // Remove existing modal if any
    const existing = document.getElementById('newsletter-modal');
    if (existing) {
        existing.remove();
    }

    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.id = 'newsletter-modal';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.background = 'rgba(0, 0, 0, 0.4)';
    overlay.style.backdropFilter = 'blur(6px)';
    overlay.style.webkitBackdropFilter = 'blur(6px)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = '100000';
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.25s ease';

    // Create modal container
    const container = document.createElement('div');
    container.style.background = '#ffffff';
    container.style.padding = '40px 30px';
    container.style.borderRadius = '16px';
    container.style.boxShadow = '0 24px 64px rgba(0, 0, 0, 0.12)';
    container.style.width = '90%';
    container.style.maxWidth = '450px';
    container.style.textAlign = 'center';
    container.style.transform = 'scale(0.9)';
    container.style.transition = 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)';
    container.style.fontFamily = "'Poppins', sans-serif";

    // Icon (Checkmark or Cross)
    const iconWrapper = document.createElement('div');
    iconWrapper.style.width = '70px';
    iconWrapper.style.height = '70px';
    iconWrapper.style.borderRadius = '50%';
    iconWrapper.style.display = 'flex';
    iconWrapper.style.alignItems = 'center';
    iconWrapper.style.justifyContent = 'center';
    iconWrapper.style.margin = '0 auto 20px';
    iconWrapper.style.fontSize = '32px';
    iconWrapper.style.fontWeight = 'bold';

    if (success) {
        iconWrapper.style.background = 'rgba(184, 142, 47, 0.1)';
        iconWrapper.style.color = '#B88E2F';
        iconWrapper.innerHTML = '✓';
    } else {
        iconWrapper.style.background = 'rgba(233, 113, 113, 0.1)';
        iconWrapper.style.color = '#E97171';
        iconWrapper.innerHTML = '✗';
    }

    // Title
    const title = document.createElement('h2');
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.color = '#333333';
    title.style.margin = '0 0 12px 0';
    title.textContent = success ? 'Subscription Successful!' : 'Invalid Email Address';

    // Message
    const msg = document.createElement('p');
    msg.style.fontSize = '14px';
    msg.style.color = '#666666';
    msg.style.lineHeight = '1.6';
    msg.style.margin = '0 0 28px 0';
    if (success) {
        msg.innerHTML = `Thank you for subscribing with <strong>${data}</strong>.<br><br>Welcome to <strong>Furniro</strong>! You will now receive exclusive styling tips, early access to new arrivals, and members-only offers directly in your inbox.`;
    } else {
        msg.textContent = data;
    }

    // Button
    const btn = document.createElement('button');
    btn.style.border = 'none';
    btn.style.background = '#B88E2F';
    btn.style.color = '#ffffff';
    btn.style.padding = '14px 32px';
    btn.style.borderRadius = '8px';
    btn.style.fontSize = '14px';
    btn.style.fontWeight = '700';
    btn.style.cursor = 'pointer';
    btn.style.transition = 'background 0.2s, transform 0.2s';
    btn.style.textTransform = 'uppercase';
    btn.textContent = success ? 'Explore More' : 'Try Again';

    btn.addEventListener('mouseover', () => {
        btn.style.background = '#967325';
        btn.style.transform = 'translateY(-1px)';
    });
    btn.addEventListener('mouseout', () => {
        btn.style.background = '#B88E2F';
        btn.style.transform = 'translateY(0)';
    });

    const closeModal = () => {
        overlay.style.opacity = '0';
        container.style.transform = 'scale(0.9)';
        setTimeout(() => {
            overlay.remove();
        }, 250);
    };

    btn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeModal();
        }
    });

    container.appendChild(iconWrapper);
    container.appendChild(title);
    container.appendChild(msg);
    container.appendChild(btn);
    overlay.appendChild(container);
    document.body.appendChild(overlay);

    // Trigger transition
    setTimeout(() => {
        overlay.style.opacity = '1';
        container.style.transform = 'scale(1)';
    }, 20);
}

function handleFooterNewsletterSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const emailInput = form.querySelector('input[type="email"]');
    const email = emailInput?.value.trim() || '';

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        showNewsletterPopup(false, 'Please enter a valid email address.');
        return;
    }

    showNewsletterPopup(true, email);
    form.reset();
}

function attachFooterNewsletterHandler() {
    const form = document.querySelector('.newsletter-form');
    if (form) {
        form.removeEventListener('submit', handleFooterNewsletterSubmit);
        form.addEventListener('submit', handleFooterNewsletterSubmit);
        
        // Make sure the input has type="email" and required attributes
        const input = form.querySelector('input');
        if (input) {
            if (!input.getAttribute('type')) {
                input.setAttribute('type', 'email');
            }
            input.setAttribute('required', 'true');
        }
    }
}

loadComponent("navbar", "../assets/components/navbar.html");

loadComponent("footer", "../assets/components/footer.html", () => {
    attachFooterNewsletterHandler();
});