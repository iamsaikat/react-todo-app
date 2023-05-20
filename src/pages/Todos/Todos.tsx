import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { Box, Container, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { addTodo, setTodoStatus } from "../../redux/todoSlice";
import { Todo } from "./Todo.type";
import { useState } from "react";

export default function Todos() {
  const [formData, setFormData] = useState<Todo>({id: '', title: '', completed: false});
  //React Redux Hooks
  const todoList = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();

  const addTodoItem = (title: string) => {
    dispatch(addTodo(title));
  };

  const handleToggle = (todo: Todo) => {
    dispatch(
      setTodoStatus({ completed: !todo.completed, id: todo.id })
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
          <TodoList todos={todoList} onToggleTodo={handleToggle} onEditTodo={handleEditTodo} />
        </Box>
      </Box>
    </Container>
  );
}
