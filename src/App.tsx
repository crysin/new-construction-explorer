import React from 'react';
import logo from './logo.svg';
import './App.css';
import Renderer from './components/Renderer/Renderer';
import Timeline from './components/Timeline';

function App() {
  return (
    <div className="App">
      <Renderer/>
      <Timeline/>
    </div>
  );
}

export default App;
