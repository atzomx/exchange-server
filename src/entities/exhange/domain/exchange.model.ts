import { getModelForClass } from "@typegoose/typegoose";
import Exhange from "./exchange.entity";

const ExhangeModel = getModelForClass(Exhange, {
  schemaOptions: { timestamps: true },
});

export default ExhangeModel;
