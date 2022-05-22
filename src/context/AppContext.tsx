import { createContext, Dispatch, ReactNode, useState } from 'react';
import { Mission } from '../models/Mission';


const AppContext = createContext<{
    mission: Mission | undefined; 
    setMission: Dispatch<React.SetStateAction<Mission | undefined>>
} | undefined>(undefined);

type Props = {
    children?: ReactNode
};

const AppContextProvider = (props: Props) => {
    const [mission, setMission] = useState<Mission | undefined>(undefined);

    const value = {mission, setMission};
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
}

export { AppContext, AppContextProvider };
