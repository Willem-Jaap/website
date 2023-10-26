const characters = '0123456789abcdefABCDEF';

const getRandomCharacters = (amount: number = 100) => {
    let result = '';

    for (let i = 0; i < amount; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
};

export default getRandomCharacters;
