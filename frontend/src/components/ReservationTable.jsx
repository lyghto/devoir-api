import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReservationTable = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('/api/reservations'); 
        setReservations(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des réservations', error);
      }
    };

    fetchReservations();
  }, []);

  return (
    <div>
      <h2>Réservations en cours</h2>
      <table>
        <thead>
          <tr>
            <th>Catway</th>
            <th>Client</th>
            <th>Bateau</th>
            <th>Date de début</th>
            <th>Date de fin</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((res, index) => (
            <tr key={index}>
              <td>{res.catwayNumber}</td>
              <td>{res.clientName}</td>
              <td>{res.boatName}</td>
              <td>{new Date(res.startDate).toLocaleDateString()}</td>
              <td>{new Date(res.endDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationTable;
