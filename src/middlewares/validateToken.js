// typeof https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/typeof
const validateToken = (req, res, next) => {
    const { authorization } = req.headers;
    const sixteenCharacters = 16;
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  } 
  if (authorization.length !== sixteenCharacters || typeof authorization !== 'string') {
    return res.status(401).json({ message: 'Token inválido' });
   }
  next();
};
 
module.exports = {
    validateToken,
};