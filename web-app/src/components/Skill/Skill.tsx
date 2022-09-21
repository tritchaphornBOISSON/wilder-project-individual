import { SkillVotes } from "./Skill.styled";

type PropType = {
  skillName: string;
  numberOfVotes: number;
  isTrainer: boolean;
};

const Skill = ({ skillName, numberOfVotes }: PropType) => {
  return (
    <>
      {skillName}
      <SkillVotes>{numberOfVotes}</SkillVotes>
    </>
  );
};

export default Skill;
