import { PaginateArgs } from "@core/infrastructure/responses";
import Direction from "../domain/direction.entity";
import { DirectionNotFoundError } from "../domain/direction.errors";
import DirectionRepository from "../domain/direction.repository";
import {
  DirectionInputCreate,
  DirectionInputUpdate,
} from "../infrastructure/direction.inputs";
import directionUtils from "./direction.utils";

class DirectionController {
  private repository: DirectionRepository;

  constructor() {
    this.repository = new DirectionRepository();
  }

  directionById(id: string) {
    return this.repository.findById(id);
  }

  async directionPaginate({ page, limit }: PaginateArgs) {
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

  async directionCreate(direction: DirectionInputCreate): Promise<Direction> {
    const sanitized = directionUtils.sanitize({
      state: direction.state,
      town: direction.town,
      neighborhood: direction.neighborhood,
      street: direction.street,
      outdoorNumber: direction.outdoorNumber,
      zipCode: direction.zipCode,
    });

    const newDirection = { ...direction, ...sanitized };
    const result = await this.repository.create({ ...newDirection });
    return result;
  }

  async directionUpdate(
    id: string,
    direction: DirectionInputUpdate,
  ): Promise<Direction> {
    const currentDirection = await this.repository.findById(id);
    if (!currentDirection) throw new DirectionNotFoundError();

    const sanitized = directionUtils.sanitize({
      state: direction.state ?? currentDirection.state,
      town: direction.town ?? currentDirection.town,
      neighborhood: direction.neighborhood ?? currentDirection.neighborhood,
      street: direction.street ?? currentDirection.street,
      outdoorNumber: direction.outdoorNumber ?? currentDirection.outdoorNumber,
      zipCode: direction.zipCode ?? currentDirection.zipCode,
    });

    const dataToUpdate = { ...direction, ...sanitized };
    const updatedDirection = await this.repository.findByIdAndUpdate(
      id,
      dataToUpdate,
    );
    return updatedDirection;
  }
}

export default DirectionController;
