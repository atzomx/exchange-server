import { Paginate } from "@core/infrastructure/utils";
import {
  AnyKeys,
  AnyObject,
  FilterQuery,
  HydratedDocument,
  Model,
  ObjectId,
} from "mongoose";

const DEFAULT_PAGINATION = 15;

class Repository<T> {
  private instance: typeof Model;

  constructor(instance: typeof Model) {
    this.instance = instance;
  }

  create(entity: T): Promise<HydratedDocument<T, {}, {}>> {
    return this.instance.create<T>(entity);
  }

  findById(id: string | ObjectId) {
    return this.instance.findById<T>(id);
  }

  findByIdAndUpdate(id: string | ObjectId, entity: AnyObject | AnyKeys<T>) {
    return this.instance.findByIdAndUpdate<T>(id, entity, {
      runValidators: true,
      new: true,
    });
  }

  paginate(
    query: FilterQuery<T>,
    {
      page = 1,
      limit = DEFAULT_PAGINATION,
    }: {
      page?: number;
      limit?: number;
    },
  ) {
    const skip = Paginate.getSkip({ page, limit });

    const documents = this.instance.find(query).skip(skip).limit(limit);
    const results = documents.clone().lean<T[]>();
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

export default Repository;
