// This is the code of the MemoryWordServer.
import express from 'express';
import router from './routes';
import { config } from './config';
import { RequestLogger } from './middleware/requestLogger';
import cors from 'cors';

// 声明响应式对象
const app = express();

// 使用中间件
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(RequestLogger);

// 路由
app.use(router);


// 启动服务
app.listen(config.port, () => {
    console.log('Server is running on port', config.port);
});