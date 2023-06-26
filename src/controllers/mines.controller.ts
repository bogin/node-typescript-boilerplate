import { Request, Response } from 'express';
import { Service } from 'typedi';
import { MinesService } from '../services/mines.service';
import { STATUS_CODES } from 'http';

@Service()
export class MinesController {

    constructor(private minesService: MinesService) {}
    
    getConfigurations = async (req: Request, res: Response): Promise<void> => {
        try {
            const config = this.minesService.getConfigurations();
            res.json({ data: config });
        } catch (e) {
            res.send(500);
        }
        
    }

    saveConfigurations = async (req: Request, res: Response): Promise<void> => {
        try {
            const success = this.minesService.saveConfigurations(req.body);
            res.json(success);
        } catch (e) {
            res.send(500);
        }
        
    }
}
