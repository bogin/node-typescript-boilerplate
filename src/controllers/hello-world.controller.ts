import { Request, Response } from 'express';
import { Service } from 'typedi';

@Service()
export class HelloWorldController {

    getHelloWorld = async (req: Request, res: Response): Promise<void> => {
        res.send('Hello, World!');
    }
}
