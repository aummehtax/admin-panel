import mongoose from "mongoose";
import {asyncHandler} from "../utils/asyncHandler.js"

const registerUser = asyncHandler( async (req , res) => {

    const {fullName, email, password} = req.body
    
    

})

export {registerUser}