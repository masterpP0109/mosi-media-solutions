import { Pool, PoolConfig } from 'pg';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
  ssl?: boolean;
}

// PostgreSQL connection
class PostgreSQLConnection {
  private pool: Pool | null = null;
  private config: PoolConfig;

  constructor(config: DatabaseConfig) {
    this.config = {
      host: config.host,
      port: config.port,
      database: config.database,
      user: config.user,
      password: config.password,
      ssl: config.ssl ? { rejectUnauthorized: false } : false,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    };
  }

  async connect(): Promise<void> {
    try {
      this.pool = new Pool(this.config);
      // Test the connection
      const client = await this.pool.connect();
      await client.query('SELECT NOW()');
      client.release();
      console.log('✅ PostgreSQL connected successfully');
    } catch (error) {
      console.error('❌ PostgreSQL connection failed:', error);
      throw error;
    }
  }

  async query(text: string, params?: any[]): Promise<any> {
    if (!this.pool) {
      throw new Error('Database not connected. Call connect() first.');
    }
    
    const start = Date.now();
    try {
      const result = await this.pool.query(text, params);
      const duration = Date.now() - start;
      console.log('📊 Query executed', { text, duration, rows: result.rowCount });
      return result;
    } catch (error) {
      console.error('❌ Query failed:', { text, error });
      throw error;
    }
  }

  async close(): Promise<void> {
    if (this.pool) {
      await this.pool.end();
      this.pool = null;
      console.log('🔌 PostgreSQL connection closed');
    }
  }

  getPool(): Pool {
    if (!this.pool) {
      throw new Error('Database not connected. Call connect() first.');
    }
    return this.pool;
  }
}

// MySQL connection (alternative)
class MySQLConnection {
  private pool: mysql.Pool | null = null;
  private config: mysql.ConnectionOptions;

  constructor(config: DatabaseConfig) {
    this.config = {
      host: config.host,
      port: config.port,
      database: config.database,
      user: config.user,
      password: config.password,
      ssl: config.ssl ? { rejectUnauthorized: false } : undefined,
      connectionLimit: 20,
      acquireTimeout: 2000,
      timeout: 30000,
    };
  }

  async connect(): Promise<void> {
    try {
      this.pool = mysql.createPool(this.config);
      // Test the connection
      const [rows] = await this.pool.execute('SELECT NOW()');
      console.log('✅ MySQL connected successfully');
    } catch (error) {
      console.error('❌ MySQL connection failed:', error);
      throw error;
    }
  }

  async query(sql: string, params?: any[]): Promise<any> {
    if (!this.pool) {
      throw new Error('Database not connected. Call connect() first.');
    }
    
    const start = Date.now();
    try {
      const [rows, fields] = await this.pool.execute(sql, params);
      const duration = Date.now() - start;
      console.log('📊 Query executed', { sql, duration, rows: Array.isArray(rows) ? rows.length : 0 });
      return { rows, fields };
    } catch (error) {
      console.error('❌ Query failed:', { sql, error });
      throw error;
    }
  }

  async close(): Promise<void> {
    if (this.pool) {
      await this.pool.end();
      this.pool = null;
      console.log('🔌 MySQL connection closed');
    }
  }

  getPool(): mysql.Pool {
    if (!this.pool) {
      throw new Error('Database not connected. Call connect() first.');
    }
    return this.pool;
  }
}

// Database factory and configuration
class Database {
  private static instance: Database;
  private connection: PostgreSQLConnection | MySQLConnection | null = null;
  private dbType: 'postgresql' | 'mysql' = 'postgresql';

