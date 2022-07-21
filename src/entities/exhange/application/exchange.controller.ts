import { PaginateArgs } from "@core/infrastructure/responses";
import Exchange from "../domain/exchange.entity";
import { ExchangeNotFoundError } from "../domain/exchange.errors";
import ExchangeRepository from "../domain/exchange.repository";
import {
  ExchangeInputCreate,
  ExchangeInputUpdate,
} from "../infrastructure/exchange.input";
import * as ExhangeUtils from "./exchange.utils";

class ExchangeController {
  private repository: ExchangeRepository;

  constructor() {
    this.repository = new ExchangeRepository();
  }

  async paginate({ limit, page }: PaginateArgs) {
    const paginator = this.repository.paginate({}, { limit, page });
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

  findById(id: string) {
    return this.repository.findById(id);
  }

  async create(inputExhange: ExchangeInputCreate) {
    const share = ExhangeUtils.getCalculatedShare(inputExhange.amount);
    const code = ExhangeUtils.getExchangeCode();
    const exchange: Exchange = { ...inputExhange, share, code };
    const createdExchange = await this.repository.create(exchange);
    return createdExchange;
  }

  async update(
    id: string,
    updateExhange: ExchangeInputUpdate,
  ): Promise<Exchange> {
    const currentExchange = await this.repository.findById(id);
    if (!currentExchange) throw new ExchangeNotFoundError();
    const dataToUpdate = { ...currentExchange, ...updateExhange };
    const updatedExchnage = await this.repository.findByIdAndUpdate(
      id,
      dataToUpdate,
    );
    return updatedExchnage;
  }
}

export default ExchangeController;
