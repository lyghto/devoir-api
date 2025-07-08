

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditCatways = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    catwayNumber: '',
    catwayType: '',
    catwayState: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/catways/${id}`)
      .then((res) => setFormData(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/catways/${id}`, formData)
      .then(() => navigate('/catways'))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2>Modifier le Catway</h2>
      <form onSubmit={handleSubmit}>
        <label>Numéro :</label>
        <input
          type="text"
          name="catwayNumber"
          value={formData.catwayNumber}
          onChange={handleChange}
        /><br />

        <label>Type :</label>
        <select
          name="catwayType"
          value={formData.catwayType}
          onChange={handleChange}
        >
          <option value="short">Court</option>
          <option value="long">Long</option>
        </select><br />

        <label>État :</label>
        <input
          type="text"
          name="catwayState"
          value={formData.catwayState}
          onChange={handleChange}
        /><br />

        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
};

export default EditCatways;