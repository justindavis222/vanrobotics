// third-party
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// project imports
import rosterReducer from './slices/roster';
// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  roster: persistReducer(
    {
      key: 'roster',
      storage,
      keyPrefix: 'roster-'
    },
    rosterReducer
  )
});

export default reducer;
