import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare const process: {
  env: {
    JWT_SECRET: string;
  };
};

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = new Error('Not authenticated.');
    res.status(401).json({ status: 'error', message: 'Not authenticated' });
    throw error;
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw err;
  }
  if (!decodedToken) {
    const error = new Error('Not authenticated');
    res
      .status(401)
      .json({ status: 'error', code: 2, message: 'Not authenticated' });
    throw error;
  }

  next();
};
