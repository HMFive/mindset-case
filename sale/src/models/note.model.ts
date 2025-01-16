import { RowDataPacket } from 'mysql2';
import db from '../util/db';

export interface NoteModel extends RowDataPacket {
  id: number;
  note: string;
  saleId: number;
  statusId: number;
  created_at: Date;
  updated_at: Date;
}

export class Note {
  id: number;
  note: string;
  saleId: number;
  statusId: number;
  created_at: Date;
  updated_at: Date;
  constructor({
    id,
    note,
    saleId,
    statusId,
    created_at,
    updated_at,
  }: NoteModel) {
    this.id = id;
    this.note = note;
    this.saleId = saleId;
    this.statusId = statusId;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static async getNotes() {
    const [rows] = await db.execute(
      'SELECT id,note,sale_id,status_id,created_at,updated_at FROM notes'
    );
    return rows;
  }

  static async getNotesBySaleStatusId(saleId: number, statusId: number) {
    const [rows] = await db.execute<NoteModel[]>(
      'SELECT id,note,sale_id,status_id,created_at,updated_at FROM notes WHERE sale_id = ? AND status_id = ?',
      [saleId, statusId]
    );

    return rows;
  }

  static async createNote(note: string, saleId: number, statusId: number) {
    const [rows] = await db.execute<NoteModel[]>(
      'INSERT INTO notes (note,sale_id,status_id) values (?,?,?)',
      [note, saleId, statusId]
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
