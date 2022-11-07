const fs = require('fs').promises;
const { writeFile } = require('fs');
const path = require('path');
const crypto = require('crypto');

const dataBase = '../talker.json';

// BASEADO NO CÓDIGO DA AULA 4.3
const talkersPath = path.resolve(__dirname, dataBase);
const readTalker = async (res) => {
    try {
      const contentFile = await fs.readFile(talkersPath, 'utf8');
      return JSON.parse(contentFile);
    } catch (error) {
        return res.status(400).json({ message: 'deu ruim' });
    }
};

const writeTalker = async (newTalker) => {
    try {
      await fs.writeFile(path(__dirname, dataBase), JSON.stringify(newTalker));
    } catch (error) {
        return null;
    }
};

const createTalker = async (newTalker) => {
    const readTalkers = await readTalker();
    const talker = {
        ...newTalker,
    };
  readTalkers.push(talker);
  await writeTalker(readTalkers);
};

const createNewUser = async (email, password) => {
  const users = [];
  users.push({
      email,
      password,
  });
await writeFile(talkersPath, JSON.stringify(users, null, 2));
// mentoria md
const tokenGenerator = crypto.randomBytes(8).toString('hex');
return tokenGenerator;
};

module.exports = {
    createTalker,
    readTalker,
    createNewUser,
};
