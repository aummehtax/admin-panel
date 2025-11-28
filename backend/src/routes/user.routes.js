import { Router } from "express"; // Express Router → helps organize routes into separate files/modules for cleaner, modular code
import { currentUser, loginUser, logoutUser, registerUser } from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyRole } from "../middlewares/verifyRole.js";

const router = Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)  

//secured routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/current-user").get(verifyJWT, currentUser)
router.route("/dashboard").post(verifyJWT, verifyRole("admin" , "moderator"))


export default router;
