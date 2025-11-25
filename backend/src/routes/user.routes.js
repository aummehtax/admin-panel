import { Router } from "express"; // Express Router → helps organize routes into separate files/modules for cleaner, modular code
import { loginUser, registerUser } from "../controllers/user.controllers.js";

const router = Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

//secured routes


export default router;
