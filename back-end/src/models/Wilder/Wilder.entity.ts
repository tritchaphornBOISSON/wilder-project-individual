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
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  isTrainer: boolean;

  @ManyToOne(() => School, (school) => school.wilders, { eager: true })
  school: School;

  @ManyToMany(() => Skill, { eager: true })
  @JoinTable()
  skills: Skill[];

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
