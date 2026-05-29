import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

export const fetchTasks = createAsyncThunk(
  "tasks/fetchAll",
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await API.get(`/tasks/${projectId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  },
);

export const createTask = createAsyncThunk(
  "tasks/create",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await API.post("/tasks", formData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  },
);

export const toggleTask = createAsyncThunk(
  "tasks/toggle",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/tasks/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  },
);

export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/tasks/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  },
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(toggleTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (t) => t._id === action.payload._id,
        );
        state.tasks[index] = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((t) => t._id !== action.payload);
      });
  },
});

export default tasksSlice.reducer;
