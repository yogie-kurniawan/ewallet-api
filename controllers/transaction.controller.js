import pool from "../config/db.js";
import { getInvoiceNumber } from "../utils/invoiceNumber.js";
import { BadRequestError } from "../errors/index.js";

export const transaction = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { service_code: serviceCode } = req.body;
    const invoiceNumber = await getInvoiceNumber("transaction", "transactions");

    if (!serviceCode) {
      throw new BadRequestError("Service ataus Layanan tidak ditemukan");
    }

    // Check if the service exists
    const serviceSql = "SELECT * FROM services WHERE service_code = ?";
    const [serviceRows] = await pool.execute(serviceSql, [serviceCode]);
    if (serviceRows.length === 0) {
      throw new BadRequestError("Service atau Layanan tidak ditemukan");
    }

    // Check if the user's wallet exists
    const walletSql = "SELECT * FROM wallets WHERE user_id = ?";
    const [walletRows] = await pool.execute(walletSql, [userId]);
    if (walletRows.length === 0) {
      throw new BadRequestError("Wallet tidak ditemukan");
    }

    const { id: walletid } = walletRows[0];
    let { balance } = walletRows[0];
    const { service_code, service_name, service_tariff } = serviceRows[0];

    if (service_tariff > balance) {
      throw new BadRequestError("Balance tidak mencukupi");
    }

    // Create transaction
    const createTransactionSql = `INSERT INTO transactions (wallet_id, service_code, service_name, invoice_number, transaction_type, total_amount)
        VALUES (?, ?, ?, ?, ?, ?)`;

    const [transactionResult] = await pool.execute(createTransactionSql, [
      walletid,
      service_code,
      service_name,
      invoiceNumber,
      "PAYMENT",
      service_tariff,
    ]);

    balance = balance - service_tariff;

    // Update balance
    const updateWalletSql = `UPDATE wallets SET balance = ? WHERE user_id= ?`;

    await pool.execute(updateWalletSql, [balance, userId]);

    // Get the transaction
    if (transactionResult.affectedRows > 0) {
      const transactionSql =
        "SELECT invoice_number, service_code, service_name, transaction_type, total_amount, created_at as created_on FROM transactions WHERE id = ?";

      const [transactionRows] = await pool.execute(transactionSql, [
        transactionResult.insertId,
      ]);
      const newTransaction = transactionRows[0];

      return res.status(200).json({
        status: 0,
        message: "Transaksi berhasil",
        data: newTransaction,
      });
    } else {
      throw new Error("Gagal menyimpan transaksi.");
    }
  } catch (error) {
    next(error);
  }
};
