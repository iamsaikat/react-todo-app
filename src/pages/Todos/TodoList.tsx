import { MdCheckCircle, MdTimer, MdCheckCircleOutline } from "react-icons/md";
import { RiEditCircleLine } from "react-icons/ri";
import { Todo, ToggleTodo } from "./Todo.type";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { green, grey } from "@mui/material/colors";

interface ITodoListProps {
  todos: Todo[];
  onToggleTodo: ToggleTodo;
}

export default function TodoList({ todos, onToggleTodo }: ITodoListProps) {
  const handleToggle = (id: number) => {
    onToggleTodo(id);
  };

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {todos.map((todo) => (
        <ListItem
          key={todo.id}
          secondaryAction={
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2
            }}>
              <IconButton edge="end" aria-label="edit" color="primary" onClick={() => {}}>
                <RiEditCircleLine />
              </IconButton>
              <IconButton edge="end" aria-label="done" color="secondary" onClick={() => handleToggle(todo.id)}>
                <MdCheckCircleOutline />
              </IconButton>
            </Box>
          }
          disablePadding
        >
          <ListItemIcon sx={{
            color: todo.completed ? green[500] : grey[500]
          }}>
            {todo.completed ? <MdCheckCircle /> : <MdTimer />}
          </ListItemIcon>
          <ListItemText
            sx={{
              textDecoration: todo.completed ? "line-through" : "none",
            }}
            id={todo.id.toString()}
            primary={todo.title}
          />
        </ListItem>
      ))}
    </List>
  );
}
