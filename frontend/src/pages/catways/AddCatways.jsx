import React, { useState } from 'react';
import axios from 'axios';

const AddCatways = () => {
  const [catwayNumber, setCatwayNumber] = useState('');
  const [catwayType, setCatwayType] = useState('long');
  const [catwayState, setCatwayState] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/catways', {
        catwayNumber,
        catwayType,
        catwayState,
      });

      setMessage('Catway ajouté avec succès !');
      setCatwayNumber('');
      setCatwayType('long');
      setCatwayState('');
    } catch (error) {
      setMessage('Erreur lors de l’ajout du catway.');
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h2>Ajouter un Catway</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Numéro :</label>
          <input
            type="text"
            value={catwayNumber}
            onChange={(e) => setCatwayNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Type :</label>
          <select
            value={catwayType}
            onChange={(e) => setCatwayType(e.target.value)}
          >
            <option value="long">Long</option>
            <option value="short">Short</option>
          </select>
        </div>
        <div>
          <label>État :</label>
          <input
            type="text"
            value={catwayState}
            onChange={(e) => setCatwayState(e.target.value)}
            required
          />
        </div>
        <button type="submit">Ajouter</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddCatways;