export interface User {
    // 基本信息
    id: string;
    username: string;
    password: string;  // 加密后的密码
    permission: string; // 权限 // admin, user, vip, guest
    // 学习信息
    favoriteWords?: number[]; // 收藏的单词  // 保存的单词id
    uselessWords?: number[]; // 不常用的单词
    wrongWords?: number[]; // 错误的单词
    LearningTime?: number; // 已经学习时间
    // 其他信息
    createTime?: number; // 创建时间
    
}