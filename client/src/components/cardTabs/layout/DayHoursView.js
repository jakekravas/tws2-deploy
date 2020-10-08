import React from 'react'

const DayHoursView = ({ selectedLocation, dayBayOne, dayBayTwo, dayText, configureDisplay, configureShift2Display }) => {
  
  return (
    <tr>
      <th className="schedule-time-text" scope="row">{dayText}</th>
      <td className="aaa">
        {selectedLocation &&
          <div>
            {dayBayOne.is_open && <strong>Shift 1: </strong>}
            {configureDisplay(dayBayOne)}
            {dayBayOne.is_open && ", " + dayBayOne.shift_one_type}
            <br/>
            {dayBayOne.is_open && dayBayOne.shift_two_open &&
              <div>
                <strong>Shift 2: </strong>
                {configureShift2Display(
                  dayBayOne.shift_two_start,
                  dayBayOne.shift_two_end
                )}, {dayBayOne.shift_two_type}
              </div>
            }
          </div>
        }
      </td>
      {selectedLocation && selectedLocation.wash_bays === 2 &&
        <td className="aaa">
          {dayBayTwo.is_open && <strong>Shift 1: </strong>}
          {configureDisplay(dayBayTwo)}
          {dayBayTwo.is_open && ", " + dayBayTwo.shift_one_type}
          <br/>
          {dayBayTwo.is_open && dayBayTwo.shift_two_open &&
            <div>
              <strong>Shift 2: </strong>
              {configureShift2Display(
                dayBayTwo.shift_two_start,
                dayBayTwo.shift_two_end
              )}, {dayBayTwo.shift_two_type}
            </div>
          }
        </td>
      }
    </tr>
  )
}

export default DayHoursView
