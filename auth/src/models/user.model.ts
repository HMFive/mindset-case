import { RowDataPacket } from 'mysql2';
import db from '../util/db';

export interface UserModel extends RowDataPacket {
  id: number;
  username: string;
  password: string;
  role: string;
  created_at: Date;
  updated_at: Date;
}

export class User {
  id: number;
  username: string;
  password: string;
  role: string;
  created_at: Date;
  updated_at: Date;
  constructor({
    id,
    username,
    password,
    role,
    created_at,
    updated_at,
  }: UserModel) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.role = role;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static async getUsers() {
    const [rows] = await db.execute(
      'SELECT id,username,password,created_at,updated_at FROM users'
    );
    return rows;
  }

  static async getUser(id: number) {
    const [rows] = await db.execute<UserModel[]>(
      'SELECT id,username,password,created_at,updated_at FROM users WHERE id = ?',
      [id]
    );

    if (rows.length < 1) {
      throw new Error('User not found');
    } else {
      return rows;
    }
  }

  static async getUserByUsername(username: string) {
    const [rows] = await db.execute<UserModel[]>(
      'SELECT id,username,password,created_at,updated_at FROM users WHERE username = ?',
      [username]
    );

    if (rows.length < 1) {
      throw new Error('User not found');
    } else {
      return rows;
    }
  }

  static async createUser(username: string, password: string) {
    const [rows] = await db.execute<UserModel[]>(
      'INSERT INTO users (username,password) values (?,?)',
      [username, password]
    );

    return rows;
  }

  static async updateUser(id: number, role: string) {
    let userRole;
    switch (role) {
      case 'admin':
        userRole = 'admin';
        break;
      case 'user':
        userRole = 'user';
        break;
      default:
        throw new Error('Role not found');
    }
    const [rows] = await db.execute<[]>(
      'UPDATE users SET role = ? WHERE id = ?',
      [userRole, id]
    );

    if (rows.length < 1) {
      throw new Error('User not found');
    } else {
      return rows;
    }
  }

  static async deleteUser(id: number) {
    const [rows] = await db.execute<[]>('DELETE FROM users WHERE id = ?', [id]);

    if (rows.length < 1) {
      throw new Error('User not found');
    } else {
      return rows;
    }
  }
}
