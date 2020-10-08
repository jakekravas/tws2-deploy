import React, {useState} from 'react';
import Modal from "react-modal";

Modal.setAppElement('#root');

const FirstPrompt = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [daysCheck, setDaysCheck] = useState({
    mondayCheck: true,
    tuesdayCheck: true,
    wednesdayCheck: true,
    thursdayCheck: true,
    fridayCheck: true,
    saturdayCheck: true,
    sundayCheck: true
  });

  const {
    mondayCheck,
    tuesdayCheck,
    wednesdayCheck,
    thursdayCheck,
    fridayCheck,
    saturdayCheck,
    sundayCheck
  } = daysCheck;

  const toggleWorkDay = e => {
    console.log(e.target.checked);
    setDaysCheck({...daysCheck, [e.target.name]: e.target.checked});
  }

  return (
    <section id="prompt-container" className="row col-sm-9 mx-auto mt-3">
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={
          {
            overlay: {
              position: 'fixed',
              top: 5,
              left: 5,
              right: 5,
              bottom: 5
            },
            content: {
              position: 'relative',
              top: 'auto',
              left: 'auto',
              right: 'auto',
              bottom: 'auto',
              width: "500px",
              // width: "80%",
              margin: "0 auto"
              // marginLeft: "300px",
              // marginRight: "300px"
            }
          }
        }
      >
      <div class="card text-center">
        {/* <h6>{mondayCheck.toString()}</h6> */}
        <div class="card-header edit-hrs-card-header">
          (insert location) Hours of Operation
          <i class="fas fa-times hovercursor" onClick={() => setIsOpen(true)}></i>
        </div>
        <div class="card-body">
          {/* MONDAY */}
          <span className="input-hours d-flex align-items-center mb-2">
            <span className="tt">
              <input
                checked={mondayCheck}
                className="day-checkbox"
                type="checkbox"
                name="mondayCheck"
                onChange={toggleWorkDay}
              />&nbsp;Monday
            </span>
            <input
              type="time"
              disabled={!mondayCheck}
              name="monday-start"
              id="monday-start"
              className="time-select mr-3"
              defaultValue={`09:00`}
              // defaultValue={mondayCheck ?? "09:00"}
            />
            <input
              type="time"
              disabled={!mondayCheck}
              name="monday-end"
              id="monday-end"
              className="time-select"
              defaultValue="17:00"
            />
            <input className="ml-auto" type="checkbox" name="mon-24" id="mon-24"/>&nbsp;24h
          </span>

          {/* TUESDAY */}
          <span className="input-hours d-flex align-items-center mb-2">
            <span className="tt">
              <input
                checked={daysCheck.tuesdayCheck}
                className="day-checkbox"
                type="checkbox"
                name="tuesday-box"
              />&nbsp;Tuesday
            </span>
            <input
              type="time"
              disabled={false}
              name="tuesday-start"
              id="tuesday-start"
              className="time-select mr-3"
              defaultValue="09:00"
            />
            <input
              type="time"
              disabled={false}
              name="tuesday-end"
              id="tuesday-end"
              className="time-select"
              defaultValue="17:00"
            />
            <input className="ml-auto" type="checkbox" name="mon-24" id="mon-24"/>&nbsp;24h
          </span>

          {/* WEDNESDAY */}
          <span className="input-hours d-flex align-items-center mb-2">
            <span className="tt">
              <input
                checked={daysCheck.wednesdayCheck}
                className="day-checkbox"
                type="checkbox"
                name="wednesday-box"
              />&nbsp;Wednesday
            </span>
            <input
              type="time"
              disabled={false}
              name="wednesday-start"
              id="wednesday-start"
              className="time-select mr-3"
              defaultValue="09:00"
            />
            <input
              type="time"
              disabled={false}
              name="wednesday-end"
              id="wednesday-end"
              className="time-select"
              defaultValue="17:00"
            />
            <input className="ml-auto" type="checkbox" name="mon-24" id="mon-24"/>&nbsp;24h
          </span>

          {/* THURSDAY */}
          <span className="input-hours d-flex align-items-center mb-2">
            <span className="tt">
              <input
                checked={daysCheck.thursdayCheck}
                className="day-checkbox"
                type="checkbox"
                name="thursday-box"
              />&nbsp;Thursday
            </span>
            <input
              type="time"
              disabled={false}
              name="thursday-start"
              id="thursday-start"
              className="time-select mr-3"
              defaultValue="09:00"
            />
            <input
              type="time"
              disabled={false}
              name="thursday-end"
              id="thursday-end"
              className="time-select"
              defaultValue="17:00"
            />
            <input className="ml-auto" type="checkbox" name="mon-24" id="mon-24"/>&nbsp;24h
          </span>

          {/* FRIDAY */}
          <span className="input-hours d-flex align-items-center mb-2">
            <span className="tt">
              <input
                checked={daysCheck.fridayCheck}
                className="day-checkbox"
                type="checkbox"
                name="friday-box"
              />&nbsp;Friday
            </span>
            <input
              type="time"
              disabled={false}
              name="friday-start"
              id="friday-start"
              className="time-select mr-3"
              defaultValue="09:00"
            />
            <input
              type="time"
              disabled={false}
              name="friday-end"
              id="friday-end"
              className="time-select"
              defaultValue="17:00"
            />
            <input className="ml-auto" type="checkbox" name="mon-24" id="mon-24"/>&nbsp;24h
          </span>

          {/* SATURDAY */}
          <span className="input-hours d-flex align-items-center mb-2">
            <span className="tt">
              <input
                checked={daysCheck.saturdayCheck}
                className="day-checkbox"
                type="checkbox"
                name="saturday-box"
              />&nbsp;Saturday
            </span>
            <input
              type="time"
              disabled={false}
              name="saturday-start"
              id="saturday-start"
              className="time-select mr-3"
              defaultValue="10:00"
            />
            <input
              type="time"
              disabled={false}
              name="saturday-end"
              id="saturday-end"
              className="time-select"
              defaultValue="15:00"
            />
            <input className="ml-auto" type="checkbox" name="mon-24" id="mon-24"/>&nbsp;24h
          </span>

          {/* SUNDAY */}
          <span className="input-hours d-flex align-items-center mb-2">
            <span className="tt">
              <input
                checked={daysCheck.sundayCheck}
                className="day-checkbox"
                type="checkbox"
                name="sunday-box"
              />&nbsp;Sunday
            </span>
            <input
              type="time"
              disabled={false}
              name="sunday-start"
              id="sunday-start"
              className="time-select mr-3"
              defaultValue="10:00"
            />
            <input
              type="time"
              disabled={false}
              name="sunday-end"
              id="sunday-end"
              className="time-select"
              defaultValue="15:00"
            />
            <input className="ml-auto" type="checkbox" name="mon-24" id="mon-24"/>&nbsp;24h
          </span>

        </div>
        <div class="card-footer text-muted edit-hrs-card-footer">
          <button className="btn btn-link cancel-btn" onClick={() => setIsOpen(false)}>Cancel</button>
          <button className="btn btn-primary submit-btn">Submit</button>
        </div>
      </div>
      </Modal>
      <div id="hoo-container" className="col-sm-6">
        <div id="location-select-container" className="mt-2 mb-3 text-center">
          <label htmlFor="location">Location:&nbsp;</label>
          <select name="location" id="location-select">
            <option value="Location 1">Location 1</option>
            <option value="Location 2">Location 2</option>
            <option value="Location 3">Location 3</option>
            <option value="Location 4">Location 4</option>
            <option value="Location 5">Location 5</option>
          </select>
        </div>
        <h4 className="text-center mb-4">Hours of Operation</h4>
        <span className="d-flex justify-content-between">
          <p>Monday</p>
          <p>9:00 am - 5:00 pm</p>
        </span>
        <span className="d-flex justify-content-between">
          <p>Tuesday</p>
          <p>9:00 am - 5:00 pm</p>
        </span>
        <span className="d-flex justify-content-between">
          <p>Wednesday</p>
          <p>9:00 am - 5:00 pm</p>
        </span>
        <span className="d-flex justify-content-between">
          <p>Thursday</p>
          <p>9:00 am - 5:00 pm</p>
        </span>
        <span className="d-flex justify-content-between">
          <p>Friday</p>
          <p>9:00 am - 5:00 pm</p>
        </span>
        <span className="d-flex justify-content-between">
          <p>Saturday</p>
          <p>10:00 am - 3:00 pm</p>
        </span>
        <span className="d-flex justify-content-between">
          <p>Sunday</p>
          <p>10:00 am - 3:00 pm</p>
        </span>
        <div id="hoo" className="text-center">
          <button id="edit-hoo-btn" onClick={() => setIsOpen(true)}>Edit Hours of Operation</button>
        </div>
      </div>
      <div id="bay-container" className="col-sm-6">
        <div id="location-select-container" className="mt-2 mb-3 text-center hide">
          <label htmlFor="location">Location:&nbsp;</label>
          <select name="location" id="location-select">
            <option value="Location 1">Location 1</option>
            <option value="Location 2">Location 2</option>
            <option value="Location 3">Location 3</option>
            <option value="Location 4">Location 4</option>
            <option value="Location 5">Location 5</option>
          </select>
        </div>
        <h4 className="text-center mb-4">Tank Washes</h4>
        <table class="table table-borderless">
          <thead>
            <tr>
              <th className="pt-0">Wash Type</th>
              <th className="pt-0">Duration</th>
              <th className="pt-0">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Type One</td>
              <td>1h 45 min</td>
              <td>
                <i class="fas fa-pen edit-wash-btn"></i>
                <i class="fas fa-trash-alt delete-wash-btn"></i>
              </td>
            </tr>
            <tr>
              <td>Type Two</td>
              <td>2h 30 min</td>
              <td>
                <i class="fas fa-pen edit-wash-btn"></i>
                <i class="fas fa-trash-alt delete-wash-btn"></i>
              </td>
            </tr>
            <tr>
              <td>Type Three</td>
              <td>45 min</td>
              <td>
                <i class="fas fa-pen edit-wash-btn"></i>
                <i class="fas fa-trash-alt delete-wash-btn"></i>
              </td>
            </tr>
            <tr>
              <td>Type Four</td>
              <td>1h 15 min</td>
              <td>
                <i class="fas fa-pen edit-wash-btn"></i>
                <i class="fas fa-trash-alt delete-wash-btn"></i>
              </td>
            </tr>
            <tr>
              <td>Type Five</td>
              <td>2h</td>
              <td>
                <i class="fas fa-pen edit-wash-btn"></i>
                <i class="fas fa-trash-alt delete-wash-btn"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default FirstPrompt
