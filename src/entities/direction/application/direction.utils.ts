import { Sanitize } from "@core/infrastructure/utils";

type SanitizeDirection = {
  state: string;
  town: string;
  neighborhood: string;
  street: string;
  outdoorNumber: number;
  zipCode: number;
};

const sanitize = ({
  state: _est,
  town: _tow,
  neighborhood: _neig,
  street: _stre,
  outdoorNumber,
  zipCode,
}: SanitizeDirection) => {
  const fullDirection = [_est, _tow, _neig, _stre].map(Sanitize.clean);

  const [state, town, neighborhood, street] = fullDirection;

  const normalizedFullDirection = fullDirection
    .join(" ")
    .concat(outdoorNumber.toString())
    .concat(zipCode.toString());

  return {
    normalizedFullDirection,
    state,
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
