import { Sanitizer } from "@core/infrastructure/utils";
import { UserController } from "@entities/users";
import Direction from "../domain/direction.entity";
import {
  DirectionAlreadyExistsError,
  DirectionNotFoundError,
} from "../domain/direction.errors";
import DirectionRepository from "../domain/direction.repository";
import { DirectionPaginateArgs } from "../infrastructure/direction.args";
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

  async directionPaginate({
    page,
    limit,
    owner,
    search = "",
  }: DirectionPaginateArgs) {
    const cleanSearch = new Sanitizer(search).clean().accents().toString();
    const searchRegex = new RegExp(cleanSearch, "i");
    const paginator = this.repository.paginate(
      {
        owner,
        ...(search ? { normalizedFullDirection: searchRegex } : {}),
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

  async directionCreate(direction: DirectionInputCreate): Promise<Direction> {
    const query = {
      $and: [{ name: direction.name }, { owner: direction.owner }],
    };

    const existingDirection = await this.repository.findOne(query);
    if (existingDirection)
      throw new DirectionAlreadyExistsError(direction.name);

    const sanitized = directionUtils.sanitize({ ...direction });

    const newDirection = { ...direction, ...sanitized };
    const result = await this.repository.create({ ...newDirection });

    const useController = new UserController();
    await useController.linkDirection(direction.owner, result);

    return result;
  }

  async directionUpdate(
    id: string,
    direction: DirectionInputUpdate,
  ): Promise<Direction> {
    const currentDirection = await this.repository.findById(id);
    if (!currentDirection) throw new DirectionNotFoundError();

    const sanitized = directionUtils.sanitize({
      ...direction,
      ...currentDirection,
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
