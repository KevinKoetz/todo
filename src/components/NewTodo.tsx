import { IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

interface NewTodoProps {
  /**
   * Component calls on Create with the new title of the Todo
   */
  onCreate: (title: string) => void;
}

function NewTodo({ onCreate }: NewTodoProps) {
  const [newTodoTitle, setNewTodoTitle] = useState("");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onCreate(newTodoTitle);
    setNewTodoTitle("");
  };

  return (
    <form
      style={{ display: "flex", alignItems: "center" }}
      onSubmit={handleSubmit}
    >
      <IconButton
        color="success"
        type="submit"
        aria-label="Neues To-Do erstellen."
      >
        <AddIcon />
      </IconButton>
      <TextField
        fullWidth={true}
        placeholder="Ich muss noch..."
        required
        label="Titel"
        value={newTodoTitle}
        onChange={(e) => setNewTodoTitle(e.target.value)}
      />
    </form>
  );
}

export default NewTodo;
