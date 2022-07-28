import { MaxLength, MinLength, IsOptional } from "class-validator";
import { Field, InputType } from "type-graphql";
import { Types } from "mongoose";

@InputType()
export class ShippingInputCreate {
  @Field(() => String)
  public exchangeId!: Types.ObjectId;

  @Field()
  @MinLength(1)
  @MaxLength(60)
  public origin!: string;

  @Field()
  @MinLength(1)
  @MaxLength(60)
  public destination!: string;

  @Field()
  @MinLength(1)
  @MaxLength(60)
  public binnacle!: string;

  @Field()
  @MinLength(1)
  @MaxLength(60)
  public trackingGuide!: string;

  @Field()
  @MinLength(1)
  @MaxLength(60)
  public status!: string;
}

@InputType()
export class ShippingInputUpdate {
  @Field({ nullable: true })
  @IsOptional()
  @MinLength(1)
  @MaxLength(60)
  public origin?: string;

  @Field({ nullable: true })
  @IsOptional()
  @MinLength(1)
  @MaxLength(60)
  public destination?: string;

  @Field({ nullable: true })
  @IsOptional()
  @MinLength(1)
  @MaxLength(60)
  public binnacle?: string;

  @Field({ nullable: true })
  @IsOptional()
  @MinLength(1)
  @MaxLength(60)
  public trackingGuide?: string;

  @Field({ nullable: true })
  @IsOptional()
  @MinLength(1)
  @MaxLength(60)
  public status?: string;
}
