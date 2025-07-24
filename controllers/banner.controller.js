import pool from "../config/db.js";

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
