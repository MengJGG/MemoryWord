import { Router } from 'express';
import countRoutes from './count';
import userRoutes from './user';

const router: Router = Router();

// 挂载子路由，可统一添加前缀（如 /api/v1）
router.use('/api/v1/count', countRoutes);
router.use('/api/v1/user', userRoutes);

export default router;