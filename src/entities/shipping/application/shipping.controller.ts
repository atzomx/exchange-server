import Shipping from "../domain/shipping.entity";
import { ShippingNotFoundError } from "../domain/shipping.errors";
import ShippingRepository from "../domain/shipping.repository";
import { ShippingPaginationArgs } from "../infrastructure/shipping.args";
import {
  ShippingInputCreate,
  ShippingInputUpdate,
} from "../infrastructure/shipping.inputs";

class ShippingController {
  private repository: ShippingRepository;

  constructor() {
    this.repository = new ShippingRepository();
  }

  findById(id: string) {
    return this.repository.findById(id);
  }

  async paginate({ page, limit, exchangeId }: ShippingPaginationArgs) {
    const paginator = this.repository.paginate(
      {
        exchangeId,
      },
      { limit, page },
    );

    const [results, total] = await Promise.all([
      paginator.getResults(),
      paginator.getTotal(),
    ]);

    const pages = Math.ceil(total / limit);
    return {
      results: results,
      info: {
        total,
        page,
        pages,
      },
    };
  }

  async create(shipping: ShippingInputCreate): Promise<Shipping> {
    const newShipping = { ...shipping };
    const result = await this.repository.create({ ...newShipping });
    return result;
  }

  async update(id: string, shipping: ShippingInputUpdate): Promise<Shipping> {
    const currentShipping = await this.repository.findById(id);
    if (!currentShipping) throw new ShippingNotFoundError();
    const dataToUpdate = { ...shipping };
    const updatedShipping = await this.repository.findByIdAndUpdate(
      id,
      dataToUpdate,
    );
    return updatedShipping;
  }
}

export default ShippingController;
