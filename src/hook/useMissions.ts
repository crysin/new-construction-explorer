import { useState, useEffect } from 'react';
import { IData } from '../dto/IData';
import { IPhoto } from '../dto/IPhoto';
import { Mission } from '../models/Mission';
import { Photo } from '../models/Photo';

export function useMissions() {
    const [missions, setMissions] = useState<Mission[] | undefined>(undefined);

    useEffect(() => {
        const fetchMissionData = async () => {
            const json = await fetch('mission/data.json').then(r => r.json());
            const data = json as IData;
            const missions: Mission[] = [];
            for(let i = 0; i < data.missions.length; i++) {
                const mission = data.missions[i];
                let photos: Photo[] = [];
                if (Boolean(mission?.photos) && mission.photos.length > 0) {
                    const root = `mission/${mission.photos}`;
                    let _photos = await fetch(`${root}/metadata.json`)
                    .then(r => r.json());
                    photos = (_photos as IPhoto[]).map(p => new Photo(p, root))
                }
                missions.push(new Mission(mission, photos));
            }
            setMissions(missions);
        }
        fetchMissionData().catch(console.error);
      }, []);

    return missions;
}