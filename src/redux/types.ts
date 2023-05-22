import { Todo } from "../pages/Todos/Todo.type";

export interface ITodoState {
  entities: Todo[],
  loading: boolean;
  error: any;
}

export interface FetchApiError {
  message: string;
};