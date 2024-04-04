import { Service } from "typedi";

@Service()
export class MinesService {
    config = {
        rows: 12,
        columns: 12,
        total_bombs: 25,
        cells_gap: 3,
        cells_size: 35,
    } as any;

    getConfigurations = () => {
        return this.config;
    }

    saveConfigurations = (newConfig: any): { success: boolean } => {
        Object.keys(newConfig).forEach((key: string) => {
            this.config[key] = newConfig[key];
        });

        return { success: true };
    }
}