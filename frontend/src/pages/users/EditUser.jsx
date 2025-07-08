

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    role: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:8080/users/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Erreur lors du chargement de l\'utilisateur :', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.patch(`http://localhost:8080/users/${id}`, user, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(() => {
        navigate('/users');
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
      });
  };

  return (
    <div>
      <h2>Modifier l'utilisateur</h2>
      <form onSubmit={handleSubmit}>
        <label>Nom :</label>
        <input type="text" name="name" value={user.name} onChange={handleChange} required />
        <br />
        <label>Email :</label>
        <input type="email" name="email" value={user.email} onChange={handleChange} required />
        <br />
        <label>Rôle :</label>
        <input type="text" name="role" value={user.role} onChange={handleChange} required />
        <br />
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
};

export default EditUser;