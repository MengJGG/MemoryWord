// This is the code of the MemoryWordServer.

const express = require('express');

// 声明响应式对象
const app = express();

// 以下就是api请求接口
app.get('/', (req, res) => {
    res.send('Hello Fddd!');
});

app.get('/user', (req, res) => {
    res.send('User data');
})

app.all('/api', (req, res) => {
    res.send('API data');
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});