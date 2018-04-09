const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');


const port = process.env.PORT || 8080;

const app = express();
app.use(cors())
app.use(bodyParser.json());


const todosRoute = require('./api/todos');

app.use("/todos", todosRoute);

app.listen(port, function () {
    console.log(`Express server listening on port ${port}`);
});

module.exports = app; 