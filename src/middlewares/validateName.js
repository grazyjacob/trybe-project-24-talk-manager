const ERROR_400 = 400;
const validateName = (req, res, next) => {
    const { body } = req;
    if (!body.name) {
        return res.status(ERROR_400).json({ message: 'O campo "name" é obrigatório' });
    } 
    if (body.name.length < 3) {
       return res.status(ERROR_400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
   }
    next();
   };

   module.exports = {
       validateName,
   };