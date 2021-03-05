import * as types from "./UserTypes";

//Replace action name and update action types
export const actionRequest = () => {
  const userList = JSON.parse(localStorage.getItem('user'))
  return({
    type: types.GET_USER,
    payload: userList
})};

export const actionReceive = payload => ({
  type: types.SET_USER,
  payload
});
