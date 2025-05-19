export interface User {
    // 基本信息
    id?: string;  // ---后端生成
    username: string;
    encryptedPassword: string;  // 加密后的密码
    email: string; // 邮箱
    permission?: string; // 权限 // admin, user, vip, guest  ---后端生成
    // 学习信息
    favoriteWords?: number[]; // 收藏的单词 保存的单词id  ---后端生成
    uselessWords?: number[]; // 不常用的单词  ---后端生成
    wrongWords?: number[]; // 错误的单词  ---后端生成
    LearningTime?: number; // 已经学习时间  ---后端生成
    // 其他信息
    createTime?: number; // 创建时间  ---后端生成
}