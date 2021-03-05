import * as types from "./UserTypes";

const INITIAL_STATE = {
  userList:  null
};

// Replace with you own reducer
export default (state = INITIAL_STATE, action) => {
  console.log("Reducer", state, action);

  switch (action.type) {
    case types.SET_USER:
      return {
        ...state,
        user: action.payload
      };
    case types.GET_USER:
      return {
        ...state,
        userList: action.payload,
      };
    default:
      return state;
  }
};
