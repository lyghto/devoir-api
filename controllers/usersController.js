const userService = require('../services/userService');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');  
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY || 'votre_clé_secrète';

exports.getAllUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  res.json(users);
};

exports.getUserById = async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });
  res.json(user);
};

exports.add = async (req, res) => {
  const { username, email, password } = req.body;
  console.log('req.body:', req.body);

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Tous les champs (username, email, password) sont requis.' });
  }

  try {
    const user = await userService.add(req.body); 
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);
  if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });
  res.json(user);
};

exports.delete = async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await userService.delete(userId);
    return res.status(204).json(result);
  } catch (error) {
    return res.status(500).json({ message: 'Erreur lors de la suppression', error });
  }
};

exports.authenticate = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Utilisateur non trouvé' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Mot de passe incorrect' });

    const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ message: 'Connecté', token });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token').json({ message: 'Déconnecté avec succès' });
};

exports.verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Accès refusé : aucun token fourni' });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Token invalide' });
  }
};
