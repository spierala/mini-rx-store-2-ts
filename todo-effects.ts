import { actions$, ofType } from "mini-rx-store";
import { mergeMap, map, catchError } from "rxjs/operators";
import {
  LoadTodosFail,
  LoadTodosSuccess,
  TodoActionTypes
} from "./todo-actions";
import { ajax } from "rxjs/ajax";

export const loadEffect = actions$.pipe(
  ofType(TodoActionTypes.LoadTodos),
  mergeMap(() =>
    ajax("https://jsonplaceholder.typicode.com/todos").pipe(
      map(res => new LoadTodosSuccess(res.response)),
      catchError(err => of(new LoadTodosFail(err)))
    )
  )
);
