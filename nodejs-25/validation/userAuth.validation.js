const { check } = require("express-validator");

exports.userRegistationValidation = [
    check("name")
        .trim()
        .notEmpty()
        .withMessage("Name is valid name")
        .isLength({ min: 5 })
        .withMessage("name miniman 5 crater")
        .isLength({ max: 15 })
        .withMessage("Name is maxmim 15 cracter"),

    check("email")
        .trim()
        .notEmpty()
        .withMessage("email is valid name")
        .isEmail()
        .withMessage("This not a email"),

    check("password")
        .trim()
        .notEmpty()
        .withMessage("password is missing")
        .isLength({ min: 6 })
        .withMessage("password is 6 carter")
        .isLength({ max: 15 })
        .withMessage("password is maxmim 15 cracter"),

    check("dob")
        .trim()
        .notEmpty()
        .withMessage("dob is missing")
        .isISO8601()
        .toDate()
        .withMessage("not a valid date")
];

exports.userLoginValidation = [
    check("email")
        .trim()
        .notEmpty()
        .withMessage("email is valid name")
        .isEmail()
        .withMessage("This not a email"),

    check("password")
        .trim()
        .notEmpty()
        .withMessage("password is missing")
        .isLength({ min: 6 })
        .withMessage("password is 6 carter")
        .isLength({ max: 15 })
        .withMessage("password is maxmim 15 cracter")
]