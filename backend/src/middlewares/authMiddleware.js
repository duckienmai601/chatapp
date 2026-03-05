import jwt  from 'jsonwebtoken';
import User from '../models/User.js';

export const protectedRoute = async (req, res, next) => {
    try {
        // lấy token từ header
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
        if (!token) {
            return res.status(401).json({ message: 'không tìm thấy access token.' });
        }

        // xác nhận token hợp lệ
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedUser) => {
            if (err) {
                return res.status(403).json({ message: 'Access token không hợp lệ hoặc đã hết hạn.' });
            }

            // Tìm user 
            const user = await User.findById(decodedUser.userId).select('-hashedPassword');
            if (!user) {
                return res.status(404).json({ message: 'Người dùng không tồn tại.' });
            }

            // trả về req.user
            req.user = user;
            next(); 
        });


    } catch (error) {
        console.error('Lỗi khi xác minh JWT trong authMiddleware:', error);
        return res.status(500).json({ message: 'Lỗi máy chủ. Vui lòng thử lại sau.' });
    }
};

