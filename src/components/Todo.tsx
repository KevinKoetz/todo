import { ListItem, Typography, IconButton, Box } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import UndoIcon from "@mui/icons-material/Undo";
import DeleteIcon from "@mui/icons-material/Delete";

interface TodoProps {
  titel: string;
  open: boolean;
  onClose?: () => void;
  onReopen?: () => void;
  onDelete?: () => void;
}

function Todo({ titel, open, onClose, onReopen, onDelete }: TodoProps) {
  return (
    <ListItem
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography sx={{textDecoration: open ? undefined : "line-through"}}>{titel}</Typography>
      <Box>
      {open ? (
        <IconButton
          color="success"
          aria-label="Als erledigt markieren."
          onClick={onClose}
        >
          <DoneIcon />
        </IconButton>
      ) : (
        <IconButton
          color="warning"
          aria-label="Als offen markieren."
          onClick={onReopen}
        >
          <UndoIcon />
        </IconButton>
      )}
      <IconButton color="error"
          aria-label="Löschen."
          onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
      </Box>
      
    </ListItem>
  );
}

export default Todo;
