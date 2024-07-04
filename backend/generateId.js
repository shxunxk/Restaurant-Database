const { customAlphabet } = require('nanoid');

const generateIntId = (size = 5) => {
    const alphabet = '0123456789';
    const nanoid = customAlphabet(alphabet, size);
    return parseInt(nanoid(), 10);
}

module.exports = generateIntId;
