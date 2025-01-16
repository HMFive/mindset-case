import mysql from 'mysql2';
import { Pool } from 'mysql2/typings/mysql/lib/Pool';

require('dotenv').config();

declare const process: {
  env: {
    DB_NAME: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_HOST: string;
    DB_PORT: number;
  };
};

const pool: Pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

export default pool.promise();
