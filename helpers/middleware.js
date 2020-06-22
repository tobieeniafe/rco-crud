import jwt from 'jsonwebtoken';
import { USER_SECRET } from '../config';
import User from '../models/user.model';

export const validateToken = () => (req, res, next) => {
  const token = req.headers['accessToken'];
  if (token) {
    jwt.verify(token, USER_SECRET, (err, decoded) => {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      }
      req.decoded = decoded;

      User.findById(req.decoded, (user) => {
        if (!user) {
          res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
        } else {
          console.log(req.decoded.id);
          next();
        }
      });
    });
  } else {
    return res.status(403).send({ success: false, message: 'Forbidden: No token provided.' });
  }
};

// eslint-disable-next-line import/prefer-default-export
export const userValidation = (schema) => (req, res, next) => {
  const { value, error } = schema.validate(req.body);

  if (value && !error) {
    req.locals = value;
    next();
  } else {
    res.status(412).json({ success: false, message: 'Validation Error', error: error.message });
  }
};

export const productValidation = (schema) => (req, res, next) => {
  const { value, error } = schema.validate(req.body);

  if (value && !error) {
    req.locals = value;
    const token = req.headers['accessToken'];
    if (token) {
      jwt.verify(token, USER_SECRET, (err, decoded) => {
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });
        }
        req.decoded = decoded;

        User.findById(req.decoded, (user) => {
          if (!user) {
            res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
          } else {
            next();
          }
        });
      });
    } else {
      return res.status(403).send({ success: false, message: 'Forbidden: No token provided.' });
    }
  } else {
    res.status(412).json({ success: false, message: 'Validation Error', error: error.message });
  }
};