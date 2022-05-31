import usersdb from "../../../core/config/db";
import IUser from "../interfaces/User";

const createUser = (_: any, params: IUser) => {
  params.id = `${usersdb.length}`;
  return params;
};

export default createUser;
