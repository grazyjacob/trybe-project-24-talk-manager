const fs = require('fs').promises;
const res = require('express/lib/response');
const path = require('path');

const dataBase = '../talker.json';

// BASEADO NO CÓDIGO DA AULA 4.3

const readTalker = async () => {
    try {
      const contentFile = await fs.readFile(path.resolve(__dirname, dataBase), 'utf-8');
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

module.exports = {
    createTalker,
    readTalker,
};