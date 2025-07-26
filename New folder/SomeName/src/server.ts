import App from "./app";
import validatedConfig from "./config/validate";
import { ExceptionHandler } from "./utils/exceptionsHandler";


ExceptionHandler.init();
const PORT = validatedConfig.PORT
const server = new App(PORT);
server.initServer();