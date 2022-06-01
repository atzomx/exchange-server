import { getModelForClass } from "@typegoose/typegoose";
import User from "./user.entity";

const UserModel = getModelForClass(User);

export default UserModel;
