import { ListItem, Typography, IconButton, Box } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import UndoIcon from "@mui/icons-material/Undo";
import DeleteIcon from "@mui/icons-material/Delete";

interface TodoProps {
  /**
   * Main topic of the Todo
   */
  title: string;
  /**
   * If false, this Todo is considered closed and is displayed with line-through
   */
  open: boolean;
  /**
   * Called when the close Button is clicked
   */
  onClose?: () => void;
  /**
   * Called when the reopen button is clicked
   */
  onReopen?: () => void;
  /**
   * Called when the delete button is clicked
   */
  onDelete?: () => void;
}

function Todo({ title, open, onClose, onReopen, onDelete }: TodoProps) {
  return (
    <ListItem
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography sx={{ textDecoration: open ? undefined : "line-through" }}>
        {title}
      </Typography>
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
        <IconButton color="error" aria-label="Löschen." onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </ListItem>
  );
}

export default Todo;
