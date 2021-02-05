import { on, reducer } from 'ts-action';
import { Todo } from './todo';
import { addTodo } from './ts-todo-actions';

export interface TodoState {
  todos: Todo[];
}

export const initialState: TodoState = {
  todos: [],
};

export const todoReducer = reducer(
    initialState,
    on(addTodo, (state, {payload}) => ({...state, todos: [...state.todos, payload]}))
);