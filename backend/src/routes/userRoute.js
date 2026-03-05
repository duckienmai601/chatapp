import { authMe, searchUserByUsername, uploadAvatar, updateProfile, changePassword } from '../controllers/userController.js';
import { upload } from "../middlewares/uploadMiddleware.js";

import express from 'express';

const router = express.Router();

router.get("/me", authMe);
router.get("/search", searchUserByUsername);
router.post("/uploadAvatar", upload.single("file"), uploadAvatar);
router.put("/profile", updateProfile);
router.put("/change-password", changePassword);

export default router;