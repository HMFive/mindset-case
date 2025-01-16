import { RowDataPacket } from 'mysql2';
import db from '../util/db';

export interface NoteModel extends RowDataPacket {
  id: number;
  note: string;
  customer_id: number;
  created_at: Date;
  updated_at: Date;
}

export class Note {
  id: number;
  note: string;
  customer_id: number;
  created_at: Date;
  updated_at: Date;
  constructor({
    id,
    note,
    customer_id,

    created_at,
    updated_at,
  }: NoteModel) {
    this.id = id;
    this.note = note;
    this.customer_id = customer_id;

    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static async getNotes() {
    const [rows] = await db.execute(
      'SELECT id,note,customer_id,created_at,updated_at FROM notes'
    );
    return rows;
  }

  static async getNotesByCustomerId(customerId: number) {
    const [rows] = await db.execute<NoteModel[]>(
      'SELECT id,note,customer_id,created_at,updated_at FROM notes WHERE customer_id = ?',
      [customerId]
    );

    return rows;
  }

  //customer/2/notes/
  //customer/2/note/2
  static async createNote(note: string, customer_id: string) {
    const [rows] = await db.execute<NoteModel[]>(
      'INSERT INTO notes (note,customer_id) values (?,?)',
      [note, customer_id]
    );

    return rows;
  }

  static async updateNote(id: number, note: string) {
    const [rows] = await db.execute<[]>(
      'UPDATE notes SET note = ? WHERE id = ?',
      [note, id]
    );

    if (rows.length < 1) {
      throw new Error('Not found');
    } else {
      return rows;
    }
  }

  static async deleteNote(id: number) {
    const [rows] = await db.execute<[]>('DELETE FROM notes WHERE id = ?', [id]);

    if (rows.length < 1) {
      throw new Error('Note not found');
    } else {
      return rows;
    }
  }
}
