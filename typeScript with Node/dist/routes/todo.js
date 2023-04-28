"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let todos = [];
const router = (0, express_1.Router)();
router.get("/", (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post("/todo", (req, res, next) => {
    const body = req.body;
    const newTodo = {
        id: new Date().toISOString(),
        text: body.text
    };
    todos.push(newTodo);
    res.status(200).json({ todos: todos });
});
router.put(`/todo/:todoId`, (req, res, next) => {
    const body = req.body;
    const params = req.params;
    const tid = params.todoId;
    const todoIndex = todos.findIndex(todoItem => todoItem.id === tid);
    if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
        return res.status(200).json({ messge: "updated" });
    }
});
router.delete(`/todo/:todoId`, (req, res, next) => {
    const params = req.params;
    todos = todos.filter(todoItem => todoItem.id != params.todoId);
    return res.status(200).json({ message: "Deleted" });
});
exports.default = router;
