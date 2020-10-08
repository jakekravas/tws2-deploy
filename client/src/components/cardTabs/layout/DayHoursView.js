import React from 'react'

const DayHoursView = ({ selectedLocation, dayBayOne, dayBayTwo, dayText, configureDisplay, configureShift2Display }) => {

  return (
    <tr>
      <th className="schedule-time-text" scope="row">{dayText}</th>
      <td className="aaa">
        {selectedLocation &&
          <div>
            {dayBayOne.isOpen && <strong>Shift 1: </strong>}
            {configureDisplay(dayBayOne)}
            {dayBayOne.isOpen && ", " + dayBayOne.type}
            <br/>
            {dayBayOne.isOpen && dayBayOne.shift2 &&
              <div>
                <strong>Shift 2: </strong>
                {configureShift2Display(
                  dayBayOne.shift2Start,
                  dayBayOne.shift2End
                )}, {dayBayOne.shift2Type}
              </div>
            }
          </div>
        }
      </td>
      {selectedLocation && selectedLocation.washBays === 2 &&
        <td className="aaa">
          {dayBayTwo.isOpen && <strong>Shift 1: </strong>}
          {configureDisplay(dayBayTwo)}
          {dayBayTwo.isOpen && ", " + dayBayTwo.type}
          <br/>
          {dayBayTwo.isOpen && dayBayTwo.shift2 &&
            <div>
              <strong>Shift 2: </strong>
              {configureShift2Display(
                dayBayTwo.shift2Start,
                dayBayTwo.shift2End
              )}, {dayBayTwo.shift2Type}
            </div>
          }
        </td>
      }
    </tr>
  )
}

export default DayHoursView
