import Todo from "./components/Todo";
import NewTodo from "./components/NewTodo";
import CollapsibleList from "./components/CollapsibleList";
import {
  Typography,
  Paper,
  Box,
} from "@mui/material";
import usePersistedState from "./hooks/usePersistedState";

interface ITodo {
  id: number;
  title: string;
  open: boolean;
}

function App() {
  const [todos, setTodos] = usePersistedState<ITodo[]>([], "todos");

  const handleCloseTodo = (id: number) => () => {
    setTodos((oldTodos) => {
      return oldTodos.map((todo) =>
        todo.id === id ? Object.assign(todo, { open: false }) : todo
      );
    });
  };

  const handleReopenTodo = (id: number) => () => {
    setTodos((oldTodos) => {
      return oldTodos.map((todo) =>
        todo.id === id ? Object.assign(todo, { open: true }) : todo
      );
    });
  };

  const handleDeleteTodo = (id: number) => () => {
    setTodos((oldTodos) => {
      return oldTodos.filter((todo) => todo.id !== id);
    });
  };

  const handleCreateTodo = (title: string) => {
    setTodos((oldTodos) => [
      ...oldTodos,
      { title, open: true, id: determineNewId(oldTodos) },
    ]);
  };

  const openTodos = todos
    .filter((todo) => todo.open)
    .map((todo) => (
      <Todo
        key={todo.id}
        {...todo}
        onClose={handleCloseTodo(todo.id)}
        onDelete={handleDeleteTodo(todo.id)}
      />
    ));

  const closedTodos = todos
    .filter((todo) => !todo.open)
    .map((todo) => (
      <Todo
        key={todo.id}
        {...todo}
        onReopen={handleReopenTodo(todo.id)}
        onDelete={handleDeleteTodo(todo.id)}
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

        <NewTodo onCreate={handleCreateTodo} />

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

function determineNewId(todos: ITodo[]): number {
  return todos.reduce((id, todo) => (todo.id < id ? id : todo.id + 1), 0);
}

export default App;
