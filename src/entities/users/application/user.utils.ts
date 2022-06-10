import { Sanitize } from "@core/infrastructure/utils";

type Sanitize = {
  firstName: string;
  lastName: string;
  secondLastName: string;
  curp: string;
};
const clean = (name: string) => name.trim().trimEnd().toLowerCase();

const sanitize = ({
  firstName: _fn,
  lastName: _ln,
  secondLastName: _sln,
  curp,
}: Sanitize) => {
  const fullName = [_fn, _ln, _sln].map(clean);
  const [firstName, lastName, secondLastName] = fullName;
  const normalizedFullName = Sanitize.accents(fullName.join(" "));
  return {
    normalizedFullName,
    firstName,
    lastName,
    secondLastName,
    curp: clean(curp),
  };
};

export default {
  sanitize,
};
