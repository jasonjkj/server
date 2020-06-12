const WebSocket = require('ws');
const server = new WebSocket.Server({port: 8080});
server.on('open', function open() {
    console.log('connected');
});

server.on('close', function close() {
    console.log('disconnected');
});

server.on('connection', function connection(ws, req) {
    const ip = req.connection.remoteAddress;       //发送请求的前端地址
    const port = req.connection.remotePort;        //请求的前端端口
    const clientName = ip + port;


    var count = 0
    setInterval(() => {
        ws.send('像前端返回计数器 count' + count++);
    }, 3000)


    ws.on('message', function incoming(message) {
        console.log('从客户端获取消息:消息内容: %s 来自: %s', message, clientName);
        // 广播消息给所有客户端
        server.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send("服务端收到信息" + "来自:" + clientName + "消息内容" + message);
            }
        });
    });

});


