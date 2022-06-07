import { Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { IUserGender } from '../domain/user.enums';

@InputType()
export class UserInputCreate {
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

@InputType()
export class UserInputUpdate {
  @Field({ nullable: true })
  @Length(1, 30)
  public firstName?: string;

  @Field({ nullable: true })
  @Length(1, 30)
  public lastName?: string;

  @Field({ nullable: true })
  @Length(1, 30)
  public secondLastName?: string;

  @Field({ nullable: true })
  @Length(18)
  public curp?: string;

  @Field(() => IUserGender, { nullable: true })
  public gender?: IUserGender;

  @Field({ nullable: true })
  public birthday?: Date;
}

export default { UserInputCreate, UserInputUpdate };
