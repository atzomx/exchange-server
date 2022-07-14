import { Repository } from "@core/domain";
import Exchange from "./exchange.entity";
import ExchangeModel from "./exchange.model";

class ExchangeRepository extends Repository<Exchange> {
  constructor() {
    super(ExchangeModel);
  }
}

export default ExchangeRepository;
