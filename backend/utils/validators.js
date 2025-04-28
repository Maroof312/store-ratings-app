// Email validation
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  // Password validation
  const validatePassword = (password) => {
    // 8-16 characters, at least one uppercase and one special character
    const re = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,16})/;
    return re.test(password);
  };
  
  // Name validation
  const validateName = (name) => {
    return name.length >= 5 && name.length <= 60;
  };
  
  // Address validation
  const validateAddress = (address) => {
    return address.length <= 400;
  };
  
  module.exports = {
    validateEmail,
    validatePassword,
    validateName,
    validateAddress
  };