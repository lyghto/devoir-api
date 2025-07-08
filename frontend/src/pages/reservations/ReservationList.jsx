import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await axios.get('http://localhost:8080/reservation/reservations', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setReservations(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des réservations :', error);
    }
  };

  const deleteReservation = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/reservation/reservations/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setReservations(reservations.filter(res => res._id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression :', error);
    }
  };

  return (
    <div>
      <h2>Liste des réservations</h2>
      <Link to="/reservations/add">
        <button>Ajouter une réservation</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>Catway</th>
            <th>Client</th>
            <th>Bateau</th>
            <th>Début</th>
            <th>Fin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map(res => (
            <tr key={res._id}>
              <td>{res.catwayNumber}</td>
              <td>{res.clientName}</td>
              <td>{res.boatName}</td>
              <td>{new Date(res.startDate).toLocaleDateString()}</td>
              <td>{new Date(res.endDate).toLocaleDateString()}</td>
              <td>
                <button onClick={() => deleteReservation(res._id)}>Supprimer</button>
              </td>
              <td>
                <Link to={`/reservations/edit/${res._id}`}>
                  <button>Modifier</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationList;