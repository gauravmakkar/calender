import React from "react";
import "./index.css";

/**
 * The component will display the event in a calender day.
 * @param props
 */
const event = props => (
  <article className="event">
    <div className="tools">
      <button onClick={() => props.handleDeleteEvent(props.event.id)}>
        <i className="fas fa-trash-alt" />
      </button>
      <button onClick={() => props.handleSetEdit(props.event)}>
        <i className="fas fa-edit" />
      </button>
    </div>
    <strong>{props.event.description}</strong>
    <time>{props.event.startTime}- {props.event.endTime}</time>
  </article>
);

export default event;
