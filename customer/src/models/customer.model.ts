import { RowDataPacket } from 'mysql2';
import db from '../util/db';
import { NoteModel } from './note.model';

export interface CustomerModel extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  notes: NoteModel[];
  created_at: Date;
  updated_at: Date;
}

export class Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  notes: NoteModel[];
  created_at: Date;
  updated_at: Date;
  constructor({
    id,
    name,
    email,
    phone,
    company,
    notes,
    created_at,
    updated_at,
  }: CustomerModel) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.company = company;
    this.notes = notes;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static async getCustomers(queryStr: any) {
    const filters: string[] = [];
    const params = [];

    if (queryStr.company) {
      filters.push('company = ?');
      params.push(queryStr.company);
    }

    let order;

    if (queryStr.orderBy) {
      switch (queryStr.orderBy) {
        case 'nameAsc':
          order = 'name ASC';
          break;
        case 'nameDesc':
          order = 'name DESC';
          break;
        case 'idAsc':
          order = 'id ASC';
          break;
        case 'idDesc':
          order = 'id DESC';
          break;
      }
    }

    const query = `SELECT id,name,email,phone,company,created_at,updated_at  
    FROM customers ${
      filters.length > 0 ? `WHERE ${filters.join(' AND ')}` : ''
    }${order ? `ORDER BY ${order}` : ''} `;

    const [rows] = await db.query(query, params);

    return rows;
  }

  static async getCustomer(id: number) {
    const [rows] = await db.execute<CustomerModel[]>(
      'SELECT id,name,email,phone,company,created_at,updated_at FROM Customers WHERE id = ?',
      [id]
    );

    if (rows.length < 1) {
      throw new Error('Customer not found');
    } else {
      return rows;
    }
  }

  static async createCustomer(
    name: string,
    email: string,
    phone: string,
    company: string
  ) {
    const [rows] = await db.execute<CustomerModel[]>(
      'INSERT INTO Customers (name,email,phone,company) values (?,?,?,?)',
      [name, email, phone, company]
    );

    return rows;
  }

  static async updateCustomer(
    id: number,
    name: string,
    email: string,
    phone: string,
    company: string
  ) {
    const [rows] = await db.execute<[]>(
      'UPDATE Customers SET phone = ? WHERE id = ?',
      [name, email, phone, company]
    );

    if (rows.length < 1) {
      throw new Error('Customer not found');
    } else {
      return rows;
    }
  }

  static async deleteCustomer(id: number) {
    const [rows] = await db.execute<[]>('DELETE FROM Customers WHERE id = ?', [
      id,
    ]);

    if (rows.length < 1) {
      throw new Error('Customer not found');
    } else {
      return rows;
    }
  }
}
