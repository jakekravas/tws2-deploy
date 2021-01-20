import React, { useEffect, useState } from 'react';
import WashTypes from "./cardTabs/WashTypes";
import ToggleView from "./cardTabs/ToggleView";
import { connect } from "react-redux";
import { getAllLocations } from "../actions/location";
import { getUser, checkForUser } from "../actions/user";

const Card = ({ user, checkForUser, getUser, getAllLocations }) => {

  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    
    if (user.user === null) {
      checkForUser();
    } else {
      setCurrentUser(user.user.replace("\\", "_"));
    }

    // const userToGet = window.location.href.split("user_")[1];
    // getUser(userToGet);
    // getAllLocations();
    // setCurrentUser(userToGet);
  }, [user]);

  return (
  <div className="card col-lg-9 mx-auto my-4 p-0">
    {user.user ? <p>Logged in as {user.user}</p> : <p>Loading...</p>}
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

export default connect(mapStateToProps, { checkForUser, getUser, getAllLocations })(Card)
