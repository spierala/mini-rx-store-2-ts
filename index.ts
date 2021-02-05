// Import stylesheets
import './style.css';

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;

import { configureStore, Store, createFeatureStore, FeatureStore, UndoExtension, LoggerExtension } from 'mini-rx-store';
import { initialState,  todoReducer, TodoState } from './todo-reducer';
import { AddTodo,  LoadTodos,    RemoveTodo, SelectTodo } from './todo-actions';
import {Observable} from 'rxjs';
import { getSelectedTodo, getTodoFeatureState, getTodos } from './todo-selectors';
import { Todo } from './todo';
import { loadEffect } from './todo-effects';
import { addTodo } from './ts-todo-actions';
import { TodoFeatureStore } from './todo-feature-store';

const store: Store = configureStore({
//  reducers: {
//    todo: todoReducer
//  }
  extensions: [new LoggerExtension(), new UndoExtension()]
});

// store.feature('todo', todoReducer);

// store.select(state => state).subscribe(state => console.log('global state', state));

// // const addTodo = {
// //     type: 'ADD_TODO', 
// //     payload: {id: '1', name: 'Use Redux'} // Optional Payload
// // }

// // export function addTodo(payload) {
// //   return {
// //     type: 'ADD_TODO',
// //     payload
// //   }
// // }

// // store.dispatch(addTodo({id: '1', title: 'Use Redux'}));

// // Use Class-based Action Creators (TypeScript)
// store.dispatch(new AddTodo({id: 2, title: 'Use Redux'}));

// // Ts Action
// store.dispatch(addTodo({id: 3, title: 'Use Redux'}))

// // Selectors
// const todoState$: Observable<TodoState> = store.select(getTodoFeatureState);
// todoState$.subscribe(console.log);

// const todos$: Observable<Todo[]> = store.select(getTodos);
// todos$.subscribe(console.log);

// const selectedTodo$: Observable<Todo> = store.select(getSelectedTodo);
// selectedTodo$.subscribe(todo => console.log('selected', todo));

// store.dispatch(new SelectTodo(1))


// const fs: FeatureStore<TodoState> = createFeatureStore<TodoState>('user', initialState);
const todoFs = new TodoFeatureStore();

todoFs.selectedTodo$.subscribe(todo => console.log('fs selected todo', todo));
// todoFs.selectTodo(2);
// todoFs.loadTodoById(2);

// store.effect(loadEffect);
// store.dispatch(new LoadTodos())