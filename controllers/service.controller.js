import pool from "../config/db.js";

const services = [
  {
    service_code: "PAJAK",
    service_name: "Pajak PBB",
    service_icon: "https://nutech-integrasi.app/dummy.jpg",
    service_tariff: 40000,
  },
  {
    service_code: "PLN",
    service_name: "Listrik",
    service_icon: "https://nutech-integrasi.app/dummy.jpg",
    service_tariff: 10000,
  },
  {
    service_code: "PDAM",
    service_name: "PDAM Berlangganan",
    service_icon: "https://nutech-integrasi.app/dummy.jpg",
    service_tariff: 40000,
  },
  {
    service_code: "PULSA",
    service_name: "Pulsa",
    service_icon: "https://nutech-integrasi.app/dummy.jpg",
    service_tariff: 40000,
  },
  {
    service_code: "PGN",
    service_name: "PGN Berlangganan",
    service_icon: "https://nutech-integrasi.app/dummy.jpg",
    service_tariff: 50000,
  },
  {
    service_code: "MUSIK",
    service_name: "Musik Berlangganan",
    service_icon: "https://nutech-integrasi.app/dummy.jpg",
    service_tariff: 50000,
  },
  {
    service_code: "TV",
    service_name: "TV Berlangganan",
    service_icon: "https://nutech-integrasi.app/dummy.jpg",
    service_tariff: 50000,
  },
  {
    service_code: "PAKET_DATA",
    service_name: "Paket data",
    service_icon: "https://nutech-integrasi.app/dummy.jpg",
    service_tariff: 50000,
  },
  {
    service_code: "VOUCHER_GAME",
    service_name: "Voucher Game",
    service_icon: "https://nutech-integrasi.app/dummy.jpg",
    service_tariff: 100000,
  },
  {
    service_code: "VOUCHER_MAKANAN",
    service_name: "Voucher Makanan",
    service_icon: "https://nutech-integrasi.app/dummy.jpg",
    service_tariff: 100000,
  },
  {
    service_code: "QURBAN",
    service_name: "Qurban",
    service_icon: "https://nutech-integrasi.app/dummy.jpg",
    service_tariff: 200000,
  },
  {
    service_code: "ZAKAT",
    service_name: "Zakat",
    service_icon: "https://nutech-integrasi.app/dummy.jpg",
    service_tariff: 300000,
  },
];

const createServices = async () => {
  try {
    services.forEach(async (s) => {
      const sql =
        "INSERT INTO services (service_code, service_name, service_icon, service_tariff) VALUES (?,?,?,?)";
      const [serviceRows] = await pool.execute(sql, [
        s.service_code,
        s.service_name,
        s.service_icon,
        s.service_tariff,
      ]);
    });
  } catch (error) {
    console.log(error);
  }
};

// createServices();

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
