const { Router } = require("express");
const {
  Signup,
  Login,
  addToHistory,
  getUserHistory,
} = require("../Controller/UserController");

const router = Router();

router.post("/login", Login);
router.post("/signup", Signup);
router.post("/add_user_activities", addToHistory);
router.get("/get_user_activities", getUserHistory);

module.exports = router;
