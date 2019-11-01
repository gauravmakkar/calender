import React from "react";
import "./index.css";

/**
 * The component will display the days in header
 * @param props
 */
const headerWeekDays = props => (
  <header className="weekdays">
    {props.days.map((weekday, i) => (
      <strong key={i}>{weekday}</strong>
    ))}
  </header>
);

export default headerWeekDays;
