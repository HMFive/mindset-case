import { NextFunction, Request, Response } from 'express';
import { User } from '../models/user.model';
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

declare const process: {
  env: {
    JWT_SECRET: string;
  };
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;

    const user = await User.getUserByUsername(username);
    const passwordCheck = await bcrypt.compare(password, user[0].password);
    if (passwordCheck) {
      const token = jwt.sign(
        { username: req.body.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      res.status(200).json({
        status: 'success',
        data: { token: token, username: req.body.username },
      });
    } else {
      res.status(401).json({ status: 'error', message: 'Wrong Password' });
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({ status: 'error', message: err.message });
    }
  }
};
export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.getUsers();

    res.status(200).json({ status: 'success', data: { users } });
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({ status: 'error', message: err.message });
    }
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const user = await User.getUser(id);

    res.status(200).json({ status: 'success', data: { user } });
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({ status: 'error', message: err.message });
    }
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.createUser(username, hashedPassword);

    res.status(200).json({ status: 'success', data: { user } });
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({ status: 'error', message: err.message });
    }
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);

    const { role } = req.body;
    const user = await User.updateUser(id, role);

    res.status(200).json({ status: 'success', data: { user } });
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({ status: 'error', message: err.message });
    }
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);

    const user = await User.deleteUser(id);

    res.status(200).json({ status: 'success', data: { user } });
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({ status: 'error', message: err.message });
    }
  }
};
