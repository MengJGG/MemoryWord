import { Request, Response, NextFunction } from 'express';
import { RegisterRequest } from '../types/request';

// 验证注册信息的中间件
export function validateRegister(
    req: RegisterRequest,
    res: Response,
    next: NextFunction
) {
    const { username, email, encryptedPassword, permission } = req.body;

    // 检查必要字段是否存在
    if (!username || !email || !encryptedPassword || !permission) {
        return res.status(400).json({
            success: false,
            message: '必要字段缺失'
        });
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: '邮箱格式不正确'
        });
    }

    // 验证用户名长度和格式
    if (username.length < 3 || username.length > 20) {
        return res.status(400).json({
            success: false,
            message: '用户名长度必须在3-20个字符之间'
        });
    }

    // 检查是否包含危险字符
    const dangerousChars = /[<>{}()'"`;]/;
    if (dangerousChars.test(username) || dangerousChars.test(email)) {
        return res.status(400).json({
            success: false,
            message: '包含非法字符'
        });
    }

    // 验证权限值
    const validPermissions = ['admin', 'user', 'vip', 'guest'];
    if (!validPermissions.includes(permission)) {
        return res.status(400).json({
            success: false,
            message: '无效的权限值'
        });
    }

    // 验证通过，继续下一步
    next();
};