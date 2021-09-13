import exp from "constants";
import { RequestHandler, text } from "express";
import { Todo } from "../models/todo";
const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
    const text = req.body.text as string;
    const newTodo = new Todo(Math.random().toString(), text);

    TODOS.push(newTodo);    
    res.status(201).json({message: 'Created the todo.', createdTodo: newTodo});
};

export const getTodos: RequestHandler = (req, res, next) => {
    res.json({todos: TODOS});
};

export const updateTodo: RequestHandler<{id: string}> = (req, res, next) => {
    const todoId = req.params.id;
    const updatedText = req.body.text as string;

    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
    if(todoIndex < 0) {
        throw new Error('Could not find todo!');
    }
    TODOS[todoIndex] = new Todo(todoId, updatedText);
    res.status(201).json({message: 'Updated!', updatedTodo: TODOS[todoIndex]});
};

export const deleteTodo: RequestHandler<{id: string}> = (req, res, next) => {
    const todoId = req.params.id;
    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
    if(todoIndex < 0) {
        throw new Error('Could not find todo');
    }
    const deletedTodo = TODOS[todoIndex];
    TODOS.splice(todoIndex, 1);
    res.json({message: "Deleted!", deletedTodo: deletedTodo});
}