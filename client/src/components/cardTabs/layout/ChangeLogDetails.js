import React from 'react'

const ChangeLogDetails = ({ toggleLogModal, workOrderLogs }) => {

  return (
    <div className="log-table">
      <div className="d-flex justify-content-between py-2">
        <div></div>
        <h4 className="text-center">Changelog</h4>
        <i style={{fontSize: "15px", cursor:"pointer"}} onClick={toggleLogModal} className="fas fa-times fa-fw"/>
      </div>
      {
        workOrderLogs === null ?
        <p className="text-center">Loading...</p> 
        : workOrderLogs.length === 0 ?
        <p className="text-center">No changes to display for this order</p>
        :
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th className="text-center sticky-th">Table</th>
              <th className="text-center sticky-th">Column</th>
              <th className="text-center sticky-th">Changed by</th>
              <th className="text-center sticky-th">Changed at</th>
              <th className="text-center sticky-th">Changed from</th>
              <th className="text-center sticky-th">Changed to</th>
            </tr>
          </thead>
          <tbody>
            {workOrderLogs && workOrderLogs.map(log => (
              <tr>
                <td>{log.table_name}</td>
                <td>{log.column_name}</td>
                <td>{log.changed_by}</td>
                <td>{log.changed_at}</td>
                <td>{log.changed_from}</td>
                <td>{log.changed_to}</td>
              </tr>
            ))}
          </tbody>
        </table>
      }
      {/* <button onClick={toggleLogModal} className="btn btn-dark float-right mr-1 mb-1">Close</button> */}
    </div>
  )
}

export default ChangeLogDetails
