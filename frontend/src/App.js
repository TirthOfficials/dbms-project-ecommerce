import React, { useState, useEffect } from 'react';

function App() {
  const [user_details, setMerchants] = useState(false);

  useEffect(() => {
    getMerchant();
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

  function createMerchant() {
    let user_id = prompt('Enter User_id: ');
    let f_name = prompt('Enter First Name');
    let l_name = prompt('Enter Last Name');
    let phone_no1 = prompt('Enter Phone No.1');
    let phone_no2 = prompt('Enter Phone No.2');
    let email_id = prompt('Enter Email Id');

    fetch('http://localhost:3001/merchant_model', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id, f_name, l_name, phone_no1, phone_no2, email_id }),
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
    let id = prompt('Enter Id');

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
      {user_details ? user_details : 'There is no data available'}
      <br />
      <button onClick={createMerchant}>Add</button>
      <br />
      <button onClick={deleteMerchant}>Delete</button>
    </div>
  );
}

export default App;
