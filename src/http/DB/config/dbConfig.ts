// eslint-disable-next-line
import "dotenv/config";
import {Environments} from "./enums";
import {tDbConfig} from "./types";


export function getDbConfig(): tDbConfig {
   if (getEnvironment() === Environments.development) {
      return getLocalEnvironment();
   } else {
      return getProductionEnvironment();
   }
}

export function getEnvironment(): Environments {
   if (process.env.ENVIRONMENT === "development") {
      return Environments.development;
   }
   if (process.env.ENVIRONMENT === "production") {
      return Environments.production;
   } else {
      return Environments.development;
   }
}


function getLocalEnvironment(): tDbConfig {
   return {
      dialect: process.env.DB_DEV_DIALECT!,
      username: process.env.DB_DEV_USERNAME!,
      password: process.env.DB_DEV_PASSWORD!,
      database: process.env.DB_DEV_NAME!,
      host: process.env.DB_DEV_HOST!,
      port: Number(process.env.DB_DEV_PORT!),
   };
}

function getProductionEnvironment(): tDbConfig {
   return {
      dialect: process.env.DB_PROD_DIALECT!,
      username: process.env.DB_PROD_USERNAME!,
      password: process.env.DB_PROD_PASSWORD!,
      database: process.env.DB_PROD_NAME!,
      host: process.env.DB_PROD_HOST!,
      port: Number(process.env.DB_PROD_PORT!),
   };
}
