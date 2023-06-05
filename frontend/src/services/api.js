import { fetchWithError } from "./http";
import config from "../common/config";

const getData = () => {
  return {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
};

const putData = (name) => {
  return {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({name})
  };
};

const deleteData = () => {
  return {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
};

export const api = {
  fetchLearners: () => {
    return fetchWithError(`${config.apiUrl}/rosters/learners`, getData());
  },
  fetchClassBatches: () => {
    return fetchWithError(`${config.apiUrl}/rosters/classbatches`, getData());
  },
  fetchLearner: (lid) => {
    return fetchWithError(
      `${config.apiUrl}/rosters/learner/${lid}/`,
      getData()
    );
  },
  fetchClassBatch: (cbid) => {
    return fetchWithError(
      `${config.apiUrl}/rosters/classbatch/${cbid}/`,
      getData()
    );
  },
  updateClassBatch: (cbid, name) => {
    return fetchWithError(
      `${config.apiUrl}/rosters/classbatch/${cbid}/`,
      putData(name)
    );
  },
  deleteLearner: (lid) => {
    return fetchWithError(
      `${config.apiUrl}/rosters/learner/${lid}/`,
      deleteData()
    );
  },
};
