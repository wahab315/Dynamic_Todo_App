import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import type { RootState, AppDispatch } from "../store/store";
import { fetchTodos } from "../store/todo/action";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useTodoActions } from "../helper/useTodoActions";

const TodoApp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { todos, loading, error } = useSelector(
    (state: RootState) => state.todos,
  );

  const { handleAdd, handleToggle, handleDelete, handleUpdate, isCreating } =
    useTodoActions();

  useEffect(() => {
    void dispatch(fetchTodos());
  }, [dispatch]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  if (loading) {
    return <p>Loading todos...</p>;
  }

  return (
    <div className="todo-app">
      <center>
        <h1 style={{ padding: "3rem 0rem" }}>Todo App</h1>
      </center>

      <TodoForm onAdd={handleAdd} isSubmitting={isCreating} />

      {todos.map((todo) => (
        <TodoItem
          key={todo._id || todo.id}
          todo={todo}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
};

export default TodoApp;
