import bcrypt from "bcrypt";

const SALT = 12;

export const encrypt = (password: string) => bcrypt.hashSync(password, SALT);

export const compare = (currentPassword: string, password: string) =>
  bcrypt.compareSync(currentPassword, password);

export default { encrypt, compare };
