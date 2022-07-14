import { ICoordinate } from './ICoordinate';

export interface IMission {
    missionNumber: number;
    date: string;
    model: string;
    center: ICoordinate;
}