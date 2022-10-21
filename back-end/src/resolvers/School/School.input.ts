import { MinLength, IsUUID } from "class-validator";
import { ArgsType, Field, ID } from "type-graphql";

@ArgsType()
class CreateSchoolArgs {
  @Field()
  @MinLength(2, { message: "School name must havve at least 2 characters" })
  schoolName: string;
}

@ArgsType()
class UpdateSchoolArgs extends CreateSchoolArgs {
  @Field(() => ID)
  @IsUUID()
  id: string;
}

export { CreateSchoolArgs, UpdateSchoolArgs };
