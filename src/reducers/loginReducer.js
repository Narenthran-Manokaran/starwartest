import {
    GET_PEOPLE_INIT,
    GET_PEOPLE_SUCCESS,
    GET_PEOPLE_FAILURE,
  } from './../actions/action-type'
  
  const initialState = {
      isAuthenticated: false,
      user: null,
      errorMessage: null,
      error: false,
      isFetching: false,
  }
  
  export default function commonReducer(state = initialState, action) {
    switch (action.type) {
    case GET_PEOPLE_INIT:
      return {
        ...state,
        isFetching: true,
        error: false,
      }
    case GET_PEOPLE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        ...action.data,
    }
    case GET_PEOPLE_FAILURE:
      return {
        ...state,
        isFetching: false,
        ...action.error,
    }
    default:
      return state
    }
  }
  
  