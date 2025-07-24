import pool from "../config/db.js";
import { banners } from "../utils/constants.js";

export const getBanners = async (req, res, next) => {
  try {
    const sql =
      "SELECT banner_name, banner_image, description FROM banners ORDER BY updated_at DESC";
    const [bannerRows] = await pool.execute(sql);
    return res.status(200).json({
      status: 0,
      message: "Sukses",
      data: bannerRows,
    });
  } catch (error) {
    next(error);
  }
};

const createBanners = async () => {
  try {
    banners.forEach(async (banner) => {
      const sql =
        "INSERT INTO banners (banner_name, banner_image, description) VALUES (?,?,?)";
      await pool.execute(sql, [
        banner.banner_name,
        banner.banner_image,
        banner.description,
      ]);
    });
  } catch (error) {
    console.log(error);
  }
};

// createBanners();
