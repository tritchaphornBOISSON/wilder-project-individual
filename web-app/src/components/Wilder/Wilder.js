import blankProfilePicture from "../../media/blank-profile-picture.png";
import DeleteWilder from "../../pages/DeleteWilder/DeleteWilder";
import Skill from "../Skill/Skill";
import {
    Card,
    CardImage,
    CardParagraph,
    CardSecondaryTitle,
    CardSkillList,
    CardTitle,
} from "./Wilder.styled";

const Wilder = ({ id, firstName, lastName, skills, isTrainer }) => {
    return (
        <Card isTrainer={isTrainer}>
            <CardImage src={blankProfilePicture} alt="Jane Doe Profile" />
            <CardTitle>
                {firstName} {lastName}
            </CardTitle>
            <CardParagraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat.
            </CardParagraph>
            <CardSecondaryTitle>Wild Skills</CardSecondaryTitle>
            <CardSkillList>
                {skills.map((skill) => (
                    <li key={skill.id}>
                        <Skill skillName={skill.skillName} numberOfVotes={1} isTrainer={isTrainer} />
                    </li>
                ))}
            </CardSkillList>
            <DeleteWilder id={id} />
        </Card>
    );
};

export default Wilder;