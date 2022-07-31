import { ICoordinate } from './ICoordinate';

export interface IMission {
    missionNumber: number;
    date: string;
    model: string;
    photos: string;
    center: ICoordinate;
}