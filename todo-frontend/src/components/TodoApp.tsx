import { useState } from 'react';
import type { Todo } from '../types/todo';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd = (title: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const handleToggle = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleUpdate = (id: string, title: string) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, title } : todo))
    );
  };

  return (
    <div className="todo-app">
      <h1 className="todo-app__title">Todo App</h1>
      <TodoForm onAdd={handleAdd} />
      <div className="todo-app__list">
        {todos.length === 0 ? (
          <p className="todo-app__empty">No todos yet. Add one above!</p>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoApp;

