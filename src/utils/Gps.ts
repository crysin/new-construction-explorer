import { Angle, Vector3 } from 'babylonjs';
import { ICoordinate } from '../dto/ICoordinate';

export class Gps {
    private static origin: ICoordinate = {latitude: 0, longitude: 0};

	private static latitudeUnits: number = 0;
	private static longitudeUnits: number = 0;

    static setOrigin(origin: ICoordinate) {
        this.origin = origin;
        this.calculateCoordinateUnits(origin.latitude);
    }

    private static calculateCoordinateUnits(latitude: number) {
        latitude = Angle.FromDegrees(latitude).radians();	

        this.latitudeUnits = 111132.92 - (559.82 * Math.cos(2 * latitude)) + (1.175 * Math.cos(4 * latitude)) - (0.0023 * Math.cos(6 * latitude));
        this.longitudeUnits = (111412.84 * Math.cos(latitude)) - (93.5 * Math.cos(3 * latitude)) + (0.118 * Math.cos(5 * latitude));  
	}

    static gpsToMeters(coordinates: ICoordinate) {
        const xPosition  = this.longitudeUnits * (coordinates.longitude - this.origin.longitude);
		const zPosition  = this.latitudeUnits * (coordinates.latitude - this.origin.latitude);
		return new Vector3(xPosition, 0, -zPosition);
    }
}