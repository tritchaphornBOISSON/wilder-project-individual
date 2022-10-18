import { MinLength, IsUUID } from "class-validator";
import { ArgsType, Field, ID } from "type-graphql";

@ArgsType()
class CreateWilderArgs {
  @Field()
  @MinLength(1, { message: "First name must have at least 1 caracter" })
  firstName: string;

  @Field()
  @MinLength(1, { message: "Last name must have at least 1 caracter" })
  lastName: string;
}

@ArgsType()
class UpdateWilderArgs extends CreateWilderArgs {
  @Field(() => ID)
  @IsUUID()
  id: string;
}

export { CreateWilderArgs, UpdateWilderArgs };
