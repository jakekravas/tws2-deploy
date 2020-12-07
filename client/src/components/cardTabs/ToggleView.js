import React, { useState } from 'react';
import { connect } from "react-redux";
import WashSchedule from "./WashSchedule";
import HoursOfOperation from "./HoursOfOperation";
import { getAllLocations, getLocationInfo } from "../../actions/location";
import { getUser, getTrailerWashWos } from "../../actions/user";

const ToggleView = ({ getUser, getTrailerWashWos, currentUser, getLocationInfo, location: { locations, selectedLocation, loading }, user: { terminals } }) => {

  const [view, setView] = useState("schedule");

  const test = () => {
    setView("schedule");
    getUser(currentUser);
    getTrailerWashWos();
  }

  return (
    <div>
      <div className="text-center">
        <label style={{visibility: view === "schedule" ? "hidden" : "initial"}} className="mb-0 text-dark" htmlFor="location">Location:</label>&nbsp;&nbsp;&nbsp;
          <select style={{visibility: view === "schedule" ? "hidden" : "initial"}} onChange={e => getLocationInfo(e.target.value)} className="text-center mt-3 mr-3" name="location" id="">
            {!selectedLocation && <option value="">--</option>}
            {/* {!loading && terminals && */}
            {terminals &&
              terminals.map(loc => (
              <option value={loc.id} key={loc.id}>{loc.city}, {loc.state}</option>
            ))}
          </select>
      </div>

      <div className="text-center my-4">
        <button
          // onClick={() => setView("schedule")}
          onClick={test}
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
        <HoursOfOperation currentUser={currentUser} />
      }
    </div>
  )
}

const mapStateToProps = state => ({
  location: state.location,
  user: state.user
});

export default connect(mapStateToProps, { getUser, getTrailerWashWos, getAllLocations, getLocationInfo })(ToggleView)
