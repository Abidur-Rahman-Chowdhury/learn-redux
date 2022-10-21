// need to instal axios for api call
// and redux-thunk middleware
//  import redux and createStore for store
const redux = require('redux');
const createStore = redux.createStore;
//  import axios

const axios = require('axios');

const applyMiddleware = redux.applyMiddleware;

// import thunk middleware

const thunkMiddleware = require('redux-thunk').default;

//  initial state
const initialState = {
  loading: false,
  users: [],
  error: '',
};
// all action type
const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED';
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED';
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED';

//  all action function
const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUESTED,
  };
};
const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCEEDED,
    payload: users,
  };
};
const fetchUsersFailure = (error) => {
  return {
    type: FETCH_USERS_FAILED,
    payload: error,
  };
};

//  reducer function

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCEEDED:
      return {
        loading: false,
        users: action.payload,
        error: '',
      };
    case FETCH_USERS_FAILED:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };
  }
};

const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUsersRequest());
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        //  res.data is the users
        const users = res.data.map((user) => user.id);
        dispatch(fetchUsersSuccess(users));
      })
      .catch((error) => {
        // error.message
        dispatch(fetchUsersFailure(error.message));
      });
  };
};

// passing reducer and apply middleware in the store
const store = createStore(reducer, applyMiddleware(thunkMiddleware));

// for see output in the console
store.subscribe(() => console.log(store.getState()));

store.dispatch(fetchUsers());
