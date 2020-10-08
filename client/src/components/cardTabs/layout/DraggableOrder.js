import React from 'react';
import {DayPilot} from "daypilot-pro-react";

function DraggableOrder(props) {
  return (
  <div className={"draggable-item"} ref={element => {
    if (!element) {
      return;
    }
    DayPilot.Scheduler.makeDraggable({
      element: element,
      id: props.id,
      text: props.text,
      duration: props.duration,
      keepElement: true
    });
  }}>
    <div key={props.wo.id} className="work-order">
      <span className="work-order-title-section">
        <span className="work-order-trailer">Trailer {props.wo.trailer_id}</span>
        <br/>
        <span className="work-order-duration">
          <i className="far fa-clock"/> {
          Math.floor((props.wo.int_duration_mins_team + props.wo.ext_duration_mins_team) / 60)
          }h&nbsp;
          {
          ((props.wo.int_duration_mins_team + props.wo.ext_duration_mins_team) % 60) > 0 && <span>{(props.wo.int_duration_mins_team + props.wo.ext_duration_mins_team) % 60}m</span>
          }
        </span>
      </span>
      <span className="work-order-dates">
        Needed:
        <br/>
        {props.wo.needed_date_display_str}
      </span>
    </div>
  </div>);
}

export default DraggableOrder;
