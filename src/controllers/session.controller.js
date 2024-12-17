
import { UserDto } from "../dto/user.dto.js";
import { createToken } from "../utils/jwt.js";

export class SessionController {

    async register (req, res) {
        try {
            res.status(201).json({ status: "success", msg: "Usuario Registrado" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
        }
    }

    async login (req, res) {
        try {
            // Generamos el token
            const token = createToken(req.user);

            // Guardamos el token en una cookie
            res.cookie("token", token, { httpOnly: true });
            const userFormat = new UserDto (req.user);
            res.status(200).json({ status: "success", payload: userFormat });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
        }
    }

    async logout (req, res) {
        try {
            req.session.destroy();
            res.status(200).json({ status: "success", msg: "Session cerrada" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
        }
    }

    async current (req, res) {
        try {
            const user = await userDao.getById(req.user.id);
            res.status(200).json({ status: "success", payload: user });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
        }
    }

}