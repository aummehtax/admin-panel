import { user } from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new apiError(400, "unauthorized request");
    }

    const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const userData = await user
      .findById(decodeToken._id)
      .select("-password -refreshToken");

    if (!userData) {
      throw new apiError(400, "invalid access token");
    }

    req.user = userData;

    next();
  } catch (error) {
    throw new apiError(400, error?.message || "invalid access token");
  }
});
