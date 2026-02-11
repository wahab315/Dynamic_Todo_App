import axios from "axios";
import type {
  Todo,
  TodoResponse,
  CreateTodoRequest,
  UpdateTodoRequest,
} from "../../types/todo";

const API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

export const getTodosAPI = async (): Promise<Todo[]> => {
  const res = await axios.get<TodoResponse>(`${API_URL}/todos`);
  const response = res.data;

  if (Array.isArray(response.data)) {
    return response.data;
  }

  return [];
};

export const createTodoAPI = async (
  payload: CreateTodoRequest,
): Promise<Todo> => {
  const res = await axios.post<TodoResponse>(`${API_URL}/todos`, payload);
  const response = res.data;

  if (response.data && !Array.isArray(response.data)) {
    return response.data as Todo;
  }

  throw new Error("Invalid response format");
};

export const updateTodoAPI = async (
  id: string,
  payload: UpdateTodoRequest,
): Promise<Todo> => {
  const res = await axios.put<TodoResponse>(
    `${API_URL}/todos/${id}`,
    payload,
  );
  const response = res.data;

  if (response.data && !Array.isArray(response.data)) {
    return response.data as Todo;
  }

  throw new Error("Invalid response format");
};

export const deleteTodoAPI = async (id: string): Promise<string> => {
  await axios.delete<TodoResponse>(`${API_URL}/todos/${id}`);
  return id;
};
