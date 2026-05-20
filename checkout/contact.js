document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent actual form submission

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            if (name && email) {
                alert(`Thank you, ${name}!\n\nYour details have been submitted:\nEmail: ${email}\nSubject: ${subject || 'N/A'}\nMessage: ${message || 'N/A'}`);
                contactForm.reset(); // Optional: reset form after submission
            } else {
                alert('Please fill in at least your name and email.');
            }
        });
    }
});