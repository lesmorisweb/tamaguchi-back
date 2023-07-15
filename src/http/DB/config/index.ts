import {Sequelize, SequelizeOptions} from "sequelize-typescript";
import {getAllModels} from "../models";
import {getDbConfig} from "./dbConfig";
import {getLogger} from "../../../helpers/logger";


const logger = getLogger("DB CONNECTION - INDEX");

const sequelize = new Sequelize({
   database: getDbConfig().database,
   dialect: getDbConfig().dialect,
   host: getDbConfig().host,
   password: getDbConfig().password,
   port: getDbConfig().port,
   username: getDbConfig().username,
} as SequelizeOptions,
);

sequelize.addModels(getAllModels());

export async function doDBConnection(resetDb: boolean): Promise<boolean> {
   logger.log(`Connecting DB, reset DB = ${ resetDb }`);
   try {
      await sequelize.sync({force: resetDb});
      logger.success("DB Connected successfully");
      return true;
   } catch (err) {
      logger.error(err);
      logger.trace(getDbConfig());
      return false;
   }
}
