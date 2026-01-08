import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Todo } from '../../types/todo';

interface TodoResponse {
  success: boolean;
  message: string;
  data: Todo | Todo[];
  length?: number;
}

interface CreateTodoRequest {
  title: string;
}

interface UpdateTodoRequest {
  title?: string;
  completed?: boolean;
}

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1',
  }),
  tagTypes: ['Todo'],
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => '/todos',
      transformResponse: (response: TodoResponse) => {
        if (Array.isArray(response.data)) {
          return response.data.map((todo) => ({
            ...todo,
            id: todo._id || todo.id,
          }));
        }
        return [];
      },
      providesTags: ['Todo'],
    }),
    createTodo: builder.mutation<Todo, CreateTodoRequest>({
      query: (body) => ({
        url: '/todos',
        method: 'POST',
        body,
      }),
      transformResponse: (response: TodoResponse) => {
        if (typeof response.data === 'object' && !Array.isArray(response.data)) {
          const todo = response.data as Todo;
          return {
            ...todo,
            id: todo._id || todo.id,
          };
        }
        throw new Error('Invalid response format');
      },
      invalidatesTags: ['Todo'],
    }),
    updateTodo: builder.mutation<Todo, { id: string; data: UpdateTodoRequest }>({
      query: ({ id, data }) => ({
        url: `/todos/${id}`,
        method: 'PUT',
        body: data,
      }),
      transformResponse: (response: TodoResponse) => {
        if (typeof response.data === 'object' && !Array.isArray(response.data)) {
          const todo = response.data as Todo;
          return {
            ...todo,
            id: todo._id || todo.id,
          };
        }
        throw new Error('Invalid response format');
      },
      invalidatesTags: ['Todo'],
    }),
    deleteTodo: builder.mutation<void, string>({
      query: (id) => ({
        url: `/todos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todo'],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoApi;

