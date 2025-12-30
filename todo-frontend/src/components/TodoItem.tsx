import { useState } from 'react';
import { FaEdit, FaTrash, FaCheck } from 'react-icons/fa';
import type { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string) => void;
}

const TodoItem = ({ todo, onToggle, onDelete, onUpdate }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleEdit = () => {
    if (!isEditing) {
      setEditTitle(todo.title);
      setIsEditing(true);
    }
  };

  const handleUpdate = () => {
    if (editTitle.trim()) {
      onUpdate(todo.id, editTitle.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setIsEditing(false);
  };

  return (
    <div className={`todo-item ${todo.completed ? 'todo-item--completed' : ''}`}>
      <button
        onClick={() => onToggle(todo.id)}
        className="todo-item__toggle"
        aria-label="Toggle completed"
      >
        {todo.completed && <FaCheck />}
      </button>
      {isEditing ? (
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onBlur={handleUpdate}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleUpdate();
            } else if (e.key === 'Escape') {
              handleCancel();
            }
          }}
          className="todo-item__input"
          autoFocus
        />
      ) : (
        <span className="todo-item__title" onClick={handleEdit}>
          {todo.title}
        </span>
      )}
      <div className="todo-item__actions">
        <button
          onClick={handleEdit}
          className="todo-item__button"
          aria-label="Edit todo"
        >
          <FaEdit />
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="todo-item__button"
          aria-label="Delete todo"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;

