import { Action } from "mini-rx-store";
import { Todo } from "./todo";

export enum TodoActionTypes {
  AddTodo = "ADD_TODO",
  RemoveTodo = "REMOVE_TODO",
  SelectTodo = "SELECT_TODO",
  LoadTodos = "LOAD_TODOS",
  LoadTodosSuccess = "LOAD_TODOS_SUCCESS",
  LoadTodosFail = "LOAD_TODOS_FAIL"
}

export class AddTodo implements Action {
  readonly type = TodoActionTypes.AddTodo;
  constructor(public payload: Todo) {}
}

export class RemoveTodo implements Action {
  readonly type = TodoActionTypes.RemoveTodo;
  constructor(public payload: number) {}
}

export class SelectTodo implements Action {
  readonly type = TodoActionTypes.SelectTodo;
  constructor(public payload: number) {}
}

export class LoadTodos implements Action {
  readonly type = TodoActionTypes.LoadTodos;
}

export class LoadTodosSuccess implements Action {
  readonly type = TodoActionTypes.LoadTodosSuccess;
  constructor(public payload: Todo[]) {}
}

export class LoadTodosFail implements Action {
  readonly type = TodoActionTypes.LoadTodosFail;
  constructor(public payload: Error) {}
}

// Union the valid types
export type TodoActions =
  | AddTodo
  | RemoveTodo
  | SelectTodo
  | LoadTodos
  | LoadTodosSuccess
  | LoadTodosFail;
