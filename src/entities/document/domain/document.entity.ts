import { Index, prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";

@Index({ owner: 1, name: 1 }, { unique: true })
@ObjectType()
class Document {
  @Field(() => ID)
  readonly _id?: Types.ObjectId;

  @Field(() => String)
  @prop({ required: true })
  readonly owner!: Types.ObjectId;

  @Field({ description: "Document mime type." })
  @prop({ required: true })
  public type!: string;

  @Field({ description: "Document url." })
  @prop({ required: true })
  public url!: string;

  @Field({ description: "Document name." })
  @prop({ required: true })
  public name!: string;

  @Field({ description: "Normalized document name." })
  @prop({ required: false, index: 1 })
  public normalizedName?: string;
}

export default Document;