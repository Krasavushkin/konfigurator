import React from 'react';
import './App.css';
import {Configurator} from "./configurator/Configurator";
import {ScrollToTopButton} from "./configurator/ScrollToTopButton";

function App() {
  return (
    <div className="App">

        <Configurator />
        <ScrollToTopButton />
    </div>
  );
}

export default App;
