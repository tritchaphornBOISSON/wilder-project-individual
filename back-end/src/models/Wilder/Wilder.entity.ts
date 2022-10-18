import { ObjectType, Field, ID } from "type-graphql";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import School from "../School/School.entity";
import Skill from "../Skill/Skill.entity";

@Entity()
@ObjectType()
export default class Wilder {
  constructor(
    firstName: string,
    lastName: string,
    isTrainer?: boolean,
    school?: School,
    skills?: Skill[]
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    if (!isTrainer) {
      this.isTrainer = false;
    } else {
      this.isTrainer = true;
    }
    if (school) {
      this.school = school;
    }
    if (skills) {
      this.skills = skills;
    }
  }
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  isTrainer: boolean;

  @ManyToOne(() => School, (school) => school.wilders, { eager: true })
  @Field(() => School, { nullable: true })
  school: School;

  @ManyToMany(() => Skill, { eager: true })
  @Field(() => [Skill])
  @JoinTable()
  skills: Skill[];

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
