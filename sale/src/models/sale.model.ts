import { RowDataPacket } from 'mysql2';
import db from '../util/db';
import { NoteModel } from './note.model';

export interface SaleModel extends RowDataPacket {
  id: number;
  name: string;
  status: string;
  notes: NoteModel[];
  created_at: Date;
  updated_at: Date;
}

export class Sale {
  id: number;
  name: string;
  status: string;
  notes: NoteModel[];
  created_at: Date;
  updated_at: Date;
  constructor({ id, name, status, notes, created_at, updated_at }: SaleModel) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.notes = notes;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static async getSales() {
    const [rows] = await db.execute(
      'SELECT sa.id,st.name,created_at,updated_at FROM sales sa JOIN status st on sa.status_id = st.id'
    );
    return rows;
  }

  static async getSale(id: number) {
    const [rows] = await db.execute<SaleModel[]>(
      `SELECT sa.id,st.name,created_at,updated_at 
      FROM sales sa 
      JOIN status st on sa.status_id = st.id
      WHERE sa.id = ?
      `[id]
    );

    if (rows.length < 1) {
      throw new Error('Sale not found');
    } else {
      return rows;
    }
  }

  static async createSale(name: string) {
    const [rows] = await db.execute<SaleModel[]>(
      'INSERT INTO sales (name) values (?)',
      [name]
    );

    return rows;
  }

  static async updateSale(id: number, statusId: number) {
    const [rows] = await db.execute<[]>(
      'UPDATE sales SET status_id = ? WHERE id = ?',
      [statusId, id]
    );

    if (rows.length < 1) {
      throw new Error('Sale not found');
    } else {
      return rows;
    }
  }

  static async deleteSale(id: number) {
    const [rows] = await db.execute<[]>('DELETE FROM sales WHERE id = ?', [id]);

    if (rows.length < 1) {
      throw new Error('Sale not found');
    } else {
      return rows;
    }
  }
}
