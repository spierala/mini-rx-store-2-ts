import { action, payload } from 'ts-action';
import { Todo } from './todo';

export const addTodo = action('ADD_TODO', payload<Todo>());
export const loadTodos = action('LOAD_TODOS');
export const loadTodosSuccess = action('LOAD_TODOS_SUCCESS', payload<Todo[]>());
export const loadTodosFail = action('LOAD_TODOS_FAIL', payload<Error>());