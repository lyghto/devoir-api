import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditReservation = () => {
  const { id, catwayId } = useParams();
  const navigate = useNavigate();

  const [reservation, setReservation] = useState({
    catwayNumber: '',
    clientName: '',
    boatName: '',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/reservations/${id}`);
        const { catwayNumber, clientName, boatName, startDate, endDate } = response.data;
        setReservation({
          catwayNumber,
          clientName,
          boatName,
          startDate: startDate.substring(0, 10),
          endDate: endDate.substring(0, 10)
        });
      } catch (error) {
        console.error("Erreur lors du chargement de la réservation :", error);
      }
    };

    fetchReservation();
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setReservation(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.put(`http://localhost:8080/api/catways/${catwayId}/reservations/${id}`, reservation)
      .then(() => navigate('/reservations'))
      .catch(error => console.error("Erreur lors de la modification :", error));
  };

  return (
    <div>
      <h2>Modifier une réservation</h2>
      <form onSubmit={handleSubmit}>
        <label>Catway :</label>
        <input type="number" name="catwayNumber" value={reservation.catwayNumber} onChange={handleChange} required />
        <br />
        <label>Client :</label>
        <input type="text" name="clientName" value={reservation.clientName} onChange={handleChange} required />
        <br />
        <label>Bateau :</label>
        <input type="text" name="boatName" value={reservation.boatName} onChange={handleChange} required />
        <br />
        <label>Date de début :</label>
        <input type="date" name="startDate" value={reservation.startDate} onChange={handleChange} required />
        <br />
        <label>Date de fin :</label>
        <input type="date" name="endDate" value={reservation.endDate} onChange={handleChange} required />
        <br />
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
};

export default EditReservation;