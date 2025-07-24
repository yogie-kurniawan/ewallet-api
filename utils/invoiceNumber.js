import pool from "../config/db.js";

export const generateInvoiceNumber = (type) => {
  const random4Digit = Math.floor(1000 + Math.random() * 9000); // hasil: 1000–9999
  return `${type}-${Date.now()}-${random4Digit}`;
};

export const getInvoiceNumber = async (type, table) => {
  let isExist = true;
  let invoice = "";

  do {
    invoice = generateInvoiceNumber(type);
    const sql = `SELECT * FROM ${table} WHERE invoice_number = ?`;
    const [rows] = await pool.execute(sql, [invoice]);
    if (rows.length < 1) {
      isExist = false;
    }
  } while (isExist);
  return invoice;
};
