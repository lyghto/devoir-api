import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddReservation = () => {
  const [catways, setCatways] = useState([]);
  const [reservation, setReservation] = useState({
    clientName: '',
    boatName: '',
    startDate: '',
    endDate: '',
    catwayId: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/catways')
      .then(res => setCatways(res.data))
      .catch(err => console.error('Erreur chargement catways', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservation(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { catwayId, ...reservationData } = reservation;
      await axios.post(`http://localhost:8080/reservation/catways/${catwayId}/reservations`, reservationData);
      navigate('/reservations');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la réservation :', error);
    }
  };

  return (
    <div>
      <h2>Ajouter une Réservation</h2>
      <form onSubmit={handleSubmit}>
        <label>Nom du Client:</label>
        <input type="text" name="clientName" value={reservation.clientName} onChange={handleChange} required />

        <label>Nom du Bateau:</label>
        <input type="text" name="boatName" value={reservation.boatName} onChange={handleChange} required />

        <label>Date de début:</label>
        <input type="date" name="startDate" value={reservation.startDate} onChange={handleChange} required />

        <label>Date de fin:</label>
        <input type="date" name="endDate" value={reservation.endDate} onChange={handleChange} required />

        <label>Catway:</label>
        <select name="catwayId" value={reservation.catwayId} onChange={handleChange} required>
          <option value="">-- Choisir un Catway --</option>
          {catways.map(catway => (
            <option key={catway._id} value={catway._id}>
              {catway.catwayNumber}
            </option>
          ))}
        </select>

        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default AddReservation;