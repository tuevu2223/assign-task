export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (err) {
    const errorList = err.issues || err.errors;
    if (errorList && Array.isArray(errorList)) {
      return res.status(400).json({
        success: false,
        message: errorList[0].message,
        errors: errorList.map((e) => ({
          path: e.path ? e.path.join(".") : "",
          message: e.message,
        })),
      });
    }
    return res.status(400).json({
      success: false,
      message: err.message || "Validation Error",
    });
  }
};
