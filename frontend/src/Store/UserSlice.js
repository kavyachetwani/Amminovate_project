import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredentials) => {
    const request = await axios.post(
      `http://localhost:8000/login`,
      userCredentials
    );
    console.log(request.data);
    const response = request.data;
    localStorage.setItem("user", JSON.stringify(response));
    console.log(response);
    return response;
  }
);
const userSlice = createSlice({
  name: "user",
  initialState: {
    userObj: null,
  },
  reducers: {
    clearUser: (state) => {
      state.userObj = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.userObj = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userObj = action.payload;
      });
  },
});
export default userSlice.reducer;
export const { clearUser } = userSlice.actions;
