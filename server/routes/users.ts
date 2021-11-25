import express from "express";
// contoller
import {
  userInfo,
  userUpdate,
  registerController,
  loginController,
  logoutController,
  refreshTokenController,
} from "../controller/user";
// middleware
import verifyToken from "../middleware/auth";

const router = express.Router();

router.get("/", userInfo);
router.patch("/", userUpdate);

// Register
router.post("/register", registerController);

// Login
router.post("/login", loginController);

// refresh Token route
router.get("/refreshtoken", refreshTokenController);

// logout route
router.get("/logout", logoutController);

// router.get('/', async (req, res) => {
//     const users = await User.find({});
//     console.log(users);
//     res.json(users);
// })

// router.get('/profile', auth , (req, res) =>{
//     res.send('profile')
// })

export default router;
