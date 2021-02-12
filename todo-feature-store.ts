import {
  createFeatureSelector,
  createSelector,
  FeatureStore,
  Action
} from "mini-rx-store";
import { Todo } from "./todo";
import { EMPTY, Observable } from "rxjs";
import { catchError, mergeMap, tap } from "rxjs/operators";
import { ajax } from "rxjs/ajax";

export interface TodoState {
  todos: Todo[];
  selectedTodoId: number;
}

const initialState: TodoState = {
  todos: [],
  selectedTodoId: 2
};

// Selectors
const getTodoFeatureState = createFeatureSelector<TodoState>(); // Omit the feature name!

const getTodos = createSelector(
  getTodoFeatureState,
  state => {
    return state.todos
  });

const getSelectedTodoId = createSelector(
  getTodoFeatureState,
  state => state.selectedTodoId
);

const getSelectedTodo = createSelector(
  getTodos,
  getSelectedTodoId,
  (todos, id) => {
    return todos.find(item => item.id === id)
  });

export class TodoFeatureStore extends FeatureStore<TodoState> {
  todoState$: Observable<TodoState> = this.select(getTodoFeatureState);
  todos$: Observable<Todo[]> = this.select(getTodos);
  selectedTodo$: Observable<Todo> = this.select(getSelectedTodo);

  // Effects
  loadTodos = this.effect<void>(payload$ => {
    return payload$.pipe(
      mergeMap(() =>
        ajax("https://jsonplaceholder.typicode.com/todos").pipe(
          tap(res => this.setState({todos: res.response})),
          catchError(err => EMPTY)
        )
      )
    );
  });

  // loadTodoById = this.effect<number>(payload$ => {
  //   return payload$.pipe(
  //     mergeMap((id) =>
  //       ajax("https://jsonplaceholder.typicode.com/todos?id=" + id).pipe(
  //         tap(res => this.setState({todos: res.response})),
  //         catchError(err => EMPTY)
  //       )
  //     )
  //   );
  // });

  loadTodoById = this.effect<number>(
    mergeMap((id) =>
      ajax("https://jsonplaceholder.typicode.com/todos?id=" + id).pipe(
        tap(res => this.setState({todos: res.response})),
        catchError(err => EMPTY)
      )
    )
  );

  constructor() {
    super("todoFs", initialState); // Feature name 'todos' is provided here already...

    this.loadTodos();
    // this.loadTodoById(5);

    this.addTodo({id: 2, title: 'MyTodo'})


    // this.undo(todoRemoveAction);
  }

  addTodo(todo: Todo) {
    this.setState(state => ({
      todos: [...state.todos, todo]
    }), 'addTodo');
  }

  selectTodo(id: number) {
    this.setState({ selectedTodoId: id }, 'selectTodo');
  }

  removeTodo(id: number): Action {
    return this.setState(state => ({
      todos: state.todos.filter(item => item.id !== id)
    }), 'removeTodo')
  }

  testRemoveAndUndo() {
    const todoRemoveAction: Action = this.removeTodo(2);
    this.undo(todoRemoveAction);
  }
}
