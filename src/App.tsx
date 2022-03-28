import Todo from "./components/Todo";
import NewTodo from "./components/NewTodo";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  Paper,
  Box
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import usePersistedState from "./hooks/usePersistedState";

interface ITodo {
  id: number;
  titel: string;
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

  const handleCreateTodo = (titel: string) => {
    setTodos((oldTodos) => [
      ...oldTodos,
      { titel, open: true, id: determineNewId(oldTodos) },
    ]);
  };

  const openTodos = todos
    .filter((todo) => todo.open)
    .map((todo) => (
      <Todo key={todo.id} {...todo} onClose={handleCloseTodo(todo.id)} onDelete={handleDeleteTodo(todo.id)}/>
    ));

  const closedTodos = todos
    .filter((todo) => !todo.open)
    .map((todo) => (
      <Todo key={todo.id} {...todo} onReopen={handleReopenTodo(todo.id)} onDelete={handleDeleteTodo(todo.id)}/>
    ));

  return (
    <Box sx={{display: "flex", justifyContent:"center", alignItems:"flex-start", minHeight:"100vh", padding:"1rem"}}>
      <Paper elevation={2} sx={{padding: "0.5rem", width:"95vw"}}>
        <Typography variant="h4" textAlign="center" mb="1rem">To-Do App</Typography>
        <NewTodo onCreate={handleCreateTodo} />
        {todos.length > 0 ? (
          <Accordion defaultExpanded={true} disableGutters={true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="openTodos-content"
              id="openTodos-header"
            >
              <Typography>Offene To-Dos</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {openTodos.length > 0 ? (
                <List>{openTodos}</List>
              ) : (
                <Typography>
                  Keine offenen To-Dos! Zeit für etwas Freizeit.
                </Typography>
              )}
            </AccordionDetails>
          </Accordion>
        ) : (
          <Typography textAlign="center" mt="0.5rem">
            Keine To-Dos vorhanden. Leg los!
          </Typography>
        )}
        {closedTodos.length > 0 ? (
          <Accordion disableGutters={true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="closedTodos-content"
              id="closedTodos-header"
            >
              <Typography>Erledigte To-Dos</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>{closedTodos}</List>
            </AccordionDetails>
          </Accordion>
        ) : null}
      </Paper>
    </Box>
  );
}

function determineNewId(todos: ITodo[]): number {
  return todos.reduce((id, todo) => (todo.id < id ? id : todo.id + 1), 0);
}

export default App;
