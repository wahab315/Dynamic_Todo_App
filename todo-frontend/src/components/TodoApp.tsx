import { toast } from 'react-toastify';
import {
  useGetTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from '../store/api/todoApi';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

const TodoApp = () => {
  const {
    data: todos = [],
    isLoading,
    isError,
    error,
  } = useGetTodosQuery();

  const [createTodo, { isLoading: isCreating }] = useCreateTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleAdd = async (title: string): Promise<void> => {
    try {
      await createTodo({ title }).unwrap();
      toast.success('Todo created successfully');
    } catch (err) {
      const errorMessage =
        (err as { data?: { message?: string } })?.data?.message ||
        'Failed to create todo';
      toast.error(errorMessage);
    }
  };

  const handleToggle = async (id: string): Promise<void> => {
    try {
      const todo = todos.find((t) => (t._id || t.id) === id);
      if (todo) {
        await updateTodo({
          id,
          data: { completed: !todo.completed },
        }).unwrap();
        toast.success('Todo updated successfully');
      }
    } catch (err) {
      const errorMessage =
        (err as { data?: { message?: string } })?.data?.message ||
        'Failed to update todo';
      toast.error(errorMessage);
    }
  };

  const handleDelete = async (id: string): Promise<void> => {
    try {
      await deleteTodo(id).unwrap();
      toast.success('Todo deleted successfully');
    } catch (err) {
      const errorMessage =
        (err as { data?: { message?: string } })?.data?.message ||
        'Failed to delete todo';
      toast.error(errorMessage);
    }
  };

  const handleUpdate = async (id: string, title: string): Promise<void> => {
    try {
      await updateTodo({
        id,
        data: { title },
      }).unwrap();
      toast.success('Todo updated successfully');
    } catch (err) {
      const errorMessage =
        (err as { data?: { message?: string } })?.data?.message ||
        'Failed to update todo';
      toast.error(errorMessage);
    }
  };

  if (isLoading) {
    return (
      <div className="todo-app">
        <h1 className="todo-app__title">Todo App</h1>
        <p className="todo-app__loading">Loading todos...</p>
      </div>
    );
  }

  if (isError) {
    const errorMessage =
      (error as { data?: { message?: string } })?.data?.message ||
      'Failed to load todos';
    toast.error(errorMessage);
  }

  return (
    <div className="todo-app">
      <h1 className="todo-app__title">Todo App</h1>
      <TodoForm onAdd={handleAdd} isSubmitting={isCreating} />
      <div className="todo-app__list">
        {todos.length === 0 ? (
          <p className="todo-app__empty">No todos yet. Add one above!</p>
        ) : (
          todos.map((todo) => {
            const todoId = todo._id || todo.id || '';
            return (
              <TodoItem
                key={todoId}
                todo={todo}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default TodoApp;
