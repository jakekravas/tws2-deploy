import React from 'react';
import TimePicker from "react-time-picker";

const DayHoursEdit = ({
  dayOpen,
  toggleDayOpen,
  dayOpenName,
  dayName,
  dayStart,
  dayEnd,
  dayStartName,
  dayEndName,
  shiftOneStartChange,
  shiftOneEndChange,
  shiftOneType,
  shiftTwoType,
  shiftOneTypeName,
  shiftTwoTypeName,
  changeShiftType,
  shiftTwoStartChange,
  shiftTwoEndChange,
  dayStartB1S2,
  dayStartB1S2Name,
  dayEndB1S2,
  dayEndB1S2Name,
  shift2Open,
  openShift2,
  closeShift2
}) => {
  return (
    <tr>
      <th>
        <input
          type="checkbox"
          checked={dayOpen}
          onChange={toggleDayOpen}
          name={dayOpenName}
        /> {dayName}
      </th>
      <td className="text-center">
        <TimePicker
          clearIcon={null}
          disableClock={true}
          className="time-select mr-1"
          id={dayStartName}
          name={dayStartName}
          disabled={!dayOpen}
          value={dayOpen && dayStart}
          onChange={shiftOneStartChange}
        />
        -
        <TimePicker
          clearIcon={null}
          disableClock={true}
          className="time-select ml-1"
          id={dayEnd}
          name={dayEndName}
          minTime={dayStart}
          disabled={!dayOpen}
          value={dayOpen && dayEnd}
          onChange={shiftOneEndChange}
        />
        <select onChange={changeShiftType} value={shiftOneType} className="ml-3" name={shiftOneTypeName}>
          <option value="team">Team</option>
          <option value="solo">Solo</option>
        </select>
      </td>
      <td className="text-center">
        {!shift2Open
        ?
          dayOpen &&
          <button className="new-shift-btn" onClick={openShift2()}>Add Shift</button>
        :
        dayOpen &&
        <div>
          <i
            onClick={closeShift2()}
            className="far fa-times-circle mr-2"
          />
          <TimePicker
            clearIcon={null}
            disableClock={true}
            className="time-select mr-1"
            id="mondayStart"
            name={dayStartB1S2Name}
            minTime={dayEnd}
            disabled={!dayOpen}
            value={dayOpen && dayStartB1S2}
            onChange={shiftTwoStartChange}
          />
            -
          <TimePicker
            clearIcon={null}
            disableClock={true}
            className="time-select ml-1"
            id="mondayEnd"
            name={dayEndB1S2Name}
            minTime={dayStartB1S2}
            disabled={!dayOpen}
            value={dayOpen && dayEndB1S2}
            onChange={shiftTwoEndChange}
          />
          <select onChange={changeShiftType} value={shiftTwoType} className="ml-3" name={shiftTwoTypeName}>
            <option value="team">Team</option>
            <option value="solo">Solo</option>
          </select>
        </div>
        }
      </td>
    </tr>
  )
}

export default DayHoursEdit


// {/* MONDAY */}
// <DayHoursEdit
// dayOpen={mondayOpen}
// toggleDayOpen={toggleDayOpen}
// dayOpenName={"mondayOpen"}
// dayName={"Monday"}
// dayStart={mondayStart}
// dayEnd={mondayEnd}
// dayStartName={"mondayStart"}
// dayEndName={"mondayEnd"}
// shiftOneStartChange={time => setStartTimes({...startTimes, mondayStart: time})}
// shiftOneEndChange={time => setEndTimes({...endTimes, mondayEnd: time})}
// shiftOneType={bayOneShift1MonType}
// shiftTwoType={bayOneShift2MonType}
// shiftOneTypeName={"bayOneShift1MonType"}
// shiftTwoTypeName={"bayOneShift2MonType"}
// changeShiftType={changeShiftType}
// shiftTwoStartChange={time => setStartTimes({...startTimes, mondayStartB1S2: time})}
// shiftTwoEndChange={time => setEndTimes({...endTimes, mondayEndB1S2: time})}
// dayStartB1S2={mondayStartB1S2}
// dayStartB1S2Name={"mondayStartB1S2"}
// dayEndB1S2={mondayEndB1S2}
// dayEndB1S2Name={"mondayEndB1S2"}
// shift2Open={bayOneShift2Mon}
// openShift2={() => setBayOneShift2Mon(true)}
// closeShift2={() => setBayOneShift2Mon(false)}
// />