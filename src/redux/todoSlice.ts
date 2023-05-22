import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "../pages/Todos/Todo.type";
import { ITodoState } from "./types";

const initialState: ITodoState = {
  entities: [],
  loading: false,
  error: null
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<Todo>) => {
        state.entities.push(action.payload);
      },
      prepare: (title: string) => ({
        payload: {
          _id: uuidv4(),
          title,
          completed: false,
        } as Todo,
      }),
    },

    updateTodo(state, action: PayloadAction<Todo>) {
      const index = state.entities.findIndex(
        (todo) => todo._id === action.payload._id
      );
      state.entities[index] = action.payload;
    },

    removeTodo(state, action: PayloadAction<string>) {
      const index = state.entities.findIndex(
        (todo) => todo._id === action.payload
      );
      state.entities.splice(index, 1);
    },

    removeAllCompletedTodos(state) {
      const newTodos = state.entities.filter((todo) => !todo.completed);
      state.entities = newTodos;
    },

    setTodoStatus(
      state,
      action: PayloadAction<{ completed: boolean; id: string }>
    ) {
      const index = state.entities.findIndex(
        (todo) => todo._id === action.payload.id
      );
      state.entities[index].completed = action.payload.completed;
    },
  },
});

export const {
  addTodo,
  updateTodo,
  removeTodo,
  removeAllCompletedTodos,
  setTodoStatus,
} = todoSlice.actions;
export default todoSlice.reducer;
