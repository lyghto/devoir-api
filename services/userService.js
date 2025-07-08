const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || 'votre_clé_secrète_temporaire';




exports.getUserById = async (id) => {
  try {
    return await User.findById(id);
  } catch (error) {
    throw error;
  }
};

exports.getAllUsers = async ()=> {
  try {
    return await User.find();
  } catch (error) {
    throw error;
  }
};


exports.add = async (userData) => {
  try {
    const user = await User.create(userData);
    return user;
  } catch (error) {
    throw error;
  }
};

exports.update = async (req, res, next) => {
  const id = req.params.id;
  const temp = {
    name     : req.body.name,
    firstname: req.body.firstname,
    email    : req.body.email,
    password : req.body.password
  };

  try {
    let user = await User.findOne({ _id: id });

    if (user) {
      Object.keys(temp).forEach((key) => {
        if (!!temp[key]) {
          user[key] = temp[key];
        }
      });

      await user.save();
      return res.status(201).json(user);
    }

    return res.status(404).json('user_not_found');
  } catch (error) {
    return res.status(501).json(error);
  }
}

exports.delete = async (id) => {
  try {
    await User.deleteOne({ _id: id });
    return 'delete_ok';
  } catch (error) {
    throw error;
  }
};

exports.authenticate = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email: email }, '-__v -createdAt -updatedAt');

    if (user) {
      bcrypt.compare(password, user.password, function(err, response) {
        if (err) {
          throw new Error(err);
        }
        if (response) {
          delete user._doc.password;

          const expireIn = 24 * 60 * 60;
          const token = jwt.sign(
            { user: user },
            SECRET_KEY,
            { expiresIn: expireIn }
          );

          res.header('Authorization', 'Bearer ' + token);

          return res.status(200).json('authenticate_succeed');
        }
        return res.status(403).json('wrong_credentials');
      });
    } else {
      return res.status(404).json('user_not_found');
    }
  } catch (error) {
    return res.status(501).json(error);
  }
};
