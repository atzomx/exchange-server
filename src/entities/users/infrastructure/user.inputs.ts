import { Length, MaxLength, MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { IUserGender, IUserStatus } from '../domain/user.enums';

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
  public image?: string;

  @Field()
  @MaxLength(18, { always: true, message: 'only 18 characters for curp' })
  @MinLength(18, { always: true, message: 'only 18 characters for curp' })
  public curp!: string;

  @Field(() => IUserGender)
  public gender!: IUserGender;

  @Field()
  public birthday!: Date;

  @Field()
  public phoneNumber!: string;

  @Field()
  public email!: string;

  @Field()
  public password!: string;

  @Field()
  public userName!: string;

  public status: IUserStatus = IUserStatus.pending;
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

  @Field()
  public phoneNumber?: string;
}

export default { UserInputCreate, UserInputUpdate };
