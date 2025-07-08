import React, { useState } from 'react';
import axios from 'axios'; 

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/users/authenticate', { email, password });
      const token = response.data.token;
      if (!token) {
        setMessage("Token manquant dans la réponse");
        return;
      }
      localStorage.setItem('token', token);
      window.location.href = '/dashboard'; 
    } catch (error) {
      setMessage("Échec de la connexion");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Email :</label>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      <br />
      <label>Mot de passe :</label>
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      <br />
      <button type="submit">Se connecter</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default LoginForm;