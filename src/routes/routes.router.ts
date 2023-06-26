import express from 'express';
import { HelloWorldController } from '../controllers/hello-world.controller';
import { Container, Service } from 'typedi';
import { MinesController } from '../controllers/mines.controller';

@Service()
export class Router {
    router: express.Router;

    constructor(private minesController: MinesController, private helloWorldController: HelloWorldController) {
      this.router = express.Router();
      this.configureRoutes();
    }
  
    private configureRoutes(): void {
      this.router.get('/', this.helloWorldController.getHelloWorld);
      this.router.get('/mines-config', this.minesController.getConfigurations)
      this.router.post('/mines-config', this.minesController.saveConfigurations)
    }

    getRouter = (): express.Router => {
        return this.router;
    }
  }
