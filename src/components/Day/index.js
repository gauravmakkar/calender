import React from "react";
import { connect } from "react-redux";
import * as actions from "./../../actions";
import EventForm from "./EventForm";
import Event from "./Event";
import _sortBy from "lodash/sortBy";
import "./index.css";

const defaultColor = "#000";

class Day extends React.Component {
  state = {
    editEvent: {
      id: null,
      startTime: null,
      endTime: null,
      description: null,
    }
  };

  handleSetEdit = event => {
    this.props.handleSetEditDay(this.props.day);

    this.setState({
      editEvent: {
        ...this.state.editEvent,
        ...event
      }
    });
  };

  handleCreateUpdateEvent = (e, update) => {
    e.preventDefault();

    const form = e.target;
    const description = form.querySelector(".description").value.trim();
    /**
     * Validations
     */
    if (description.length && form.querySelectorAll(".rc-time-picker-input")[0].value.length && form.querySelectorAll(".rc-time-picker-input")[1].value) {
      const payload = {
        date: this.props.date,
        startTime: form.querySelectorAll(".rc-time-picker-input")[0].value,
        endTime: form.querySelectorAll(".rc-time-picker-input")[1].value,
        description: description,
      };

      if (update.id) {
        payload["id"] = update.id;
        this.props.updateEvent(payload);
      } else {
        this.props.createEvent(payload);
      }

      this.props.handleSetEditDay(null);
      this.setState({ editEvent: {} }); //Reset the form after saving it.
    }
  };

  handleDeleteEvent = id => {
    this.props.deleteEvent(this.props.date, id);
  };

  render() {
    const events =
      _sortBy(this.props.events[this.props.date], "startTime") || [];

    const cssClasses = this.props.firstDayIndex
      ? `day first-index-${this.props.firstDayIndex}`
      : "day";

    return (
      <article className={cssClasses}>
        {!this.props.editDay && (
          <button
            className="btn-new-event"
            onClick={() => this.props.handleSetEditDay(this.props.day)}
          >
            <i className="fas fa-plus-circle" />
          </button>
        )}

        {this.props.editDay === this.props.day ? (
          <EventForm
            event={this.state.editEvent}
            handleSetColor={this.handleSetColor}
            handleSetEditDay={this.props.handleSetEditDay}
            handleCreateUpdateEvent={this.handleCreateUpdateEvent}
            defaultColor={defaultColor}
          />
        ) : (
          <React.Fragment>
            <header>{this.props.day}</header>

            {events.length
              ? events.map((event, i) => {
                return (
                  <Event
                    key={i}
                    event={event}
                    handleSetEdit={this.handleSetEdit}
                    handleDeleteEvent={this.handleDeleteEvent}
                  />
                );
              })
              : null}
          </React.Fragment>


        )}
      </article>
    );
  }
}

const mapStateToProps = state => {
  return {
    events: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createEvent: payload => dispatch(actions.createEvent(payload)),
    updateEvent: payload => dispatch(actions.updateEvent(payload)),
    deleteEvent: (date, id) => dispatch(actions.deleteEvent(date, id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Day);
