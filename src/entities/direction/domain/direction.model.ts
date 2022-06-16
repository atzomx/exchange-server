import { getModelForClass } from "@typegoose/typegoose";
import Direction from "./direction.entity";

const DirectionModel = getModelForClass(Direction, {
  schemaOptions: { timestamps: true },
});

export default DirectionModel;
