import { faker } from "@faker-js/faker";
import DirectionUtils from "@entities/direction/application/direction.utils";
import { Types } from "mongoose";

class DirectionFaker {
  static get(owner: Types.ObjectId) {
    const direction = DirectionFaker.basic(owner.toString());

    const sanitized = DirectionUtils.sanitize({
      name: direction.name,
      state: direction.state,
      town: direction.town,
      neighborhood: direction.neighborhood,
      street: direction.street,
      outdoorNumber: direction.outdoorNumber,
      zipCode: direction.zipCode,
    });

    return { ...direction, ...sanitized, owner };
  }
  static basic(owner: string) {
    const direction = {
      owner: owner,
      name: `${faker.name.jobArea()} ${faker.name.firstName()}`,
      state: faker.address.state(),
      town: faker.address.country(),
      neighborhood: faker.address.cityName(),
      street: faker.address.street(),
      outdoorNumber: +faker.random.numeric(),
      zipCode: faker.address.zipCode(),
      extraIndications: faker.address.secondaryAddress(),
    };
    return direction;
  }
}

export default DirectionFaker;
