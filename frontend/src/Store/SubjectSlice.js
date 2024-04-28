import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subjectsByYear: {
    FE: ["Physics", "Chemistry", "Mathematics", "C Programming"],
    SE: ["Object-Oriented Programming", "Operating Systems"],
    TE: ["Data Structures", "Algorithms"],
    BE: ["Machine Learning", "Artificial Intelligence"],
  },
};

const subjectsSlice = createSlice({
  name: "subjects",
  initialState,
  reducers: {
    // Define reducers here if you need to update the subjects data
    // Example: updateSubjects(state, action) {
    //   state.subjectsByYear = action.payload;
    // }
  },
});

// Export the reducer to combine it with other reducers
export default subjectsSlice.reducer;
