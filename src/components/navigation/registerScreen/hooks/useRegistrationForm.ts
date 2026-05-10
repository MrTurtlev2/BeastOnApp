type UseRegistrationFormResult = {
    hasMinLength: boolean;
    hasUppercase: boolean;
    hasNumber: boolean;
    hasSpecialChar: boolean;
    isEmailValid: boolean;
    isPasswordSame: boolean;
    isValid: boolean;
};
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const useRegistrationForm = (email: string, password: string, repeatedPassword: string): UseRegistrationFormResult => {
    const hasMinLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
    const isEmailValid = EMAIL_REGEX.test(email);
    const isPasswordSame = password !== '' && repeatedPassword !== '' && password === repeatedPassword;
    const isValid = hasMinLength && hasUppercase && hasNumber && hasSpecialChar;

    return {
        hasMinLength,
        hasUppercase,
        hasNumber,
        hasSpecialChar,
        isEmailValid,
        isPasswordSame,
        isValid,
    };
};
