import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  personCount: 0,
};

const personSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    updatePersonCount(state, action) {
      state.personCount = action.payload;
    },
    // Define reducers here if you need to update the subjects data
    // Example: updateSubjects(state, action) {
    //   state.subjectsByYear = action.payload;
    // }
  },
});
export const { updatePersonCount } = personSlice.actions;
// Export the reducer to combine it with other reducers
export default personSlice.reducer;
