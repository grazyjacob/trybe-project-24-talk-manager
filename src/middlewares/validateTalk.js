const ERROR_400 = 400;
const validateTalk = (req, res, next) => {
const { body } = req;
if (!body.talk) {
    return res.status(ERROR_400).json({ message: 'O campo "talk" é obrigatório' });
} 
next();
};
// regex da data https://www.guj.com.br/t/resolvido-como-validar-data-com-java-script/276656
const validateTalkWatchedAt = (req, res, next) => {
const { body } = req;
const validateDate = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
    if (!body.talk.watchedAt) {
        return res.status(ERROR_400).json({ message: 'O campo "watchedAt" é obrigatório' });
    }
    if (!validateDate.test(body.talk.watchedAt)) {
       return res.status(ERROR_400)
       .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    next();
};

const validateTalkRate = (req, res, next) => {
const { body } = req;
const rateTalk = body.talk.rate;
const numberRate = Number(rateTalk);
if (typeof rateTalk !== 'number') {
    return res.status(ERROR_400).json({ message: 'O campo "rate" é obrigatório' });
}
if (numberRate < 1 || numberRate > 6 || !Number.isInteger(numberRate)) {
    return res.status(ERROR_400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
}

 next();
};

module.exports = {
    validateTalkWatchedAt,
    validateTalkRate,
    validateTalk,
};