const typeorm = require('typeorm');
const School = require('../models/School/schoolEntity');
const Skill = require('../models/Skill/skillEntity');
const Wilder = require('../models/Wilder/wilderEntity');

const dataSource = new typeorm.DataSource({
    type: 'sqlite',
    database: 'wildersdb.sqlite',
    synchronize: true,
    entities: [Wilder, School, Skill],
    logging: ['query', 'error'],
});

let initialized = false;
const getDatabase = async () => {
    if (!initialized) {
        await dataSource.initialize();
        initialized = true;
        console.log(`Successfully connected to database...`);
    }
    return dataSource;
}

const getWilderRepository = async () => {
    return (await getDatabase()).getRepository(Wilder);
}

const getSchoolRepository = async () => {
    return (await getDatabase()).getRepository(School);
}

const getSkillRepository = async () => {
    return (await getDatabase()).getRepository(Skill);
}

module.exports = {
    getDatabase,
    getWilderRepository,
    getSchoolRepository,
    getSkillRepository,
}