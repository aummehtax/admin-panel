const errorHandler = (err, req, res, next) => {
  const statuscode = err.statuscode || 500;
  const message = err.message || "Internal server error";

  return res.status(statuscode).json({
    success: false,
    message: message,
    errors: err.errors || [],
    //no stack here! not needed coz i can see it in console so, no need to send in frontend
  });
};

export { errorHandler };
