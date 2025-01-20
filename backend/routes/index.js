const express = require("express");
const userRouter = require("./user");
const accountRoute=require("./account")
const router = express.Router();



router.use("/user", userRouter);
router.use("/account",accountRoute)

module.exports = router;
