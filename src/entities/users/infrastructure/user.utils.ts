import { Sanitize } from '@core/utils';

type Sanitize = {
  firstName: string;
  lastName: string;
  secondLastName: string;
};
const clean = (name: string) => name.trim().trimEnd().toLowerCase();

const sanitize = ({
  firstName: _fn,
  lastName: _ln,
  secondLastName: _sln,
}: Sanitize) => {
  const fullName = [_fn, _ln, _sln].map(clean);
  const [firstName, lastName, secondLastName] = fullName;
  const normalizedFullName = Sanitize.accents(fullName.join(' '));
  return { normalizedFullName, firstName, lastName, secondLastName };
};

export default {
  sanitize,
};
