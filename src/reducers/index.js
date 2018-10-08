import { combineReducers } from "redux";
import { createStore } from "redux";
import actionTypes from '../actions/types';


function EditReducer (state = null, action) {
  switch (action.type) {
      case actionTypes.EDIT_USER:
          return action.payload;
      case actionTypes.NEW_USER:
          return null;
      default:
          return state;
  }

}
function LoadingReducer (state = true, action) {
  switch (action.type) {
      case actionTypes.YES_LOADING:
          return true;
      case actionTypes.FINISH_LOADING:
          return false;
      default:
          return state;
  }

}

function UsersReducer (state = [], action) {
  switch (action.type) {
    case actionTypes.SET_USERS:
      return action.payload;
    
    default:
      return state;
  }

}

function PostSuccessReducer (state = null, action) {
  switch (action.type) {
    case actionTypes.POST_SUCCESS:
      return true;
    case actionTypes.FALSE_POST:
      return false;
    default:
      return state;
  }

}

function PostErrorReducer (state = null, action) {
  switch (action.type) {
    case actionTypes.POST_ERROR:
      return action.payload;
    default:
      return state;
  }

}

const rootReducer = combineReducers({
  users: UsersReducer,
  isLoading: LoadingReducer,
  user: EditReducer,
  postSuccess: PostSuccessReducer, 
  postError: PostErrorReducer
});

const store = createStore(
  rootReducer, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

export default store;
