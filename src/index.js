const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const { readTalker, createNewUser } = require('./utils/fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const ERROR_404 = 404;
const PORT = '3000';

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (req, res) => {
  const talkersFunc = await readTalker();
  try {
    return res.status(HTTP_OK_STATUS).json(talkersFunc);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
  });

app.get('/talker/:id', async (req, res) => {
  const talkersFunc = await readTalker();
  const { id } = req.params;
  const talker = talkersFunc.find((people) => people.id === Number(id));
 if (talker) {
   return res.status(HTTP_OK_STATUS).json(talker);
 } 
 return res.status(ERROR_404).json({ message: 'Pessoa palestrante não encontrada' });
});

app.post('/login', async (req, res) => {
const { email, password } = req.body;
// if (email.length > 1 && password.length > 1) {
  const tokenGenerator = crypto.randomBytes(8).toString('hex');
  return res.status(HTTP_OK_STATUS).json({ token: tokenGenerator });
// }
// return res.status(ERROR_404).json({ message: 'Não possui nem email nem senha' });
});

module.exports = app;