import { MaxLength, MinLength, IsOptional } from "class-validator";
import { Field, InputType } from "type-graphql";
import { Types } from "mongoose";

@InputType()
export class MeetingInputCreate {
  @Field(() => String)
  public exchangeId!: Types.ObjectId;

  @Field()
  public date!: Date;

  @Field()
  @MinLength(1)
  @MaxLength(60)
  public place!: string;

  @Field()
  @MinLength(1)
  @MaxLength(60)
  public binnacle!: string;

  @Field()
  @MinLength(1)
  @MaxLength(60)
  public status!: string;
}

@InputType()
export class MeetingInputUpdate {
  @Field({ nullable: true })
  @IsOptional()
  public date?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @MinLength(1)
  @MaxLength(60)
  public place?: string;

  @Field({ nullable: true })
  @IsOptional()
  @MinLength(1)
  @MaxLength(60)
  public binnacle?: string;

  @Field({ nullable: true })
  @IsOptional()
  @MinLength(1)
  @MaxLength(60)
  public status?: string;
}

export default {
  MeetingInputCreate,
  MeetingInputUpdate,
};
