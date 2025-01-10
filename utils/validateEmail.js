export const validateEmail = (email, existingEmails) => {
    return !existingEmails.includes(email);
  };
  