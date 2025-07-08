

import React from 'react';

const ApiDoc = () => {
  return (
    <div>
      <h1>Documentation de l'API</h1>
      <p>Cette API permet de gérer un port de plaisance avec les fonctionnalités suivantes :</p>
      <ul>
        <li>Gestion des utilisateurs (ajout, suppression, authentification...)</li>
        <li>Gestion des catways (création, mise à jour, suppression...)</li>
        <li>Gestion des réservations (pour un catway donné ou globalement)</li>
      </ul>
    </div>
  );
};

export default ApiDoc;