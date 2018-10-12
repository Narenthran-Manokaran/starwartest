import {
    GET_PLANET_INIT,
    GET_PLANET_SUCCESS,
    GET_PLANET_FAILURE,
  } from './../actions/action-type'
  
  const initialState = {
      planetList: [],
      errorMessage: null,
      error: false,
      isFetching: false,
  }
  
  export default function commonReducer(state = initialState, action) {
    switch (action.type) {
    case GET_PLANET_INIT:
      return {
        ...state,
        isFetching: true,
        error: false,
        planetList: [],
      }
    case GET_PLANET_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        planetList: action.data,
    }
    case GET_PLANET_FAILURE:
      return {
        ...state,
        isFetching: false,
        ...action.error,
    }
    default:
      return state
    }
  }
  
  