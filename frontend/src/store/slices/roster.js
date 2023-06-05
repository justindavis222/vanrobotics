// third-party
import { createSlice } from "@reduxjs/toolkit";

// project imports
import { dispatch } from "../index";
import { api } from "../../services/api";
// ----------------------------------------------------------------------

const initialState = {
  error: null,
  isLoading: true,
  classbatches: [],
  classbatch: null,
  learners: [],
  learner: null,
  totalLearners: 0,
};

const slice = createSlice({
  name: "roster",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = true;
      state.error = action.payload;
    },

    // GET ALL CLASSBATCHES
    getClassBatchesSuccess(state, action) {
      state.classbatches = action.payload;
      state.isLoading = false;
    },

    // GET CLASSBATCH BY ID
    getClassBatchSuccess(state, action) {
      state.classbatch = action.payload;
      state.isLoading = false;
    },

    // UPDATE CLASSBATCH BY ID
    updateClassBatchSuccess(state, action) {
      state.classbatch = action.payload;
      state.isLoading = false;
    },

    // GET ALL LEARNERS
    getLearnersSuccess(state, action) {
      state.learners = action.payload;
      state.isLoading = false;
      state.totalLearners = action.payload.length;
    },

    // GET LERNER BY ID
    getLearnerSuccess(state, action) {
      state.learner = action.payload;
      state.isLoading = false;
    },

    // DELETE LERNER
    deleteLearnerSuccess(state, action) {
      const unDeletedLearners = state.learners.filter(
        (leaner) => leaner.id !== action.payload
      );
      return {
        ...state,
        learners: unDeletedLearners,
        isLoading: false,
        totalLearners: unDeletedLearners.length,
      };
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getClassBatches() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await api.fetchClassBatches();
      dispatch(slice.actions.getClassBatchesSuccess(response));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getClassBatch(idx) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      if (idx !== "") {
        const response = await api.fetchClassBatch(idx);
        dispatch(slice.actions.getClassBatchSuccess(response));
      } else {
        dispatch(slice.actions.getClassBatchSuccess(null));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateClassBatch(idx, name) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await api.updateClassBatch(idx, name);
      dispatch(slice.actions.getLearnerSuccess(response));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getLearners() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await api.fetchLearners();
      dispatch(slice.actions.getLearnersSuccess(response));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getLearner(idx) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      if (idx !== "") {
        const response = await api.fetchLearner(idx);
        dispatch(slice.actions.getLearnerSuccess(response));
      } else {
        dispatch(slice.actions.getLearnerSuccess(null));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteLearner(idx) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await api.deleteLearner(idx);
      dispatch(slice.actions.deleteLearnerSuccess(idx));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
