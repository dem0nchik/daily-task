import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import user from '../reducers/user_reduser';
import list from '../reducers/list_reduser';
const rootReducer = combineReducers({
    list,
    user,
  })

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
