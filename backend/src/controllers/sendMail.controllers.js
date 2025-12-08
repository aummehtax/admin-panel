import { asyncHandler } from "../utils/asyncHandler.js";
import nodemailer from "nodemailer"
import {user} from "../models/user.model.js"
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import crypto from 'crypto';


const sendMail = asyncHandler( async (req, res) => {
    
    
    
    const {email} = req.body
    
    const existedUser = await user.findOne({email}).select("-password -refreshToken")
    
    if(!existedUser){
        throw new apiError(400, "You don't have an account")
    }

    const otp = crypto.randomInt(100000, 1000000)
    existedUser.otp = otp.toString()
    existedUser.otpExpiry = Date.now() + 5 * 60 * 1000
    await existedUser.save()
    
    const transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: `${process.env.EMAIL_USER}`,
            pass: `${process.env.EMAIL_PASS}`,
        },
    })

    const info = await transport.sendMail({
        from: `${process.env.EMAIL_USER}`,
        to: `${existedUser.email}`,
        subject: "OTP",
        text: `${otp}`, // plain‑text body
        // html: "<b>Hello world?</b>", // HTML body
    });

     console.log("Message sent: %s", info.messageId); 
    

    return res
    .status(200)
    .json(
        new apiResponse(
            200,
            {user: existedUser},
            "OTP sent successfully to your email"
        )
    )



})

const otpVerify = asyncHandler ( async (req , res) => {
    const {userId, otp} = req.body

    const existedUser = await user.findById(userId)

    // console.log("Frontend OTP:", otp, typeof otp);
// console.log("Stored OTP:", existedUser.otp, typeof existedUser.otp);


    if(!existedUser){
        throw new apiError(400 , "User not found")
    }

    if(existedUser.otp !== otp.toString()){
        throw new apiError(400 , "Invalid OTP")
    }

    if(existedUser.otpExpiry < Date.now()){
        throw new apiError(400, "OTP expired")
    }

    existedUser.otp = null
    existedUser.otpExpiry = null
    await existedUser.save()

    return res.status(200).json(
        new apiResponse(
            200,
            {userId: existedUser._id},
            "OTP Verified Successfully"
        )
    )
})

const resetPassword = asyncHandler (async (req, res) => {

    const {newPass, userId} = req.body
    console.log("newPass : ", newPass, "userId : ",userId);

    const UserExist = await user.findById(userId)

    if(!UserExist){
        throw new apiError(400, "user not found")
    }

    UserExist.password = newPass //update password it automatic convert hash when it goes to "pre-save" hook
    await UserExist.save()

    return res
    .status(200)
    .json(
        new apiResponse(
            200,
            {},
            "Password reset successfully"
        )
    )
    
})

export { sendMail, otpVerify, resetPassword }