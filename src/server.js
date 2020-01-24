const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path'); 

const socketio = require('socket.io');
const http = require('http');

const routes = require("./routes");

const app = express();
const server = http.Server(app);
const io = socketio(server);


mongoose.connect("mongodb+srv://brener:brener123@omnistack-sm6zk.mongodb.net/omnistack?retryWrites=true&w=majority",{
 useNewUrlParser: true,
 useUnifiedTopology: true,
});

// req.query = Acessar query params
// req.params = Acessar route params (para edição e delete)
// req.body = Acessar corpo da requisição (para criação , edição)


//para uso em produção, utilizar o Redis que armazena os dados. Por enquanto, a cada reload no server, todos os users serão apagados 
const connectedUsers = {};

io.on('connection', socket => {
    const {user_id} = socket.handshake.query;
    connectedUsers[user_id] = socket.id;
});

app.use((req,res,next) => {
    req.io = io;
    req.connectedUsers = connectedUsers; 

    return next();
});

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3333);
