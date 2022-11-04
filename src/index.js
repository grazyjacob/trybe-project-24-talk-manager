const express = require('express');
const bodyParser = require('body-parser');
const { readTalker } = require('./utils/fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
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
    return res.status(200).json(talkersFunc);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
  });

app.get('/talker/:id', async (req, res) => {
  const talkersFunc = await readTalker();
  const { id } = req.params;
  const talker = talkersFunc.find((people) => people.id === Number(id));
 if (talker) {
   return res.status(200).json(talker);
 } 
 return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

app.post('/login', async (req, res) => {
 const randomNumber = JSON
 .stringify(Math.floor(Math.random() * 10000000000000000) - 1000000000000000);
    return res.status(200).json({ token: randomNumber });
});

module.exports = app;