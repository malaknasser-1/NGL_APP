import jwt from 'jsonwebtoken';
import { toMs } from './path-to-time-util.js'; // أكملي مسار الملف المناسب لدالة toMs

export function generateToken(payload) {
    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: toMs(1, 'hours') }
    );
}