import { ICoordinate } from "../dto/ICoordinate";

export class Coordinate implements ICoordinate {
    public latitude: number;
    public longitude: number;

    constructor(coordinate: ICoordinate) {
        if (!Boolean(coordinate)) {
            coordinate = Coordinate.nullIsland();
        }
        
        this.latitude = coordinate.latitude ?? 0;
        this.longitude = coordinate.longitude ?? 0;
    }

    static nullIsland() {
        return new Coordinate({latitude: 0, longitude: 0});
    }
}