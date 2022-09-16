const { getSkillRepository } = require("../../database/utils")

const initializeSkills = async () => {
    const skillRepository = await getSkillRepository();
    await skillRepository.clear();
    await skillRepository.save({
        skillName: 'PHP'
    });
    await skillRepository.save({
        skillName: 'JavaScript'
    });
    await skillRepository.save({
        skillName: 'TypeScript'
    });
    await skillRepository.save({
        skillName: 'Java'
    });
}

const getSkillByName = async (name) => {
    const skillRepository = await getSkillRepository();
    return skillRepository.findOneBy({ skillName: name })
}

module.exports = {
    initializeSkills,
    getSkillByName,
}