import { Sanitize } from "@core/infrastructure/utils";

type SanitizeDirection = {
  estate: string;
  town: string;
  neighborhood: string;
  street: string;
  outdoorNumber: number;
  zipCode: number;
};

const sanitize = ({
  estate: _est,
  town: _tow,
  neighborhood: _neig,
  street: _stre,
  outdoorNumber,
  zipCode,
}: SanitizeDirection) => {
  const fullDirection = [_est, _tow, _neig, _stre].map(Sanitize.clean);

  const [estate, town, neighborhood, street] = fullDirection;

  const normalizedFullDirection = fullDirection
    .join(" ")
    .concat(outdoorNumber.toString())
    .concat(zipCode.toString());

  return {
    normalizedFullDirection,
    estate,
    town,
    neighborhood,
    street,
    outdoorNumber,
    zipCode,
  };
};

export default {
  sanitize,
};
