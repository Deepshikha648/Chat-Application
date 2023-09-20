// const http =require('http');
// const express =require('express');
// const path = require('path')
// const {Server} = require("socket.io");
// const app = express();
// const server = http.createServer(app);
// const io = new Server(server);
// // socket.io
// io.on('connection',(socket) =>{
//     console.log("a new user has connected",socket.id);
//     socket.on('message', (msg) => {
//         socket.broadcast.emit('message', msg)
//     });
// });

// app.use(express.static(path.join("./public")));
// app.get("/",(req,res)=>{
//     return res.sendFile("/public/index.html")
// });
// server.listen(9000, ()=> console.log(`server started at port : 9000`)) 

const express = require('express')
const app = express()
const http = require('http').createServer(app)

const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Socket 
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})