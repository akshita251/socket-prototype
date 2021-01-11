const { http } = require('../server')
const io = require('socket.io')(http)

function listenToSocket(socket) {
    _validationSockets.add(socket);
    console.log(`>>>>>>> new connection to ${socket.id}`);
    console.log(">>>>>socket.conn.transport.name>>>>", socket.conn.transport.name);
    console.log(">>>>>>> Total Sockets", _validationSockets.size);

    //triggers when sender emits 'test-send'
    socket.on("test-send", async (msg, ack)=>{

        //emit to msg to sender
        socket.to(socket.id).emit("test-recieve", msg)

    })

    //on disconnection of socket
    socket.on("disconnect", () => {
        _validationSockets.delete(socket);
        console.log(">>>>>>> disconnect");
        console.log(">>>>>Disconnected socket transport type:", socket.conn.transport.name);
        console.log(">>>>>>> Total Sockets", _validationSockets.size);
    });
}

var _validationSockets = new Set()
io.on('connection', function (socket) {
    listenToSocket(socket);
})

module.exports = io
