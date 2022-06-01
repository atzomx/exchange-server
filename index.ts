import "module-alias/register";
import mongodb from "@core/database";
import server from "@server";

mongodb.start();
server.start();
