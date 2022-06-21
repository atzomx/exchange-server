import { Repository } from "@core/domain";
import Direction from "./direction.entity";
import DirectionModel from "./direction.model";

class DirectionRepository extends Repository<Direction> {
  constructor() {
    super(DirectionModel);
  }
}

export default DirectionRepository;
