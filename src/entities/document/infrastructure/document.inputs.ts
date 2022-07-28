import { IsOptional, MaxLength, MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";
import { Types } from "mongoose";

@InputType()
export class DocumentInputCreate {
  @Field(() => String)
  @MinLength(1)
  @MaxLength(30)
  public owner!: Types.ObjectId;

  @Field({ description: "Document mime type." })
  @MinLength(1)
  @MaxLength(30)
  public type!: string;

  @Field({ description: "Document url." })
  @MinLength(1)
  @MaxLength(100)
  public url!: string;

  @Field({ description: "Document name." })
  @MinLength(1)
  @MaxLength(35)
  public name!: string;
}

@InputType()
export class DocumentInputUpdate {
  @Field({ nullable: true, description: "Document mime type." })
  @IsOptional()
  @MinLength(1)
  @MaxLength(30)
  public type?: string;

  @Field({ nullable: true, description: "Document url." })
  @IsOptional()
  @MinLength(1)
  @MaxLength(100)
  public url?: string;

  @Field({ nullable: true, description: "Document name." })
  @IsOptional()
  @MinLength(1)
  @MaxLength(35)
  public name?: string;
}

export default { DocumentInputCreate, DocumentInputUpdate };