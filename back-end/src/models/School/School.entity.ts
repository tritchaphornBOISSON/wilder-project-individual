import { ObjectType, Field, ID } from "type-graphql";
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Wilder from "../Wilder/Wilder.entity";

@Entity()
@ObjectType()
export default class School {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  @Index({ unique: true })
  schoolName: string;

  @OneToMany(() => Wilder, (wilder) => wilder.school)
  @Field(() => [Wilder])
  wilders: Wilder[];
}
