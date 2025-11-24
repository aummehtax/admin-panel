import mongoose from "mongoose";
import {asyncHandler} from "../utils/asyncHandler.js"
import {apiError} from "../utils/apiError.js"
import { user } from "../models/user.model.js";

const registerUser = asyncHandler( async (req , res) => {

    const {fullName, email, password} = req.body
    
    if([fullName, email, password].some( (e) => e.trim() = "" ) ){
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
        roles,
        avatar: "", 
        

    })

})

export {registerUser}