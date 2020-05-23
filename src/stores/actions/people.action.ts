import {
  GET_PEOPLE,
  GET_PEOPLE_FULFILLED,
  GET_PEOPLE_REJECTED,
} from '../constants/people.constant'

//Define your action create that set your loading state.
export const fetchData = (bool: any) => {
  //return a action type and a loading state indicating it is getting data.
  return {
    type: GET_PEOPLE,
    payload: bool,
  }
}

export const fetchDataFulfilled = (data: any) => {
  //Return a action type and a loading to false, and the data.
  return {
    type: GET_PEOPLE_FULFILLED,
    payload: data,
    loading: false,
  }
}

export const fetchDataRejected = (error: any) => {
  //Return a action type and a payload with a error
  return {
    type: GET_PEOPLE_REJECTED,
    payload: error,
    loading: false,
  }
}
