// server.js
const express = require('express');
const { createServer } = require('http');
const cors = require('cors');
const connectDb = require('./db')
const todoroutes = require('./routes/todo')


const app = express();
const server = createServer(app);

connectDb()

const corsOptions = {
  origin: 'http://localhost:3000/backendtodo', // your React app's origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // enable set cookie
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions))
app.use(express.json())


app.use('/api' , todoroutes )


// io.on('connection', (socket) => {
 

//   socket.on('sendMessage', (message) => {
   
//     io.emit('receiveMessage', message);
//   });

//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });

server.listen(3001, () => {
  console.log('server running at http://localhost:3001');
});
