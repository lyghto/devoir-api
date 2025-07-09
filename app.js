
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/usersRoutes');
const reservationsRoutes = require('./routes/reservationsRoutes');
const catwaysRoutes = require('./routes/catwaysRoutes');

const app = express();

// Connexion MongoDB Atlas
mongoose.connect('mongodb+srv://lyghto:cavaParis@cluster0.cpm6q4y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('Connecté à MongoDB'))
.catch((err) => console.error('Erreur MongoDB :', err));

app.use(cors({
  exposedHeaders: ['Authorization'],
  origin: '*'
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/reservation', reservationsRoutes);
app.use('/api/catways', catwaysRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    name: 'API',
    version: '1.0',
    status: 404,
    message: 'not_found'
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erreur serveur' });
});



module.exports = app;
