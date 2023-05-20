import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "../pages/Todos/Todo.type";

const initialState = [] as Todo[];

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<Todo>) => {
        state.push(action.payload);
      },
      prepare: (title: string) => ({
        payload: {
          id: uuidv4(),
          title,
          completed: false,
        } as Todo,
      }),
    },

    updateTodo(state, action: PayloadAction<Todo>) {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index] = action.payload;
    },

    removeTodo(state, action: PayloadAction<string>) {
      const index = state.findIndex((todo) => todo.id === action.payload);
      state.splice(index, 1);
    },

    removeAllCompletedTodo(state, action: PayloadAction<boolean>) {
      if (action.payload) {
        const newTodos = state.filter((todo) => !todo.completed);
        return newTodos;
      }
    },

    setTodoStatus(
      state,
      action: PayloadAction<{ completed: boolean; id: string }>
    ) {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].completed = action.payload.completed;
    },
  },
});

export const { addTodo, updateTodo, removeTodo, removeAllCompletedTodo, setTodoStatus } =
  todoSlice.actions;
export default todoSlice.reducer;
