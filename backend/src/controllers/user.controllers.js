import mongoose from "mongoose";
import {asyncHandler} from "../utils/asyncHandler.js"
import {apiError} from "../utils/apiError.js"
import { user } from "../models/user.model.js";
import {apiResponse} from "../utils/apiResponse.js"

const registerUser = asyncHandler( async (req , res) => {
    // console.log(req.body);

    const {fullName, email, password} = req.body
    
    if([fullName, email, password].some( (e) => e.trim() == "" ) ){
        throw new apiError(400, "All fields are required")
    }

    const users = await user.findOne({email})
    
    if(users){
        throw new apiError(400, "user is already exists")
    }


    const userCreated = await user.create({
        fullName,
        email,
        password,
    })

    if(!userCreated){
        throw new apiError(400, "something went wrong while registering user")
    }
        
    const createdUser = await user.findById(userCreated._id).select("-password -refreshToken")

    if(!createdUser){
        throw new apiError(400, "something went wrong while registering & select")
    }

    return res.status(201).json(
        new apiResponse(
            200,
            createdUser,
            "user registered successfully"
        )
    )

})

const loginUser = asyncHandler( async (req , res) => {
    const {email, password} = req.body

    await user.find(email)
})

export {registerUser, loginUser}