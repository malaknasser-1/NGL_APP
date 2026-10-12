import jwt from 'jsonwebtoken';
import { toMs } from './path-to-time-util.js'; // أكملي مسار الملف المناسب لدالة toMs
import { env } from '../../../lib/config/env.js';

export function generateToken(payload) {
    return jwt.sign(
        payload,
        env.jwt.secret,
        { expiresIn: toMs(1, 'hours') }
    );
}