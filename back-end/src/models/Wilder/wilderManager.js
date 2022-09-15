const { getWilderRepository, getSkillRepository } = require('../../database/utils');
const { getSchoolByName } = require('../School/schoolManager');

const initializeWilders = async () => {
    const wilderRepository = await getWilderRepository();
    await wilderRepository.clear();
    const lyonSchool = await getSchoolByName('Lyon');
    const parisSchool = await getSchoolByName('Paris');
    await wilderRepository.save({
        firstName: 'Tritcha',
        lastName: 'Boisson',
        school: lyonSchool
    });
    await wilderRepository.save({
        firstName: 'Tata',
        lastName: 'Young',
        school: parisSchool
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