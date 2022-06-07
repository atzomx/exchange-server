import 'module-alias/register';
import mongodb from '@database';
import server from '@server';

mongodb.start();
server.start();
