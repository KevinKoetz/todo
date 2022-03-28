import { ListItem, Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import UndoIcon from "@mui/icons-material/Undo";

interface TodoProps {
  titel: string;
  open: boolean;
  onDone: () => void;
  onUndone: () => void;
}

function Todo({ titel, open, onDone, onUndone }: TodoProps) {
  return (
    <ListItem
      sx={{
        textDecoration: open ? undefined : "line-through",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography>{titel}</Typography>{" "}
      {open ? (
        <DoneIcon sx={{ color: "success.main" }} onClick={onDone} />
      ) : (
        <UndoIcon sx={{ color: "warning.main" }} onClick={onUndone} />
      )}
    </ListItem>
  );
}

export default Todo;
