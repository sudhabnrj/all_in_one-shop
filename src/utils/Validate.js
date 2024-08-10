export const Validate = (fields, isExistingUser) => {
    const errors = {};

    // Email Validation
    if (!fields.email) {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(fields.email)) {
        errors.email = 'Email is not valid';
    }

    // Phone Number Validation
    if (!fields.phone) {
        errors.phone = 'Phone number is required';
    }

    // Password Validation
    if(!isExistingUser){
        if (!fields.password) {
            errors.password = 'Password is required';
        } else if (fields.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        } else if (!/[A-Z]/.test(fields.password)) {
            errors.password = 'Password must contain at least one uppercase letter';
        } else if (!/[0-9]/.test(fields.password)) {
            errors.password = 'Password must contain at least one number';
        } else if (!/[!@#$%^&*]/.test(fields.password)) {
            errors.password = 'Password must contain at least one special character';
        }
        
        // Confirm Password
        if (fields.password !== fields.rePassword) {
            errors.rePassword = 'Passwords must match';
        }
    }
    
    // City Validation
    if (!fields.city) {
        errors.city = 'City is required';
    }

    // Country Validation
    if (!fields.country) {
        errors.country = 'Country is required';
    }

    // Zip Code Validation
    if (!fields.zipCode) {
        errors.zipCode = 'Postal code / zip is required';
    }

    return errors;
};
