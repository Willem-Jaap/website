const getAge = (birthDate: string) =>
    Math.floor((Date.now() - new Date(birthDate).getTime()) / 3.15576e10);

const age = getAge('2003-06-16');

export default age;
