import { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import chalk from 'chalk';
import errorHandler from '../middleware/errorHandler';
const securitySetup = (app: Express, express:any) =>
  app
  .use(cors())
  .use(express.json())
  .use(
      morgan((tokens, req, res) => {
        const status = Number(tokens.status(req, res));

        const color =
          status >= 500
            ? chalk.red
            : status >= 400
            ? chalk.yellow
            : status >= 300
            ? chalk.cyan
            : chalk.green;

        return [
          chalk.gray(tokens.method(req, res)),
          chalk.blue(tokens.url(req, res)),
          color(tokens.status(req, res)),
          chalk.magenta(tokens['response-time'](req, res) + ' ms'),
        ].join(' ');
      })
    ).use(errorHandler);

export default securitySetup;