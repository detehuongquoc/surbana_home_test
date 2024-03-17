import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import * as fs from 'fs';

@Injectable()
export class AppService {
  private readonly pool = new Pool();

  public setupDatabaseConnection() {
    const pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT),
    });
    
    pool.connect(async (err, client, release) => {
      if (err) {
        return console.error('Error acquiring client', err.stack);
      }
      console.log('Connected to PostgreSQL database');
      release();
    });
  }
  async createLocationTable(): Promise<void> {
    const client = await this.pool.connect();
    try {
      const createTableQuery = fs.readFileSync(
        'src/sql/create_location_table.sql',
        'utf8',
      );
      await client.query(createTableQuery);
    } finally {
      client.release();
    }
  }

  async insertData(): Promise<void> {
    const client = await this.pool.connect();
    try {
      const insertDataQuery = fs.readFileSync(
        'src/sql/insert_data.sql',
        'utf8',
      );
      await client.query(insertDataQuery);
    } finally {
      client.release();
    }
  }


}