  private constructor() {}

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  async initialize(): Promise<void> {
    const databaseUrl = process.env.DATABASE_URL;
    
    if (!databaseUrl) {
      throw new Error('DATABASE_URL environment variable is not set');
    }

    // Parse database URL to determine type and configuration
    if (databaseUrl.startsWith('postgresql://') || databaseUrl.startsWith('postgres://')) {
      this.dbType = 'postgresql';
      const url = new URL(databaseUrl);
      const config: DatabaseConfig = {
        host: url.hostname || 'localhost',
        port: parseInt(url.port) || 5432,
        database: url.pathname.substring(1) || 'mosi_media_db',
        user: url.username || process.env.DB_USER || 'postgres',
        password: url.password || process.env.DB_PASSWORD || '',
        ssl: process.env.DB_SSL === 'true',
      };
      
      this.connection = new PostgreSQLConnection(config);
    } else if (databaseUrl.startsWith('mysql://')) {
      this.dbType = 'mysql';
      const url = new URL(databaseUrl);
      const config: DatabaseConfig = {
        host: url.hostname || 'localhost',
        port: parseInt(url.port) || 3306,
        database: url.pathname.substring(1) || 'mosi_media_db',
        user: url.username || process.env.DB_USER || 'root',
        password: url.password || process.env.DB_PASSWORD || '',
        ssl: process.env.DB_SSL === 'true',
      };
      
      this.connection = new MySQLConnection(config);
    } else {
      throw new Error('Unsupported database type. Use PostgreSQL or MySQL');
    }

    await this.connection.connect();
  }

  async query(sql: string, params?: any[]): Promise<any> {
    if (!this.connection) {
      throw new Error('Database not initialized. Call initialize() first.');
    }
    return this.connection.query(sql, params);
  }

  async close(): Promise<void> {
    if (this.connection) {
      await this.connection.close();
    }
  }

  getType(): 'postgresql' | 'mysql' {
    return this.dbType;
  }

  // Helper methods for common operations
  async findById(table: string, id: string): Promise<any> {
    const query = this.dbType === 'postgresql' 
      ? 'SELECT * FROM $1 WHERE id = $2'
      : 'SELECT * FROM ? WHERE id = ?';
    
    const result = await this.query(query, [table, id]);
    return result.rows?.[0] || null;
  }

  async findAll(table: string, conditions: Record<string, any> = {}, orderBy?: string): Promise<any[]> {
    let query = `SELECT * FROM ${table}`;
    const params: any[] = [];
    
    // Add WHERE conditions
    if (Object.keys(conditions).length > 0) {
      const whereClause = Object.keys(conditions)
        .map((key, index) => {
          params.push(conditions[key]);
          return `${key} = $${index + 1}`;
        })
        .join(' AND ');
      query += ` WHERE ${whereClause}`;
    }
    
    // Add ORDER BY
    if (orderBy) {
      query += ` ORDER BY ${orderBy}`;
    }
    
    const result = await this.query(query, params);
    return result.rows || [];
  }

  async create(table: string, data: Record<string, any>): Promise<any> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    
    const placeholders = keys.map((_, index) => `$${index + 1}`).join(', ');
    const query = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders}) RETURNING *`;
    
    const result = await this.query(query, values);
    return result.rows?.[0] || null;
  }

  async update(table: string, id: string, data: Record<string, any>): Promise<any> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    
    const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');
    const query = `UPDATE ${table} SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = $${keys.length + 1} RETURNING *`;
    
    values.push(id);
    const result = await this.query(query, values);
    return result.rows?.[0] || null;
  }

  async delete(table: string, id: string): Promise<boolean> {
    const query = `DELETE FROM ${table} WHERE id = $1`;
    const result = await this.query(query, [id]);
    return (result.rowCount || 0) > 0;
  }
}

// Export singleton instance
export const db = Database.getInstance();

// Export types for TypeScript
export type { DatabaseConfig };
export { PostgreSQLConnection, MySQLConnection, Database };

// Database initialization helper
export const initializeDatabase = async (): Promise<void> => {
  try {
    await db.initialize();
    console.log('🎉 Database initialized successfully');
  } catch (error) {
    console.error('💥 Database initialization failed:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🔄 Shutting down database connection...');
  await db.close();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🔄 Shutting down database connection...');
  await db.close();
  process.exit(0);
});
