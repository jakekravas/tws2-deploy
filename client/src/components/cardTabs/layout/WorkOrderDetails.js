import React from 'react'

const WorkOrderDetails = ({ wo, closeWoModal }) => {
  return (
    <div className="card mx-auto col-10 wo-details">

      <div className="card-header text-center">
        <h6>Order Info</h6>
      </div>

      <div className="card-body">
        <div className="row mb-2">
          <div className="col-4 text-right">
            Trailer wash WO <input className="text-right wo-inp" value={wo.order_id && wo.order_id} type="text" readonly/>
          </div>
          <div className="col-4 text-right">
            Charge type <input className="text-right wo-inp" value={wo.charge_type && wo.charge_type} type="text" readonly/>
          </div>
          <div className="col-4 text-right">
            Equipment type <input className="text-right wo-inp" value={wo.equip_type && wo.equip_type} type="text" readonly/>
          </div>
        </div>

        <div className="row mb-2 d-flex justify-content-between">
          <div className="col-4 text-right">
            Interior wash <input className="text-right wo-inp" value={wo.int_wash_code && wo.int_wash_code} type="text" readonly/>
          </div>
          <div className="col-4 text-right">
            Amount <input className="wo-inp" value={`$${wo.int_wash_amount && wo.int_wash_amount}`} type="text" value="$225.00"/>
          </div>
        </div>

        <div className="row mb-2 d-flex justify-content-between">
          <div className="col-4 text-right">
            Exterior wash <input className="text-right wo-inp" value={wo.ext_wash_code && wo.ext_wash_code} type="text" readonly/>
          </div>
          <div className="col-4 text-right">
            Amount <input className="wo-inp" value={`$${wo.ext_wash_amount && wo.ext_wash_amount}`} type="text"/>
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-4 text-right">
            Max wash <input className="text-right wo-inp" type="text" readonly/>
          </div>
          <div className="col-4 text-right">
            <button disabled>Override max wash</button> <select>
              <option></option>
            </select>
          </div>
          <div className="col-4 text-right">
            Total Amount <input type="text" className="wo-inp" value={
              wo.int_wash_amount && wo.ext_wash_amount ? `$${
                Number(wo.int_wash_amount) + Number(wo.ext_wash_amount)
              }` : ""
            }/>
          </div>
        </div>

        <div className="row mb-2 d-flex justify-content-between">
          <div className="col-4 text-right">
            Customer <input className="text-right wo-inp" type="text" readonly/>
          </div>
          <div className="col-4 text-right">
            Trailer <input className="wo-inp" type="text" value={wo.trailer_id && wo.trailer_id}/>
          </div>
        </div>

        <div className="row mb-2 d-flex justify-content-between">
          <div className="col-4 text-right">
            Vendor <input className="text-right wo-inp" value={wo.vendor_id && wo.vendor_id} type="text" readonly/>
          </div>
          <div className="col-4 text-right">
            Tractor <input className="wo-inp" value={wo.tractor_id && wo.tractor_id} type="text"/>
          </div>
        </div>

        <div className="row mb-2 d-flex justify-content-between">
          <div className="col-4 text-right">
            Washed for <input className="text-right wo-inp" value={wo.washed_for && wo.washed_for} type="text" readonly/>
          </div>
          <div className="col-4 text-right">
            Driver <input className="wo-inp" type="text" value={wo.driver_id && wo.driver_id} value="3773"/>
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-4 text-right">
            Order <input className="text-right wo-inp" type="text" readonly/>
          </div>
          <div className="col-4 text-right">
            Move <input className="text-right wo-inp" value={wo.movement_id && wo.movement_id} type="text" readonly/>
          </div>
          <div className="col-4 text-right">
            Other equipment <input className="text-right wo-inp" value={wo.other_equip && wo.other_equip} type="text"/>
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-4 text-right">
            Commodity <input className="text-right wo-inp" value={wo.commodity_id && wo.commodity_id} type="text" readonly/>
          </div>
          <div className="col-4 text-right">
            BRATS Product <input className="text-right wo-inp" type="text" readonly/>
          </div>
          <div className="col-4 text-right">
            UN Number <input className="text-right wo-inp" type="text"/>
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-4 text-right">
            Wash Location <input className="text-right wo-inp" value={wo.wash_location_id && wo.wash_location_id} type="text" readonly/>
          </div>
        </div>

        <div className="row mb-2 d-flex justify-content-between">
          <div className="col-4 text-right">
            Allocation <input className="text-right wo-inp" type="text" readonly/>
          </div>
          <div className="col-4 text-right">
            Charge allocation <input className="wo-inp" value="024" type="text" readonly/>
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-4 text-right">
            Wash date <input className="text-right wo-inp" value={wo.wash_date && wo.wash_date} type="text" readonly/>
          </div>
          <div className="col-4 text-right">
            In date <input className="text-right wo-inp" value={wo.in_date && wo.in_date} type="text" readonly/>
          </div>
          <div className="col-4 text-right">
            Out date <input className="text-right wo-inp" value={wo.out_date && wo.out_date} type="text"/>
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-4 text-right">
            Last updated by <input className="text-right wo-inp" type="text" readonly/>
          </div>
          <div className="col-4 text-right">
            Wash needed by <input className="text-right wo-inp" value={wo.needed_date && wo.needed_date} type="text" readonly/>
          </div>
          <div className="col-4 text-right">
            <input type="checkbox"/> Order assigned
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-4 text-right">
            Heel <input className="text-right wo-inp" value={wo.heel && wo.heel} type="text" readonly/>
          </div>
          <div className="col-4 text-right">
            Units <input className="text-right wo-inp" type="text" readonly/>
          </div>
          <div className="col-4 text-right">
            <input type="checkbox"/> Ready to transfer
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-4 text-right">
            Invoice/PO # <input className="text-right wo-inp" value={wo.invoice_po_num && wo.invoice_po_num} type="text" readonly/>
          </div>
          <div className="col-4 text-right">
            Invoice/PO date <input className="text-right wo-inp" value={wo.invoice_po_date && wo.invoice_po_date} type="text" readonly/>
          </div>
          <div className="col-4 text-right">
            <input type="checkbox"/> Void
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-4 text-right">
            Misc Billing Invoice # <input className="text-right wo-inp" type="text" readonly/>
          </div>
          <div className="col-4 text-right">
            Payables Voucher <input className="text-right wo-inp" type="text" readonly/>
          </div>
        </div>

        <div className="row d-flex mt-2">
          <button onClick={closeWoModal} className="btn btn-dark float-right close-wo-det-btn">Close</button>
        </div>

      </div>

    </div>
  )
}

export default WorkOrderDetails
