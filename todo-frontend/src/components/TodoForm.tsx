import { useState } from 'react';
import type { FormEvent } from 'react';

interface TodoFormProps {
  onAdd: (title: string) => Promise<void>;
  isSubmitting?: boolean;
}

const TodoForm = ({ onAdd, isSubmitting = false }: TodoFormProps) => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (title.trim() && !isSubmitting) {
      await onAdd(title.trim());
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
        disabled={isSubmitting}
      />
      <button type="submit" className="todo-form__button" disabled={isSubmitting}>
        {isSubmitting ? 'Adding...' : 'Add'}
      </button>
    </form>
  );
};

export default TodoForm;
