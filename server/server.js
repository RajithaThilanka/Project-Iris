const dotenv = require('dotenv');
const app = require('./app');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
// console.log(DB);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(con => console.log('DB Connection Successful'));
const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log('Listening to port ' + port);
});

let activeUsers = [];
const io = require('socket.io')(server, {
  pingTimeout: 1000,
  cors: {
    origin: 'http://localhost:3000',
  },
});

io.on('connection', socket => {
  console.log('connected to socket.io');
  socket.on('setup', userData => {
    socket.join(userData._id);
    console.log(userData._id);
    if (!activeUsers.some(user => user.userId === userData._id)) {
      activeUsers.push({ userId: userData._id, socketId: socket.id });
      console.log('New User Connected', activeUsers);
    }
    console.log('dfgdfsdf', activeUsers);
    socket.emit('connected');
    io.emit('active-users', activeUsers);
  });

  socket.on('disconnect', () => {
    // remove user from active users
    activeUsers = activeUsers.filter(user => user.socketId !== socket.id);
    console.log('User Disconnected', activeUsers);
    // send all active users to all users
    io.emit('active-users', activeUsers);
  });

  socket.on('join chat', room => {
    socket.join(room);
    console.log('User joined room ' + room);
  });

  socket.on('typing', room => socket.in(room).emit('typing'));
  socket.on('stop typing', room => socket.in(room).emit('stop typing'));
  socket.on('new message', newMessageRecieved => {
    let chat = newMessageRecieved.chat;
    if (!chat.users) return console.log('chat.users not defined');
    chat.users.forEach(user => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit('message recieved', newMessageRecieved);
    });
  });

  socket.on('new-con-request-sent', newConReq => {
    console.log('sent');
    let id = newConReq.receiverId._id;
    socket.in(id).emit('new-con-req-received', newConReq);
  });
  socket.off('setup', () => {
    console.log('USER DISCONNECTED');
    console.log('leave now', activeUsers);
    socket.leave(userData._id);
  });
});
process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! Shutting down....');
  server.close(() => {
    process.exit(1);
  });
});
