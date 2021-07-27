import { combineReducers } from 'redux';

import userReducer from './reducers/userReducer';
import uiReducer from './reducers/uiReducer';
import dataReducer from './reducers/dataReducer';

const rootReducer = combineReducers({
  user: userReducer,
  UI: uiReducer,
  data: dataReducer,
});

export default rootReducer;
