// import { response } from 'express';
import React, { useState, useEffect } from 'react';

function App() {
  const [merchants, setMerchants] = useState(false);
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    getMerchant();
    product_filter();
  }, []);

  function getMerchant() {
    fetch('http://localhost:3001')
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setMerchants(data);
      });
  }
  function product_filter() {
    fetch('http://localhost:3001/filter')
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setMerchants(data);
      });
  }

  function createMerchant() {
    let name = prompt('Enter merchant name');
    let email = prompt('Enter merchant email');

    fetch('http://localhost:3001/merchants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        alert(data);
        getMerchant();
      });
  }

  function deleteMerchant() {
    let id = prompt('Enter merchant id');

    fetch(`http://localhost:3001/merchants/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        alert(data);
        getMerchant();
      });
  }

  return (
    <div>
      {merchants ? merchants : 'There is no merchant data available'}
      <br />
      <button onClick={createMerchant}>Add</button>
      <br />
      <button onClick={deleteMerchant}>Delete</button>
      <h1>product filter</h1>
      {filter ? 'There is no filter data available' : filter}
    </div>
  );
}

export default App;
