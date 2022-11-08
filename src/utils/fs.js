const { writeFile, readFile } = require('fs').promises;
const path = require('path');

// BASEADO NO CÓDIGO DA AULA 4.3
const talkersPath = path.resolve(__dirname, '../', 'talker.json');

const readTalker = async () => {
  const response = await readFile(talkersPath, 'utf8');
  const talkers = JSON.parse(response);
  return talkers;
};

const createNewTalker = async (name, age, talk) => {
    const readTalkers = await readTalker();
    let id = 0;
    if (readTalkers.length === 0) {
    id = 1;
    } else {
      id = Number(readTalkers[readTalkers.length - 1].id) + 1;
    }
    const newTalker = {
      id, 
      name, 
      age,
      talk,
    };
  readTalkers.push(newTalker);
  await writeFile(talkersPath, JSON.stringify(readTalkers, null, 2));
  return newTalker;
};

const changeTalker = async (talker, id) => {
  const readTalkers = await readTalker();
  const talkerPerson = talker;
  talkerPerson.id = Number(id);
  await writeFile(talkersPath, JSON.stringify([...readTalkers, talkerPerson]));
  return talker;
};

module.exports = {
    createNewTalker,
    readTalker,
    changeTalker,
};
