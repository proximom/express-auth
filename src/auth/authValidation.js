const { body, validationResult } = require("express-validator");

exports.validateRegister = [
  body("name").notEmpty(),
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: "Validation error", data: errors.array() });
    }
    next();
  },
];

exports.validateLogin = [
  body("email").isEmail(),
  body("password").exists(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: "Validation error", data: errors.array() });
    }
    next();
  },
];
