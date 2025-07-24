import { BadRequestError } from "../errors/index.js";
import pool from "../config/db.js";
import path from "path";
import fs from "fs";

export const getMe = (req, res, next) => {
  try {
    const { email, first_name, last_name, profile_image } = req.user;

    return res.status(200).json({
      status: 0,
      message: "Sukses",
      data: {
        email,
        first_name,
        last_name,
        profile_image,
      },
    });
  } catch (error) {
    next(error); // biar dikirim ke error handler Express
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { first_name, last_name } = req.body;
    const { id } = req.user;
    if (!first_name || !last_name) {
      throw new BadRequestError("Semua field wajib diisi");
    }
    const updateSql = `UPDATE user SET first_name = ?, last_name = ? WHERE id = ?`;
    const [result] = await pool.execute(updateSql, [first_name, last_name, id]);

    const selectSql = `SELECT id, email, first_name, last_name, profile_image FROM user WHERE id = ?`;
    const [rows] = await pool.execute(selectSql, [id]);

    const user = rows[0];

    return res.status(200).json({
      status: 0,
      message: "Update Pofile berhasil",
      data: {
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        profile_image: user.profile_image,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfileImage = async (req, res, next) => {
  try {
    const file = req.file;
    const { id } = req.user;
    if (!file) {
      throw new BadRequestError("File wajib diisi");
    }
    const profileImage = `${process.env.APP_URL}/uploads/${file.filename}`;

    // Get the current profile image
    const [profileImageRows] = await pool.execute(
      "SELECT profile_image FROM user WHERE id = ?",
      [id]
    );

    // validate file type
    const oldImageUrl = profileImageRows[0]?.profile_image;

    // ceck if old image exists
    if (oldImageUrl) {
      const oldFileName = oldImageUrl.split("/uploads/")[1]; // ambil nama file dari URL
      const oldFilePath = path.join("public", "uploads", oldFileName);

      // Delete previous file
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }

    // Update profile image
    const updateSql = `UPDATE user SET profile_image = ? WHERE id = ?`;
    await pool.execute(updateSql, [profileImage, id]);

    // Get user data
    const selectSql = `SELECT id, email, first_name, last_name, profile_image FROM user WHERE id = ?`;
    const [rows] = await pool.execute(selectSql, [id]);

    const user = rows[0];

    return res.status(200).json({
      status: 0,
      message: "Update Profile Image berhasil",
      data: {
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        profile_image: profileImage,
      },
    });
  } catch (error) {
    next(error);
  }
};
