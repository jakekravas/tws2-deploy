import React from 'react';
import {DayPilot} from "daypilot-pro-react";

function DraggableTOrder(props) {
  return (
  <tr className={"draggable-item unscheduled-order"} ref={element => {
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
    <td>{props.cityState}</td>
    <td>{props.wo.order_id.trim()}</td>
    <td>{props.wo.trailer_id}</td>
    <td>{props.wo.int_wash_code}</td>
    <td>
      {Math.floor((props.wo.int_duration_mins_team + props.wo.ext_duration_mins_team) / 60)}h&nbsp;
      {((props.wo.int_duration_mins_team + props.wo.ext_duration_mins_team) % 60) > 0 && <span>{(props.wo.int_duration_mins_team + props.wo.ext_duration_mins_team) % 60}m</span>}
    </td>
    <td>
      {
        Math.floor((props.wo.int_duration_mins_solo + props.wo.ext_duration_mins_solo) / 60)
        }h&nbsp;
        {((props.wo.int_duration_mins_solo + props.wo.ext_duration_mins_solo) % 60) > 0 && <span>{(props.wo.int_duration_mins_solo + props.wo.ext_duration_mins_solo) % 60}m</span>
      }
    </td>
    <td>{props.wo.unscheduled_text}</td>
    <td>
      <i className="fas fa-info-circle"/>
    </td>
  </tr>);
}

export default DraggableTOrder;