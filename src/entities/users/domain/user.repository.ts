import { Repository } from "@core/domain";
import User from "./user.entity";
import UserModel from "./user.model";
import { ObjectId } from "mongoose";

class UserRepository extends Repository<User> {
  constructor() {
    super(UserModel);
  }

  addDirection(directionId: ObjectId, owner: ObjectId) {
    return this.instance.findByIdAndUpdate(
      owner,
      { $push: { directions: directionId } },
      { safe: true, upsert: true },
    );
  }
}

export default UserRepository;
