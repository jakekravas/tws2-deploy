import React, { useEffect, useState } from 'react';
import WashTypes from "./cardTabs/WashTypes";
import ToggleView from "./cardTabs/ToggleView";
import { connect } from "react-redux";
import { getAllLocations } from "../actions/location";
import { v4 as uuidv4 } from 'uuid';

import { getUser } from "../actions/user";

const Card = ({ user, getUser, getAllLocations }) => {

  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    // const userToGet = window.location.href.split("3000/")[1].replace("/", "_");
    const userToGet = window.location.href.split("3000/")[1];
    // const userToGet = window.location.href.split("/")[1];
    console.log(userToGet);
    getUser(userToGet);
    // getAllLocations();
    setCurrentUser(userToGet);
  }, []);

  return (
  // <div className="card col-md-9 mx-auto my-4 p-0">
  <div className="card col-lg-9 mx-auto my-4 p-0">
    <div className="card-header text-center">
      <ul className="nav nav-tabs card-header-tabs pull-right"  id="myTab" role="tablist">
        <li className="nav-item">
          <a className="nav-link active" id="hours-of-operation-tab" data-toggle="tab" href="#hours-of-operation" role="tab" aria-controls="hours-of-operation" aria-selected="true">Tank Wash Scheduler</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="wash-types-tab" data-toggle="tab" href="#wash-types" role="tab" aria-controls="wash-types" aria-selected="false">Wash Types</a>
        </li>
      </ul>
    </div>

    <div className="card-body p-0">
      <div className="tab-content" id="myTabContent">
        <div className="tab-pane fade show active" id="hours-of-operation" role="tabpanel" aria-labelledby="home-tab">
          <ToggleView currentUser={currentUser} />
        </div>
        <div className="tab-pane fade" id="wash-types" role="tabpanel" aria-labelledby="profile-tab">
          <WashTypes/>
        </div>
      </div>
    </div>
  </div>
  )
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, { getUser, getAllLocations })(Card)
