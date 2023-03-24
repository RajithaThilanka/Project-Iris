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
let vidUsers = [];
const io = require('socket.io')(server, {
  pingTimeout: 15 * 60 * 1000,
  cors: {
    origin: 'http://localhost:3000',
  },
});

io.on('connection', socket => {
  console.log('connected to socket.io');

  socket.on('vidsetup', userData => {
    vidUsers = vidUsers.filter(user => user.userId !== userData._id);
    vidUsers.push({ userId: userData._id, socketId: socket.id });
    console.log(vidUsers);
    console.log('New User Connected', vidUsers);

    socket.emit('me', socket.id);
    io.emit('vidme', vidUsers);
  });

  socket.on('setup', userData => {
    socket.join(userData._id);

    if (!activeUsers.some(user => user.userId === userData._id)) {
      activeUsers.push({ userId: userData._id, socketId: socket.id });
    } else {
      const u = activeUsers.find(usr => usr.userId === userData._id);
      u.socketId = socket.id;
    }

    socket.emit('connected');
    io.emit('active-users', activeUsers);
  });

  socket.on('disconnect', () => {
    // remove user from active users

    console.log(socket.id);
    console.log(activeUsers.filter(user => user.socketId !== socket.id));
    activeUsers = activeUsers.filter(user => user.socketId !== socket.id);
    vidUsers = vidUsers.filter(user => user.socketId !== socket.id);
    console.log('User Disconnected', activeUsers);
    // send all active users to all users
    io.emit('active-users', activeUsers);
    io.emit('vidme', vidUsers);
    socket.broadcast.emit('callEnded');
  });

  socket.on('join chat', room => {
    socket.join(room);
    console.log('User joined room ' + room);
  });

  socket.on('callUser', ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit('callUser', { signal: signalData, from, name });
  });

  socket.on('answerCall', data => {
    io.to(data.to).emit('callAccepted', data.signal);
  });
  socket.on('endCall', id => {
    io.to(id).emit('endCall');
  });
  socket.on('seen', id => {
    socket.in(id).emit('message-seen');
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
    let id = newConReq.receiverId._id;
    socket.in(id).emit('new-con-req-received', newConReq);
  });

  socket.on('new-friend-request-sent', newConReq => {
    let id = newConReq.receiverId._id;
    socket.in(id).emit('new-friend-req-received', newConReq);
  });

  socket.on('new-con-request-accepted', newConReq => {
    let id = newConReq.senderId._id;

    socket.in(id).emit('new-con-req-accepted', newConReq);
  });
  socket.on('new-friend-request-accepted', newConReq => {
    let id = newConReq.senderId._id;

    socket.in(id).emit('new-friend-req-accepted', newConReq);
  });
  socket.on('new-date-request-sent', newConReq => {
    console.log(newConReq);
    let id = newConReq.receiverId._id;
    socket.in(id).emit('new-date-req-received', newConReq);
  });
  socket.on('new-date-request-accepted', newConReq => {
    let id = newConReq.senderId._id;
    console.log(id);
    socket.in(id).emit('new-date-req-accepted', newConReq);
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
