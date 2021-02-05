import { Todo } from './todo';
import { TodoActionTypes, TodoActions } from './todo-actions';

export interface TodoState {
  todos: Todo[];
  selectedTodoId: number
}

export const initialState: TodoState = {
  todos: [],
  selectedTodoId: undefined
};

export function todoReducer(
  state: TodoState = initialState,
  action: TodoActions
): TodoState {
  switch (action.type) {
    case TodoActionTypes.AddTodo:
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    case TodoActionTypes.RemoveTodo:
      return {
        ...state,
        todos: state.todos.filter(item => item.id !== action.payload)
      };
    case TodoActionTypes.SelectTodo:
      return {
        ...state,
        selectedTodoId: action.payload
      };
    case TodoActionTypes.LoadTodosSuccess:
      return {
        ...state,
        todos: action.payload
      }  
    default:
      return state;
  }
}
