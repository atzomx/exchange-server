import find from "./find.query";
import findAll from "./findAll.query";

const userQuerys = { user: find, users: findAll };

export default { Query: userQuerys };
