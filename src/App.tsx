import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Renderer from './components/Renderer/Renderer';
import Timeline from './components/Timeline/Timeline';
import { AppContext, AppContextProvider } from "./context/AppContext"
import { IData } from './dto/IData';
import { Mission } from './models/Mission';
import ScanList from './components/scan/ScanList';
import { useMissions } from './hook/useMissions'

function App() {
  const missions = useMissions();
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
