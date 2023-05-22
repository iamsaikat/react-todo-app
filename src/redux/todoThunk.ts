import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axiosClient from "../services/axios-client";
import { Todo } from "../pages/Todos/Todo.type";
import { ITodoState } from "./types";

const initialState: ITodoState = {
  entities: [],
  loading: false,
  error: null,
};

export const getTodos = createAsyncThunk<Todo[]>("todo/alltodos", async (thunkAPI: any) => {
  try {
    const response = await axiosClient.get("/todos");
      return response.data.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const createTodo = createAsyncThunk<Todo, Todo>(
  "todo/create",
  async (data, thunkAPI: any) => {
    try {
      const response = await axiosClient.post("/todo", data);
      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const updateTodo = createAsyncThunk<Todo, Todo>(
  "todo/update",
  async (data: Todo, thunkAPI: any) => {
    try {
      const response = await axiosClient.put(`/todo/${data._id}`, data);
      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const removeTodo = createAsyncThunk<Todo[], { id: string }>(
  "todo/remove",
  async (id, thunkAPI: any) => {
    try {
      const response = await axiosClient.delete(`/todo/${id}`);
      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const removeAllCompletedTodos = createAsyncThunk<Todo[]>(
  "todo/removeAllCompleted",
  async (thunkAPI: any) => {
    try {
      const response = await axiosClient.delete(`/todos/completed`);
      return response.data.data;
    
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTodos.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTodos.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.entities = payload;
    });
    builder.addCase(getTodos.rejected, (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    });

    builder.addCase(createTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createTodo.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.entities = [...state.entities, payload];
    });
    builder.addCase(createTodo.rejected, (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    });

    builder.addCase(updateTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateTodo.fulfilled, (state, { payload }) => {
      state.loading = false;
      const index = state.entities.findIndex(
        (todo) => todo._id === payload._id
      );
      state.entities[index] = payload;
    });
    builder.addCase(updateTodo.rejected, (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    });

    builder.addCase(removeAllCompletedTodos.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(removeAllCompletedTodos.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.entities = payload;
    });
    builder.addCase(removeAllCompletedTodos.rejected, (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    });
  },
});

export default todoSlice.reducer;
