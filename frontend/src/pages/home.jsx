import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/loginForm';

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogin = async ({ email, password }) => {
    try {
      const response = await fetch('http://localhost:8080/users/authenticate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        alert('Erreur : ' + data.message);
      }
    } catch (err) {
      console.error('Erreur serveur :', err);
    }
  };

  return (
    <div>
      <h1>Bienvenue sur l'application de gestion du port</h1>
      <p>Connectez-vous pour accéder au tableau de bord et gérer les catways, réservations et utilisateurs.</p>
      <LoginForm onLogin={handleLogin} />
      <p><a href="/documentation">📄 Documentation de l'API</a></p>
    </div>
  );
};

export default HomePage;