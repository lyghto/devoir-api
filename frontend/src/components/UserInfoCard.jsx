import React, { useEffect, useState } from 'react';

const UserInfoCard = () => {
  const [user, setUser] = useState({ username: '', email: '' });

  useEffect(() => {
    // Remplace ceci par une vraie récupération de l'utilisateur connecté
    const mockUser = {
      username: '',
      email: '',
    };
    setUser(mockUser);
  }, []);

  const currentDate = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', marginTop: '20px' }}>
      <h2>Bienvenue, {user.username}</h2>
      <p>Email : {user.email}</p>
      <p>Date : {currentDate}</p>
    </div>
  );
};

export default UserInfoCard;