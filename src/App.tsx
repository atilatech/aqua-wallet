import React, { useEffect } from 'react';
import './App.css';
import { initializeBridge } from './content';
import Home from './scenes/Home/Home';

function App() {

  useEffect(() => { 
    initializeBridge();
  })
  
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
