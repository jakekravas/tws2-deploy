import React from 'react';
import {DayPilot} from "daypilot-pro-react";

function DraggableOrder(props) {
  console.log(props);
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
    <div className="work-order-item-container">
      {/* <div className="work-order-trailer">Trailer {props.wo.trailer_id} - {props.cityState}</div> */}
      <div className="work-order-trailer">{props.name} - {props.cityState}</div>
      <div key={props.wo.id} className="work-order-content">
        <span className="work-order-title-section">
          <span className="work-order-duration">
            {/* Team <i className="far fa-clock"/> { */}
            Team: {
            Math.floor((props.wo.int_duration_mins_team + props.wo.ext_duration_mins_team) / 60)
            }h&nbsp;
            {
            ((props.wo.int_duration_mins_team + props.wo.ext_duration_mins_team) % 60) > 0 && <span>{(props.wo.int_duration_mins_team + props.wo.ext_duration_mins_team) % 60}m</span>
            }<br/>
            Solo: {
            Math.floor((props.wo.int_duration_mins_solo + props.wo.ext_duration_mins_solo) / 60)
            }h&nbsp;
            {
            ((props.wo.int_duration_mins_solo + props.wo.ext_duration_mins_solo) % 60) > 0 && <span>{(props.wo.int_duration_mins_solo + props.wo.ext_duration_mins_solo) % 60}m</span>
            }
          </span>
        </span>
        <span className="work-order-dates">
          {/* {props.wo.unscheduled_text} */}
          {/* {props.wo.text} */}
          Needed:
          <br/>
          {props.wo.unscheduled_text}
          {/* {props.wo.needed_date} */}
          {/* {props.wo.text.split("by")[1]} */}
          {/* {props.wo.needed_date_display_str} */}
        </span>
      </div>
    </div>
  </div>);
}

export default DraggableOrder;
