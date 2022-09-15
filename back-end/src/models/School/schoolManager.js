const { getSchoolRepository, getWilderRepository } = require("../../database/utils");

const initializeSchool = async () => {
    const wilderRepository = await getWilderRepository();
    const schoolRepository = await getSchoolRepository();
    await wilderRepository.clear();
    await schoolRepository.clear();
    await schoolRepository.save({ schoolName: 'Lyon' });
    await schoolRepository.save({ schoolName: 'Paris' });
}

const getSchoolByName = async (name) => {
    const schoolRepository = await getSchoolRepository();
    return schoolRepository.findOneBy({ schoolName: name });
}

module.exports = {
    initializeSchool,
    getSchoolByName,
}