import express, { Router, Response } from 'express';
import { RegisterRequest } from '../types/request';
import { validateRegister } from '../middleware/auth';

const users: Router = express.Router();

// POST /api/users/register
users.post('/Register', validateRegister, async (req: RegisterRequest, res: Response) => {
    // 验证已通过，可以进行注册逻辑
    const { username, email, encryptedPassword, permission } = req.body;
    
    // TODO: 实现注册逻辑
    
    res.status(200).json({
        success: true,
        message: '注册成功'
    });
});

users.post('/Login', validateRegister, async (req: RegisterRequest, res: Response) => {
    // 验证已通过，可以进行登录逻辑
    const { username, encryptedPassword } = req.body;
    
    // TODO: 实现登录逻辑
    
    res.status(200).json({
        success: true,
        message: '登录成功'
    });
});

export default users;
