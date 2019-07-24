import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Trip = () => {
  let url = window.location.href;
  let splitting = url.split('/');
  let last = splitting.length - 1;
  let id = splitting[last];

  const [tripState, setTripState] = useState({
    tripID: 'id',
    user: { name: 'passenger name' },
    pickup: { address: '311 Woodbine Street' },
    destination: { address: 'address' },
  });

  useEffect(() => {
    axios.get('/api/trips').then(({ data }) => {
      data.data.forEach((trip, index) => {
        if (trip.tripID === id) {
          setTripState(trip);
        }
      });
    });
  }, [id]);

  return (
    <div>
      <br />
      <h1>Trip Details for {tripState.tripID}</h1>
      <p>Amount : {tripState.billedAmount}</p>
      <p>Date Created : {tripState.created}</p>
      <p>Destination : {tripState.destination.address}</p>
      <p>Driver ID :{tripState.driverID}</p>
      <p>isCash : {tripState.isCash ? 'True' : 'False'}</p>
      <p>Address : {tripState.pickup.address}</p>
      <p>Trip ID : {tripState.tripID}</p>
      <p>User : {tripState.user.name}</p>
      <p>Company :{tripState.user.company}</p>
      <p>Email : {tripState.user.email}</p>
      <p>Gender : {tripState.user.gender}</p>
      <p>Phone Number : {tripState.user.phone}</p>
    </div>
  );
};

export default Trip;
