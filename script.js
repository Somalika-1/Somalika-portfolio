// Portfolio JavaScript - Simple and Valid
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
        
        // Close mobile menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
    }
    
    
    // Resume Download
const resumeBtn = document.querySelector('.resume-btn');
if (resumeBtn) {
    resumeBtn.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default link behavior
        
        // Get the file ID from the href attribute
        const href = this.getAttribute('href');
        const fileId = href.split('/')[5]; // Extract the file ID from the URL
        
        // Create the download URL
        const downloadUrl = "https://drive.google.com/uc?export=download&id=1G4h1ACyzTWkMh8bemJ2NAaEfQehoI9_pmHrT9dgxN1o";
             
        // Open the download URL in a new window
        window.open(downloadUrl, '_blank');
    });
}


// EmailJS Form Submission Script
(function() {
    // EmailJS Initialization
    emailjs.init("J_9cqYAOftUXPM0e6");

    // Form Submission Handler
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Enhanced Validation
            const isValid = validateForm(form);
            
            if (isValid) {
                sendEmailWithLoading(form);
            }
        });

        // Validation Function
        function validateForm(formElement) {
            let isValid = true;
            const requiredFields = formElement.querySelectorAll('.required');
            
            // Reset previous error states
            formElement.querySelectorAll('.error').forEach(el => {
                el.classList.remove('error');
            });

            // Validate Required Fields
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('error');
                    isValid = false;
                }
            });

            // Email Validation
            const emailField = formElement.querySelector('input[name="user_email"]');
            if (emailField) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailField.value.trim())) {
                    emailField.classList.add('error');
                    isValid = false;
                }
            }

            // Display Validation Error
            if (!isValid) {
                displayFormError(formElement, 'Please fill all fields correctly.');
            }

            return isValid;
        }

        // Send Email with Loading State
        function sendEmailWithLoading(formElement) {
            const submitBtn = formElement.querySelector('.form-submit');
            const originalBtnText = submitBtn.innerHTML;

            // Disable button and show loading
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Send Email via EmailJS
            emailjs.sendForm('service_0bklcb8', 'template_7ft446o', formElement)
                .then(handleSuccessResponse(formElement, submitBtn, originalBtnText))
                .catch(handleErrorResponse(formElement, submitBtn, originalBtnText));
        }

        // Success Response Handler
        function handleSuccessResponse(formElement, submitBtn, originalBtnText) {
            return function(response) {
                console.log('Email sent successfully!', response);
                
                // Reset form and show success message
                formElement.reset();
                displayFormSuccess(formElement, 'Message sent successfully!');
                
                // Restore button state
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            };
        }

        // Error Response Handler
        function handleErrorResponse(formElement, submitBtn, originalBtnText) {
            return function(error) {
                console.error('Email sending failed:', error);
                
                // Show error message
                displayFormError(formElement, 'Failed to send message. Please try again.');
                
                // Restore button state
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            };
        }

        // Display Form Success Message
        function displayFormSuccess(formElement, message) {
            // Remove existing messages
            removeExistingMessages(formElement);

            const successMsg = document.createElement('div');
            successMsg.className = 'form-response success';
            successMsg.textContent = message;
            formElement.appendChild(successMsg);

            // Auto-remove success message
            setTimeout(() => {
                successMsg.remove();
            }, 3000);
        }

        // Display Form Error Message
        function displayFormError(formElement, message) {
            // Remove existing messages
            removeExistingMessages(formElement);

            const errorMsg = document.createElement('div');
            errorMsg.className = 'form-response error';
            errorMsg.textContent = message;
            formElement.appendChild(errorMsg);

            // Auto-remove error message
            setTimeout(() => {
                errorMsg.remove();
            }, 3000);
        }

        // Remove Existing Messages
        function removeExistingMessages(formElement) {
            const existingMessages = formElement.querySelectorAll('.form-response');
            existingMessages.forEach(msg => msg.remove());
        }

        // Remove Error Class on Input Focus
        form.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('focus', function() {
                this.classList.remove('error');
                removeExistingMessages(form);
            });
        });
    }
})();

});