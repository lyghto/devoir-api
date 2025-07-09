import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../axios';
import AddUser from './AddUser';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage("Token manquant. Veuillez vous connecter.");
      return;
    }
    try {
      const response = await axios.get('http://localhost:8080/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
      setMessage('');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMessage("Accès non autorisé. Veuillez vous reconnecter.");
      } else {
        setMessage("Erreur lors du chargement des utilisateurs.");
      }
      console.error("Erreur lors du chargement des utilisateurs :", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/users/${id}`);
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  return (
    <div>
      <h2>Liste des utilisateurs</h2>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Fermer le formulaire' : 'Ajouter un utilisateur'}
      </button>
      {showForm && <AddUser onUserAdded={fetchUsers} />}
      {message && <p>{message}</p>}
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.username}{' '}
            <Link to={`/users/edit/${user._id}`}>
              <button>Modifier</button>
            </Link>
            <button onClick={() => handleDelete(user._id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;