import * as actionTypes from "./../constants";

// Action creators
const createEventAction = event => {
  return {
    type: actionTypes.CREATE_EVENT,
    event: event
  };
};

const updateEventrAction = event => {
  return {
    type: actionTypes.UPDATE_EVENT,
    event: event
  };
};

const deleteEventAction = (date, id) => {
  return {
    type: actionTypes.DELETE_EVENT,
    date: date,
    id: id
  };
};

// Actions
export const createEvent = payload => {
  return dispatch => {
    dispatch(createEventAction(payload));
  };
};

export const updateEvent = payload => {
  return dispatch => {
    dispatch(updateEventrAction(payload));
  };
};

export const deleteEvent = (date, id) => {
  return dispatch => {
    dispatch(deleteEventAction(date, id));
  };
};
