import Todo from "./components/Todo";
import NewTodo from "./components/NewTodo";
import CollapsibleList from "./components/CollapsibleList";
import {
  Typography,
  Paper,
  Box,
} from "@mui/material";
import useTodos from "./hooks/useTodos";


function App() { 
  const {todos, handleCreate, handleClose, handleReopen, handleDelete} = useTodos()

  const openTodos = todos
    .filter((todo) => todo.open)
    .map((todo) => (
      <Todo
        key={todo.id}
        {...todo}
        onClose={handleClose(todo.id)}
        onDelete={handleDelete(todo.id)}
      />
    ));

  const closedTodos = todos
    .filter((todo) => !todo.open)
    .map((todo) => (
      <Todo
        key={todo.id}
        {...todo}
        onReopen={handleReopen(todo.id)}
        onDelete={handleDelete(todo.id)}
      />
    ));

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "100vh",
        padding: "1rem",
      }}
    >
      <Paper elevation={2} sx={{ padding: "0.5rem", width: "95vw" }}>
        <Typography variant="h4" textAlign="center" mb="1rem">
          To-Do App
        </Typography>

        <NewTodo onCreate={handleCreate} />

        {todos.length > 0 ? (
          <CollapsibleList
            listElements={openTodos}
            uniqueHeader="Offene To-Dos"
            defaultExpanded={true}
            emptyMessage="Keine offenen To-Dos! Zeit für etwas Freizeit."
          />
        ) : (
          <Typography textAlign="center" mt="0.5rem">
            Keine To-Dos vorhanden. Leg los!
          </Typography>
        )}

        {closedTodos.length > 0 ? (
          <CollapsibleList
            listElements={closedTodos}
            uniqueHeader="Erledigte To-Dos"
          />
        ) : null}
      </Paper>
    </Box>
  );
}

export default App;
