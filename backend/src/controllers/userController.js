import { uploadImageFromBuffer } from "../middlewares/uploadMiddleware.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

export const authMe = async (req, res) => {
    try {
        const user = req.user; // Lấy thông tin user từ middleware
        return res.status(200).json({ user });
    } catch (error) {
        console.error('Lỗi khi gọi authMe:', error);
        return res.status(500).json({ message: 'Lỗi máy chủ. Vui lòng thử lại sau.' });
    }
};

export const searchUserByUsername = async (req, res) => {
    try {
        const { username } = req.query;

        if (!username || username.trim() === "") {
            return res.status(400).json({ message: "Cần cung cấp username trong query" });
        }

        const user = await User.findOne({ username }).select(
            "_id displayName username avatarUrl"
        );

        return res.status(200).json({ user });
    } catch (error) {
        console.error("Lỗi xảy ra khi searchUserByUsername", error);
        return res.status(500).json({ message: "Lỗi hệ thống" });
    }
};


export const uploadAvatar = async (req, res) => {
    try {
        const file = req.file;
        const userId = req.user._id;

        if (!file) {
            return res.status(400).json({ message: "No file upload" });
        }

        const result = await uploadImageFromBuffer(file.buffer);

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                avatarUrl: result.secure_url,
                avatarId: result.public_id,
            }, {
            new: true,
        }
        ).select("avatarUrl");

        if (!updatedUser.avatarUrl) {
            return res.status(400).json({ message: "Avatar trả về null" });
        }

        return res.status(200).json({ avatarUrl: updatedUser.avatarUrl });
    } catch (error) {
        console.error("Lỗi xảy ra khi upload avatar", error);
        return res.status(500).json({ message: "Lỗi hệ thống" });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const { displayName, username, email, phone, bio } = req.body;

        // Kiểm tra username trùng
        if (username) {
            const existingUser = await User.findOne({ username, _id: { $ne: userId } });
            if (existingUser) {
                return res.status(409).json({ message: "Username đã được sử dụng" });
            }
        }

        // Kiểm tra email trùng
        if (email) {
            const existingEmail = await User.findOne({ email, _id: { $ne: userId } });
            if (existingEmail) {
                return res.status(409).json({ message: "Email đã được sử dụng" });
            }
        }

        const updateData = {};
        if (displayName !== undefined) updateData.displayName = displayName;
        if (username !== undefined) updateData.username = username;
        if (email !== undefined) updateData.email = email;
        if (phone !== undefined) updateData.phone = phone;
        if (bio !== undefined) updateData.bio = bio;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true }
        ).select("-hashedPassword");

        return res.status(200).json({ user: updatedUser });
    } catch (error) {
        console.error("Lỗi xảy ra khi updateProfile", error);
        return res.status(500).json({ message: "Lỗi hệ thống" });
    }
};

export const changePassword = async (req, res) => {
    try {
        const userId = req.user._id;
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: "Cần cung cấp mật khẩu hiện tại và mật khẩu mới" });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ message: "Mật khẩu mới phải có ít nhất 6 ký tự" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Không tìm thấy người dùng" });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.hashedPassword);
        if (!isMatch) {
            return res.status(401).json({ message: "Mật khẩu hiện tại không chính xác" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(userId, { hashedPassword });

        return res.status(200).json({ message: "Đổi mật khẩu thành công" });
    } catch (error) {
        console.error("Lỗi xảy ra khi changePassword", error);
        return res.status(500).json({ message: "Lỗi hệ thống" });
    }
};