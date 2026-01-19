import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { user } from "../models/user.model.js";
import { apiResponse } from "../utils/apiResponse.js";
import { cookieOptions } from "../utils/cookieOptions.js";

const generateRefreshAndAccessToken = async (userID) => {
  try {
    const USER = await user.findById(userID);

    const accessToken = USER.generateAccessToken();
    const refreshToken = USER.generateRefreshToken();

    USER.refreshToken = refreshToken;
    await USER.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new apiError(
      500,
      "something went wrong while generating refreshToken and accessToken",
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  if ([fullName, email, password].some((e) => e.trim() == "")) {
    throw new apiError(400, "All fields are required");
  }

  const users = await user.findOne({ email });

  if (users) {
    throw new apiError(400, "user is already exists");
  }

  const avatar = `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(fullName)}`;

  const userCreated = await user.create({
    fullName,
    email,
    password,
    avatar,
    refreshToken: "",
  });

  if (!userCreated) {
    throw new apiError(400, "something went wrong while registering user");
  }

  const createdUser = await user
    .findById(userCreated._id)
    .select("-password -refreshToken");

  if (!createdUser) {
    throw new apiError(400, "something went wrong while registering & select");
  }

  return res
    .status(201)
    .json(new apiResponse(200, createdUser, "user registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new apiError(400, "email & password is required");
  }

  const userExist = await user.findOne({ email });

  if (!userExist) {
    throw new apiError(400, "user not found");
  }

  const isPasswordValid = await userExist.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new apiError(400, "password is not valid");
  }

  const { accessToken, refreshToken } = await generateRefreshAndAccessToken(
    userExist._id,
  );

  const loggedInUser = await user
    .findById(userExist._id)
    .select("-password -refreshToken");

  // console.log(loggedInUser);

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new apiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "user logged in successfully",
      ),
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await user.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1, //removed field from document
      },
    },
    {
      new: true,
    },
  );

  return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new apiResponse(200, {}, "user logged out"));
});

const currentUser = asyncHandler(async (req, res) => {
  const currentUser = await user
    .findById(req.user._id)
    .select("-password -refreshToken");

  if (!currentUser) {
    throw new apiError(400, "current user not found");
  }

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        { user: currentUser },
        "current user fetched successfully",
      ),
    );
});

const dashboardData = asyncHandler(async (req, res) => {
  const allUser = await user.find().select("-password -refreshToken");

  if (!allUser) {
    throw new apiError(400, "users not found");
  }

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        { allUser, userIdPanel: req.user._id },
        "successfully fetched",
      ),
    );
});

const editUser = asyncHandler(async (req, res) => {
  const { editRoles } = req.body;
  const { userId } = req.params;

  // console.log("userId : ", userId, editRoles);

  if (req.user.roles !== "admin") {
    throw new apiError(400, "Only admins can edit user roles");
  }

  const USER = await user.findById(userId);

  if (!USER) {
    throw new apiError(404, "user not found");
  }

  USER.roles = editRoles;
  await USER.save();

  const allUser = await user.find().select("-password -refreshToken");

  if (!allUser) {
    throw new apiError(400, "users not found");
  }

  return res
    .status(200)
    .json(new apiResponse(200, { allUser }, "updated successfully"));
});

const deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const userExist = await user.findById(userId);

  if (!userExist) {
    throw new apiError(404, "user not found");
  }

  if (userExist.roles === "admin") {
    throw new apiError(404, "Cannot delete admin users");
  }

  if (userExist._id.toString() === req.user._id.toString()) {
    throw new apiError(404, "Cannot delete your own account");
  }

  await userExist.deleteOne();

  const allUser = await user.find().select("-password -refreshToken");

  return res
    .status(200)
    .json(new apiResponse(200, { allUser }, "user deleted successfully"));
});

const profile = asyncHandler(async (req, res) => {
  const userId = req.user._id.toString();

  if (!userId) {
    throw new apiError(400, "something went wrong");
  }

  const existingUser = await user
    .findById(userId)
    .select("-password -refreshToken");

  if (!existingUser) {
    throw new apiError(404, "user not found");
  }

  return res
    .status(200)
    .json(new apiResponse(200, existingUser, "profile fetched successfully"));
});

const profileUpdate = asyncHandler(async (req, res) => {
  const { cloudinaryUrl, inputFullname, inputEmail } = req.body;
  const userId = req.user._id;

  console.log(req.body);

  if (!cloudinaryUrl || !inputFullname || !inputEmail) {
    throw new apiError(400, "something went wrong");
  }

  const existingUser = await user.findById(userId);

  if (!existingUser) {
    throw new apiError(404, "user not found");
  }

  existingUser.fullName = inputFullname;
  existingUser.email = inputEmail;
  existingUser.avatar = cloudinaryUrl;
  await existingUser.save({ validateBeforeSave: true });

  return res
    .status(200)
    .json(new apiResponse(200, {}, "profile updated successfully"));
});

const changePassword = asyncHandler(async (req, res) => {
  const { newPass, currentPass } = req.body;

  if (!newPass || !currentPass) {
    throw new apiError(404, "something went wrong");
  }

  const existingUser = await user.findById(req.user._id);

  if (!existingUser) {
    throw new apiError(404, "user not found");
  }

  const isPasswordValid = await existingUser.isPasswordCorrect(currentPass);

  if (!isPasswordValid) {
    throw new apiError(400, "password is not valid");
  }

  existingUser.password = newPass;
  await existingUser.save();

  return res
    .status(200)
    .json(new apiResponse(200, {}, "Password changed successfully"));
});
export {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
  dashboardData,
  editUser,
  deleteUser,
  profile,
  profileUpdate,
  changePassword,
};
