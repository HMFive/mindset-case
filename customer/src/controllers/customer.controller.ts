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

export const getCustomers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query;

    const customers: any = await Customer.getCustomers(query);
    const customersWithNotesPromise = customers.map(
      async (c: CustomerModel) => {
        const notes = await Note.getNotesByCustomerId(c.id);
        c.notes = notes;
        return c;
      }
    );
    const customersWithNotes = await Promise.all(customersWithNotesPromise);

    res
      .status(200)
      .json({ status: 'success', data: { customers: customersWithNotes } });
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({ status: 'error', message: err.message });
    }
  }
};

export const getCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const customer = await Customer.getCustomer(id);
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

export const createCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, phone, company } = req.body;

    const customer = await Customer.createCustomer(name, email, phone, company);

    res.status(200).json({ status: 'success', data: { customer } });
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({ status: 'error', message: err.message });
    }
  }
};

export const updateCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const { name, email, phone, company } = req.body;

    const customer = await Customer.updateCustomer(
      id,
      name,
      email,
      phone,
      company
    );

    res.status(200).json({ status: 'success', data: { customer } });
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({ status: 'error', message: err.message });
    }
  }
};

export const deleteCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);

    const customer = await Customer.deleteCustomer(id);

    res.status(200).json({ status: 'success', data: { customer } });
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({ status: 'error', message: err.message });
    }
  }
};
