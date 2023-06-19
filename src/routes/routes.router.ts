import express from 'express';
import { HelloWorldController } from '../controllers/hello-world.controller';
import { Container, Service } from 'typedi';

@Service()
export class Router {
    router: express.Router;
    helloWorldController: HelloWorldController = Container.get(HelloWorldController);
    constructor() {
      this.router = express.Router();
      this.configureRoutes();
    }
  
    private configureRoutes(): void {
      this.router.get('/', this.helloWorldController.getHelloWorld);
    }

    getRouter = (): express.Router => {
        return this.router;
    }
  }
