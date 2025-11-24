import { Router } from "express"; // Express Router → helps organize routes into separate files/modules for cleaner, modular code
import { registerUser } from "../controllers/user.controllers.js";

const router = Router();

router.route("/register").post(registerUser)


//secured routes


export default router;
