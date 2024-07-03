// server.js
const express = require('express');
const { createServer } = require('http');
const cors = require('cors');
const connectDb = require('./db')
const todoroutes = require('./routes/todo')
const socketIo = require('socket.io');



const app = express();
const server = createServer(app);

const io = socketIo(server )

connectDb()

const corsOptions = {
  origin: 'http://localhost:3000/', // your React app's origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // enable set cookie
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions))
app.use(express.json())


app.use('/api' , todoroutes )

let users = [] 

// //{
//   id: id,
//   username : xyz
// }


io.on('connection' , (socket) =>{
  console.log('new connection client with id ' , socket.id)

  socket.on('join', (username) =>{
    users.push({id: socket.id , username : username} )

    io.emit('users' , users)
  })

  socket.on('message' , (message) =>{
    io.emit('message' , message)
  })

  socket.on('typing' , (username) => {
    socket.broadcast.emit('typing' , username)
  })


  socket.on('disconnect' , ()=>{
    users = users.filter((i) => i.id !== socket.id)

    io.emit('users' , users)

    console.log('user disconnected' , socket.id)
  })




})

server.listen(3001, () => {
  console.log('server running at http://localhost:3001');
});
