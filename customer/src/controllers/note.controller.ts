import { NextFunction, Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Customer, CustomerModel } from '../models/customer.model';
import { Note } from '../models/note.model';

declare const process: {
  env: {
    JWT_SECRET: string;
  };
};

export const getNotes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const notes = await Note.getNotes();

    res.status(200).json({ status: 'success', data: { notes } });
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({ status: 'error', message: err.message });
    }
  }
};

export const getNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const customer = await Note.getNotesByCustomerId(id);
    const notes = await Note.getNotesByCustomerId(id);
    const customerWithNotes = customer.map((c) => {
      c.notes = notes;
      return c;
    });

    res
      .status(200)
      .json({ status: 'success', data: { customer: customerWithNotes } });
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({ status: 'error', message: err.message });
    }
  }
};

export const createNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { note, customerId } = req.body;

    const createdNote = await Note.createNote(note, customerId);

    res.status(200).json({ status: 'success', data: { note: createdNote } });
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({ status: 'error', message: err.message });
    }
  }
};

export const updateNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const { note } = req.body;

    const updatedNote = await Note.updateNote(id, note);

    res.status(200).json({ status: 'success', data: { note: updatedNote } });
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({ status: 'error', message: err.message });
    }
  }
};

export const deleteNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);

    const note = await Note.deleteNote(id);

    res.status(200).json({ status: 'success', data: { note } });
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({ status: 'error', message: err.message });
    }
  }
};
