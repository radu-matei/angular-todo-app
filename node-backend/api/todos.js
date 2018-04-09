const express = require('express');
const router = express.Router();

const inMemoryTodoDB = [
    { id: 0, title: 'Learn Kubernetes', complete: true },
    { id: 1, title: 'Learn Draft', complete: true },
    { id: 2, title: 'Learn Helm', complete: false },
];

router.get('/', (req, res) => {
    console.log(req)
    res.status(200)
        .json(inMemoryTodoDB);
});

router.get('/:id', (req, res) => {
    console.log(req)

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
    console.log(req)

    const { title, complete } = req.body;

    const lastId = inMemoryTodoDB[inMemoryTodoDB.length - 1].id;
    const id = lastId + 1;

    const newTodo = { id, title, complete };

    inMemoryTodoDB.push(newTodo);

    res.status(201)
        .location(`/api/todos/${id}`)
        .json(newTodo);

});

router.put('/:id', (req, res) => {
    console.log(req)

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
    console.log(req)

    const { id } = req.params;

    const todoItem = inMemoryTodoDB.filter((todo) => todo.id == id)[0];

    if (!todoItem) {
        res.sendStatus(404);
        return;
    }
    inMemoryTodoDB.splice(inMemoryTodoDB.indexOf((todo) => todo.id == id), 1);

    res.sendStatus(200);

});


module.exports = router;