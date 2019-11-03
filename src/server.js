const express = require("express");
const mongoose = require("mongoose");
const corts = require("cors");

const routes = require("./routes");

const app = express();

mongoose.connect("mongodb+srv://brener:brener123@omnistack-sm6zk.mongodb.net/omnistack?retryWrites=true&w=majority",{
 useNewUrlParser: true,
 useUnifiedTopology: true,
});

// req.query = Acessar query params
// req.params = Acessar route params (para edição e delete)
// req.body = Acessar corpo da requisição (para criação , edição)

app.use(cors());
app.use(express.json());
app.use(routes);


app.listen(3333);
