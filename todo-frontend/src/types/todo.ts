export interface Todo {
  _id: string;
  id?: string;
  title: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface TodoResponse {
  success: boolean;
  message: string;
  data: Todo | Todo[];
  length?: number;
}

export interface CreateTodoRequest {
  title: string;
}

export interface UpdateTodoRequest {
  title?: string;
  completed?: boolean;
}
