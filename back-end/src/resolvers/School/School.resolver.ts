import { Resolver, Query, Mutation, Args, Arg } from "type-graphql";
import School from "../../models/School/School.entity";
import SchoolRepository from "../../models/School/School.repository";
import { CreateSchoolArgs, UpdateSchoolArgs } from "./School.input";

Resolver(School);
export default class SchoolReslover {
  @Query(() => [School])
  schools(): Promise<School[]> {
    return SchoolRepository.getSchools();
  }

  @Mutation(() => School)
  createSchool(@Args() { schoolName }: CreateSchoolArgs): Promise<School> {
    return SchoolRepository.createSchool(schoolName);
  }

  @Mutation(() => School)
  updateSchool(@Args() { id, schoolName }: UpdateSchoolArgs): Promise<School> {
    return SchoolRepository.updateSchool(id, schoolName);
  }

  @Mutation(() => School)
  deleteSchool(@Arg("id") id: string): Promise<School> {
    return SchoolRepository.deleteSchool(id);
  }
}
