import React from 'react';
import Header from './components/Header';
import Currency from './pages/Currency/Currency';

// Refference https://www.xe.com/currencyconverter/
// API Documentation https://docs.openexchangerates.org/docs/

function App() {
  return (
    <div className="App">
      <Header />
      <Currency />
    </div>
  );
}

export default App;
