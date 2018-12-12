var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var port = process.env.PORT || 8080;
var app = express();


var router = express.Router();
var rr = express.Router();

app.use(cors())
app.use(bodyParser.json());

app.use("/todos", router);
app.use("/random", rr);

rr.get('/', (req, res) => {
    throw new Error("BROKEN");
    //res.sendStatus(403);
});

app.listen(port, function () {
    console.log(`Express server listening on port ${port}`);
});

const inMemoryTodoDB = [
    { id: 0, title: 'Learn Kubernetes', complete: true },
    { id: 1, title: 'Learn Draft', complete: true },
    { id: 2, title: 'Learn Helm', complete: false },
    { id: 3, title: 'Remote debugging is awesome!', complete: false },
];

router.get('/', (req, res) => {
    console.log(req.method + " " + req.url)
    res.status(200)
        .json(inMemoryTodoDB);
});

router.get('/:id', (req, res) => {
    console.log(req.method + " " + req.url)

    const { id } = req.params;
    const todoItem = inMemoryTodoDB.filter((todo) => todo.id == id)[0];

    if (!todoItem) {
        res.sendStatus(404);
    }
    else {
        res.status(200).json(todoItem);
    }
});

router.post('/', (req, res) => {
    console.log(req.method + " " + req.url)

    const { title, complete } = req.body;
    var lastId;
    var last = inMemoryTodoDB[inMemoryTodoDB.length - 1];
    if (last == undefined) {
        lastId = -1;
    }
    //const id = last.id + 1;
    const id = lastId + 1;
    const newTodo = { id, title, complete };

    inMemoryTodoDB.push(newTodo);

    res.status(201)
        .location(`/api/todos/${id}`)
        .json(newTodo);

});

router.put('/:id', (req, res) => {
    console.log(req.method + " " + req.url)

    const { id, title, complete } = req.body;
    const newTodo = { id, title, complete };

    const exists = inMemoryTodoDB.filter((todo) => todo.id == id).length > 0;
    if (!exists) {
        res.sendStatus(404);
        return;
    }

    inMemoryTodoDB.map((todo) => {
        if (todo.id == id) {
            todo.complete = complete;
        }
    });

    res.sendStatus(200);
});

router.delete('/:id', (req, res) => {
    console.log(req.method + " " + req.url)

    const { id } = req.params;
    const todoItem = inMemoryTodoDB.filter((todo) => todo.id == id)[0];

    if (!todoItem) {
        res.sendStatus(404);
        return;
    }
    inMemoryTodoDB.splice(inMemoryTodoDB.indexOf((todo) => todo.id == id), 1);
    res.sendStatus(200);
});



module.exports = app;
module.exports = router;
