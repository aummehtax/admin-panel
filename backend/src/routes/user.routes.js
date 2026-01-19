import { Router } from "express"; // Express Router → helps organize routes into separate files/modules for cleaner, modular code
import {
  changePassword,
  currentUser,
  dashboardData,
  deleteUser,
  editUser,
  loginUser,
  logoutUser,
  profile,
  profileUpdate,
  registerUser,
} from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyRole } from "../middlewares/verifyRole.js";
import {
  otpVerify,
  resetPassword,
  sendMail,
} from "../controllers/sendMail.controllers.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/forgot-password").post(sendMail);
router.route("/verify-otp").post(otpVerify);
router.route("/reset-password").post(resetPassword);

//secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/current-user").get(verifyJWT, currentUser);
router
  .route("/dashboard")
  .get(verifyJWT, verifyRole("admin", "moderator"), dashboardData);
router
  .route("/dashboard/edit/:userId")
  .patch(verifyJWT, verifyRole("admin", "moderator"), editUser);
router
  .route("/dashboard/delete/:userId")
  .delete(verifyJWT, verifyRole("admin", "moderator"), deleteUser);
router
  .route("/profile")
  .get(verifyJWT, verifyRole("admin", "moderator"), profile);
router
  .route("/profile/update")
  .post(verifyJWT, verifyRole("admin", "moderator"), profileUpdate);
router
  .route("/profile/changepassword")
  .post(verifyJWT, verifyRole("admin", "moderator"), changePassword);

export default router;
