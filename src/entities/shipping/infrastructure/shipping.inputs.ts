import { MaxLength, MinLength, IsOptional } from "class-validator";
import { Field, InputType } from "type-graphql";
import { Types } from "mongoose";

@InputType()
export class ShippingInputCreate {
  @Field(() => String, { description: "Exchange identifier on Shipping." })
  public exchangeId!: Types.ObjectId;

  @Field({ description: "Shipping origin." })
  @MinLength(1)
  @MaxLength(60)
  public origin!: string;

  @Field({ description: "Shipping destination." })
  @MinLength(1)
  @MaxLength(60)
  public destination!: string;

  @Field({ description: "Shipping binnacle." })
  @MinLength(1)
  @MaxLength(60)
  public binnacle!: string;

  @Field({ description: "Shipping tracking guide." })
  @MinLength(1)
  @MaxLength(60)
  public trackingGuide!: string;

  @Field({ description: "Shipping status." })
  @MinLength(1)
  @MaxLength(60)
  public status!: string;
}

@InputType()
export class ShippingInputUpdate {
  @Field({ nullable: true, description: "Shipping origin." })
  @IsOptional()
  @MinLength(1)
  @MaxLength(60)
  public origin?: string;

  @Field({ nullable: true, description: "Shipping destination." })
  @IsOptional()
  @MinLength(1)
  @MaxLength(60)
  public destination?: string;

  @Field({ nullable: true, description: "Shipping binnacle." })
  @IsOptional()
  @MinLength(1)
  @MaxLength(60)
  public binnacle?: string;

  @Field({ nullable: true, description: "Shipping tracking guide." })
  @IsOptional()
  @MinLength(1)
  @MaxLength(60)
  public trackingGuide?: string;

  @Field({ nullable: true, description: "Shipping status." })
  @IsOptional()
  @MinLength(1)
  @MaxLength(60)
  public status?: string;
}
