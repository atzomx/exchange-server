import usersdb from "../../../core/config/db";

const user = (_: any, args: { id: number }) => {
  console.log(_, usersdb);
  return usersdb.find(({ id }) => id === args.id);
};

export default user;
