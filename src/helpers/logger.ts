import log4js from "log4js";
import {Logger as LoggerType} from "log4js";

class Logger {
   private logger: LoggerType;

   constructor(category: string) {
      log4js.configure({
         appenders: {
            out: {type: "stdout"},
            app: {type: "file", filename: "application.log"},
         },
         categories: {
            default: {appenders: ["out"], level: "trace"},
            app: {appenders: ["app"], level: "trace"},
         },
      });
      this.logger = log4js.getLogger(category);
   }

   public log(message: string | any) {
      console.log(message);
      if (typeof message === "string") {
         this.logger.debug(message);
      } else {
         this.logger.debug(JSON.stringify(message));
      }
   }

   public error(message: string | any) {
      console.error(message);
      this.logger.error(message);
   }

   public trace(message: any) {
      console.log(message);
      this.logger.trace(message);
   }

   public success(message: string) {
      console.log(`\t ======== ${ message.toUpperCase() } ========`);
      this.logger.info(`\t ======== ${ message.toUpperCase() } ========`);
   }
}


export function getLogger(category: string): Logger {
   return new Logger(category);
}
