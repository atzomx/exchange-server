import { getModelForClass } from "@typegoose/typegoose";
import Shipping from "./shipping.entity";

const ShippingModel = getModelForClass(Shipping, {
  schemaOptions: { timestamps: true },
});

export default ShippingModel;
