const express = require('express')
const { Server } = require('socket.io')

const app = express()
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => console.log(`Server Up on port ${PORT}`))
const io = new Server(server)

let log = []

app.use(express.static('./src/public'))

io.on('connection', socket => {
    socket.on('message', data => {
        log.push(data)
        io.emit('log', log)
    })
    socket.on('registered', data => {
        socket.broadcast.emit('newUser', data)
        socket.emit('log', log)
    })
})