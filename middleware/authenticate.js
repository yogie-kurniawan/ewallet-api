import UnautherizedError from "../errors/UnautherizedError.js";
import { validateToken } from "../utils/manageToken.js";

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw new UnautherizedError("Token tidak valid atau kadaluwarsa");
    }
    const user = await validateToken(token);
    if (!user) {
      throw new UnautherizedError("Token tidak valid atau kadaluwarsa");
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default authenticate;
