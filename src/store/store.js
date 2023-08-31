

import { configureStore } from "@reduxjs/toolkit";
import challengeReducer from "../features/SliceOne";

export const store = configureStore({
  reducer: {
    challenges: challengeReducer,
  },
});
