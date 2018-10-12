import axios from 'axios';
import { hashHistory } from 'react-router';
import {
  GET_PEOPLE_INIT,
  GET_PEOPLE_SUCCESS,
  GET_PEOPLE_FAILURE,
  GET_PLANET_INIT,
  GET_PLANET_SUCCESS,
  GET_PLANET_FAILURE,
} from './action-type'

const getPeoplesInit = data => ({
  type: GET_PEOPLE_INIT,
  data,
})

const getPeoplesSuccess = data => ({
  type: GET_PEOPLE_SUCCESS,
  data,
})

const getPeoplesFailure = error => ({
  type: GET_PEOPLE_FAILURE,
  error,
})

const getPlanetInit = data => ({
  type: GET_PLANET_INIT,
  data,
})

const getPlanetSuccess = data => ({
  type: GET_PLANET_SUCCESS,
  data,
})

const getPlanetFailure = error => ({
  type: GET_PLANET_FAILURE,
  error,
})

export const getPeoples = (userName, password) => (dispatch) => {
  dispatch(getPeoplesInit());
  axios.get(`https://swapi.co/api/people/?search=${userName}`)
  .then(function (response) {
    if (!response.data.count) {
      const error = {
        error: true,
        errorMessage: 'User Name Not Available.',
      }
      return dispatch(getPeoplesFailure(error));
    }
    if (response.data && response.data.count > 0) {
      const isAuthenticated = response.data.results[0].birth_year === password
      if (isAuthenticated) {
        const data = {
          user: response.data.results[0],
          isAuthenticated,
        }
        dispatch(getPeoplesSuccess(data));
        return isAuthenticated && hashHistory.push('/Search');
      }
      const error = {
        error: true,
        errorMessage: 'Password not matched.',
      }
      return dispatch(getPeoplesFailure(error));
    }
  })
  .catch(function (error) {
    dispatch(getPeoplesFailure(error));
  })
}

export const getPlanet = (search) => (dispatch) => {
  dispatch(getPlanetInit());
  axios.get(`https://swapi.co/api/planets/?search=${search}`)
  .then(function (response) {
    if (!response.data.count) {
      const error = {
        error: true,
        errorMessage: 'No match found',
      }
      return dispatch(getPlanetFailure(error));
    }
    dispatch(getPlanetSuccess(response.data.results));
  })
  .catch(function (error) {
    dispatch(getPlanetFailure(error));
  })
}
