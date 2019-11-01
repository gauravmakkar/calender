import React from 'react'
import TimePicker from 'rc-time-picker'
import moment from 'moment'
import 'rc-time-picker/assets/index.css'
import './index.css'
import './../../Modal/index.css'

const eventForm = props => {
  const startTime = props.event.startTime
    ? moment(props.event.startTime, 'HH:mm a')
    : moment()
      .hour(0)
      .minute(0)
  const endTime = props.event.endTime
    ? moment(props.event.endTime, 'HH:mm a')
    : moment()
      .hour(0)
      .minute(0)

  return (
    <div className='modal display-block'>
      <div className='modal-main'>
        <form
          method="post"
          onSubmit={e => props.handleCreateUpdateEvent(e, props.event)}
        >
          <div>
            <label>Name</label>
            <div>
              <input
                style={{height: 28, width: 160}}
                className="description"
                placeholder="event"
                maxLength="30"
                defaultValue={props.event.description}
              />
            </div>

          </div>


          <div style={{marginTop: 15}}>
            <label>Start</label>
            <div>
              <TimePicker
                showSecond={false}
                defaultValue={startTime}
                format="h:mm a"
                use12Hours
                inputReadOnly
              />
            </div>

          </div>
          <div style={{marginTop: 15}}>
            <label>End</label>
            <div>
              <TimePicker
                showSecond={false}
                defaultValue={endTime}
                format="h:mm a"
                use12Hours
                inputReadOnly
              />
            </div>

          </div>

          <div className='actions' style={{marginTop: 15}}>
            <button className="btn-submit">Save</button>

            <button
              className="btn-cancel"
              onClick={() => props.handleSetEditDay(null)}
            >
              Cancel
            </button>
          </div>

        </form>
      </div>

    </div>


  )
}

export default eventForm
