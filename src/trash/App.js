import React from 'react';
import Card from './Card';
import Form from './Form';
import Complete from './Complete';
import './style.css';

const App = () => {
  return (
    <main>
      <Card
        name="Jane Appleseed"
        number="0000 0000 0000 0000"
        expDate="00/00"
        cvc="000"
      />
      <Form />
      <Complete />
    </main>
  );
};

export default App;
