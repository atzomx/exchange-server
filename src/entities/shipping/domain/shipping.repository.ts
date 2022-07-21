import { Repository } from "@core/domain";
import Shipping from "./shipping.entity";
import ShippingModel from "./shipping.model";

class ShippingRepository extends Repository<Shipping> {
  constructor() {
    super(ShippingModel);
  }
}

export default ShippingRepository;
