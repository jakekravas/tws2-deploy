import React, { useState } from 'react';
import DraggableTOrder from './DraggableTOrder';

const RenderedUOrders = ({ unscheduledWorkOrders }) => {

  const [filterLocation, setFilterLocation] = useState("");
  const [filterOrderId, setFilterOrderId] = useState("");
  const [filterTrailerId, setFilterTrailerId] = useState("");
  const [filterIntWashType, setFilterIntWashType] = useState("");

  return (
    <div id="wash-types-container">
      <div id="wt-table">
        <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th className="unscheduled-order-th">Location</th>
            <th className="unscheduled-order-th">Order ID</th>
            <th className="text-center unscheduled-order-th">Trailer</th>
            <th className="text-center unscheduled-order-th">Int Wash Type</th>
            <th className="text-center unscheduled-order-th">Team Duration</th>
            <th className="text-center unscheduled-order-th">Solo Duration</th>
            <th className="text-center unscheduled-order-th">Needed By</th>
            <th className="unscheduled-order-th"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                className="unscheduled-order-filter"
                type="text"
                placeholder="Filter"
                value={filterLocation}
                onChange={e => setFilterLocation(e.target.value)}
              />
            </td>
            <td>
              <input
                className="unscheduled-order-filter"
                type="text"
                placeholder="Filter"
                value={filterOrderId}
                onChange={e => setFilterOrderId(e.target.value)}
              />
            </td>
            <td>
              <input
                className="unscheduled-order-filter"
                type="text"
                placeholder="Filter"
                value={filterTrailerId}
                onChange={e => setFilterTrailerId(e.target.value)}
              />
            </td>
            <td>
              <input
                className="unscheduled-order-filter"
                type="text"
                placeholder="Filter"
                value={filterIntWashType}
                onChange={e => setFilterIntWashType(e.target.value)}
              />
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          {unscheduledWorkOrders.length > 0 && unscheduledWorkOrders.filter(
            wo =>
            wo.wash_location_id.includes(filterLocation.toUpperCase()) &&
            wo.order_id.includes(filterOrderId) &&
            wo.trailer_id.includes(filterTrailerId) &&
            (wo.int_wash_code === null ||
            wo.int_wash_code.includes(filterIntWashType.toUpperCase()))
          ).map(wo => (
            <DraggableTOrder
              key={wo.order_id.trim()}
              wo={wo}
              id={wo.order_id.trim()}
              name={`Order ${wo.order_id.trim()}`}
              cityState={`${wo.wash_location_id}`}
              text={wo.text}
              duration={(wo.int_duration_mins_team + wo.ext_duration_mins_team) * 60}
              teamDuration={1}
              soloDuration={2}
            />
          ))}
        </tbody>
        </table>
      </div>
    </div>
  )
}

export default RenderedUOrders
