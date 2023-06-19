import express, { Express, Request, Response, NextFunction } from 'express';
import { Router } from './routes/routes.router';
import 'dotenv/config';
import Container from 'typedi';
import 'reflect-metadata';
const app: Express = express();

// Error handling middleware
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


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
