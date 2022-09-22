import { useState } from "react";
import blankProfilePicture from "../../media/blank-profile-picture.png";
import { WilderType } from "../../types";
import { getErrorMessage } from "../../utils";
import Skill from "../Skill/Skill";
import { deleteWilderRest } from "./rest";
import {
  Card,
  CardImage,
  CardParagraph,
  CardSecondaryTitle,
  CardSkillList,
  CardTitle,
} from "./Wilder.styled";

//type PropType = Omit<WilderType>;

const Wilder = ({
  id,
  firstName,
  lastName,
  isTrainer,
  school,
  skills,
}: WilderType) => {
  const [errorMessage, setErrorMessage] = useState("");

  const deleteWilder = async (id: string) => {
    try {
      const deletedWilder = await deleteWilderRest(id);
      console.log(deletedWilder);
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  };
  return (
    <Card isTrainer={isTrainer}>
      <CardImage src={blankProfilePicture} alt="Jane Doe Profile" />
      <CardTitle>
        {firstName} {lastName}
      </CardTitle>

      <CardTitle>{school?.schoolName}</CardTitle>
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
            <Skill skillName={skill.skillName} numberOfVotes={1} />
          </li>
        ))}
      </CardSkillList>
      <button onClick={() => deleteWilder(id)}>Delete</button>
    </Card>
  );
};

export default Wilder;
