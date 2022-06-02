import PaginateUtils from "@core/utils/paginate.utils";
import { FilterQuery, ObjectId, SortOrder } from "mongoose";
import User from "./user.entity";
import UserModel from "./user.model";

const DEFAULT_PAGINATION = 15;

class UserRepository {
  private instance;

  constructor() {
    this.instance = UserModel;
  }

  create(user: User) {
    this.instance.create(user);
  }

  findById(id: string | ObjectId) {
    return this.instance.findById(id);
  }

  findByIdAndUpdate(id: string | ObjectId, user: Partial<User>) {
    return this.instance.findByIdAndUpdate(id, user, {
      runValidators: true,
      new: true,
    });
  }

  paginate(
    query: FilterQuery<User>,
    {
      page = 1,
      limit = DEFAULT_PAGINATION,
    }: {
      page?: number;
      limit?: number;
    }
  ) {
    const skip = PaginateUtils.getSkip({ page, limit });

    const documents = this.instance.find(query).skip(skip).limit(limit);
    const results = documents.clone();
    const total = documents.clone().countDocuments();

    return {
      getResults: () => results,
      getTotal: () => total,
    };
  }

  custom() {
    return this.instance;
  }
}

export default UserRepository;
