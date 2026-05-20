document.addEventListener('DOMContentLoaded', () => {
    // 1. Redirect to contact page when clicking on 'Contact' links
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        if (link.textContent.trim() === 'Contact') {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = 'contact.html';
            });
        }
    });

    // 2. Form submission for placing order
    const placeOrderBtn = document.querySelector('.place-order-btn');
    
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent actual form submission to handle via JS popup
            
            // Validate form details
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const street = document.getElementById('street').value.trim();
            const city = document.getElementById('city').value.trim();
            const zip = document.getElementById('zip').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const email = document.getElementById('email').value.trim();

            // Check if required details are entered
            if (firstName && lastName && street && city && zip && phone && email) {
                alert('Order placed successfully! Thank you for your purchase.');
                // Optionally clear the form
                const form = document.querySelector('.billing-details form');
                if(form) form.reset();
            } else {
                alert('Please fill in all required billing details before placing your order.');
            }
        });
    }
});

function openContact() {
    window.location.href = "contact.html";
}