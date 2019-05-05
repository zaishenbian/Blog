let Redis = require('ioredis')
let redis = new Redis()

let currentSide = 2

function GoBang(socket) {
    /**
     * 加入棋局
     * msg: { name: 名字, status: 身份(1: 白棋 2: 黑旗 3: 旁观) }
     */
    socket.on('join', function(msg) {
        if (msg.status === 1 || msg.status === 2) {
            redis.set(msg.status, msg.name)
            socket.broadcast.emit('join', msg)
            socket.emit('join', msg)
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
            socket.emit('leave', msg)
        }
        redis.del(msg.name)
    })
    /**
     * 落子
     * msg: { name: 姓名, status: 身份, coord: 落子位置 }
     */
    socket.on('moveChess', async function(msg) {
        let result = await Promise.all([redis.get(1), redis.get(2)])
        if (result[0] !== null && result[1] !== null && msg.status === currentSide) {
            socket.broadcast.emit('moveChess', msg)
            socket.emit('moveChess', msg)
            if (currentSide === 2) {
                currentSide = 1
            } else if (currentSide === 1) {
                currentSide = 2
            }
        }
    })
    // 重新开始
    socket.on('restart', function() {
        socket.broadcast.emit('restart')
        socket.emit('restart')
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