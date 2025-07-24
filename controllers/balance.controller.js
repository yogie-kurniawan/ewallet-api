import pool from "../config/db.js";
import { generateInvoiceNumber } from "../utils/invoiceNumber.js";
import { BadRequestError } from "../errors/index.js";



export const getBalance = async (req, res, next) => {
  const { id } = req.user;
  try {
    const sql = "SELECT balance FROM wallets WHERE user_id = ?";
    const [walletRows] = await pool.execute(sql, [id]);
    const wallet = walletRows[0];
    return res.status(200).json({
      status: 0,
      message: "Sukses",
      data: {
        balance: wallet.balance,
      },
    });
  } catch (error) {
    next(error);
  }
};
