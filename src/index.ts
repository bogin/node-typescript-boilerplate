import 'reflect-metadata';
import express, { Express, Request, Response, NextFunction } from 'express';
import { Router } from './routes/routes.router';
import 'dotenv/config';
import Container from 'typedi';
var cors = require('cors');
const app: Express = express();
app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const port = process.env.DEV_PORT || 3000;
// TODO set a file with variables for each env that is loaded by the npm run start comment with flaggesy


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.use('/', Container.get(Router).getRouter());

import './tmp';