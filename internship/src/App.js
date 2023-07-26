import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './App.css';
import HeaderFooterExample from './components/HeaderFooterExample';

library.add(fab, faCheckSquare, faCoffee);

function App() {
  return (
    <div className="App">
      <HeaderFooterExample />
    </div>
  );
}

export default App;
