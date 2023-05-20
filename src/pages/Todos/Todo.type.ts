export interface Todo {
  id: string;
  title: string;
  completed: boolean; 
}


export type AddTodoItem = (title: string) => void;
export type ToggleTodo = (todo: Todo) => void;
export type EditTodo = (todo: Todo) => void;