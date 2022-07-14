import Exchange from "../domain/exchange.entity";
import ExchangeRepository from "../domain/exchange.repository";
import { ExchangeInputCreate } from "../infrastructure/exchange.input";
import { getCalculatedShare, getExchangeCode } from "./exchange.utils";

class ExchangeController {
  private repository: ExchangeRepository;

  constructor() {
    this.repository = new ExchangeRepository();
  }

  findById(id: string) {
    return this.repository.findById(id);
  }

  async create(inputExhange: ExchangeInputCreate) {
    const share = getCalculatedShare(inputExhange.amount);
    const code = getExchangeCode();
    const exchange: Exchange = { ...inputExhange, share, code };
    const createdExchange = await this.repository.create(exchange);
    return createdExchange;
  }
}

export default ExchangeController;
