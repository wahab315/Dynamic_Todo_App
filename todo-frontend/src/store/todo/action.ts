import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  Todo,
  CreateTodoRequest,
  UpdateTodoRequest,
} from "../../types/todo";
import {
  getTodosAPI,
  createTodoAPI,
  updateTodoAPI,
  deleteTodoAPI,
} from "./services";

export const fetchTodos = createAsyncThunk<
  Todo[],
  void,
  { rejectValue: string }
>("todos/fetchTodos", async (_, thunkAPI) => {
  try {
    return await getTodosAPI();
  } catch (unknownError) {
    const err = unknownError as { response?: { data?: { message?: string } }; message?: string };
    const message =
      err.response?.data?.message ??
      err.message ??
      "Failed to fetch todos";
    return thunkAPI.rejectWithValue(message);
  }
});

export const createTodo = createAsyncThunk<
  Todo,
  CreateTodoRequest,
  { rejectValue: string }
>("todos/createTodo", async (payload, thunkAPI) => {
  try {
    return await createTodoAPI(payload);
  } catch (unknownError) {
    const err = unknownError as { response?: { data?: { message?: string } }; message?: string };
    const message =
      err.response?.data?.message ??
      err.message ??
      "Failed to create todo";
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateTodo = createAsyncThunk<
  Todo,
  { id: string; data: UpdateTodoRequest },
  { rejectValue: string }
>("todos/updateTodo", async ({ id, data }, thunkAPI) => {
  try {
    return await updateTodoAPI(id, data);
  } catch (unknownError) {
    const err = unknownError as { response?: { data?: { message?: string } }; message?: string };
    const message =
      err.response?.data?.message ??
      err.message ??
      "Failed to update todo";
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteTodo = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("todos/deleteTodo", async (id, thunkAPI) => {
  try {
    return await deleteTodoAPI(id);
  } catch (unknownError) {
    const err = unknownError as { response?: { data?: { message?: string } }; message?: string };
    const message =
      err.response?.data?.message ??
      err.message ??
      "Failed to delete todo";
    return thunkAPI.rejectWithValue(message);
  }
});
