import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { getAllWashTypes, updateWashType } from "../../actions/washTypes";
import { getWorkOrdersOfLocation } from "../../actions/workOrders";

const WashTypes = ({ getAllWashTypes, updateWashType, washTypes: { washTypes, loading }, location }) => {

  useEffect(() => {
    getAllWashTypes()
  }, []);

  const [filter, setFilter] = useState({
    codeFilter: "",
    descriptionFilter: "",
    typeFilter: "IE"
  });
  const [editOpen, setEditOpen] = useState(false);
  const [codeToEdit, setCodeToEdit] = useState();
  const [editWashType, setEditWashType] = useState({
    id: "",
    editTeamHours: "1",
    editTeamMinutes: "0",
    editSoloHours: "1",
    editSoloMinutes: "0"
  });

  const {id, editTeamHours, editTeamMinutes, editSoloHours, editSoloMinutes} = editWashType;
  
  const onEditChange = e => {
    setEditWashType({...editWashType, [e.target.name]: parseInt(e.target.value)})
  }

  const onEdit = async () => {
    if (editTeamHours < 0 || editTeamMinutes < 0) {
      alert("Cannot submit negative values");
    } else if (editTeamMinutes > 59) {
      alert("Minutes value must be between 0 and 59");
    } else if (editTeamHours === 0 && editTeamMinutes === 0) {
      alert("Duration cannot be empty");
    } else {
      let type = washTypes.filter(wt => wt.code === codeToEdit)[0].type;
      const formData = {
        code: codeToEdit,
        type: type,
        teamHours: editTeamHours,
        teamMinutes: editTeamMinutes,
        soloHours: editSoloHours,
        soloMinutes: editSoloMinutes
      }

      await updateWashType(id, formData);
      setEditOpen(false);

    }
  }

  const editClick = e => {
    // Finding wash type that matches the one we clicked
    setCodeToEdit(e.target.id);
    const washTypeToEdit = washTypes.filter(i => i.code === e.target.id)[0];
    
    setEditWashType({
      id: washTypeToEdit._id,
      editTeamHours: washTypeToEdit.teamHours,
      editTeamMinutes: washTypeToEdit.teamMinutes,
      editSoloHours: washTypeToEdit.soloHours,
      editSoloMinutes: washTypeToEdit.soloMinutes
    });

    setEditOpen(true);
  }

  const onFilterChange = e => setFilter({...filter, [e.target.name]: e.target.value});
  
  return (
    <div id="wash-types-container">
      {/* TABLE */}
      <div id="wt-table">
        <table className="table table-bordered table-hover">
        {/* <table> */}
          <thead>
            <tr>
              <th className="sticky-th">Code</th>
              <th className="sticky-th">Description</th>
              <th className="text-center sticky-th">Type</th>
              <th className="text-center sticky-th">Team Duration</th>
              <th className="text-center sticky-th">Solo Duration</th>
              <th className="sticky-th"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input style={{width: "120px"}} onChange={onFilterChange} name="codeFilter" type="text" placeholder="Filter by code"/>
              </td>
              <td>
                <input onChange={onFilterChange} name="descriptionFilter" type="text" placeholder="Filter by description"/>
              </td>
              <td className="px-1 text-center">
                <select onChange={onFilterChange} name="typeFilter">
                  <option value="IE">Both</option>
                  <option value="I">Interior</option>
                  <option value="E">Exterior</option>
                </select>
              </td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            {!loading && washTypes && washTypes.filter(type =>
              (type.code.includes(filter.codeFilter.toUpperCase())
              && type.description.toLowerCase().includes(filter.descriptionFilter.toLowerCase())
              && filter.typeFilter.includes(type.type)
              )
            ).map(type => (
              <tr key={type._id}>
                <td>{type.code}</td>
                <td>{type.description}</td>
                <td className="text-center">{type.type === "I" ? "Interior" : "Exterior"}</td>
                {editOpen && codeToEdit === type.code ?
                  <td className="px-0 text-center" style={{width: "50%"}}>
                    <input
                      style={{width: "34px"}}
                      type="number"
                      className="add-duration"
                      name="editTeamHours"
                      min="0"
                      value={editTeamHours}
                      onChange={onEditChange}
                      /> hr&nbsp;
                    <input
                      style={{width: "44px"}}
                      type="number"
                      className="add-duration"
                      name="editTeamMinutes"
                      min="0"
                      max="59"
                      value={editTeamMinutes}
                      onChange={onEditChange}
                    /> min
                  </td>
                :
                  <td>
                    {type.teamHours !== 0 && <span>{type.teamHours}hr</span>} {type.teamMinutes !== 0 && <span>{type.teamMinutes}min</span>}
                  </td>
                }
                {editOpen && codeToEdit === type.code ?
                  <td className="px-0 text-center" style={{width: "50%"}}>
                    <input
                      style={{width: "34px"}}
                      type="number"
                      className="add-duration"
                      name="editSoloHours"
                      min="0"
                      value={editSoloHours}
                      onChange={onEditChange}
                    /> hr&nbsp;
                    <input
                      style={{width: "44px"}}
                      type="number"
                      className="add-duration"
                      name="editSoloMinutes"
                      min="0"
                      max="59"
                      value={editSoloMinutes}
                      onChange={onEditChange}
                    /> min
                  </td>
                :
                  <td>
                    {type.soloHours !== 0 && <span>{type.soloHours}hr</span>} {type.soloMinutes !== 0 && <span>{type.soloMinutes}min</span>}
                  </td>
                }
                <td>
                  <i
                    id={type.code}
                    onClick={editClick}
                    className="fas fa-pen edit-wash-btn float-right pt-1 mx-0"
                  />
                </td>
              </tr>
            ))
            }
          </tbody>
        </table>
      </div>
        {editOpen &&
          <div className="float-right my-2">
            <button onClick={onEdit} className="submit-btn">Save</button>
            <button onClick={() => setEditOpen(false)} className="ml-2 submit-btn">Cancel</button>
          </div>
        }
    </div>
  )
}

const mapStateToProps = state => ({
  washTypes: state.washTypes,
  location: state.location
});

export default connect(mapStateToProps, { getAllWashTypes, updateWashType, getWorkOrdersOfLocation })(WashTypes)
