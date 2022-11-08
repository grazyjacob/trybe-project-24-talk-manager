const ERROR_400 = 400;
const validateAge = (req, res, next) => {
 const { body } = req;
 const minAge = 18;
 if (!body.age) {
  return res.status(ERROR_400).json({ message: 'O campo "age" é obrigatório' });
 }
 if (Number(body.age) < minAge) {
    return res.status(ERROR_400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
   }
 next();
};

module.exports = {
    validateAge,
};