import { useFormik } from "formik";
import { MdAddCircle, MdClearAll } from "react-icons/md";
import { AddTodoItem, ClearCompletedTodos } from "./Todo.type";
import { Box, Button, FormControl, TextField } from "@mui/material";

interface IAddTodoProps {
  onAddTodo: AddTodoItem;
  onClearCompleted: ClearCompletedTodos;
}

export default function TodoForm({
  onAddTodo,
  onClearCompleted,
}: IAddTodoProps) {
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    onSubmit: (values) => {
      if (values.title.length > 0) {
        onAddTodo({ id: Date.now(), title: values.title, completed: false });
        formik.resetForm();
      }
    },
  });

  const handleClearCompleted = () => {
    onClearCompleted();
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <FormControl fullWidth>
          <TextField
            id="title"
            name="title"
            label="Do Homework"
            type="text"
            size="small" 
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.title}
          />
        </FormControl>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button
            type="submit"
            variant="outlined"
            disabled={formik.values.title.length === 0}
            startIcon={<MdAddCircle />}
            sx={{
              ml: 1,
            }}
          >
            Add
          </Button>
          <Button
            type="button"
            variant="outlined"
            color={'warning'}
            onClick={() => handleClearCompleted()}
            startIcon={<MdClearAll />}
            sx={{
              ml: 1,
            }}
          >
            Clear
          </Button>
        </Box>
      </Box>
    </form>
  );
}
