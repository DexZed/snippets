import express from 'express';
import cors from 'cors';
import chalk from 'chalk';
import morgan from 'morgan';

const app = express();
app.use(express.json());
app.use(cors());
app.use(
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
    )
export default app;