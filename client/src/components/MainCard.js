import React, {useEffect} from 'react';
import WashTypes from "./cardTabs/WashTypes";
import ToggleView from "./cardTabs/ToggleView";
import { connect } from "react-redux";
import { getAllLocations } from "../actions/location";

const Card = ({ getAllLocations }) => {

  useEffect(() => {
    getAllLocations();
  }, []);

  return (
  <div className="card col-md-9 mx-auto my-4 p-0">
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
          <ToggleView/>
        </div>
        <div className="tab-pane fade" id="wash-types" role="tabpanel" aria-labelledby="profile-tab">
          <WashTypes/>
        </div>
      </div>
    </div>
  </div>
  )
}

export default connect(null, { getAllLocations })(Card)