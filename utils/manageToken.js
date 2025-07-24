import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const { id, email, first_name, last_name, profile_image } = user;
  const token = jwt.sign(
    { id, email, first_name, last_name, profile_image },
    process.env.JWT_SECRET,
    {
      expiresIn: "12h",
    }
  );
  return token;
};

export const setToken = (token, res) => {
  res.cookie("token", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, //MS
    httpOnly: true,
    sameSite: "strict",
  });
  return token;
};

export const validateToken = async (token) => {
  if (!token) return false;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
};
