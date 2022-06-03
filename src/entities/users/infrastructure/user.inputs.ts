import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";
import { IUserGender } from "../domain/user.enums";

@InputType()
export class UserInput {
  @Field()
  @Length(1, 30)
  public firstName!: string;

  @Field()
  @Length(1, 30)
  public lastName!: string;

  @Field({ nullable: true })
  @Length(1, 30)
  public secondLastName?: string;

  @Field()
  @Length(18)
  public curp!: string;

  @Field(() => IUserGender)
  public gender!: IUserGender;

  @Field()
  public birthday!: Date;
}

export default UserInput;
