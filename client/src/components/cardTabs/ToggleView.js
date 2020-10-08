import React, { useState } from 'react';
import { connect } from "react-redux";
import WashSchedule from "./WashSchedule";
import HoursOfOperation from "./HoursOfOperation";
import { getAllLocations, getLocationInfo } from "../../actions/location";

const ToggleView = ({ getLocationInfo, location: { locations, selectedLocation, loading } }) => {

  const [view, setView] = useState("schedule");

  return (
    <div>
      <div className="text-center">
        <label className="mb-0 text-dark" htmlFor="location">Location:</label>&nbsp;&nbsp;&nbsp;
        <select onChange={e => getLocationInfo(e.target.value)} className="text-center mt-3 mr-3" name="location" id="">
          {!selectedLocation && <option value="">--</option>}
          {!loading && locations && 
            locations.map(loc => (
            <option value={loc._id} key={loc._id}>{loc.city}, {loc.state}</option>
          ))}
        </select>
      </div>
      <div className="text-center my-4">
        <button
          onClick={() => setView("schedule")}
          className={view === "schedule" ? "scheduler-bay-btn-1 active-sched" : "scheduler-bay-btn-1"}
        >
          Scheduler
        </button>

        <button
          onClick={() => setView("hours")}
          className={view === "hours" ? "scheduler-bay-btn-2 active-sched" : "scheduler-bay-btn-2"}
        >
          Hours of Service
        </button>
      </div>
      {
        view === "schedule" ?
        <WashSchedule/>
        :
        <HoursOfOperation/>
      }
    </div>
  )
}

const mapStateToProps = state => ({
  location: state.location
});

export default connect(mapStateToProps, { getAllLocations, getLocationInfo })(ToggleView)
