const validateMiddleware = (schema) => (req, res, next) => {
  try {
    const validatedData = schema.parse(req.body);
    req.body = validatedData;
    next();
  } catch (error) {
    return res.status(400).json({
      message: "Validation error",
      errors: error.message
    });
  }
};
module.exports = validateMiddleware ;