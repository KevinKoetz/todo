import usePersistedState from "./usePersistedState"

interface Todo {
    id: number;
    title: string;
    open: boolean;
  }

const useTodos = () => {
    const [todos, setTodos] = usePersistedState<Todo[]>([], "todos")

    const handleClose = (id: number) => () => {
        setTodos((oldTodos) => {
          return oldTodos.map((todo) =>
            todo.id === id ? Object.assign(todo, { open: false }) : todo
          );
        });
      };
    
      const handleReopen = (id: number) => () => {
        setTodos((oldTodos) => {
          return oldTodos.map((todo) =>
            todo.id === id ? Object.assign(todo, { open: true }) : todo
          );
        });
      };
    
      const handleDelete = (id: number) => () => {
        setTodos((oldTodos) => {
          return oldTodos.filter((todo) => todo.id !== id);
        });
      };
    
      const handleCreate = (title: string) => {
        setTodos((oldTodos) => [
          ...oldTodos,
          { title, open: true, id: determineNewId(oldTodos) },
        ]);
      };

      return {handleClose, handleCreate, handleReopen, handleDelete, todos}
}

function determineNewId(todos: Todo[]): number {
    return todos.reduce((id, todo) => (todo.id < id ? id : todo.id + 1), 0);
  }

export default useTodos

