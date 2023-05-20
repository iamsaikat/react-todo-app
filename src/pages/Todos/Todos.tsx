import { useState } from "react";
import { Todo } from "./Todo.type";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { Box, Container, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function Todos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (item: Todo) => {
    setTodos([...todos, item]);
  };

  const handleToggle = (id: number) => {
    let newTodoList = todos.filter((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });

    setTodos(newTodoList);
  };

  const handleClearCompleted = () => {
    let newTodoList = todos.filter((todo) => !todo.completed);

    setTodos(newTodoList);
  };

  return (
    <Container component="main" maxWidth={false}  sx={{
      minHeight: '90vh',
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <Box
        sx={{
          width: '40%',
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 4,
          display: "flex",
          flexDirection: "column",
          color: "black"
        }}
      >
        <Typography sx={{
          fontSize: '24px',
          fontWeight: '500',
          color: grey[800]
        }}>
          Create a Todo
        </Typography>
        <Typography sx={{
          fontSize: '18px',
          fontWeight: '400',
          color: grey[400]
        }}>
          Write things here so you dont forget
        </Typography>
        <Box sx={{ mt: 2 }}>
          <TodoForm onAddTodo={addTodo} onClearCompleted={handleClearCompleted} />
          <TodoList todos={todos} onToggleTodo={handleToggle} />
        </Box>
      </Box>
    </Container>
  );
}
