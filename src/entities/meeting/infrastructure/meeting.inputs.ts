import { MaxLength, MinLength, IsOptional } from "class-validator";
import { Field, InputType } from "type-graphql";
import { Types } from "mongoose";

@InputType()
export class MeetingInputCreate {
  @Field(() => String, { description: "Exchange identifier on Meeting." })
  public exchangeId!: Types.ObjectId;

  @Field({ description: "Meeting date." })
  public date!: Date;

  @Field({ description: "Meeting place." })
  @MinLength(1)
  @MaxLength(60)
  public place!: string;

  @Field({ description: "Meeting binnacle." })
  @MinLength(1)
  @MaxLength(60)
  public binnacle!: string;

  @Field({ description: "Meeting status." })
  @MinLength(1)
  @MaxLength(60)
  public status!: string;
}

@InputType()
export class MeetingInputUpdate {
  @Field({ nullable: true, description: "Meeting date." })
  @IsOptional()
  public date?: Date;

  @Field({ nullable: true, description: "Meeting place." })
  @IsOptional()
  @MinLength(1)
  @MaxLength(60)
  public place?: string;

  @Field({ nullable: true, description: "Meeting binnacle." })
  @IsOptional()
  @MinLength(1)
  @MaxLength(60)
  public binnacle?: string;

  @Field({ nullable: true, description: "Meeting status." })
  @IsOptional()
  @MinLength(1)
  @MaxLength(60)
  public status?: string;
}

export default {
  MeetingInputCreate,
  MeetingInputUpdate,
};
