export const createTables = async (pool) => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL, 
        last_name VARCHAR(100) NOT NULL, 
        email VARCHAR(100) NOT NULL UNIQUE, 
        password VARCHAR(255) NOT NULL, 
        profile_image VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS banners (
        id BIGINT AUTO_INCREMENT PRIMARY KEY, 
        banner_name VARCHAR(100) NOT NULL, 
        banner_image VARCHAR(100) NOT NULL, 
        description TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS services (
        id BIGINT AUTO_INCREMENT PRIMARY KEY, 
        service_code  VARCHAR(100) NOT NULL UNIQUE, 
        service_name VARCHAR(100) NOT NULL,
        service_icon VARCHAR(255) NOT NULL,
        service_tariff BIGINT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS wallets (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        user_id BIGINT NOT NULL UNIQUE,
        name VARCHAR(100) NOT NULL, 
        balance BIGINT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS topups (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        wallet_id BIGINT NOT NULL,
        transaction_type ENUM('TOPUP') NOT NULL DEFAULT 'TOPUP',
        invoice_number VARCHAR(100) NOT NULL UNIQUE,
        total_amount BIGINT NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (wallet_id) REFERENCES wallets(id)
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS transactions (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        wallet_id BIGINT NOT NULL,
        service_code VARCHAR(100) NOT NULL,
        service_name VARCHAR(100) NOT NULL,
        invoice_number VARCHAR(100) NOT NULL UNIQUE,
        transaction_type ENUM('PAYMENT') NOT NULL DEFAULT 'PAYMENT',
        total_amount BIGINT NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (wallet_id) REFERENCES wallets(id)
      );
    `);

    console.log("✅ Semua tabel berhasil dibuat (jika belum ada).");
  } catch (error) {
    console.error("❌ Gagal membuat tabel:", error);
  }
};
