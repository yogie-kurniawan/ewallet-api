import { getInvoiceNumber } from "../utils/invoiceNumber.js";
import pool from "../config/db.js";
import BadRequestError from "../errors/BadRequestError.js";

export const topUp = async (req, res, next) => {
  try {
    const { top_up_amount } = req.body;
    const { email, id: userId } = req.user;
    const invoiceNumber = await getInvoiceNumber("topup", "topups");
    console.log(invoiceNumber);

    if (isNaN(top_up_amount) || top_up_amount < 0) {
      throw new BadRequestError(
        "Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0"
      );
    }

    // Check if the user's wallet exists
    const walletSql = "SELECT * FROM wallets WHERE user_id = ?";
    const [walletRows] = await pool.execute(walletSql, [userId]);

    if (walletRows.length === 0) {
      throw new BadRequestError("Wallet tidak ditemukan");
    }
    const { id: walletid } = walletRows[0];
    let { balance } = walletRows[0];

    const createTopUpSql = `INSERT INTO topups (wallet_id, invoice_number, transaction_type, total_amount)
        VALUES (?, ?, ?, ?)`;

    const [topUpResult] = await pool.execute(createTopUpSql, [
      walletid,
      invoiceNumber,
      "TOPUP",
      top_up_amount,
    ]);

    balance += top_up_amount;
    const updateWalletSql = `UPDATE wallets SET balance = ? WHERE user_id= ?`;

    await pool.execute(updateWalletSql, [balance, userId]);

    const [updatedWallet] = await pool.execute(
      "SELECT balance FROM wallets WHERE user_id = ?",
      [userId]
    );

    return res.status(200).json({
      status: 0,
      message: "Sukses",
      data: {
        balance: updatedWallet[0].balance,
      },
    });
  } catch (error) {
    next(error);
  }
};
