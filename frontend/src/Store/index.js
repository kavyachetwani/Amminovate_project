import userSlice from "./UserSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import UserSlice from "./UserSlice";
import SubjectSlice from "./SubjectSlice";
import PersonSlice from "./PersonSlice";
const rootReducer = combineReducers({
  user: UserSlice,
  subjects: SubjectSlice,
  people: PersonSlice,
});

const persistConfig = {
  key: "root",
  storage, // browser local storage by default value
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
