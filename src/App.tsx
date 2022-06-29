import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Renderer from './components/Renderer/Renderer';
import Timeline from './components/Timeline/Timeline';
import { AppContext, AppContextProvider } from "./context/AppContext"
import { IData } from './dto/IData';
import { Mission } from './models/Mission';
import ScanList from './components/scan/ScanList';

function App() {
  const [missions, setMissions] = useState<Mission[] | undefined>(undefined);
  useEffect(() => {
    fetch('data.json').then(r => r.json()).then((data: IData) => {
      setMissions(data.missions.map(m => new Mission(m)));
    });
  }, []);
  return (
    <div className="App">
      <AppContextProvider>
        <ScanList missions={missions}></ScanList>
        <Renderer>
          {/* <Timeline missions={missions}/> */}
        </Renderer>
      </AppContextProvider>

    </div>
  );
}

export default App;
