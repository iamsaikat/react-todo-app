import { useFormik } from "formik";
import { MdAddCircle, MdClearAll } from "react-icons/md";
import { RiEditCircleLine } from "react-icons/ri";
import { AddTodoItem, Todo } from "./Todo.type";
import { Box, Button, FormControl, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { removeAllCompletedTodos, updateTodo } from "../../redux/todoThunk";

interface IAddTodoProps {
  formData: Todo;
  onAddTodo: AddTodoItem;
}

export default function TodoForm({
  formData,
  onAddTodo,
}: IAddTodoProps) {

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const formik = useFormik({
    initialValues: {
      title: formData.title,
    },
    onSubmit: (values) => {
      if (values.title.length > 0) {
        if (isEdit) {
          dispatch(updateTodo({...formData, ...values}));
          setIsEdit(false);
        } else {
          onAddTodo(values);
        }
        formik.resetForm();
      }
    },
  });

  useEffect(() => {
    if (formData.title && formData._id) {
      formik.setFieldValue("title", formData.title);
      setIsEdit(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

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
            startIcon={isEdit ? <RiEditCircleLine /> : <MdAddCircle />}
            sx={{
              ml: 1,
            }}
          >
            {isEdit ? 'Update' : 'Add'}
          </Button>
          <Button
            type="button"
            variant="outlined"
            color={"warning"}
            onClick={() => dispatch(removeAllCompletedTodos())}
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
