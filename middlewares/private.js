
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY || 'votre_clé_secrète';

exports.checkJWT = async (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];

  
  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Token invalide ou expiré' });
      } else {
        req.user = { id: decoded.id, email: decoded.email };

        const expiresIn = 24 * 60 * 60; // 24h
        const newToken = jwt.sign(
          { id: decoded.id, email: decoded.email },
          SECRET_KEY,
          { expiresIn: expiresIn }
        );

        res.header('Authorization', 'Bearer ' + newToken);
        next();
      }
    });
  } else {
    return res.status(401).json({ message: 'Token requis' });
  }
};