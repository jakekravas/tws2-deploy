import React, { Component } from 'react';
import { DayPilotScheduler } from "daypilot-pro-react";
import DraggableOrder from "../layout/DraggableOrder"

class Scheduler extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // timeHeaders: [{"groupBy": "Day"}, {"groupBy": "Hour"}],
      timeHeaders: [{"groupBy": "Hour"}],
      treeEnabled: true,
      treeAnimation: false,
      cellDuration: 30,
      // cellDuration: this.props.cellDuration,
      allowEventOverlap: false,
      currentDP: null,
      cellHeight: 20,
      hourWidth: 50,
      currentArgs: null,
      inpDisable: true,
      inpDuration: null,
      inpVal: "",
      inpId: null,
      // unscheduledWorkOrders: null,
      unscheduledWorkOrders: [],
      modalOpen: false,
      moveDisabled: true,
      durationBarVisible: true,
      unscheduledOrders: [],
      unscheduledOrdersDisabled: [],
      selectedStartTime: null,
      alertDisplay: "none",
      editOpen: false,
      // sortBy: "location",
      sortBy: "needed date",
      sortByy: null,
      sortAsc: true,
      sortAscc: null,
      filterText: "",
      onBeforeEventRender: args => {
        args.data.moveDisabled = this.props.disableMove;
      },
      // prevents box resizing
      onEventResizing: () => this.forceUpdate(),
      // When order is dragged and released in the scheduler
      onEventMoved: args => {
        // console.log(args.e.data);
        // Location code
        const loc = args.e.data.resource.slice(0, -1);

        // Bay
        const bay = parseInt(args.e.data.resource[args.e.data.resource.length-1]);

        // Find order to update
        const orderToUpdate = this.props.workOrders.filter(wo => wo.order_id.trim() === args.e.data.id.trim())[0];
        const endTime = new Date(args.e.data.start.value);
        let duration;
        // console.log(orderToUpdate);

        // browsers add 7 hrs to this data object because it ends in "0Z", so we remove that here
        orderToUpdate.needed_date = orderToUpdate.needed_date.replace("0Z", "");

        // So we know what start and end times to look at
        const timesToLookAt = this.props.hoursArr.filter(h => h.location_id === loc && h.bay === bay);

        const argStart = new Date(args.e.data.start.value);

        const s1Start = new Date(`${this.props.dateStr}T${timesToLookAt[0].shift_one_start}`);
        const s1End = new Date(`${this.props.dateStr}T${timesToLookAt[0].shift_one_end}`);
        const s1Type = timesToLookAt[0].shift_one_type;

        const s2Open = timesToLookAt[0].shift_two_open;
        const s2Start = new Date(`${this.props.dateStr}T${timesToLookAt[0].shift_two_start}`);
        const s2End = new Date(`${this.props.dateStr}T${timesToLookAt[0].shift_two_end}`);
        const s2Type = timesToLookAt[0].shift_two_type;

        // If a work order is dragged into the wrong location
        if (loc !== orderToUpdate.wash_location_id.trim()) {
          this.props.preventTimeExceed("loc");
        } else {
          
          if (argStart < s1Start) {
            this.props.preventTimeExceed("start");
          } else if (argStart >= s1Start && argStart < s1End) {
  
            if (s1Type === "team") {
              duration = orderToUpdate.int_duration_mins_team + orderToUpdate.ext_duration_mins_team;
            } else {
              duration = orderToUpdate.int_duration_mins_solo + orderToUpdate.ext_duration_mins_solo;
            }
  
            // Set duration
            endTime.setMinutes(endTime.getMinutes() + duration);

            if (new Date(endTime) > new Date(orderToUpdate.needed_date)){
              // console.log("end");
              // console.log(new Date(endTime));
              // console.log(new Date(orderToUpdate.needed_date));
              this.props.preventTimeExceed("end");
            }
  
            // If end time is within shift 1
            // if (endTime <= s1End) {
            //   this.props.test(
            //     args.e.data.id,
            //     args.e.data.resource,
            //     args.e.data.start.value,
            //     new Date(endTime.toString().split("GMT")[0]+" UTC").toISOString().split(".")[0]
            //   );
            // } else {
            //   this.props.preventTimeExceed("end");
            // }
            
            if (endTime > s1End) {
              this.props.preventTimeExceed("end");
            // } else if (endTime < new Date(orderToUpdate.needed_date)) {
            } else if (endTime > new Date(orderToUpdate.needed_date)) {
              this.props.preventTimeExceed("late");
            } else {
              this.props.test(
                args.e.data.id,
                args.e.data.resource,
                args.e.data.start.value,
                new Date(endTime.toString().split("GMT")[0]+" UTC").toISOString().split(".")[0]
              );
            }

          // If shift 2 is open and the start of args is withing shift 2 range
          } else if (s2Open === true && argStart >= s2Start && argStart < s2End) {

            if (s2Type === "team") {
              duration = orderToUpdate.int_duration_mins_team + orderToUpdate.ext_duration_mins_team;
            } else {
              duration = orderToUpdate.int_duration_mins_solo + orderToUpdate.ext_duration_mins_solo;
            }
  
            // Set duration
            endTime.setMinutes(endTime.getMinutes() + duration);
  
            // If end time is within shift 2
            // if (endTime <= s2End) {
            //   this.props.test(
            //     args.e.data.id,
            //     args.e.data.resource,
            //     args.e.data.start.value,
            //     new Date(endTime.toString().split("GMT")[0]+" UTC").toISOString().split(".")[0]
            //   );
            // } else {
            //   this.props.preventTimeExceed("end");
            // }

            if (endTime > s2End) {
              this.props.preventTimeExceed("end");
            // } else if (endTime < new Date(orderToUpdate.needed_date)) {
            } else if (endTime > new Date(orderToUpdate.needed_date)) {
              this.props.preventTimeExceed("late");
            } else {
              this.props.test(
                args.e.data.id,
                args.e.data.resource,
                args.e.data.start.value,
                new Date(endTime.toString().split("GMT")[0]+" UTC").toISOString().split(".")[0]
              );
            }
          }
        }
      },
      timeRangeSelectedHandling: "Enabled",
      onTimeRangeSelected: () => this.calendar.clearSelection(),
      eventDeleteHandling: "Update",
      onEventDelete: args => this.props.onUnschedule(args.e.data.id),

      // HIDING CELLS
      onIncludeTimeCell: args => {

        // If cell is before start time
        if (new Date(args.cell.end.value) <= this.props.startTime) {
          args.cell.visible = false;
        }
        
        // If cell is after end time
        if (new Date(args.cell.start.value) >= this.props.endTime) {
          args.cell.visible = false;
        }
      },

      // DISABLING CELLS
      onBeforeCellRender: args => {
        
        // Disable cells of location title row
        if (typeof args.cell.resource === "number") {
          args.cell.disabled = true;
          args.cell.backColor = "#eee";
        }

        for (let i = 0; i < this.props.hoursArr.length; i++) {
          
          if (args.cell.resource === `${this.props.hoursArr[i].location_id}${this.props.hoursArr[i].bay}`) {
            if (!this.props.hoursArr[i].is_open) {
              args.cell.disabled = true;
              args.cell.backColor = "#eee";
            }

            // Disable cells that start before the start of shift 1
            if (new Date(args.cell.start.value) < new Date(`${this.props.dateStr}T${this.props.hoursArr[i].shift_one_start}`)) {
              args.cell.disabled = true;
              args.cell.backColor = "#eee";

            // Color code shift 1 if it's a solo shift
            } else if (new Date(args.cell.start.value) >= new Date(`${this.props.dateStr}T${this.props.hoursArr[i].shift_one_start}`) && new Date(args.cell.start.value) <= new Date(`${this.props.dateStr}T${this.props.hoursArr[i].shift_one_end}`) && this.props.hoursArr[i].shift_one_type === "solo") {
              args.cell.backColor = "rgb(225, 225, 225)";
            }

            // If there's a shift 2
            if (this.props.hoursArr[i].shift_two_open) {
              
              // Disable cells that start after the end of shift 1 and before the start of shift 2
              if (new Date(args.cell.start.value) >= new Date(`${this.props.dateStr}T${this.props.hoursArr[i].shift_one_end}`) && new Date(args.cell.start.value) < new Date(`${this.props.dateStr}T${this.props.hoursArr[i].shift_two_start}`)) {
                args.cell.disabled = true;
                args.cell.backColor = "#eee";
              }

              // Color code shift 2 if it's a solo shift
              else if (new Date(args.cell.start.value) >= new Date(`${this.props.dateStr}T${this.props.hoursArr[i].shift_two_start}`) && new Date(args.cell.start.value) <= new Date(`${this.props.dateStr}T${this.props.hoursArr[i].shift_two_end}`) && this.props.hoursArr[i].shift_two_type === "solo") {
                args.cell.backColor = "rgb(225, 225, 225)";
              }

            } else {

              // Disable cells that start after the end of shift 1
              if (new Date(args.cell.start.value) >= new Date( `${this.props.dateStr}T${this.props.hoursArr[i].shift_one_end}`)) {
                args.cell.disabled = true;
                args.cell.backColor = "#eee";
              }
            } 
          }
        }
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleAlert = this.handleAlert.bind(this);
    this.handleCellDurationChange = this.handleCellDurationChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.toggleAsc = this.toggleAsc.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.setFilterText = this.setFilterText.bind(this);
    this.setEditOpen = this.setEditOpen.bind(this);
  }

  componentDidMount() {
    // load event data
    this.setState({
      startDate: this.props.dateStr,
      resources: this.props.resources,
      events: this.props.events
    });
    this.handleSort("needed date", true);
  }
  
  componentDidUpdate() {
    // console.log(this.props);
    if (this.state.startDate !== this.props.dateStr) {
      this.setState({ startDate: this.props.dateStr });
    }
    if (this.state.events !== this.props.events) {
      this.setState({ events: this.props.events });
    }
    if (this.state.resources !== this.props.resources) {
      this.setState({ resources: this.props.resources });
    }

    if (this.state.unscheduledWorkOrders !== this.props.unscheduledWorkOrders) {

      // this.setState({ unscheduledWorkOrders: this.props.unscheduledWorkOrders });
      
      // sort by needed date in ascending order
      if (this.props.sortBy === "needed date" && this.props.sortAsc) {
        this.setState({ unscheduledWorkOrders: this.props.unscheduledWorkOrders.sort((a, b) => (new Date(a.needed_date) > new Date(b.needed_date)) ? 1 : -1) });
        // sort by needed date in descending order
      } else if (this.props.sortBy === "needed date" && !this.props.sortAsc) {
        this.setState({ unscheduledWorkOrders: this.props.unscheduledWorkOrders.sort((a, b) => (new Date(a.needed_date) < new Date(b.needed_date)) ? 1 : -1) });
      }

      // sort by team duration in ascending order
      if (this.props.sortBy === "team duration" && this.props.sortAsc) {
        this.setState({ unscheduledWorkOrders: this.props.unscheduledWorkOrders.sort((a, b) => (a.int_duration_mins_team + a.ext_duration_mins_team > b.int_duration_mins_team + b.ext_duration_mins_team) ? 1 : -1) });
      // sort by team duration in descending order
      } else if (this.props.sortBy === "team duration" && !this.props.sortAsc) {
        this.setState({ unscheduledWorkOrders: this.props.unscheduledWorkOrders.sort((a, b) => (a.int_duration_mins_team + a.ext_duration_mins_team < b.int_duration_mins_team + b.ext_duration_mins_team) ? 1 : -1) });
      }

      // sort by solo duration in ascending order
      if (this.props.sortBy === "solo duration" && this.props.sortAsc) {
        this.setState({ unscheduledWorkOrders: this.props.unscheduledWorkOrders.sort((a, b) => (a.int_duration_mins_solo + a.ext_duration_mins_solo > b.int_duration_mins_solo + b.ext_duration_mins_solo) ? 1 : -1) });
      // sort by solo duration in descending order
      } else if (this.props.sortBy === "solo duration" && !this.props.sortAsc) {
        this.setState({ unscheduledWorkOrders: this.props.unscheduledWorkOrders.sort((a, b) => (a.int_duration_mins_solo + a.ext_duration_mins_solo < b.int_duration_mins_solo + b.ext_duration_mins_solo) ? 1 : -1) });
      }

    }

    if (this.props.sortBy !== this.state.sortByy || this.props.sortAsc !== this.state.sortAscc) {
      
      this.setState({ sortByy: this.props.sortBy, sortAscc: this.props.sortAsc });
      
      // sort by needed date in ascending order
      if (this.props.sortBy === "needed date" && this.props.sortAsc) {
        this.setState({ unscheduledWorkOrders: this.props.unscheduledWorkOrders.sort((a, b) => (new Date(a.needed_date) > new Date(b.needed_date)) ? 1 : -1) });
        // sort by needed date in descending order
      } else if (this.props.sortBy === "needed date" && !this.props.sortAsc) {
        this.setState({ unscheduledWorkOrders: this.props.unscheduledWorkOrders.sort((a, b) => (new Date(a.needed_date) < new Date(b.needed_date)) ? 1 : -1) });
      }

      // sort by location in ascending order
      if (this.props.sortBy === "location" && this.props.sortAsc) {
        this.setState({ unscheduledWorkOrders: this.state.unscheduledWorkOrders.sort((a, b) => (a.wash_location_id.trim() > b.wash_location_id.trim()) ? 1 : -1) });
        // sort by location in descending order
      } else if (this.props.sortBy === "location" && !this.props.sortAsc) {
        this.setState({ unscheduledWorkOrders: this.state.unscheduledWorkOrders.sort((a, b) => (a.wash_location_id.trim() < b.wash_location_id.trim()) ? 1 : -1) });
      }

      // sort by team duration in ascending order
      if (this.props.sortBy === "team duration" && this.props.sortAsc) {
        this.setState({ unscheduledWorkOrders: this.props.unscheduledWorkOrders.sort((a, b) => (a.int_duration_mins_team + a.ext_duration_mins_team > b.int_duration_mins_team + b.ext_duration_mins_team) ? 1 : -1) });
      // sort by team duration in descending order
      } else if (this.props.sortBy === "team duration" && !this.props.sortAsc) {
        this.setState({ unscheduledWorkOrders: this.props.unscheduledWorkOrders.sort((a, b) => (a.int_duration_mins_team + a.ext_duration_mins_team < b.int_duration_mins_team + b.ext_duration_mins_team) ? 1 : -1) });
      }

      // sort by solo duration in ascending order
      if (this.props.sortBy === "solo duration" && this.props.sortAsc) {
        this.setState({ unscheduledWorkOrders: this.props.unscheduledWorkOrders.sort((a, b) => (a.int_duration_mins_solo + a.ext_duration_mins_solo > b.int_duration_mins_solo + b.ext_duration_mins_solo) ? 1 : -1) });
      // sort by solo duration in descending order
      } else if (this.props.sortBy === "solo duration" && !this.props.sortAsc) {
        this.setState({ unscheduledWorkOrders: this.props.unscheduledWorkOrders.sort((a, b) => (a.int_duration_mins_solo + a.ext_duration_mins_solo < b.int_duration_mins_solo + b.ext_duration_mins_solo) ? 1 : -1) });
      }

    }
  }

  handleAlert() {
    this.setState({ alertDisplay: "block" });
    setTimeout(() => {
      this.setState({ alertDisplay: "none" });
    }, 8000);
  }
  
  handleChange(e) {
    this.setState({ inpId: e.target.value, inpDuration: e.target.id });
  }

  closeModal() {
    this.setState({ modalOpen: false, inpId: null, inpDuration: null });
  }

  handleCellDurationChange(e) {
    this.setState({ cellDuration: parseInt(e.target.value) });
  }

  handleSort(sortBy, asc) {

    // sort by needed date in ascending order
    if (sortBy === "needed date" && asc) {
      this.setState({ unscheduledWorkOrders: this.state.unscheduledWorkOrders.sort((a, b) => (new Date(a.needed_date) > new Date(b.needed_date)) ? 1 : -1) });
    // sort by needed date in descending order
    } else if (sortBy === "needed date" && !asc) {
      this.setState({ unscheduledWorkOrders: this.state.unscheduledWorkOrders.sort((a, b) => (new Date(a.needed_date) < new Date(b.needed_date)) ? 1 : -1) });
    }

    // // sort by location in ascending order
    if (sortBy === "location" && asc) {
      this.setState({ unscheduledWorkOrders: this.state.unscheduledWorkOrders.sort((a, b) => (a.wash_location_id.trim() > b.wash_location_id.trim()) ? 1 : -1) });
      // sort by location in descending order
    } else if (sortBy === "location" && !asc) {
      this.setState({ unscheduledWorkOrders: this.state.unscheduledWorkOrders.sort((a, b) => (a.wash_location_id.trim() < b.wash_location_id.trim()) ? 1 : -1) });
    }

    // sort by needed date in ascending order
    if (sortBy === "team duration" && asc) {
      this.setState({ unscheduledWorkOrders: this.state.unscheduledWorkOrders.sort((a, b) => (a.int_duration_mins_team + a.ext_duration_mins_team > b.int_duration_mins_team + b.ext_duration_mins_team) ? 1 : -1) });
    // sort by needed date in descending order
    } else if (sortBy === "team duration" && !asc) {
      this.setState({ unscheduledWorkOrders: this.state.unscheduledWorkOrders.sort((a, b) => (a.int_duration_mins_team + a.ext_duration_mins_team < b.int_duration_mins_team + b.ext_duration_mins_team) ? 1 : -1) });
    }

    // sort by needed date in ascending order
    if (sortBy === "solo duration" && asc) {
      this.setState({ unscheduledWorkOrders: this.state.unscheduledWorkOrders.sort((a, b) => (a.int_duration_mins_solo + a.ext_duration_mins_solo > b.int_duration_mins_solo + b.ext_duration_mins_solo) ? 1 : -1) });
    // sort by needed date in descending order
    } else if (sortBy === "solo duration" && !asc) {
      this.setState({ unscheduledWorkOrders: this.state.unscheduledWorkOrders.sort((a, b) => (a.int_duration_mins_solo + a.ext_duration_mins_solo < b.int_duration_mins_solo + b.ext_duration_mins_solo) ? 1 : -1) });
    }
  }

  handleSortChange(e) {
    this.props.handleSortChange(e.target.value);
    // this.setState({ sortBy: e.target.value });
    // this.handleSort(e.target.value, this.state.sortAsc); 
  }

  toggleAsc() {

    this.props.toggleAsc();

    // if (this.state.sortAsc) {
    //   this.setState({ sortAsc: false });
    //   this.handleSort(this.state.sortBy, false);
    // } else {
    //   this.setState({ sortAsc: true });
    //   this.handleSort(this.state.sortBy, true);
    // }
  }

  setFilterText(e){
    this.setState({ filterText: e.target.value });
  }

  setEditOpen() {
    this.setState({ editOpen: !this.state.editOpen });
  }

  render() {
    var {...config} = this.state;

    return (
      // <div className="row mx-auto">
      <div>
        <div className="col-sm-3 px-0 wo-md">
          <div className="work-orders-header">
            <div className="work-orders-header-top">
              <i className="fas fa-bars bars-menu" onClick={this.setEditOpen}/>
              <h6 style={{margin: "11.4px 0"}} className="text-center text-dark">Work Orders</h6>
              <i className="fas fa-bars bars-hidden"/>
            </div>
            {this.state.editOpen &&
              <div>
                <div className="wo-filter-container">
                  <input onChange={this.setFilterText} value={this.state.filterText} className="wo-filter" type="text" placeholder="filter by trailer #"/>
                </div>
                <div className="sort-container">
                  {/* <input type="checkbox" name="" id=""/> */}
                  <p className="sort-by-text">Sort by: </p>
                  <select onChange={this.handleSortChange} className="sort-menu">
                    <option className="sort-menu" value="needed date">Needed date</option>
                    <option className="sort-menu" value="location">Location</option>
                    <option className="sort-menu" value="team duration">Team duration</option>
                    <option className="sort-menu" value="solo duration">Solo duration</option>
                  </select>
                  {
                    this.state.sortAsc ?
                    <i class="fas fa-sort-up sort-asc" onClick={this.toggleAsc}/>
                    :
                    <i class="fas fa-sort-down sort-desc" onClick={this.toggleAsc}/>
                  }
                </div>
              </div>
            }
          </div>
          <div className="work-orders-container">
          </div>
        </div>
        {/* <div className="col-sm-9 px-0"> */}
        <div className="col-12 px-0">
          {/* <div className="scheduler-view-interval-cont text-dark my-2 text-right pr-2"> */}
          <div className="d-flex justify-content-between text-dark my-2 px-2">
            <div className="d-flex">
              <div className="white-key"></div>&nbsp;<p className="key-text mr-3">- team shift</p>
              <div className="grey-key"></div>&nbsp;<p className="key-text">- solo shift</p>
            </div>
            <div>
              <span className="scale-text">Scale:</span>&nbsp;
              <button
                value={60}
                onClick={this.handleCellDurationChange}
                className={this.state.cellDuration === 60 ? "cd-btn-1 active-cd-btn" : "cd-btn-1"}>
                  {/* 60 min</button> */}
                  60 min</button>
              <button
                value={30}
                onClick={this.handleCellDurationChange}
                className={this.state.cellDuration === 30 ? "cd-btn-middle active-cd-btn" : "cd-btn-middle"}>
                  30 min</button>
              <button
                value={15}
                onClick={this.handleCellDurationChange}
                className={this.state.cellDuration === 15 ? "cd-btn-2 active-cd-btn" : "cd-btn-2"}>
                  15 min</button>
            </div>
          </div>
          <DayPilotScheduler
            {...config}
            
            ref={component => {
              this.calendar = component && component.control;
            }}
          />
        </div>
        {/* <div className="col-sm-3 px-0 wo-sm"> */}
        <div className="col-12 px-0 wo-sm">
          <div className="work-orders-header">
            <div className="work-orders-header-top">
              <i className="fas fa-bars bars-menu" onClick={this.setEditOpen}/>
              <h6 style={{margin: "11.4px 0"}} className="text-center text-dark">Work Orders</h6>
              <i className="fas fa-bars bars-hidden"/>
            </div>
            {this.state.editOpen &&
              <div className="work-orders-header-top">
                {/* <input onChange={this.setFilterText} value={this.state.filterText} className="wo-filter" type="text" placeholder="filter by trailer #"/> */}
                <input onChange={this.setFilterText} value={this.state.filterText} className="wo-filter" type="text" placeholder="filter by location ID"/>
                <div className="sort-container">
                  {/* <input type="checkbox" name="" id=""/> */}
                  <p className="sort-by-text">Sort by: </p>
                  <select onChange={this.handleSortChange} className="sort-menu">
                    <option className="sort-menu" value="needed date">Needed date</option>
                    <option className="sort-menu" value="location">Location</option>
                    <option className="sort-menu" value="team duration">Team duration</option>
                    <option className="sort-menu" value="solo duration">Solo duration</option>
                  </select>
                  {
                    // this.state.sortAsc ?
                    this.state.sortAscc ?
                    <i className="fas fa-sort-up sort-asc" onClick={this.props.toggleAsc}/>
                    :
                    <i className="fas fa-sort-down sort-desc" onClick={this.props.toggleAsc}/>
                  }
                </div>
              </div>
            }
            {this.state.editOpen &&
              <div>
                <div className="wo-filter-container">
                </div>
              </div>
            }
            <div className="work-orders-container-sm">
              {this.state.unscheduledWorkOrders.length > 0 && this.state.unscheduledWorkOrders.filter(wo => wo.wash_location_id.includes(this.state.filterText.toUpperCase())).map(wo => (
                <DraggableOrder
                  key={wo.order_id.trim()}
                  wo={wo}
                  id={wo.order_id.trim()}
                  // name={`Trailer ${wo.trailer_id}`}
                  name={`Order ${wo.order_id.trim()}`}
                  cityState={`${wo.wash_location_id}`}
                  text={wo.text}
                  duration={(wo.int_duration_mins_team + wo.ext_duration_mins_team) * 60}
                  teamDuration={1}
                  soloDuration={2}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Scheduler;
