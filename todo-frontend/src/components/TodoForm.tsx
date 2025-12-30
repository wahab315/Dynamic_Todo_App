import { useState } from 'react';
import type { FormEvent } from 'react';

interface TodoFormProps {
  onAdd: (title: string) => void;
}

const TodoForm = ({ onAdd }: TodoFormProps) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim());
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new todo"
        className="todo-form__input"
      />
      <button type="submit" className="todo-form__button">
        Add
      </button>
    </form>
  );
};

export default TodoForm;

