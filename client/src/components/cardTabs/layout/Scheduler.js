import React, { Component } from 'react';
import { DayPilotScheduler } from "daypilot-pro-react";
import Modal from "react-modal";
import DraggableTOrder from "../layout/DraggableTOrder";
import WorkOrderDetails from "../layout/WorkOrderDetails";

Modal.setAppElement("#root");

class Scheduler extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // timeHeaders: [{"groupBy": "Day"}, {"groupBy": "Hour"}],
      timeHeaders: [{"groupBy": "Hour"}],
      treeEnabled: true,
      treeAnimation: false,
      cellDuration: 30,
      height: 315,
      allowEventOverlap: false,
      currentDP: null,
      cellHeight: 20,
      hourWidth: 50,
      eventDoubleClickHandling: "Enabled",
      currentArgs: null,
      inpDisable: true,
      inpDuration: null,
      inpVal: "",
      inpId: null,
      unscheduledWorkOrders: [],
      modalOpen: false,
      modalOpenn: false,
      moveDisabled: true,
      durationBarVisible: true,
      selectedStartTime: null,
      alertDisplay: "none",
      editOpen: false,
      sortBy: "needed date",
      sortByy: null,
      sortAsc: true,
      sortAscc: null,
      dataId: null,
      dataResource: null,
      dataStartVal: null,
      dataEndVal: null,
      filterText: "",
      filterLocation: "",
      filterOrderId: "",
      filterTrailerId: "",
      filterIntWashType: "",
      selectedLocation: "All locations",
      currentWoDetails: null,
      onEventClick: args => {
        console.log(args.e.data.wash_id);
        this.openWoModal(args.e.data.wash_id, true);
      },
      onBeforeEventRender: args => {
        args.data.moveDisabled = false;
      },
      // prevents box resizing
      eventResizeHandling: "Disabled",
      // onEventResizing: () => this.forceUpdate(),
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
            
            // If end of order exceeds end of shift 1
            if (endTime > s1End) {
              this.props.preventTimeExceed("end");
            // } else if (endTime < new Date(orderToUpdate.needed_date)) {
            } else if (endTime > new Date(orderToUpdate.needed_date)) {
              this.setState({
                modalOpen: true,
                dataId: args.e.data.id,
                dataResource: args.e.data.resource,
                dataStartVal: args.e.data.start.value,
                dataEndVal: new Date(endTime.toString().split("GMT")[0]+" UTC").toISOString().split(".")[0]
              });

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

            if (endTime > s2End) {
              this.props.preventTimeExceed("end");
            // } else if (endTime < new Date(orderToUpdate.needed_date)) {
            } else if (endTime > new Date(orderToUpdate.needed_date)) {
              // this.props.preventTimeExceed("late");

              // Show warning
              // this.props.displayWarning("late");
              this.setState({
                modalOpen: true,
                dataId: args.e.data.id,
                dataResource: args.e.data.resource,
                dataStartVal: args.e.data.start.value,
                dataEndVal: new Date(endTime.toString().split("GMT")[0]+" UTC").toISOString().split(".")[0]
              });

              } else {
              // Schedule order
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
        if (this.props.hoursArr) {
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
        }

      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeModalAndAdd = this.closeModalAndAdd.bind(this);
    this.handleAlert = this.handleAlert.bind(this);
    this.handleCellDurationChange = this.handleCellDurationChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.toggleAsc = this.toggleAsc.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.setFilterText = this.setFilterText.bind(this);
    this.setEditOpen = this.setEditOpen.bind(this);
    this.handleLocationSelect = this.handleLocationSelect.bind(this);
    this.changeLocationFilter = this.changeLocationFilter.bind(this);
    this.changeOrderIdFilter = this.changeOrderIdFilter.bind(this);
    this.changeTrailerIdFilter = this.changeTrailerIdFilter.bind(this);
    this.changeIntWashTypeFilter = this.changeIntWashTypeFilter.bind(this);
    this.openWoModal = this.openWoModal.bind(this);
    this.closeWoModal = this.closeWoModal.bind(this);
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

  handleLocationSelect(e) {
    
    // this.setState({ resources: [this.props.resources[0]] })
    
    const val = e.target.value;
    if (val === "") {
      // this.setState({ selectedLocation: val, filterLocation: "" });
      this.setState({ selectedLocation: "", filterLocation: "" });
      this.props.resetResources();
    } else {
      this.setState({ selectedLocation: val, filterLocation: val });
      this.props.changeResources(val);
    }
  }

  closeModal() {
    // this.setState({ modalOpen: false, inpId: null, inpDuration: null });
    this.setState({ modalOpen: false });
    this.props.loadWorkOrders();
  }
  
  closeModalAndAdd() {
    this.setState({ modalOpen: false });
    this.props.test(
      this.state.dataId,
      this.state.dataResource,
      this.state.dataStartVal,
      this.state.dataEndVal
    );
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
  }

  toggleAsc() {
    this.props.toggleAsc();
  }

  setFilterText(e){
    console.log(e.target.value);
    this.setState({ filterText: e.target.value, filterLocation: e.target.value });
  }

  setEditOpen() {
    this.setState({ editOpen: !this.state.editOpen });
  }

  changeLocationFilter(e) {
    console.log(e.target.value);
    this.setState({
      filterLocation: e.target.value
    });
  }
  
  changeOrderIdFilter(e) {
    this.setState({
      filterOrderId: e.target.value
    });
  }
  
  changeTrailerIdFilter(e) {
    this.setState({
      filterTrailerId: e.target.value
    });
  }
  
  changeIntWashTypeFilter(e) {
    this.setState({
      filterIntWashType: e.target.value
    });
  }

  openWoModal(wash_id, scheduled) {
    if (scheduled) {
      this.setState({
        modalOpenn: true,
        currentWoDetails: this.state.events.filter(wo => wo.wash_id === wash_id)[0]
      });
    } else {
      this.setState({
        modalOpenn: true,
        currentWoDetails: this.state.unscheduledWorkOrders.filter(wo => wo.wash_id === wash_id)[0]
      });
    }
  }

  closeWoModal() {
    this.setState({ modalOpenn: false });
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
                    <i className="fas fa-sort-up sort-asc" onClick={this.toggleAsc}/>
                    :
                    <i className="fas fa-sort-down sort-desc" onClick={this.toggleAsc}/>
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
            <div className="location-dropdown">
              View:&nbsp;
              <select onChange={this.handleLocationSelect} value={this.state.selectedLocation}>
                {/* <option value="All locations">All locations</option> */}
                <option value="">All locations</option>
                {this.props.terminals.map(loc => (
                  <option
                    key={loc.location_id}
                    id={`${loc.city}, ${loc.state} - ${loc.location_id}`} className="location-dropdown-text"
                    value={loc.location_id}>{loc.city}, {loc.state} - {loc.location_id}
                  </option>
                ))}
              </select>
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
          <Modal
            isOpen={this.state.modalOpen}
            className="modall"
            style = {
                {
                  content: {
                    width: "300px",
                  }
                }
              }
            >
            <div className="card wo-card">
              <div className="card text-center">
                <div className="card-body">
                  <div className="alert alert-danger p-1 my-0 text-center">
                  Warning: This work order is scheduled to end beyond its needed by date
                  </div>
                  <div className="mt-3">
                    <button onClick={this.closeModal} className="btn cancel-add-btn mr-1">Cancel</button>
                    <button onClick={this.closeModalAndAdd} className="btn submit-btn ml-1">Add to scheduler</button>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
          <Modal isOpen={this.state.modalOpenn}>
            <WorkOrderDetails
              className="wo-modal"
              wo={this.state.currentWoDetails}
              closeWoModal={this.closeWoModal}
            />
          </Modal>
          <DayPilotScheduler
            {...config}
            
            ref={component => {
              this.calendar = component && component.control;
            }}
          />
        </div>
        <div style={{display: this.props.alertDisplay}} className="alert alert-danger my-0 rounded-0 text-center">
          {this.props.errorText}
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
                {/* <input onChange={this.setFilterText} value={this.state.filterText} className="wo-filter" type="text" placeholder="filter by location ID"/> */}
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
            <div id="wash-types-container">
              <div id="wt-table">
                <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th className="unscheduled-order-th">
                      Location
                    </th>
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
                  <tr className="text-center">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <input
                        type="radio"
                        name="sort"
                        value="team duration"
                        checked={this.props.sortBy === "team duration"}
                        onChange={this.handleSortChange}
                        />
                    </td>
                    <td>
                      <input
                        type="radio"
                        name="sort"
                        value="solo duration"
                        checked={this.props.sortBy === "solo duration"}
                        onChange={this.handleSortChange}
                        />
                    </td>
                    <td>
                      <input
                        type="radio"
                        name="sort"
                        value="needed date"
                        checked={this.props.sortBy === "needed date"}
                        onChange={this.handleSortChange}
                      />
                    </td>
                    <td>
                      {
                        this.props.sortAsc
                        ?
                        <i className="fas fa-sort-up sort-asc" onClick={this.toggleAsc}/>
                        :
                        <i className="fas fa-sort-down sort-asc" onClick={this.toggleAsc}/>
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        className="unscheduled-order-filter"
                        type="text"
                        placeholder="Filter"
                        value={this.state.filterLocation}
                        onChange={this.changeLocationFilter}
                      />
                    </td>
                    <td>
                      <input
                        className="unscheduled-order-filter"
                        type="text"
                        placeholder="Filter"
                        value={this.state.filterOrderId}
                        onChange={this.changeOrderIdFilter}
                      />
                    </td>
                    <td>
                      <input
                        className="unscheduled-order-filter"
                        type="text"
                        placeholder="Filter"
                        value={this.state.filterTrailerId}
                        onChange={this.changeTrailerIdFilter}
                      />
                    </td>
                    <td>
                      <input
                        className="unscheduled-order-filter"
                        type="text"
                        placeholder="Filter"
                        value={this.state.filterIntWashType}
                        onChange={this.changeIntWashTypeFilter}
                      />
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  {/* {this.state.unscheduledWorkOrders.length > 0 && this.state.unscheduledWorkOrders.filter(wo => wo.wash_location_id.includes(this.state.filterText.toUpperCase())).map(wo => ( */}
                  {/* {this.state.unscheduledWorkOrders.length > 0 && this.state.unscheduledWorkOrders.filter(
                    wo =>
                    wo.wash_location_id.includes(this.state.filterLocation.toUpperCase()) &&
                    wo.order_id.includes(this.state.filterOrderId) &&
                    wo.trailer_id.includes(this.state.filterTrailerId) &&
                    wo.int_wash_code.includes(this.state.filterIntWashType.toUpperCase()) */}
                  {this.state.unscheduledWorkOrders.length > 0 && this.state.unscheduledWorkOrders.filter(
                    wo =>
                    wo.wash_location_id.includes(this.state.filterLocation.toUpperCase()) &&
                    wo.order_id.includes(this.state.filterOrderId) &&
                    wo.trailer_id.includes(this.state.filterTrailerId) &&
                    wo.int_wash_code.includes(this.state.filterIntWashType.toUpperCase())
                  ).map(wo => (
                    <DraggableTOrder
                      // key={wo.order_id.trim()}
                      key={wo.wash_id}
                      openWoModal={this.openWoModal}
                      wo={wo}
                      id={wo.order_id.trim()}
                      name={`Order ${wo.order_id.trim()}`}
                      selectedLocation={this.state.selectedLocation}
                      // cityState={`${wo.wash_location_id}`}
                      // cityState={wo.wash_location_id}
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
          </div>
        </div>
      </div>
    );
  }
}

export default Scheduler;
