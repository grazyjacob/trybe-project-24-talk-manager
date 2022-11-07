const ERROR_400 = 400;

const validateEmail = (req, res, next) => {
const { email } = req.body;
const REGEX_EMAIL = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i;
if (!email) {
  return res.status(ERROR_400).json({ message: 'O campo "email" é obrigatório' });
}
if (!REGEX_EMAIL.test(email)) {
  return res.status(ERROR_400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
} 
next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  const minCharacters = 6;
  if (!password) {
    return res.status(ERROR_400).json({ message: 'O campo "password" é obrigatório' });
  } if (password.length <= minCharacters) {
    return res.status(ERROR_400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

module.exports = {
    validateEmail,
    validatePassword,
};