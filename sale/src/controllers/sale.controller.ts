import { NextFunction, Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Sale, SaleModel } from '../models/sale.model';
import { Note } from '../models/note.model';

declare const process: {
  env: {
    JWT_SECRET: string;
  };
};

export const getSales = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query;

    const sales: any = await Sale.getSales();
    const salesWithNotesPromise = sales.map(async (s: SaleModel) => {
      const notes = await Note.getNotesBySaleStatusId(s.id, s.statusId);
      s.notes = notes;
      return s;
    });
    const salesWithNotes = await Promise.all(salesWithNotesPromise);

    res
      .status(200)
      .json({ status: 'success', data: { sales: salesWithNotes } });
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({ status: 'error', message: err.message });
    }
  }
};

export const getSale = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const sale = await Sale.getSale(id);
    const notes = await Note.getNotesBySaleStatusId(id, sale[0].statusId);
    const saleWithNotes = sale.map((c) => {
      c.notes = notes;
      return c;
    });

    res.status(200).json({ status: 'success', data: { sale: saleWithNotes } });
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({ status: 'error', message: err.message });
    }
  }
};

export const createSale = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;

    const sale = await Sale.createSale(name);

    res.status(200).json({ status: 'success', data: { sale } });
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({ status: 'error', message: err.message });
    }
  }
};

export const updateSale = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const { statusId } = req.body;

    const sale = await Sale.updateSale(id, statusId);

    res.status(200).json({ status: 'success', data: { sale } });
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({ status: 'error', message: err.message });
    }
  }
};

export const deleteSale = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);

    const sale = await Sale.deleteSale(id);

    res.status(200).json({ status: 'success', data: { sale } });
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({ status: 'error', message: err.message });
    }
  }
};
