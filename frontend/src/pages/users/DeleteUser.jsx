

import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

const DeleteUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const deleteUser = async () => {
      if (!id) {
        console.error("Aucun ID fourni pour la suppression.");
        return;
      }
      try {
        await axios.delete(`http://localhost:8080/users/${id}`);
        navigate('/users');
      } catch (error) {
        console.error('Erreur lors de la suppression :', error);
      }
    };

    deleteUser();
  }, [id, navigate]);

  return <p>Suppression en cours...</p>;
};

export default DeleteUser;