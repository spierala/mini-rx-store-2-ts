import { actions$ } from "mini-rx-store";
import { mergeMap, map, catchError } from "rxjs/operators";
import { ofType } from "ts-action-operators";
import { ajax } from "rxjs/ajax";
import { of } from "rxjs";
import { loadTodos, loadTodosFail, loadTodosSuccess } from "./ts-todo-actions";

export const loadEffect = actions$.pipe(
  ofType(loadTodos),
  mergeMap(() =>
    ajax("https://jsonplaceholder.typicode.com/todos").pipe(
      map(res => loadTodosSuccess(res.response)),
      catchError(err => of(loadTodosFail(err)))
    )
  )
);
