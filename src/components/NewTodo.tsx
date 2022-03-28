import { IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

interface NewTodoProps {
  onCreate: (titel: string) => void;
}

function NewTodo({ onCreate }: NewTodoProps) {
  const [newTodoTitel, setNewTodoTitel] = useState("");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onCreate(newTodoTitel);
    setNewTodoTitel("");
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
        value={newTodoTitel}
        onChange={(e) => setNewTodoTitel(e.target.value)}
      />
    </form>
  );
}

export default NewTodo;
