import { createFeatureSelector, createSelector } from 'mini-rx-store';
import { TodoState } from './todo-reducer';

export const getTodoFeatureState = createFeatureSelector<TodoState>('todo');

export const getTodos = createSelector(
    getTodoFeatureState,
    state => state.todos
);

export const getSelectedTodoId = createSelector(
    getTodoFeatureState,
    state => state.selectedTodoId
)

export const getSelectedTodo = createSelector(
  getTodos,
  getSelectedTodoId,
  (todos, id) => todos.find(item => item.id === id)
)