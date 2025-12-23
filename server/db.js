import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  server: 'localhost\\SQLEXPRESS',
  database: 'BlogDatabase',
  driver: 'msnodesqlv8',
  options: {
    trustedConnection: true,
    encrypt: false,
    trustServerCertificate: true,
    enableArithAbort: true
  }
};

let pool = null;

export async function connectDB() {
  try {
    if (pool) {
      return pool;
    }
    
    pool = await sql.connect(config);
    console.log('✅ Đã kết nối SQL Server thành công!');
    return pool;
  } catch (err) {
    console.error('❌ Lỗi kết nối SQL Server:', err.message);
    throw err;
  }
}

export async function closeDB() {
  try {
    if (pool) {
      await pool.close();
      pool = null;
      console.log('Đã đóng kết nối SQL Server');
    }
  } catch (err) {
    console.error('Lỗi khi đóng kết nối:', err.message);
  }
}

export { sql };
