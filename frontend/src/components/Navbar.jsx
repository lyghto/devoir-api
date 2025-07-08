import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // ou sessionStorage si tu l'utilises
    navigate('/'); // Redirection vers la page d’accueil
  };

  return (
    <nav style={{ padding: '10px', backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <Link to="/dashboard" style={{ marginRight: '15px' }}>Tableau de bord</Link>
        <Link to="/catways" style={{ marginRight: '15px' }}>Catways</Link>
        <Link to="/reservations" style={{ marginRight: '15px' }}>Réservations</Link>
        <Link to="/users" style={{ marginRight: '15px' }}>Utilisateurs</Link>
      </div>
      <div>
        <button onClick={handleLogout} style={{ marginLeft: '15px' }}>
          Déconnexion
        </button>
      </div>
    </nav>
  );
};

export default Navbar;