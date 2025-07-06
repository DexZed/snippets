import { Express, Request, Response } from 'express';
import booksRouter from "../controllers/mongoose/book.controller"
const routerSetup = (app: Express) =>
  app

  .get('/', async (req: Request, res: Response) => {
    res.send('Hello Express APIvantage!');
  })
  .use('/api',booksRouter);

export default routerSetup;