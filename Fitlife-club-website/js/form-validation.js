// Form Validation for Fitlife Club Website

document.addEventListener('DOMContentLoaded', function() {
    const membershipForm = document.getElementById('membershipForm');
    const planButtons = document.querySelectorAll('.plan-select');
    const selectedPlanField = document.getElementById('selectedPlan');

    // Plan selection functionality
    planButtons.forEach(button => {
        button.addEventListener('click', function() {
            const plan = this.getAttribute('data-plan');
            selectedPlanField.value = plan;
            
            // Update visual feedback
            document.querySelectorAll('.plan-card').forEach(card => {
                card.classList.remove('selected');
            });
            this.closest('.plan-card').classList.add('selected');
            
            // Scroll to form
            document.querySelector('.membership-form-section').scrollIntoView({
                behavior: 'smooth'
            });
            
            showMessage(`${plan.charAt(0).toUpperCase() + plan.slice(1)} plan selected!`, 'success');
        });
    });

    // Form validation
    if (membershipForm) {
        membershipForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                submitForm();
            }
        });

        // Real-time validation
        const inputs = membershipForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearError(this);
            });
        });
    }

    function validateForm() {
        let isValid = true;
        const requiredFields = membershipForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Clear previous errors
        clearError(field);

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            errorMessage = 'This field is required';
            isValid = false;
        }
        // Email validation
        else if (fieldName === 'email' && value && !validateEmail(value)) {
            errorMessage = 'Please enter a valid email address';
            isValid = false;
        }
        // Phone validation
        else if ((fieldName === 'phone' || fieldName === 'emergencyPhone') && value && !validatePhone(value)) {
            errorMessage = 'Please enter a valid phone number';
            isValid = false;
        }
        // Date of birth validation
        else if (fieldName === 'dateOfBirth' && value) {
            const birthDate = new Date(value);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            
            if (age < 16) {
                errorMessage = 'You must be at least 16 years old to join';
                isValid = false;
            } else if (age > 100) {
                errorMessage = 'Please enter a valid date of birth';
                isValid = false;
            }
        }
        // Name validation
        else if ((fieldName === 'firstName' || fieldName === 'lastName' || fieldName === 'emergencyContact') && value) {
            if (value.length < 2) {
                errorMessage = 'Name must be at least 2 characters long';
                isValid = false;
            } else if (!/^[a-zA-Z\s'-]+$/.test(value)) {
                errorMessage = 'Name can only contain letters, spaces, hyphens, and apostrophes';
                isValid = false;
            }
        }

        if (!isValid) {
            showError(field, errorMessage);
        }

        return isValid;
    }

    function showError(field, message) {
        field.classList.add('error');
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    function clearError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    }

    function submitForm() {
        // Show loading state
        const submitButton = membershipForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Processing...';
        submitButton.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;

            // Show success message
            showMessage('Membership application submitted successfully! We will contact you within 24 hours.', 'success');
            
            // Reset form
            membershipForm.reset();
            
            // Clear plan selection
            document.querySelectorAll('.plan-card').forEach(card => {
                card.classList.remove('selected');
            });

            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }, 2000);
    }

    // Contact form validation (if exists)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateContactForm()) {
                submitContactForm();
            }
        });

        // Real-time validation for contact form
        const contactInputs = contactForm.querySelectorAll('input, select, textarea');
        contactInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateContactField(this);
            });
            
            input.addEventListener('input', function() {
                clearError(this);
            });
        });
    }

    function validateContactForm() {
        let isValid = true;
        const requiredFields = contactForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!validateContactField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    function validateContactField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        clearError(field);

        if (field.hasAttribute('required') && !value) {
            errorMessage = 'This field is required';
            isValid = false;
        }
        else if (fieldName === 'email' && value && !validateEmail(value)) {
            errorMessage = 'Please enter a valid email address';
            isValid = false;
        }
        else if (fieldName === 'phone' && value && !validatePhone(value)) {
            errorMessage = 'Please enter a valid phone number';
            isValid = false;
        }
        else if (fieldName === 'name' && value && value.length < 2) {
            errorMessage = 'Name must be at least 2 characters long';
            isValid = false;
        }
        else if (fieldName === 'message' && value && value.length < 10) {
            errorMessage = 'Message must be at least 10 characters long';
            isValid = false;
        }

        if (!isValid) {
            showError(field, errorMessage);
        }

        return isValid;
    }

    function submitContactForm() {
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
            showMessage('Message sent successfully! We will get back to you soon.', 'success');
            contactForm.reset();
        }, 1500);
    }

    // Newsletter signup validation
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && validateEmail(emailInput.value)) {
                showMessage('Successfully subscribed to newsletter!', 'success');
                emailInput.value = '';
            } else {
                showMessage('Please enter a valid email address', 'error');
            }
        });
    });

    // Auto-format phone numbers
    document.querySelectorAll('input[type="tel"]').forEach(input => {
        input.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length >= 6) {
                value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
            } else if (value.length >= 3) {
                value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
            }
            this.value = value;
        });
    });

    console.log('Form validation initialized');
});
