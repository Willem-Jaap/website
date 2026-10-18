export const BIRTH_DATE = '2003-06-16';

/** Age in whole years on the given day */
export const getAge = (now = new Date()) => {
    const born = new Date(BIRTH_DATE);
    const hadBirthday =
        now.getMonth() > born.getMonth() ||
        (now.getMonth() === born.getMonth() && now.getDate() >= born.getDate());
    return now.getFullYear() - born.getFullYear() - (hadBirthday ? 0 : 1);
};

/** The letter on the desk, typed out */
export const BIO = [
    "I'm Willem-Jaap, a software developer from the Netherlands. A creative and critical thinker, always looking for the most efficient and beautiful solution.",
    'I taught myself HTML, CSS and JavaScript at 15, then studied Application- and Media Development in Rotterdam. I overengineered a lot of projects and learned a lot from that.',
    'At WebNL and Emerit I grew into Laravel, Vue and React, and built a local-first cash register. In 2023 I founded Pixel Perfect, where I run the business and do the frontend and UX on everything we make.',
];

export interface Experience {
    company: string;
    role: string;
    period: string;
    url?: string;
}

export const EXPERIENCE: Experience[] = [
    {
        company: 'Pixel Perfect',
        role: 'Founder, software developer',
        period: '2023 – now',
        url: 'https://pixelperfect.agency',
    },
    { company: 'Emerit', role: 'Developer (fullstack)', period: '2021 – 2023' },
    {
        company: 'WebNL creative studios',
        role: 'Intern, developer',
        period: '2020 – 2021',
        url: 'https://webnl.nl',
    },
];

export const EDUCATION = {
    study: 'Application- and Media Development',
    school: 'Hoornbeeck College, Rotterdam',
};

export const CONTACT = [
    { label: 'github.com/Willem-Jaap', href: 'https://github.com/Willem-Jaap' },
    { label: 'linkedin.com/in/willem-jaap', href: 'https://linkedin.com/in/willem-jaap/' },
    { label: 'info@pixelperfect.agency', href: 'mailto:info@pixelperfect.agency' },
];
