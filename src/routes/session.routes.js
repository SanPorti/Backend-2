import { Router } from "express";
import { userDao } from "../dao/mongo/user.dao.js";
// import { checkEmail } from "../middlewares/checkEmail.middleware.js";
import { createHash, isValidPassword } from "../utils/hashPassword.js";
import passport from "passport";
import { createToken, verifyToken } from "../utils/jwt.js";
import { passportCall } from "../middlewares/passport.middleware.js";
import { authorization } from "../middlewares/authorization.middleware.js";
import { SessionController } from "../controllers/session.controller.js";

const sessionController = new SessionController();
const router = Router();

router.post("/register", passportCall("register"), sessionController.register);

router.post("/login", passportCall("login"), sessionController.login);

router.get("/logout", sessionController.logout);

router.get("/current", passportCall("jwt"), authorization("user"), sessionController.current);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"],
    session: false,
  }),
  (req, res) => {
    res.status(200).json({ status: "success", payload: req.user });
  }
);

router.post("/auth", async (req, res) => {
  const { email, password } = req.body;
  const user = await userDao.getByEmail(email);
  // Valida si existe el usuario o si el password no es el mismo que el que tenemos registrado en la base de datos
  if (!user || !isValidPassword(password, user.password)) {
    return res.status(401).json({ status: "error", msg: "Email o contraseña no válido" });
  }
  // Generamos el token
  const token = createToken(user);
  // Guardamos el token en una cookie
  res.cookie("token", token, { httpOnly: true });
  res.status(200).json({ status: "success", payload: { user, token } });
});

export default router;
