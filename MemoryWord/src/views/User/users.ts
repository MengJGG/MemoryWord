import express from 'express';
import fs from 'fs';
import path from 'path';
import { nanoid } from 'nanoid';
import type { User } from '@/types';

const router = express.Router();

// 接口路径和方法
router.post('/users', (req, res) => {
    const newUser: User = {
        id: nanoid(8),
        username: req.body.username,
        encryptedPassword: req.body.encryptedPassword,
        email: req.body.email,
        permission: req.body.permission || "user",
        favoriteWords: req.body.favoriteWords || [],
        uselessWords: req.body.uselessWords || [],
        wrongWords: req.body.wrongWords || [],
        LearningTime: req.body.LearningTime || 1,
        createTime: new Date().getTime()
    };

    // 读取现有的用户数据
    fs.readFile(path.join(__dirname, '../../public/mock/users.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }

        let users: User[] = JSON.parse(data);

        // 追加新用户
        users.push(newUser);

        // 将更新后的用户数据写回文件
        fs.writeFile(path.join(__dirname, '../../public/mock/users.json'), JSON.stringify(users, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }

            res.status(201).send('User created successfully');
        });
    });
});

export default router;
