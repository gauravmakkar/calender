import * as actionTypes from "./../constants";
import uniqueId from "uuid/v1";

const initialState = localStorage.getItem('events')? JSON.parse(localStorage.getItem('events')) : {};
/**
 * The method will create an event and will update the local storage.
 * @param prevState
 * @param action
 * @returns {{}}
 */
const createEvent = (prevState, action) => {
  const event = {
    id: uniqueId(),
    endTime: action.event.endTime,
    startTime: action.event.startTime,
    description: action.event.description,
  };

  let updatedState= {
    ...prevState,
    [action.event.date]: prevState[action.event.date]
      ? prevState[action.event.date].concat(event)
      : [event]
  }

  localStorage.setItem('events', JSON.stringify(updatedState))

  return updatedState;
};
/**
 * The method will update an existing event and update the local storage.
 * @param prevState
 * @param action
 * @returns {{}}
 */
const updateEvent = (prevState, action) => {
  const events = [];
  [...prevState[action.event.date]].forEach(event => {
    if (action.event.id === event.id) {
      event = {
        id: event.id,
        startTime: action.event.startTime,
        endTime: action.event.endTime,
        description: action.event.description,
      };
    }
    events.push(event);
  });

  let updatedState= {
    ...prevState,
    [action.event.date]: events
  }
  localStorage.setItem('events', JSON.stringify(updatedState))

  return updatedState;
};

/**
 * The method will delete an event and update the local storage.
 * @param prevState
 * @param action
 * @returns {{}}
 */

const deleteEvent = (prevState, action) => {
  let updatedState= {
    ...prevState,
    [action.date]: [...prevState[action.date]].filter(event => {
      return event.id !== action.id;
    })
  }
  localStorage.setItem('events', JSON.stringify(updatedState))
  return updatedState;
};

const reducer = (prevState = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_EVENT:
      return createEvent(prevState, action);
    case actionTypes.UPDATE_EVENT:
      return updateEvent(prevState, action);
    case actionTypes.DELETE_EVENT:
      return deleteEvent(prevState, action);
    default:
      return prevState;
  }
};

export default reducer;
