import { IMission } from "../dto/IMission";
import { asMonthDay } from "../utils/Timestamp";
export class Mission {
    public missionNumber: number = -1;
    public date: Date = new Date(0);
    public model: string;

    constructor(mission: IMission) {
        this.missionNumber = mission.missionNumber;
        this.date = new Date(mission.date);
        this.model = mission.model;
    }

    public getShortDate(): string {
        return asMonthDay(this.date);
    }
}