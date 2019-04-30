let Redis = require('ioredis')
let redis = new Redis()

function GoBang(socket) {
    /**
     * 加入棋局
     * msg: { name: 名字, status: 身份(1: 白棋 2: 黑旗 3: 旁观) }
     */
    socket.on('join', function(msg) {
        if (msg.status === 1 || msg.status === 2) {
            redis.set(msg.status, msg.name)
            socket.broadcast.emit('join', msg)
        }
        redis.set(msg.name, {
            id: socket.id,
            status: msg.status
        })
    })
    // 离开棋局
    socket.on('leave', function(msg) {
        if (msg.status === 1 || msg.status === 2) {
            redis.del(msg.status)
            socket.broadcast.emit('leave', msg)
        }
        redis.del(name)
    })
    /**
     * 落子
     * msg: { name: 姓名, status: 身份, coord: 落子位置 }
     */
    socket.on('moveChess', function(msg) {
        redis.get(msg.status, function(err, data) {
            if (data === msg.name) {
                socket.broadcast.emit('moveChess', msg)
            }
        })
    })
    // 创建用户
    socket.on('createUser', function(name) {
        redis.get(name, function(err, data) {
            if (data) {
                socket.emit('createUser', {
                    isSuccess: false,
                    message: '该昵称已存在'
                })
            } else {
                socket.emit('createUser', {
                    isSuccess: true,
                    message: name
                })
                redis.set(name, socket)
            }
        })
    })
}

module.exports = GoBang