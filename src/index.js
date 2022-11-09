const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const { validateEmail, validatePassword } = require('./middlewares/validateLogin');
const { validateToken } = require('./middlewares/validateToken');
const { validateName } = require('./middlewares/validateName');
const { validateAge } = require('./middlewares/validateAge');
const { validateTalkWatchedAt,
  validateTalk, validateTalkRate } = require('./middlewares/validateTalk');
const { readTalker, createNewTalker, 
  changeTalker, deleteTalker, searchTalker } = require('./utils/fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const NOT_FOUND = 404;
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

  app.get('/talker/search', validateToken, async (req, res) => {
    const { q } = req.query;
    const search = await searchTalker(q);
    console.log(search);
    if (!q) {
      const allTalkers = await readTalker();
      return res.status(HTTP_OK_STATUS).json(allTalkers);
    }
      return res.status(HTTP_OK_STATUS).json(search);
  });

app.get('/talker/:id', async (req, res) => {
  const talkersFunc = await readTalker();
  const { id } = req.params;
  const talker = talkersFunc.find((people) => people.id === Number(id));
 if (talker) {
   return res.status(HTTP_OK_STATUS).json(talker);
 } 
 return res.status(NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
});

app.post('/login', validateEmail, validatePassword, async (_req, res) => {
  // Mentoria com o MD ajudou a construir a linha seguinte;
  const tokenGenerator = crypto.randomBytes(8).toString('hex');
  return res.status(HTTP_OK_STATUS).json({ token: tokenGenerator });
});

app.post('/talker', validateToken,
validateName, validateAge, validateTalk, validateTalkWatchedAt,
validateTalkRate, async (req, res) => {
  const { name, age, talk } = req.body;
  const newTalker = await createNewTalker(name, age, talk);
  return res.status(201).json(newTalker);
});

app.put('/talker/:id', validateToken, validateName, validateAge,
validateTalk, validateTalkWatchedAt, validateTalkRate, async (req, res) => {
  const { id } = req.params;
  const newTalker = req.body;
  const arrayTalkers = await readTalker();
  const edit = arrayTalkers.find((talkPerson) => talkPerson.id === Number(id));
  arrayTalkers.splice(arrayTalkers.indexOf(edit), 1);
  if (edit) {
    const changedTalker = await changeTalker(newTalker, id);
    return res.status(HTTP_OK_STATUS).json(changedTalker);
  }
});

app.delete('/talker/:id', validateToken, async (req, res) => {
  const id = Number(req.params.id);
  const talkers = await readTalker();
  const validation = talkers.find((talkPerson) => talkPerson.id === id);
  if (validation) {
    await deleteTalker(id);
  }
  return res.sendStatus(204);
 });

module.exports = app;