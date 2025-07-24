import bcrypt from "bcryptjs";
import pool from "../config/db.js";
import jwt from "jsonwebtoken";

import { BadRequestError, UnautherizedError } from "../errors/index.js";
import { generateToken, setToken } from "../utils/manageToken.js";

// Register
export const register = async (req, res, next) => {
  try {
    const { email, first_name, last_name, password } = req.body;

    if (!email || !first_name || !last_name || !password) {
      throw new BadRequestError("Semua field wajib diisi");
    }

    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new BadRequestError("Parameter email tidak sesuai format");
    }

    // Check if the password length is not greater than 8 characters
    if (password.length < 8) {
      throw new BadRequestError("Password minimal 8 karakter");
    }

    // Check if the first name and last name length are not greater than 100 characters
    if (first_name.length > 100) {
      throw new BadRequestError(
        "First Name tidak boleh lebih dari 100 karakter"
      );
    }

    if (last_name.length > 100) {
      throw new BadRequestError(
        "Last Name tidak boleh lebih dari 100 karakter"
      );
    }

    // Hash user's password
    const hashedPassword = await bcrypt.hash(password, 10);

    const createUserSql = `INSERT INTO users (email, first_name, last_name, password)
      VALUES (?, ?, ?, ?)`;

    const [userResult] = await pool.execute(createUserSql, [
      email,
      first_name,
      last_name,
      hashedPassword,
    ]);

    const userId = userResult.insertId;

    const createUserWalletSql = `INSERT INTO wallets (user_id, name, balance) VALUES (?, ?, ?)`;

    await pool.execute(createUserWalletSql, [
      userId,
      first_name + " " + last_name,
      0,
    ]);

    return res.status(200).json({
      status: 0,
      message: "Registrasi berhasil silahkan login",
      data: null,
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      throw new BadRequestError("Email sudah terdaftar");
    }
    next(error);
  }
};

// Login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      throw new BadRequestError("Parameter email tidak sesuai format");
    }

    const sql = `SELECT * FROM users WHERE email = ?`;
    const [rows] = await pool.execute(sql, [email]);

    if (!rows[0]) {
      throw new UnautherizedError("Username atau password salah", 103);
    }

    const {
      id,
      email: userEmail,
      first_name,
      last_name,
      password: userPassword,
      profile_image,
    } = rows[0];

    const isPasswordCorrect = await bcrypt.compare(
      password,
      userPassword || ""
    );

    if (!isPasswordCorrect) {
      throw new UnautherizedError("Username atau password salah");
    }

    const user = { id, email, first_name, last_name, profile_image };

    const token = generateToken(user);
    setToken(token, res);

    return res.status(200).json({
      status: 0,
      message: "Login Sukses",
      data: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Logout
export const logout = async (req, res, next) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "Strict",
  });

  return res.status(200).json({
    status: 0,
    message: "Berhasil logout",
    data: null,
  });
};
