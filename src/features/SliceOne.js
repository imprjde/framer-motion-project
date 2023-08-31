import { createSlice } from "@reduxjs/toolkit";

const challengeSlice = createSlice({
  name: "challenges",
  initialState: {
    activeChallenges: [],
    completedChallenges: [],
    failedChallenges: [],
  },
  reducers: {
    addNewChallenge(state, action) {
      state.activeChallenges.push(action.payload);
    },
    moveToCompleted(state, action) {
      let completedItem = state.activeChallenges[action.payload];

      state.activeChallenges.splice(action.payload, 1);

      state.completedChallenges.push(completedItem);
    },
    moveToFailed(state, action) {
      const failedItem = state.activeChallenges[action.payload];

      state.activeChallenges.splice(action.payload, 1);

      state.failedChallenges.push(failedItem);
    },
    showActiveTaskDesc(state, action) {
      state.activeChallenges = state.activeChallenges.map((task, i) => {
        if (i === action.payload) {
          return { ...task, showDes: !task.showDes };
        } else {
          return task;
        }
      });
    },
    showActiveTaskDescTwo(state, action) {
      state.completedChallenges = state.completedChallenges.map((task, i) => {
        if (i === action.payload) {
          return { ...task, showDes: !task.showDes };
        } else {
          return task;
        }
      });
    },
    showActiveTaskDescThree(state, action) {
      state.failedChallenges = state.failedChallenges.map((task, i) => {
        if (i === action.payload) {
          return { ...task, showDes: !task.showDes };
        } else {
          return task;
        }
      });
    },
    markAsCompletedFromFailed(state, action) {
      let failedItem = state.failedChallenges[action.payload];

      state.failedChallenges.splice(action.payload, 1);

      state.completedChallenges.push(failedItem);
    },
    markAsFailedFromCompleted(state, action) {
      let completedItem = state.completedChallenges[action.payload];

      state.completedChallenges.splice(action.payload, 1);

      state.failedChallenges.push(completedItem);
    },
  },
});

export const {
  addNewChallenge,
  moveToCompleted,
  moveToFailed,
  showActiveTaskDesc,
  showActiveTaskDescTwo,
  showActiveTaskDescThree,
  markAsCompletedFromFailed,
  markAsFailedFromCompleted,
} = challengeSlice.actions;
export default challengeSlice.reducer;
