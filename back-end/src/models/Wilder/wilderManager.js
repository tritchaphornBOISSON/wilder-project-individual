const { getWilderRepository, getSkillRepository } = require('../../database/utils');
const { getSchoolByName } = require('../School/schoolManager');
const { getSkillByName } = require('../Skill/skillManager');

const initializeWilders = async () => {
    const wilderRepository = await getWilderRepository();
    await wilderRepository.clear();
    const lyonSchool = await getSchoolByName('Lyon');
    const parisSchool = await getSchoolByName('Paris');
    const javaScriptSkill = await getSkillByName('JavaScript');
    const javaSkill = await getSkillByName('Java');
    const phpSkill = await getSkillByName('PHP');
    const typesScriptSkill = await getSkillByName('TypeScript');
    await wilderRepository.save({
        firstName: 'Tritcha',
        lastName: 'Boisson',
        school: lyonSchool,
        skills: [javaScriptSkill, phpSkill]
    });
    await wilderRepository.save({
        firstName: 'Tata',
        lastName: 'Young',
        school: parisSchool,
        skills: [javaSkill, typesScriptSkill],
    });
}

const getWilders = async () => {
    const wilderRepository = await getWilderRepository();
    return wilderRepository.find();
}

const createWilder = async (firstName, lastName) => {
    const wilderRepository = await getWilderRepository();
    const newWilder = wilderRepository.create({ firstName, lastName });
    await wilderRepository.save(newWilder);
    return newWilder;
}

const updateWilder = async (id, firstName, lastName) => {
    const wilderRepository = await getWilderRepository();
    const existingWilder = await wilderRepository.findOneBy({ id });
    if (!existingWilder) {
        throw Error('No wilder with matching ID found');
    }
    return wilderRepository.save({ id, firstName, lastName });

}

const deleteWilder = async (id) => {
    const wilderRepository = await getWilderRepository();
    const existingWilder = await wilderRepository.findOneBy({ id });
    if (!existingWilder) {
        throw Error('No wilder with matching ID found');
    }
    return wilderRepository.remove(existingWilder);

}

const addSkillToWilder = async (wilderId, skillId) => {
    const wilderRepository = await getWilderRepository();
    const skillRepository = await getSkillRepository();
    const wilder = await wilderRepository.findOneBy({ id: wilderId });
    if (!wilder) {
        throw Error('No wilder with matching ID found');
    }
    const skill = await skillRepository.findOneBy({ id: skillId });
    if (!skill) {
        throw Error('No existing skill matching the ID');
    }
    wilder.skills = [...wilder.skills, skill];
    return wilderRepository.save(wilder);

}

module.exports = {
    initializeWilders,
    getWilders,
    createWilder,
    updateWilder,
    deleteWilder,
    addSkillToWilder,
}