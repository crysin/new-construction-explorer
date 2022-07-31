import { IPhoto } from "../dto/IPhoto";

export class Photo {
    public path: string;
    public latitude: number;
    public longitude: number;
    public altitude: number;

    constructor(photo: IPhoto, root: string) {
        this.path = `${root}/${photo.name}`;
        this.latitude = photo.latitude;
        this.longitude = photo.longitude;
        this.altitude = photo.altitude;
    }
}