import { Sanitize } from "@core/infrastructure/utils";

type Sanitize = {
  firstName: string;
  lastName: string;
  secondLastName: string;
  curp: string;
};

const sanitize = ({
  firstName: _fn,
  lastName: _ln,
  secondLastName: _sln,
  curp,
}: Sanitize) => {
  const fullName = [_fn, _ln, _sln].map(Sanitize.clean);
  const [firstName, lastName, secondLastName] = fullName;
  const normalizedFullName = Sanitize.accents(fullName.join(" "));
  return {
    normalizedFullName,
    firstName,
    lastName,
    secondLastName,
    curp: Sanitize.clean(curp),
  };
};

export default {
  sanitize,
};
