import usersdb from "../../../core/config/db";

const user = (_: any, args: { id: number }) => {
  console.log(usersdb);
  return usersdb.find(({ id }) => id === args.id);
};

export default user;
