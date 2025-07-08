import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserInfoCard from '../../components/UserInfoCard';

const Dashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [catways, setCatways] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/reservation/reservations')
      .then(res => {
        console.log("Données reçues :", res.data);
        setReservations(res.data);
      })
      .catch(err => console.error("Erreur lors du chargement des réservations :", err));

    axios.get('http://localhost:8080/api/catways')
      .then(res => {
        setCatways(res.data);
      })
      .catch(err => console.error("Erreur lors du chargement des catways :", err));
  }, []);


  return (
    <>
      
      <div style={{ padding: '20px' }}>
        <h1>Tableau de bord</h1>
        <UserInfoCard />
        <h2>Réservations en cours</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black', padding: '8px' }}>Catway</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Client</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Bateau</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Date de début</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Date de fin</th>
            </tr>
          </thead>
          <tbody>
            {catways.length > 0 && reservations.map(res => {
              const catway = catways.find(cat => cat.catwayNumber === res.catwayNumber);
              return (
                <tr key={res._id}>
                  <td style={{ border: '1px solid black', padding: '8px' }}>
                    {catway ? catway.catwayNumber : 'Non trouvé'}
                  </td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{res.clientName}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{res.boatName}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>
                    {new Date(res.startDate).toLocaleDateString()}
                  </td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>
                    {new Date(res.endDate).toLocaleDateString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;