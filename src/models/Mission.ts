import { IMission } from "../dto/IMission";
import { IPhoto } from "../dto/IPhoto";
import { asMonthDay } from "../utils/Timestamp";
import { Coordinate } from './Coordinate';
import { Photo } from "./Photo";
export class Mission {
    public missionNumber: number = -1;
    public date: Date = new Date(0);
    public model: string;
    public center: Coordinate;
    public photos: Photo[];

    constructor(mission: IMission, photos: Photo[]) {
        this.missionNumber = mission.missionNumber;
        this.date = new Date(mission.date);
        this.model = mission.model;
        this.center = new Coordinate(mission.center);
        this.photos = photos;
    }

    public getShortDate(): string {
        return asMonthDay(this.date);
    }
}