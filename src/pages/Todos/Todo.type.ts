export interface Todo {
  _id: string;
  title: string;
  completed: boolean; 
}


export type AddTodoItem = (todo: any) => void;
export type ToggleTodo = (todo: Todo) => void;
export type EditTodo = (todo: Todo) => void;