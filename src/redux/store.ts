
import { configureStore } from "@reduxjs/toolkit";
// import todoThunk if you want to use we API otherwise use todoSlice
import todosReducer from "./todoThunk";


export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;