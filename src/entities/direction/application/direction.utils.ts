import { Sanitize } from "@core/infrastructure/utils";

type SanitizeDirection = {
  state: string;
  town: string;
  neighborhood: string;
  street: string;
  outdoorNumber: number;
  zipCode: string;
  name: string;
};

const sanitize = ({
  name,
  state,
  town,
  neighborhood,
  street,
  outdoorNumber,
  zipCode,
}: SanitizeDirection) => {
  const fullDirection = [
    name,
    street,
    outdoorNumber.toString(),
    neighborhood,
    town,
    state,
  ]
    .map(Sanitize.clean)
    .map(Sanitize.accents);

  const normalizedFullDirection = [...fullDirection, zipCode].join(" ");

  return {
    normalizedFullDirection,
  };
};

export default {
  sanitize,
};
