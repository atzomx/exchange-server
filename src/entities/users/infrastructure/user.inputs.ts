import { Length, MaxLength, MinLength, IsOptional } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { IUserGender, IUserStatus } from '../domain/user.enums';

@InputType()
export class UserInputCreate {
  @Field()
  @MinLength(1)
  @MaxLength(30)
  public firstName!: string;

  @Field()
  @MinLength(1)
  @MaxLength(30)
  public lastName!: string;

  @Field({ nullable: true })
  @MinLength(1)
  @MaxLength(30)
  public secondLastName?: string;

  @Field()
  public image?: string;

  @Field()
  @Length(18)
  public curp!: string;

  @Field(() => IUserGender)
  public gender!: IUserGender;

  @Field()
  public birthday!: Date;

  @Field()
  @MinLength(7)
  @MaxLength(15)
  public phoneNumber!: string;

  @Field()
  public email!: string;

  @Field()
  @MinLength(8)
  @MaxLength(16)
  public password!: string;

  @Field()
  @MinLength(8)
  @MaxLength(16)
  public userName!: string;

  public status: IUserStatus = IUserStatus.pending;
}

@InputType()
export class UserInputUpdate {
  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(30)
  public firstName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @MinLength(1)
  @MaxLength(30)
  public lastName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @MinLength(1)
  @MaxLength(30)
  public secondLastName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(18, 18)
  public curp?: string;

  @Field(() => IUserGender, { nullable: true })
  @IsOptional()
  public gender?: IUserGender;

  @Field({ nullable: true })
  @IsOptional()
  public birthday?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(15)
  public phoneNumber?: string;
}

export default { UserInputCreate, UserInputUpdate };
