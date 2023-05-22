import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { Box, Container, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Todo } from "./Todo.type";
import { useState, useEffect } from "react";
import { createTodo, getTodos, updateTodo } from "../../redux/todoThunk";

export default function Todos() {
  const [formData, setFormData] = useState<Todo>({_id: '', title: '', completed: false});
  //React Redux Hooks
  const dispatch = useDispatch<AppDispatch>();
  const { entities } = useSelector((state: RootState) => state.todos);

  useEffect(() => {
    dispatch(getTodos())
  }, [dispatch])

  const addTodoItem = (value: any) => {
    dispatch(createTodo(value));
  };

  const handleToggle = (todo: Todo) => {
    dispatch(
      updateTodo({ ...todo, completed: !todo.completed })
    );
  };

  const handleEditTodo = (todo: Todo) => {
    setFormData(todo);
  };

  return (
    <Container
      component="main"
      maxWidth={false}
      sx={{
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "40%",
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 4,
          display: "flex",
          flexDirection: "column",
          color: "black",
        }}
      >
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: "500",
            color: grey[800],
          }}
        >
          Create a Todo
        </Typography>
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: "400",
            color: grey[400],
          }}
        >
          Write things here so you dont forget
        </Typography>
        <Box sx={{ mt: 2 }}>
          <TodoForm
            formData={formData}
            onAddTodo={addTodoItem}
          />
          <TodoList todos={entities} onToggleTodo={handleToggle} onEditTodo={handleEditTodo} />
        </Box>
      </Box>
    </Container>
  );
}
