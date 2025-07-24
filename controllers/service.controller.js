import pool from "../config/db.js";
import { services } from "../utils/constants.js";

export const getServices = async (req, res, next) => {
  try {
    const sql =
      "SELECT service_code, service_name, service_icon, service_tariff FROM services ORDER BY updated_at DESC";
    const [serviceRows] = await pool.execute(sql);
    return res.status(200).json({
      status: 0,
      message: "Sukses",
      data: serviceRows,
    });
  } catch (error) {
    next(error);
  }
};

const createServices = async () => {
  try {
    services.forEach(async (service) => {
      const sql =
        "INSERT INTO services (service_code, service_name, service_icon, service_tariff) VALUES (?,?,?,?)";
      const [serviceRows] = await pool.execute(sql, [
        service.service_code,
        service.service_name,
        service.service_icon,
        service.service_tariff,
      ]);
    });
  } catch (error) {
    console.log(error);
  }
};

// createServices();
