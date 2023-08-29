const { Router } = require("express");
const { createUser, loginUser, renewToken } = require("../controllers/auth");
const { check } = require("express-validator");
const { fieldsValidator } = require("../middlewares/fieldsValidator");
const { validateJWT } = require("../middlewares/validateJWT");
const router = Router();

// AUTHENTICATION
// HOST + /API/AUTH

router.post(
  "/new",
  [
    check("name", "The name is required").not().isEmpty(),
    check("email", "The email is required").isEmail(),
    check("password", "The password must be larger than 5 characters").isLength(
      {
        min: 6,
      }
    ),
    fieldsValidator,
  ],
  createUser
);

router.post(
  "/",
  [
    check("email", "The email is required").isEmail(),
    check("password", "The password must be larger than 5 characters").isLength(
      {
        min: 6,
      }
    ),
    fieldsValidator,
  ],
  loginUser
);

router.get("/renew", validateJWT, renewToken);

module.exports = router;
