import { apiError } from "../utils/apiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"

export const verifyRole = (...allowedRoles) => {
  return asyncHandler(async (req, res, next) => {
    if(!req.user){
        throw new apiError(400, "unauthorized request")
    }

    if(!allowedRoles.includes(req.user.roles)){
        throw new apiError(400, "You don't have permission to access this resource")
    }

    next()
  })   
}