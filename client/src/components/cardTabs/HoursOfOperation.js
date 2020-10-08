import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { updateLocationHrs, updateWashBayQuantity, getLocationInfo } from "../../actions/location";
import TimePicker from 'react-time-picker';
import DayHoursView from "./layout/DayHoursView";

const HoursOfOperation = ({ updateLocationHrs, updateWashBayQuantity, getLocationInfo, location: { selectedLocation } }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [washBays, setWashBays] = useState();
  const [bayEditHours, setBayEditHours] = useState(1);
  const [saveDisabled, setSaveDisabled] = useState(true);

  const [daysOpen, setDaysOpen] = useState({
    mondayOpen: false,
    tuesdayOpen: false,
    wednesdayOpen: false,
    thursdayOpen: false,
    fridayOpen: false,
    saturdayOpen: false,
    sundayOpen: false,
    mondayOpen2: false,
    tuesdayOpen2: false,
    wednesdayOpen2: false,
    thursdayOpen2: false,
    fridayOpen2: false,
    saturdayOpen2: false,
    sundayOpen2: false
  });

  // Bay 1 Shift 1 open
  const [bayOneShift2Mon, setBayOneShift2Mon] = useState();
  const [bayOneShift2Tues, setBayOneShift2Tues] = useState();
  const [bayOneShift2Wed, setBayOneShift2Wed] = useState();
  const [bayOneShift2Thurs, setBayOneShift2Thurs] = useState();
  const [bayOneShift2Fri, setBayOneShift2Fri] = useState();
  const [bayOneShift2Sat, setBayOneShift2Sat] = useState();
  const [bayOneShift2Sun, setBayOneShift2Sun] = useState();

  // Bay 2 Shift 2 open
  const [bayTwoShift2Mon, setBayTwoShift2Mon] = useState();
  const [bayTwoShift2Tues, setBayTwoShift2Tues] = useState();
  const [bayTwoShift2Wed, setBayTwoShift2Wed] = useState();
  const [bayTwoShift2Thurs, setBayTwoShift2Thurs] = useState();
  const [bayTwoShift2Fri, setBayTwoShift2Fri] = useState();
  const [bayTwoShift2Sat, setBayTwoShift2Sat] = useState();
  const [bayTwoShift2Sun, setBayTwoShift2Sun] = useState();

  // Bay 1 Shift 2 Type

  const [shiftType, setShiftType] = useState({
    bayOneShift1MonType: "team",
    bayOneShift1TuesType: "team",
    bayOneShift1WedType: "team",
    bayOneShift1ThursType: "team",
    bayOneShift1FriType: "team",
    bayOneShift1SatType: "team",
    bayOneShift1SunType: "team",
    bayTwoShift1MonType: "team",
    bayTwoShift1TuesType: "team",
    bayTwoShift1WedType: "team",
    bayTwoShift1ThursType: "team",
    bayTwoShift1FriType: "team",
    bayTwoShift1SatType: "team",
    bayTwoShift1SunType: "team",

    bayOneShift2MonType: "team",
    bayOneShift2TuesType: "team",
    bayOneShift2WedType: "team",
    bayOneShift2ThursType: "team",
    bayOneShift2FriType: "team",
    bayOneShift2SatType: "team",
    bayOneShift2SunType: "team",
    bayTwoShift2MonType: "team",
    bayTwoShift2TuesType: "team",
    bayTwoShift2WedType: "team",
    bayTwoShift2ThursType: "team",
    bayTwoShift2FriType: "team",
    bayTwoShift2SatType: "team",
    bayTwoShift2SunType: "team"
  });

  const {
    bayOneShift1MonType,
    bayOneShift1TuesType,
    bayOneShift1WedType,
    bayOneShift1ThursType,
    bayOneShift1FriType,
    bayOneShift1SatType,
    bayOneShift1SunType,
    bayTwoShift1MonType,
    bayTwoShift1TuesType,
    bayTwoShift1WedType,
    bayTwoShift1ThursType,
    bayTwoShift1FriType,
    bayTwoShift1SatType,
    bayTwoShift1SunType,
    bayOneShift2MonType,
    bayOneShift2TuesType,
    bayOneShift2WedType,
    bayOneShift2ThursType,
    bayOneShift2FriType,
    bayOneShift2SatType,
    bayOneShift2SunType,
    bayTwoShift2MonType,
    bayTwoShift2TuesType,
    bayTwoShift2WedType,
    bayTwoShift2ThursType,
    bayTwoShift2FriType,
    bayTwoShift2SatType,
    bayTwoShift2SunType
  } = shiftType;

  const [startTimes, setStartTimes] = useState({
    mondayStart: "",
    tuesdayStart: "",
    wednesdayStart: "",
    thursdayStart: "",
    fridayStart: "",
    saturdayStart: "",
    sundayStart: "",
    mondayStartB1S2: "",
    tuesdayStartB1S2: "",
    wednesdayStartB1S2: "",
    thursdayStartB1S2: "",
    fridayStartB1S2: "",
    saturdayStartB1S2: "",
    sundayStartB1S2: "",
    mondayStart2: "",
    tuesdayStart2: "",
    wednesdayStart2: "",
    thursdayStart2: "",
    fridayStart2: "",
    saturdayStart2: "",
    sundayStart2: "",
    mondayStartB2S2: "",
    tuesdayStartB2S2: "",
    wednesdayStartB2S2: "",
    thursdayStartB2S2: "",
    fridayStartB2S2: "",
    saturdayStartB2S2: "",
    sundayStartB2S2: ""
  });

  const [endTimes, setEndTimes] = useState({
    mondayEnd: "",
    tuesdayEnd: "",
    wednesdayEnd: "",
    thursdayEnd: "",
    fridayEnd: "",
    saturdayEnd: "",
    sundayEnd: "",
    mondayEndB1S2: "",
    tuesdayEndB1S2: "",
    wednesdayEndB1S2: "",
    thursdayEndB1S2: "",
    fridayEndB1S2: "",
    saturdayEndB1S2: "",
    sundayEndB1S2: "",
    mondayEnd2: "",
    tuesdayEnd2: "",
    wednesdayEnd2: "",
    thursdayEnd2: "",
    fridayEnd2: "",
    saturdayEnd2: "",
    sundayEnd2: "",
    mondayEndB2S2: "",
    tuesdayEndB2S2: "",
    wednesdayEndB2S2: "",
    thursdayEndB2S2: "",
    fridayEndB2S2: "",
    saturdayEndB2S2: "",
    sundayEndB2S2: ""
  });

  const {
    mondayOpen,
    tuesdayOpen,
    wednesdayOpen,
    thursdayOpen,
    fridayOpen,
    saturdayOpen,
    sundayOpen,
    mondayOpen2,
    tuesdayOpen2,
    wednesdayOpen2,
    thursdayOpen2,
    fridayOpen2,
    saturdayOpen2,
    sundayOpen2
  } = daysOpen;

  const {
    mondayStart,
    tuesdayStart,
    wednesdayStart,
    thursdayStart,
    fridayStart,
    saturdayStart,
    sundayStart,
    mondayStartB1S2,
    tuesdayStartB1S2,
    wednesdayStartB1S2,
    thursdayStartB1S2,
    fridayStartB1S2,
    saturdayStartB1S2,
    sundayStartB1S2,
    mondayStart2,
    tuesdayStart2,
    wednesdayStart2,
    thursdayStart2,
    fridayStart2,
    saturdayStart2,
    sundayStart2,
    mondayStartB2S2,
    tuesdayStartB2S2,
    wednesdayStartB2S2,
    thursdayStartB2S2,
    fridayStartB2S2,
    saturdayStartB2S2,
    sundayStartB2S2
  } = startTimes;

  const {
    mondayEnd,
    tuesdayEnd,
    wednesdayEnd,
    thursdayEnd,
    fridayEnd,
    saturdayEnd,
    sundayEnd,
    mondayEndB1S2,
    tuesdayEndB1S2,
    wednesdayEndB1S2,
    thursdayEndB1S2,
    fridayEndB1S2,
    saturdayEndB1S2,
    sundayEndB1S2,
    mondayEnd2,
    tuesdayEnd2,
    wednesdayEnd2,
    thursdayEnd2,
    fridayEnd2,
    saturdayEnd2,
    sundayEnd2,
    mondayEndB2S2,
    tuesdayEndB2S2,
    wednesdayEndB2S2,
    thursdayEndB2S2,
    fridayEndB2S2,
    saturdayEndB2S2,
    sundayEndB2S2,
  } = endTimes;

  useEffect(() => {
    if (editOpen) {
      setEditOpen(false);
    }
    setDaysOpen({
      // Bay 1
      mondayOpen: selectedLocation && selectedLocation.bayOneHours.monday.is_open,
      tuesdayOpen: selectedLocation && selectedLocation.bayOneHours.tuesday.is_open,
      wednesdayOpen: selectedLocation && selectedLocation.bayOneHours.wednesday.is_open,
      thursdayOpen: selectedLocation && selectedLocation.bayOneHours.thursday.is_open,
      fridayOpen: selectedLocation && selectedLocation.bayOneHours.friday.is_open,
      saturdayOpen: selectedLocation && selectedLocation.bayOneHours.saturday.is_open,
      sundayOpen: selectedLocation && selectedLocation.bayOneHours.sunday.is_open,
      // Bay 2
      mondayOpen2: selectedLocation && selectedLocation.bayTwoHours.monday.is_open,
      tuesdayOpen2: selectedLocation && selectedLocation.bayTwoHours.tuesday.is_open,
      wednesdayOpen2: selectedLocation && selectedLocation.bayTwoHours.wednesday.is_open,
      thursdayOpen2: selectedLocation && selectedLocation.bayTwoHours.thursday.is_open,
      fridayOpen2: selectedLocation && selectedLocation.bayTwoHours.friday.is_open,
      saturdayOpen2: selectedLocation && selectedLocation.bayTwoHours.saturday.is_open,
      sundayOpen2: selectedLocation && selectedLocation.bayTwoHours.sunday.is_open
    });

    setStartTimes({
      // Bay 1 Shift 1
      mondayStart: selectedLocation && selectedLocation.bayOneHours.monday.shift_one_start,
      tuesdayStart: selectedLocation && selectedLocation.bayOneHours.tuesday.shift_one_start,
      wednesdayStart: selectedLocation && selectedLocation.bayOneHours.wednesday.shift_one_start,
      thursdayStart: selectedLocation && selectedLocation.bayOneHours.thursday.shift_one_start,
      fridayStart: selectedLocation && selectedLocation.bayOneHours.friday.shift_one_start,
      saturdayStart: selectedLocation && selectedLocation.bayOneHours.saturday.shift_one_start,
      sundayStart: selectedLocation && selectedLocation.bayOneHours.sunday.shift_one_start,
      
      // Bay 1 Shift 2
      mondayStartB1S2: selectedLocation && selectedLocation.bayOneHours.monday.shift_two_start,
      tuesdayStartB1S2: selectedLocation && selectedLocation.bayOneHours.tuesday.shift_two_start,
      wednesdayStartB1S2: selectedLocation && selectedLocation.bayOneHours.wednesday.shift_two_start,
      thursdayStartB1S2: selectedLocation && selectedLocation.bayOneHours.thursday.shift_two_start,
      fridayStartB1S2: selectedLocation && selectedLocation.bayOneHours.friday.shift_two_start,
      saturdayStartB1S2: selectedLocation && selectedLocation.bayOneHours.saturday.shift_two_start,
      sundayStartB1S2: selectedLocation && selectedLocation.bayOneHours.sunday.shift_two_start,

      // Bay 2
      mondayStart2: selectedLocation && selectedLocation.bayTwoHours.monday.shift_one_start,
      tuesdayStart2: selectedLocation && selectedLocation.bayTwoHours.tuesday.shift_one_start,
      wednesdayStart2: selectedLocation && selectedLocation.bayTwoHours.wednesday.shift_one_start,
      thursdayStart2: selectedLocation && selectedLocation.bayTwoHours.thursday.shift_one_start,
      fridayStart2: selectedLocation && selectedLocation.bayTwoHours.friday.shift_one_start,
      saturdayStart2: selectedLocation && selectedLocation.bayTwoHours.saturday.shift_one_start,
      sundayStart2: selectedLocation && selectedLocation.bayTwoHours.sunday.shift_one_start,

      // Bay 2 Shift 2
      mondayStartB2S2: selectedLocation && selectedLocation.bayTwoHours.monday.shift_two_start,
      tuesdayStartB2S2: selectedLocation && selectedLocation.bayTwoHours.tuesday.shift_two_start,
      wednesdayStartB2S2: selectedLocation && selectedLocation.bayTwoHours.wednesday.shift_two_start,
      thursdayStartB2S2: selectedLocation && selectedLocation.bayTwoHours.thursday.shift_two_start,
      fridayStartB2S2: selectedLocation && selectedLocation.bayTwoHours.friday.shift_two_start,
      saturdayStartB2S2: selectedLocation && selectedLocation.bayTwoHours.saturday.shift_two_start,
      sundayStartB2S2: selectedLocation && selectedLocation.bayTwoHours.sunday.shift_two_start,
    });

    setEndTimes({
      // Bay 1
      mondayEnd: selectedLocation && selectedLocation.bayOneHours.monday.shift_one_end,
      tuesdayEnd: selectedLocation && selectedLocation.bayOneHours.tuesday.shift_one_end,
      wednesdayEnd: selectedLocation && selectedLocation.bayOneHours.wednesday.shift_one_end,
      thursdayEnd: selectedLocation && selectedLocation.bayOneHours.thursday.shift_one_end,
      fridayEnd: selectedLocation && selectedLocation.bayOneHours.friday.shift_one_end,
      saturdayEnd: selectedLocation && selectedLocation.bayOneHours.saturday.shift_one_end,
      sundayEnd: selectedLocation && selectedLocation.bayOneHours.sunday.shift_one_end,

      // Bay 1 Shift 2
      mondayEndB1S2: selectedLocation && selectedLocation.bayOneHours.monday.shift_two_end,
      tuesdayEndB1S2: selectedLocation && selectedLocation.bayOneHours.tuesday.shift_two_end,
      wednesdayEndB1S2: selectedLocation && selectedLocation.bayOneHours.wednesday.shift_two_end,
      thursdayEndB1S2: selectedLocation && selectedLocation.bayOneHours.thursday.shift_two_end,
      fridayEndB1S2: selectedLocation && selectedLocation.bayOneHours.friday.shift_two_end,
      saturdayEndB1S2: selectedLocation && selectedLocation.bayOneHours.saturday.shift_two_end,
      sundayEndB1S2: selectedLocation && selectedLocation.bayOneHours.sunday.shift_two_end,

      // Bay 2
      mondayEnd2: selectedLocation && selectedLocation.bayTwoHours.monday.shift_one_end,
      tuesdayEnd2: selectedLocation && selectedLocation.bayTwoHours.tuesday.shift_one_end,
      wednesdayEnd2: selectedLocation && selectedLocation.bayTwoHours.wednesday.shift_one_end,
      thursdayEnd2: selectedLocation && selectedLocation.bayTwoHours.thursday.shift_one_end,
      fridayEnd2: selectedLocation && selectedLocation.bayTwoHours.friday.shift_one_end,
      saturdayEnd2: selectedLocation && selectedLocation.bayTwoHours.saturday.shift_one_end,
      sundayEnd2: selectedLocation && selectedLocation.bayTwoHours.sunday.shift_one_end,

      // Bay 2 Shift 2
      mondayEndB2S2: selectedLocation && selectedLocation.bayTwoHours.monday.shift_two_end,
      tuesdayEndB2S2: selectedLocation && selectedLocation.bayTwoHours.tuesday.shift_two_end,
      wednesdayEndB2S2: selectedLocation && selectedLocation.bayTwoHours.wednesday.shift_two_end,
      thursdayEndB2S2: selectedLocation && selectedLocation.bayTwoHours.thursday.shift_two_end,
      fridayEndB2S2: selectedLocation && selectedLocation.bayTwoHours.friday.shift_two_end,
      saturdayEndB2S2: selectedLocation && selectedLocation.bayTwoHours.saturday.shift_two_end,
      sundayEndB2S2: selectedLocation && selectedLocation.bayTwoHours.sunday.shift_two_end
    });

    setBayOneShift2Mon( selectedLocation && selectedLocation.bayOneHours.monday.shift_two_open );
    setBayOneShift2Tues( selectedLocation && selectedLocation.bayOneHours.tuesday.shift_two_open );
    setBayOneShift2Wed( selectedLocation && selectedLocation.bayOneHours.wednesday.shift_two_open );
    setBayOneShift2Thurs( selectedLocation && selectedLocation.bayOneHours.thursday.shift_two_open );
    setBayOneShift2Fri( selectedLocation && selectedLocation.bayOneHours.friday.shift_two_open );
    setBayOneShift2Sat( selectedLocation && selectedLocation.bayOneHours.saturday.shift_two_open );
    setBayOneShift2Sun( selectedLocation && selectedLocation.bayOneHours.sunday.shift_two_open );

    setBayTwoShift2Mon( selectedLocation && selectedLocation.bayTwoHours.monday.shift_two_open );
    setBayTwoShift2Tues( selectedLocation && selectedLocation.bayTwoHours.tuesday.shift_two_open );
    setBayTwoShift2Wed( selectedLocation && selectedLocation.bayTwoHours.wednesday.shift_two_open );
    setBayTwoShift2Thurs( selectedLocation && selectedLocation.bayTwoHours.thursday.shift_two_open );
    setBayTwoShift2Fri( selectedLocation && selectedLocation.bayTwoHours.friday.shift_two_open );
    setBayTwoShift2Sat( selectedLocation && selectedLocation.bayTwoHours.saturday.shift_two_open );
    setBayTwoShift2Sun( selectedLocation && selectedLocation.bayTwoHours.sunday.shift_two_open );

    setShiftType({
      bayOneShift1MonType: selectedLocation && selectedLocation.bayOneHours.monday.shift_one_type,
      bayOneShift1TuesType: selectedLocation && selectedLocation.bayOneHours.tuesday.shift_one_type,
      bayOneShift1WedType: selectedLocation && selectedLocation.bayOneHours.wednesday.shift_one_type,
      bayOneShift1ThursType: selectedLocation && selectedLocation.bayOneHours.thursday.shift_one_type,
      bayOneShift1FriType: selectedLocation && selectedLocation.bayOneHours.friday.shift_one_type,
      bayOneShift1SatType: selectedLocation && selectedLocation.bayOneHours.saturday.shift_one_type,
      bayOneShift1SunType: selectedLocation && selectedLocation.bayOneHours.sunday.shift_one_type,

      bayOneShift2MonType: selectedLocation && selectedLocation.bayOneHours.monday.shift_two_type,
      bayOneShift2TuesType: selectedLocation && selectedLocation.bayOneHours.tuesday.shift_two_type,
      bayOneShift2WedType: selectedLocation && selectedLocation.bayOneHours.wednesday.shift_two_type,
      bayOneShift2ThursType: selectedLocation && selectedLocation.bayOneHours.thursday.shift_two_type,
      bayOneShift2FriType: selectedLocation && selectedLocation.bayOneHours.friday.shift_two_type,
      bayOneShift2SatType: selectedLocation && selectedLocation.bayOneHours.saturday.shift_two_type,
      bayOneShift2SunType: selectedLocation && selectedLocation.bayOneHours.sunday.shift_two_type,

      bayTwoShift1MonType: selectedLocation && selectedLocation.bayTwoHours.monday.shift_one_type,
      bayTwoShift1TuesType: selectedLocation && selectedLocation.bayTwoHours.tuesday.shift_one_type,
      bayTwoShift1WedType: selectedLocation && selectedLocation.bayTwoHours.wednesday.shift_one_type,
      bayTwoShift1ThursType: selectedLocation && selectedLocation.bayTwoHours.thursday.shift_one_type,
      bayTwoShift1FriType: selectedLocation && selectedLocation.bayTwoHours.friday.shift_one_type,
      bayTwoShift1SatType: selectedLocation && selectedLocation.bayTwoHours.saturday.shift_one_type,
      bayTwoShift1SunType: selectedLocation && selectedLocation.bayTwoHours.sunday.shift_one_type,

      bayTwoShift2MonType: selectedLocation && selectedLocation.bayTwoHours.monday.shift_two_type,
      bayTwoShift2TuesType: selectedLocation && selectedLocation.bayTwoHours.tuesday.shift_two_type,
      bayTwoShift2WedType: selectedLocation && selectedLocation.bayTwoHours.wednesday.shift_two_type,
      bayTwoShift2ThursType: selectedLocation && selectedLocation.bayTwoHours.thursday.shift_two_type,
      bayTwoShift2FriType: selectedLocation && selectedLocation.bayTwoHours.friday.shift_two_type,
      bayTwoShift2SatType: selectedLocation && selectedLocation.bayTwoHours.saturday.shift_two_type,
      bayTwoShift2SunType: selectedLocation && selectedLocation.bayTwoHours.sunday.shift_two_type
    });

  }, [ selectedLocation ]);

  const toggleDayOpen = e => {
    setDaysOpen({...daysOpen, [e.target.name]: e.target.checked});
  }

  const changeEndTime = e => {
    setEndTimes({...endTimes, [e.target.name]: e.target.value});
  }

  const openEdit = async () => {
    // await getLocationInfo(selectedLocation.id);
    setBayEditHours(1);
    setEditOpen(true);
  }
  
  const onBayQuantityChange = e => {
    console.log("ON BAY CHANGE");
    const formData = { washBays: e.target.value }
    updateWashBayQuantity(selectedLocation.id, formData);
  }

  const onCancel = () => {
    setEditOpen(false);
    setBayEditHours(1);
  }
  
  const updateHrs = async () => {
    const newHrs = {
      bayOneHours: {
        monday: {
          isOpen: mondayOpen,
          // twentyFourHrs: monday24,
          start: mondayStart,
          end: mondayEnd,
          type: bayOneShift1MonType,
          shift2: bayOneShift2Mon,
          shift2Start: mondayStartB1S2,
          shift2End: mondayEndB1S2,
          shift2Type: bayOneShift2MonType
        },
        tuesday: {
          isOpen: tuesdayOpen,
          // twentyFourHrs: tuesday24,
          start: tuesdayStart,
          end: tuesdayEnd,
          type: bayOneShift1TuesType,
          shift2: bayOneShift2Tues,
          shift2Start: tuesdayStartB1S2,
          shift2End: tuesdayEndB1S2,
          shift2Type: bayOneShift2TuesType
        },
        wednesday: {
          isOpen: wednesdayOpen,
          // twentyFourHrs: wednesday24,
          start: wednesdayStart,
          end: wednesdayEnd,
          type: bayOneShift1WedType,
          shift2: bayOneShift2Wed,
          shift2Start: wednesdayStartB1S2,
          shift2End: wednesdayEndB1S2,
          shift2Type: bayOneShift2WedType
        },
        thursday: {
          isOpen: thursdayOpen,
          // twentyFourHrs: thursday24,
          start: thursdayStart,
          end: thursdayEnd,
          type: bayOneShift1ThursType,
          shift2: bayOneShift2Thurs,
          shift2Start: thursdayStartB1S2,
          shift2End: thursdayEndB1S2,
          shift2Type: bayOneShift2ThursType
        },
        friday: {
          isOpen: fridayOpen,
          // twentyFourHrs: friday24,
          start: fridayStart,
          end: fridayEnd,
          type: bayOneShift1FriType,
          shift2: bayOneShift2Fri,
          shift2Start: fridayStartB1S2,
          shift2End: fridayEndB1S2,
          shift2Type: bayOneShift2FriType
        },
        saturday: {
          isOpen: saturdayOpen,
          // twentyFourHrs: saturday24,
          start: saturdayStart,
          end: saturdayEnd,
          type: bayOneShift1SatType,
          shift2: bayOneShift2Sat,
          shift2Start: saturdayStartB1S2,
          shift2End: saturdayEndB1S2,
          shift2Type: bayOneShift2SatType
        },
        sunday: {
          isOpen: sundayOpen,
          // twentyFourHrs: sunday24,
          start: sundayStart,
          end: sundayEnd,
          type: bayOneShift1SunType,
          shift2: bayOneShift2Sun,
          shift2Start: sundayStartB1S2,
          shift2End: sundayEndB1S2,
          shift2Type: bayOneShift2SunType
        }
      }
    }

    if (selectedLocation.wash_bays === 2) {
      newHrs.bayTwoHours = {
        monday: {
          isOpen: mondayOpen2,
          // twentyFourHrs: monday242,
          start: mondayStart2,
          end: mondayEnd2,
          type: bayTwoShift1MonType,
          shift2: bayTwoShift2Mon,
          shift2Start: mondayStartB2S2,
          shift2End: mondayEndB2S2,
          shift2Type: bayTwoShift2MonType
        },
        tuesday: {
          isOpen: tuesdayOpen2,
          // twentyFourHrs: tuesday242,
          start: tuesdayStart2,
          end: tuesdayEnd2,
          type: bayTwoShift1TuesType,
          shift2: bayTwoShift2Tues,
          shift2Start: tuesdayStartB2S2,
          shift2End: tuesdayEndB2S2,
          shift2Type: bayTwoShift2TuesType
        },
        wednesday: {
          isOpen: wednesdayOpen2,
          // twentyFourHrs: wednesday242,
          start: wednesdayStart2,
          end: wednesdayEnd2,
          type: bayTwoShift1WedType,
          shift2: bayTwoShift2Wed,
          shift2Start: wednesdayStartB2S2,
          shift2End: wednesdayEndB2S2,
          shift2Type: bayTwoShift2WedType
        },
        thursday: {
          isOpen: thursdayOpen2,
          // twentyFourHrs: thursday242,
          start: thursdayStart2,
          end: thursdayEnd2,
          type: bayTwoShift1ThursType,
          shift2: bayTwoShift2Thurs,
          shift2Start: thursdayStartB2S2,
          shift2End: thursdayEndB2S2,
          shift2Type: bayTwoShift2ThursType
        },
        friday: {
          isOpen: fridayOpen2,
          // twentyFourHrs: friday242,
          start: fridayStart2,
          end: fridayEnd2,
          type: bayTwoShift1FriType,
          shift2: bayTwoShift2Fri,
          shift2Start: fridayStartB2S2,
          shift2End: fridayEndB2S2,
          shift2Type: bayTwoShift2FriType
        },
        saturday: {
          isOpen: saturdayOpen2,
          // twentyFourHrs: saturday242,
          start: saturdayStart2,
          end: saturdayEnd2,
          type: bayTwoShift1SatType,
          shift2: bayTwoShift2Sat,
          shift2Start: saturdayStartB2S2,
          shift2End: saturdayEndB2S2,
          shift2Type: bayTwoShift2SatType
        },
        sunday: {
          isOpen: sundayOpen2,
          // twentyFourHrs: sunday242,
          start: sundayStart2,
          end: sundayEnd2,
          type: bayTwoShift1SunType,
          shift2: bayTwoShift2Sun,
          shift2Start: sundayStartB2S2,
          shift2End: sundayEndB2S2,
          shift2Type: bayTwoShift2SunType
        }
      }
    }

    await updateLocationHrs(selectedLocation.location_id, newHrs);
    // await getLocationInfo(selectedLocation.location_id);
    setEditOpen(false);
    setBayEditHours(1);
  }

  // Formatting times to be displayed properly (ex. "14:00" will be converted to "2:00 PM")
  const formatTime = time => {
    let hr = parseInt(time.split(":")[0]);
    let min = parseInt(time.split(":")[1]);

    if (min < 10) {
      min = "0" + min;
    }
    
    if (hr > 12) {
      return `${hr - 12}:${min} PM`;
    } else if (hr === 12) {
      return `12:${min} PM`;
    } else if (hr < 12 && hr !== 0) {
      return `${hr}:${min} AM`;
    } else if (hr === 0) {
      return `12:${min} AM`;
    }
  }

  const configureDisplay = day => {
    if (!day.is_open) {
      return "Closed";
    } else {
      return `${formatTime(day.shift_one_start)} - ${ formatTime(day.shift_one_end)}`;
    }
  }

  const configureShift2Display = (start, end) => {
    console.log(start);
    console.log(end);
    return `${formatTime(start)} - ${ formatTime(end)}`;
  }

  const changeShiftType = e => {
    setShiftType({...shiftType, [e.target.name]: e.target.value});
  }

  return (
    <section>
      {!editOpen ?
      <div className="col-sm-10 mx-auto py-3 px-0">
        <div className="hours-of-operation-header">
          Weekly Schedule
        </div>

        <table class="table table-bordered">
          <thead>
            <tr className="text-center">
              <th></th>
              <th className="font-weight-normal">Bay 1</th>
              {selectedLocation && selectedLocation.wash_bays === 2 && <th className="font-weight-normal">Bay 2</th>}
            </tr>
          </thead>
          <tbody className="text-center">
            {/* MONDAY */}
            <DayHoursView
              selectedLocation={selectedLocation}
              dayBayOne={selectedLocation && selectedLocation.bayOneHours.monday}
              dayBayTwo={selectedLocation && selectedLocation.bayTwoHours.monday}
              dayText={"Monday"}
              configureDisplay={configureDisplay}
              configureShift2Display={configureShift2Display}
            />
            {/* TUESDAY */}
            <DayHoursView
              selectedLocation={selectedLocation}
              dayBayOne={selectedLocation && selectedLocation.bayOneHours.tuesday}
              dayBayTwo={selectedLocation && selectedLocation.bayTwoHours.tuesday}
              dayText={"Tuesday"}
              configureDisplay={configureDisplay}
              configureShift2Display={configureShift2Display}
            />
            {/* WEDNESDAY */}
            <DayHoursView
              selectedLocation={selectedLocation}
              dayBayOne={selectedLocation && selectedLocation.bayOneHours.wednesday}
              dayBayTwo={selectedLocation && selectedLocation.bayTwoHours.wednesday}
              dayText={"Wednesday"}
              configureDisplay={configureDisplay}
              configureShift2Display={configureShift2Display}
            />
            {/* THURSDAY */}
            <DayHoursView
              selectedLocation={selectedLocation}
              dayBayOne={selectedLocation && selectedLocation.bayOneHours.thursday}
              dayBayTwo={selectedLocation && selectedLocation.bayTwoHours.thursday}
              dayText={"Thursday"}
              configureDisplay={configureDisplay}
              configureShift2Display={configureShift2Display}
            />
            {/* FRIDAY */}
            <DayHoursView
              selectedLocation={selectedLocation}
              dayBayOne={selectedLocation && selectedLocation.bayOneHours.friday}
              dayBayTwo={selectedLocation && selectedLocation.bayTwoHours.friday}
              dayText={"Friday"}
              configureDisplay={configureDisplay}
              configureShift2Display={configureShift2Display}
            />
            {/* SATURDAY */}
            <DayHoursView
              selectedLocation={selectedLocation}
              dayBayOne={selectedLocation && selectedLocation.bayOneHours.saturday}
              dayBayTwo={selectedLocation && selectedLocation.bayTwoHours.saturday}
              dayText={"Saturday"}
              configureDisplay={configureDisplay}
              configureShift2Display={configureShift2Display}
            />
            {/* SUNDAY */}
            <DayHoursView
              selectedLocation={selectedLocation}
              dayBayOne={selectedLocation && selectedLocation.bayOneHours.sunday}
              dayBayTwo={selectedLocation && selectedLocation.bayTwoHours.sunday}
              dayText={"Sunday"}
              configureDisplay={configureDisplay}
              configureShift2Display={configureShift2Display}
            />
          </tbody>
        </table>
        <div style={{display: selectedLocation ? "initial" : "none"}} className="text-dark">
          Number of wash bays: &nbsp;
          <button
            value="1"
            className={selectedLocation && selectedLocation.wash_bays === 1 ? `wb-btn-1 active-wb-btn` : `wb-btn-1`}
            onClick={onBayQuantityChange}
          >
            1
          </button>
          <button
            value="2"
            className={selectedLocation && selectedLocation.wash_bays === 2 ? `wb-btn-2 active-wb-btn` : `wb-btn-2`}
            onClick={onBayQuantityChange}
          >
            2
          </button>
          <button onClick={openEdit} disabled={!selectedLocation} className="btn float-right submit-btn">Edit</button>
        </div>
      </div> :

      // EDIT SECTION
      <section>
      <div id="hours-of-operation-card" className="card-body">
        {selectedLocation && selectedLocation.wash_bays === 2 &&
        <div className="text-center mb-4">
          <button
            onClick={() => setBayEditHours(1)}
            className={bayEditHours === 1 ? `scheduler-bay-btn-1 active-sched` : `scheduler-bay-btn-1`}
          >
            Bay 1
          </button>
          <button
            onClick={() => setBayEditHours(2)}
            className={bayEditHours === 2 ? `scheduler-bay-btn-2 active-sched` : `scheduler-bay-btn-2`}
          >
            Bay 2
          </button>
        </div>
        }
        {bayEditHours === 1 ?
        <div>
          {((!mondayStart || !mondayEnd) && mondayOpen) ||
          ((!tuesdayStart || !tuesdayEnd) && tuesdayOpen) ||
          ((!wednesdayStart || !wednesdayEnd) && wednesdayOpen) ||
          ((!thursdayStart || !thursdayEnd) && thursdayOpen) ||
          ((!fridayStart || !fridayEnd) && fridayOpen) ||
          ((!saturdayStart || !saturdayEnd) && saturdayOpen) ||
          ((!sundayStart || !sundayEnd) && sundayOpen) ?
          <div className="alert alert-danger text-center p-1">
            *Time fields must be filled out completely
          </div>
          :
          <span style={{display: "none"}}></span>
          }
            {/* TIME TABLE */}
        <table className="table table-bordered">
          <thead>
            <tr className="text-center">
              <th></th>
              <th>Shift 1</th>
              <th>Shift 2</th>
            </tr>
          </thead>
          <tbody>
            {/* MONDAY */}
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={mondayOpen}
                  onChange={toggleDayOpen}
                  name="mondayOpen"
                /> Monday
              </th>
              <td className="text-center">
                <TimePicker
                  clearIcon={null}
                  disableClock={true}
                  className="time-select mr-1"
                  id="mondayStart"
                  name="mondayStart"
                  disabled={!mondayOpen}
                  value={mondayOpen && mondayStart}
                  onChange={time => setStartTimes({...startTimes, mondayStart: time})}
                />
                -
                <TimePicker
                  clearIcon={null}
                  disableClock={true}
                  className="time-select ml-1"
                  id="mondayEnd"
                  name="mondayEnd"
                  minTime={mondayStart}
                  disabled={!mondayOpen}
                  value={mondayOpen && mondayEnd}
                  onChange={time => setEndTimes({...endTimes, mondayEnd: time})}
                />
                <select onChange={changeShiftType} value={bayOneShift1MonType} className="ml-3" name="bayOneShift1MonType">
                  <option value="team">Team</option>
                  <option value="solo">Solo</option>
                </select>
              </td>
              <td className="text-center">
                {!bayOneShift2Mon
                ?
                  mondayOpen &&
                  <button className="new-shift-btn" onClick={() => setBayOneShift2Mon(true)}>Add Shift</button>
                :
                mondayOpen &&
                <div>
                  <i
                    onClick={() => setBayOneShift2Mon(false)}
                    className="far fa-times-circle mr-2"
                  />
                  <TimePicker
                    clearIcon={null}
                    disableClock={true}
                    className="time-select mr-1"
                    id="mondayStart"
                    name="mondayStartB1S2"
                    minTime={mondayEnd}
                    disabled={!mondayOpen}
                    value={mondayOpen && mondayStartB1S2}
                    onChange={time => setStartTimes({...startTimes, mondayStartB1S2: time})}
                  />
                    -
                  <TimePicker
                    clearIcon={null}
                    disableClock={true}
                    className="time-select ml-1"
                    id="mondayEnd"
                    name="mondayEndB1S2"
                    minTime={mondayStartB1S2}
                    disabled={!mondayOpen}
                    value={mondayOpen && mondayEndB1S2}
                    onChange={time => setEndTimes({...endTimes, mondayEndB1S2: time})}
                  />
                  <select onChange={changeShiftType} value={bayOneShift2MonType} className="ml-3" name="bayOneShift2MonType">
                    <option value="team">Team</option>
                    <option value="solo">Solo</option>
                  </select>
                </div>
                }
              </td>
            </tr>

            {/* TUESDAY */}
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={tuesdayOpen}
                  onChange={toggleDayOpen}
                  name="tuesdayOpen"
                /> Tuesday
              </th>
              <td className="text-center">
                <TimePicker
                  clearIcon={null}
                  disableClock={true}
                  className="time-select mr-1"
                  id="tuesdayStart"
                  name="tuesdayStart"
                  disabled={!tuesdayOpen}
                  value={tuesdayOpen && tuesdayStart}
                  onChange={time => setStartTimes({...startTimes, tuesdayStart: time})}
                />
                -
                <TimePicker
                  clearIcon={null}
                  disableClock={true}
                  className="time-select ml-1"
                  id="tuesdayEnd"
                  name="tuesdayEnd"
                  minTime={tuesdayStart}
                  disabled={!tuesdayOpen}
                  value={tuesdayOpen && tuesdayEnd}
                  onChange={time => setEndTimes({...endTimes, tuesdayEnd: time})}
                />
                <select onChange={changeShiftType} value={bayOneShift1TuesType} className="ml-3" name="bayOneShift1TuesType">
                  <option value="team">Team</option>
                  <option value="solo">Solo</option>
                </select>
              </td>
              <td className="text-center">
                {!bayOneShift2Tues
                ?
                  tuesdayOpen &&
                  <button className="new-shift-btn" onClick={() => setBayOneShift2Tues(true)}>Add Shift</button>
                :
                tuesdayOpen &&
                <div>
                  <i
                    onClick={() => setBayOneShift2Tues(false)}
                    className="far fa-times-circle mr-2"
                  />
                  <TimePicker
                    clearIcon={null}
                    disableClock={true}
                    className="time-select mr-1"
                    id="tuesdayStart"
                    name="tuesdayStartB1S2"
                    minTime={tuesdayEnd}
                    disabled={!tuesdayOpen}
                    value={tuesdayOpen && tuesdayStartB1S2}
                    onChange={time => setStartTimes({...startTimes, tuesdayStartB1S2: time})}
                  />
                    -
                  <TimePicker
                    clearIcon={null}
                    disableClock={true}
                    className="time-select ml-1"
                    id="tuesdayEnd"
                    name="tuesdayEndB1S2"
                    minTime={tuesdayStartB1S2}
                    disabled={!tuesdayOpen}
                    value={tuesdayOpen && tuesdayEndB1S2}
                    onChange={time => setEndTimes({...endTimes, tuesdayEndB1S2: time})}
                  />
                  <select onChange={changeShiftType} value={bayOneShift2TuesType} className="ml-3" name="bayOneShift2TuesType">
                    <option value="team">Team</option>
                    <option value="solo">Solo</option>
                  </select>
                </div>
                }
              </td>
            </tr>

            {/* WEDNESDAY */}
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={wednesdayOpen}
                  onChange={toggleDayOpen}
                  name="wednesdayOpen"
                /> Wednesday
              </th>
              <td className="text-center">
                <TimePicker
                  clearIcon={null}
                  disableClock={true}
                  className="time-select mr-1"
                  id="wednesdayStart"
                  name="wednesdayStart"
                  disabled={!wednesdayOpen}
                  value={wednesdayOpen && wednesdayStart}
                  onChange={time => setStartTimes({...startTimes, wednesdayStart: time})}
                />
                -
                <TimePicker
                  clearIcon={null}
                  disableClock={true}
                  className="time-select ml-1"
                  id="wednesdayEnd"
                  name="wednesdayEnd"
                  minTime={wednesdayStart}
                  disabled={!wednesdayOpen}
                  value={wednesdayOpen && wednesdayEnd}
                  onChange={time => setEndTimes({...endTimes, wednesdayEnd: time})}
                />
                <select onChange={changeShiftType} value={bayOneShift1WedType} className="ml-3" name="bayOneShift1WedType">
                  <option value="team">Team</option>
                  <option value="solo">Solo</option>
                </select>
              </td>
              <td className="text-center">
                {!bayOneShift2Wed
                ?
                  wednesdayOpen &&
                  <button className="new-shift-btn" onClick={() => setBayOneShift2Wed(true)}>Add Shift</button>
                :
                wednesdayOpen &&
                <div>
                  <i
                    onClick={() => setBayOneShift2Wed(false)}
                    className="far fa-times-circle mr-2"
                  />
                  <TimePicker
                    clearIcon={null}
                    disableClock={true}
                    className="time-select mr-1"
                    id="wednesdayStart"
                    name="wednesdayStartB1S2"
                    minTime={wednesdayEnd}
                    disabled={!wednesdayOpen}
                    value={wednesdayOpen && wednesdayStartB1S2}
                    onChange={time => setStartTimes({...startTimes, wednesdayStartB1S2: time})}
                  />
                    -
                  <TimePicker
                    clearIcon={null}
                    disableClock={true}
                    className="time-select ml-1"
                    id="wednesdayEnd"
                    name="wednesdayEndB1S2"
                    minTime={wednesdayStartB1S2}
                    disabled={!wednesdayOpen}
                    value={wednesdayOpen && wednesdayEndB1S2}
                    onChange={time => setEndTimes({...endTimes, wednesdayEndB1S2: time})}
                  />
                  <select onChange={changeShiftType} value={bayOneShift2WedType} className="ml-3" name="bayOneShift2WedType">
                    <option value="team">Team</option>
                    <option value="solo">Solo</option>
                  </select>
                </div>
                }
              </td>
            </tr>

            {/* THURSDAY */}
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={thursdayOpen}
                  onChange={toggleDayOpen}
                  name="thursdayOpen"
                /> Thursday
              </th>
              <td className="text-center">
                <TimePicker
                  clearIcon={null}
                  disableClock={true}
                  className="time-select mr-1"
                  id="thursdayStart"
                  name="thursdayStart"
                  disabled={!thursdayOpen}
                  value={thursdayOpen && thursdayStart}
                  onChange={time => setStartTimes({...startTimes, thursdayStart: time})}
                />
                -
                <TimePicker
                  clearIcon={null}
                  disableClock={true}
                  className="time-select ml-1"
                  id="thursdayEnd"
                  name="thursdayEnd"
                  minTime={thursdayStart}
                  disabled={!thursdayOpen}
                  value={thursdayOpen && thursdayEnd}
                  onChange={time => setEndTimes({...endTimes, thursdayEnd: time})}
                />
                <select onChange={changeShiftType} value={bayOneShift1ThursType} className="ml-3" name="bayOneShift1ThursType">
                  <option value="team">Team</option>
                  <option value="solo">Solo</option>
                </select>
              </td>
              <td className="text-center">
                {!bayOneShift2Thurs
                ?
                  thursdayOpen &&
                  <button className="new-shift-btn" onClick={() => setBayOneShift2Thurs(true)}>Add Shift</button>
                :
                thursdayOpen &&
                <div>
                  <i
                    onClick={() => setBayOneShift2Thurs(false)}
                    className="far fa-times-circle mr-2"
                  />
                  <TimePicker
                    clearIcon={null}
                    disableClock={true}
                    className="time-select mr-1"
                    id="thursdayStart"
                    name="thursdayStartB1S2"
                    minTime={thursdayEnd}
                    disabled={!thursdayOpen}
                    value={thursdayOpen && thursdayStartB1S2}
                    onChange={time => setStartTimes({...startTimes, thursdayStartB1S2: time})}
                  />
                    -
                  <TimePicker
                    clearIcon={null}
                    disableClock={true}
                    className="time-select ml-1"
                    id="thursdayEnd"
                    name="thursdayEndB1S2"
                    minTime={thursdayStartB1S2}
                    disabled={!thursdayOpen}
                    value={thursdayOpen && thursdayEndB1S2}
                    onChange={time => setEndTimes({...endTimes, thursdayEndB1S2: time})}
                  />
                  <select onChange={changeShiftType} value={bayOneShift2ThursType} className="ml-3" name="bayOneShift2ThursType">
                    <option value="team">Team</option>
                    <option value="solo">Solo</option>
                  </select>
                </div>
                }
              </td>
            </tr>

            {/* FRIDAY */}
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={fridayOpen}
                  onChange={toggleDayOpen}
                  name="fridayOpen"
                /> Friday
              </th>
              <td className="text-center">
                <TimePicker
                  clearIcon={null}
                  disableClock={true}
                  className="time-select mr-1"
                  id="fridayStart"
                  name="fridayStart"
                  disabled={!fridayOpen}
                  value={fridayOpen && fridayStart}
                  onChange={time => setStartTimes({...startTimes, fridayStart: time})}
                />
                -
                <TimePicker
                  clearIcon={null}
                  disableClock={true}
                  className="time-select ml-1"
                  id="fridayEnd"
                  name="fridayEnd"
                  minTime={fridayStart}
                  disabled={!fridayOpen}
                  value={fridayOpen && fridayEnd}
                  onChange={time => setEndTimes({...endTimes, fridayEnd: time})}
                />
                <select onChange={changeShiftType} value={bayOneShift1FriType} className="ml-3" name="bayOneShift1FriType">
                  <option value="team">Team</option>
                  <option value="solo">Solo</option>
                </select>
              </td>
              <td className="text-center">
                {!bayOneShift2Fri
                ?
                  fridayOpen &&
                  <button className="new-shift-btn" onClick={() => setBayOneShift2Fri(true)}>Add Shift</button>
                :
                fridayOpen &&
                <div>
                  <i
                    onClick={() => setBayOneShift2Fri(false)}
                    className="far fa-times-circle mr-2"
                  />
                  <TimePicker
                    clearIcon={null}
                    disableClock={true}
                    className="time-select mr-1"
                    id="fridayStart"
                    name="fridayStartB1S2"
                    minTime={fridayEnd}
                    disabled={!fridayOpen}
                    value={fridayOpen && fridayStartB1S2}
                    onChange={time => setStartTimes({...startTimes, fridayStartB1S2: time})}
                  />
                    -
                  <TimePicker
                    clearIcon={null}
                    disableClock={true}
                    className="time-select ml-1"
                    id="fridayEnd"
                    name="fridayEndB1S2"
                    minTime={fridayStartB1S2}
                    disabled={!fridayOpen}
                    value={fridayOpen && fridayEndB1S2}
                    onChange={time => setEndTimes({...endTimes, fridayEndB1S2: time})}
                  />
                  <select onChange={changeShiftType} value={bayOneShift2FriType} className="ml-3" name="bayOneShift2FriType">
                    <option value="team">Team</option>
                    <option value="solo">Solo</option>
                  </select>
                </div>
                }
              </td>
            </tr>
            {/* SATURDAY */}
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={saturdayOpen}
                  onChange={toggleDayOpen}
                  name="saturdayOpen"
                /> Saturday
              </th>
              <td className="text-center">
                <TimePicker
                  clearIcon={null}
                  disableClock={true}
                  className="time-select mr-1"
                  id="saturdayStart"
                  name="saturdayStart"
                  disabled={!saturdayOpen}
                  value={saturdayOpen && saturdayStart}
                  onChange={time => setStartTimes({...startTimes, saturdayStart: time})}
                />
                -
                <TimePicker
                  clearIcon={null}
                  disableClock={true}
                  className="time-select ml-1"
                  id="saturdayEnd"
                  name="saturdayEnd"
                  minTime={saturdayStart}
                  disabled={!saturdayOpen}
                  value={saturdayOpen && saturdayEnd}
                  onChange={time => setEndTimes({...endTimes, saturdayEnd: time})}
                />
                <select onChange={changeShiftType} value={bayOneShift1SatType} className="ml-3" name="bayOneShift1SatType">
                  <option value="team">Team</option>
                  <option value="solo">Solo</option>
                </select>
              </td>
              <td className="text-center">
                {!bayOneShift2Sat
                ?
                  saturdayOpen &&
                  <button className="new-shift-btn" onClick={() => setBayOneShift2Sat(true)}>Add Shift</button>
                :
                saturdayOpen &&
                <div>
                  <i
                    onClick={() => setBayOneShift2Sat(false)}
                    className="far fa-times-circle mr-2"
                  />
                  <TimePicker
                    clearIcon={null}
                    disableClock={true}
                    className="time-select mr-1"
                    id="saturdayStart"
                    name="saturdayStartB1S2"
                    minTime={saturdayEnd}
                    disabled={!saturdayOpen}
                    value={saturdayOpen && saturdayStartB1S2}
                    onChange={time => setStartTimes({...startTimes, saturdayStartB1S2: time})}
                  />
                    -
                  <TimePicker
                    clearIcon={null}
                    disableClock={true}
                    className="time-select ml-1"
                    id="saturdayEnd"
                    name="saturdayEndB1S2"
                    minTime={saturdayStartB1S2}
                    disabled={!saturdayOpen}
                    value={saturdayOpen && saturdayEndB1S2}
                    onChange={time => setEndTimes({...endTimes, saturdayEndB1S2: time})}
                  />
                  <select onChange={changeShiftType} value={bayOneShift2SatType} className="ml-3" name="bayOneShift2SatType">
                    <option value="team">Team</option>
                    <option value="solo">Solo</option>
                  </select>
                </div>
                }
              </td>
            </tr>
            {/* SUNDAY */}
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={sundayOpen}
                  onChange={toggleDayOpen}
                  name="sundayOpen"
                /> Sunday
              </th>
              <td className="text-center">
                <TimePicker
                  clearIcon={null}
                  disableClock={true}
                  className="time-select mr-1"
                  id="sundayStart"
                  name="sundayStart"
                  disabled={!sundayOpen}
                  value={sundayOpen && sundayStart}
                  onChange={time => setStartTimes({...startTimes, sundayStart: time})}
                />
                -
                <TimePicker
                  clearIcon={null}
                  disableClock={true}
                  className="time-select ml-1"
                  id="sundayEnd"
                  name="sundayEnd"
                  minTime={sundayStart}
                  disabled={!sundayOpen}
                  value={sundayOpen && sundayEnd}
                  onChange={time => setEndTimes({...endTimes, sundayEnd: time})}
                />
                <select onChange={changeShiftType} value={bayOneShift1SunType} className="ml-3" name="bayOneShift1SunType">
                  <option value="team">Team</option>
                  <option value="solo">Solo</option>
                </select>
              </td>
              <td className="text-center">
                {!bayOneShift2Sun
                ?
                  sundayOpen &&
                  <button className="new-shift-btn" onClick={() => setBayOneShift2Sun(true)}>Add Shift</button>
                :
                sundayOpen &&
                <div>
                  <i
                    onClick={() => setBayOneShift2Sun(false)}
                    className="far fa-times-circle mr-2"
                  />
                  <TimePicker
                    clearIcon={null}
                    disableClock={true}
                    className="time-select mr-1"
                    id="sundayStart"
                    name="sundayStartB1S2"
                    minTime={sundayEnd}
                    disabled={!sundayOpen}
                    value={sundayOpen && sundayStartB1S2}
                    onChange={time => setStartTimes({...startTimes, sundayStartB1S2: time})}
                  />
                    -
                  <TimePicker
                    clearIcon={null}
                    disableClock={true}
                    className="time-select ml-1"
                    id="sundayEnd"
                    name="sundayEndB1S2"
                    minTime={sundayStartB1S2}
                    disabled={!sundayOpen}
                    value={sundayOpen && sundayEndB1S2}
                    onChange={time => setEndTimes({...endTimes, sundayEndB1S2: time})}
                  />
                  <select onChange={changeShiftType} value={bayOneShift2SunType} className="ml-3" name="bayOneShift2SunType">
                    <option value="team">Team</option>
                    <option value="solo">Solo</option>
                  </select>
                </div>
                }
              </td>
            </tr>
          </tbody>
        </table>
        </div>
        :
        <div>
          {((!mondayStart2 || !mondayEnd2) && mondayOpen2) ||
          ((!tuesdayStart2 || !tuesdayEnd2) && tuesdayOpen2) ||
          ((!wednesdayStart2 || !wednesdayEnd2) && wednesdayOpen2) ||
          ((!thursdayStart2 || !thursdayEnd2) && thursdayOpen2) ||
          ((!fridayStart2 || !fridayEnd2) && fridayOpen2) ||
          ((!saturdayStart2 || !saturdayEnd2) && saturdayOpen2) ||
          ((!sundayStart2 || !sundayEnd2) && sundayOpen2) ?
          <div className="alert alert-danger text-center p-1">
            *Time fields must be filled out completely
          </div>
          :
          <span style={{display: "none"}}></span>
          }
          {/* MONDAY */}
          {/* TIME TABLE */}
        <table className="table table-bordered">
          <thead>
            <tr className="text-center">
              <th></th>
              <th>Shift 1</th>
              <th>Shift 2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={mondayOpen2}
                  onChange={toggleDayOpen}
                  name="mondayOpen2"
                /> Monday
              </th>
              <td className="text-center">
                <TimePicker
                  clearIcon={null}
                  disableClock={true}
                  className="time-select mr-1"
                  id="mondayStart2"
                  name="mondayStart2"
                  disabled={!mondayOpen2}
                  value={mondayOpen2 && mondayStart2}
                  onChange={time => setStartTimes({...startTimes, mondayStart2: time})}
                />
                -
                <TimePicker
                  clearIcon={null}
                  disableClock={true}
                  className="time-select ml-1"
                  id="mondayEnd2"
                  name="mondayEnd2"
                  minTime={mondayStart2}
                  disabled={!mondayOpen2}
                  value={mondayOpen2 && mondayEnd2}
                  onChange={time => setEndTimes({...endTimes, mondayEnd2: time})}
                />
                <select onChange={changeShiftType} value={bayTwoShift1MonType} className="ml-3" name="bayTwoShift1MonType">
                  <option value="team">Team</option>
                  <option value="solo">Solo</option>
                </select>
              </td>
              <td className="text-center">
                {!bayTwoShift2Mon
                ?
                  mondayOpen2 &&
                  <button className="new-shift-btn" onClick={() => setBayTwoShift2Mon(true)}>Add Shift</button>
                :
                mondayOpen2 &&
                <div>
                  <i
                    onClick={() => setBayTwoShift2Mon(false)}
                    className="far fa-times-circle mr-2"
                  />
                  <TimePicker
                    clearIcon={null}
                    disableClock={true}
                    className="time-select mr-1"
                    id="mondayStart2"
                    name="mondayStartB2S2"
                    minTime={mondayEnd2}
                    disabled={!mondayOpen2}
                    value={mondayOpen2 && mondayStartB2S2}
                    onChange={time => setStartTimes({...startTimes, mondayStartB2S2: time})}
                  />
                    -
                  <TimePicker
                    clearIcon={null}
                    disableClock={true}
                    className="time-select ml-1"
                    id="mondayEnd2"
                    name="mondayEndB2S2"
                    minTime={mondayStartB2S2}
                    disabled={!mondayOpen2}
                    value={mondayOpen2 && mondayEndB2S2}
                    onChange={time => setEndTimes({...endTimes, mondayEndB2S2: time})}
                  />
                  <select onChange={changeShiftType} value={bayTwoShift2MonType} className="ml-3" name="bayTwoShift2MonType">
                    <option value="team">Team</option>
                    <option value="solo">Solo</option>
                  </select>
                </div>
                }
              </td>
            </tr>

            {/* TUESDAY */}
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={tuesdayOpen2}
                  onChange={toggleDayOpen}
                  name="tuesdayOpen2"
                /> Tuesday
              </th>
              <td className="text-center">
                <TimePicker
                  clearIcon={null}
                  disableClock={true}
                  className="time-select mr-1"
                  id="tuesdayStart2"
                  name="tuesdayStart2"
                  disabled={!tuesdayOpen2}
                  value={tuesdayOpen2 && tuesdayStart2}
                  onChange={time => setStartTimes({...startTimes, tuesdayStart2: time})}
                />
                -
                <TimePicker
                  clearIcon={null}
                  disableClock={true}
                  className="time-select ml-1"
                  id="tuesdayEnd2"
                  name="tuesdayEnd2"
                  minTime={tuesdayStart2}
                  disabled={!tuesdayOpen2}
                  value={tuesdayOpen2 && tuesdayEnd2}
                  onChange={time => setEndTimes({...endTimes, tuesdayEnd2: time})}
                />
                <select onChange={changeShiftType} value={bayTwoShift1TuesType} className="ml-3" name="bayTwoShift1TuesType">
                  <option value="team">Team</option>
                  <option value="solo">Solo</option>
                </select>
              </td>
              <td className="text-center">
                {!bayTwoShift2Tues
                ?
                  tuesdayOpen2 &&
                  <button className="new-shift-btn" onClick={() => setBayTwoShift2Tues(true)}>Add Shift</button>
                :
                tuesdayOpen2 &&
                <div>
                  <i
                    onClick={() => setBayTwoShift2Tues(false)}
                    className="far fa-times-circle mr-2"
                  />
                  <TimePicker
                    clearIcon={null}
                    disableClock={true}
                    className="time-select mr-1"
                    id="tuesdayStart2"
                    name="tuesdayStartB2S2"
                    minTime={tuesdayEnd2}
                    disabled={!tuesdayOpen2}
                    value={tuesdayOpen2 && tuesdayStartB2S2}
                    onChange={time => setStartTimes({...startTimes, tuesdayStartB2S2: time})}
                  />
                    -
                  <TimePicker
                    clearIcon={null}
                    disableClock={true}
                    className="time-select ml-1"
                    id="tuesdayEnd2"
                    name="tuesdayEndB2S2"
                    minTime={tuesdayStartB2S2}
                    disabled={!tuesdayOpen2}
                    value={tuesdayOpen2 && tuesdayEndB2S2}
                    onChange={time => setEndTimes({...endTimes, tuesdayEndB2S2: time})}
                  />
                  <select onChange={changeShiftType} value={bayTwoShift2TuesType} className="ml-3" name="bayTwoShift2TuesType">
                    <option value="team">Team</option>
                    <option value="solo">Solo</option>
                  </select>
                </div>
                }
              </td>
            </tr>

            {/* WEDNESDAY */}
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={wednesdayOpen2}
                  onChange={toggleDayOpen}
                  name="wednesdayOpen2"
                /> Wednesday
              </th>
              <td className="text-center">
                <TimePicker
                  clearIcon={null}
                  disableClock={true}
                  className="time-select mr-1"
                  id="wednesdayStart2"
                  name="wednesdayStart2"
                  disabled={!wednesdayOpen2}
                  value={wednesdayOpen2 && wednesdayStart2}
                  onChange={time => setStartTimes({...startTimes, wednesdayStart2: time})}
                />
                -
                <TimePicker
                  clearIcon={null}
                  disableClock={true}
                  className="time-select ml-1"
                  id="wednesdayEnd2"
                  name="wednesdayEnd2"
                  minTime={wednesdayStart2}
                  disabled={!wednesdayOpen2}
                  value={wednesdayOpen2 && wednesdayEnd2}
                  onChange={time => setEndTimes({...endTimes, wednesdayEnd2: time})}
                />
                <select onChange={changeShiftType} value={bayTwoShift1WedType} className="ml-3" name="bayTwoShift1WedType">
                  <option value="team">Team</option>
                  <option value="solo">Solo</option>
                </select>
              </td>
              <td className="text-center">
                {!bayTwoShift2Wed
                ?
                  wednesdayOpen2 &&
                  <button className="new-shift-btn" onClick={() => setBayTwoShift2Wed(true)}>Add Shift</button>
                :
                wednesdayOpen2 &&
                <div>
                  <i
                    onClick={() => setBayTwoShift2Wed(false)}
                    className="far fa-times-circle mr-2"
                  />
                  <TimePicker
                    clearIcon={null}
                    disableClock={true}
                    className="time-select mr-1"
                    id="wednesdayStart2"
                    name="wednesdayStartB2S2"
                    minTime={wednesdayEnd2}
                    disabled={!wednesdayOpen2}
                    value={wednesdayOpen2 && wednesdayStartB2S2}
                    onChange={time => setStartTimes({...startTimes, wednesdayStartB2S2: time})}
                  />
                    -
                  <TimePicker
                    clearIcon={null}
                    disableClock={true}
                    className="time-select ml-1"
                    id="wednesdayEnd2"
                    name="wednesdayEndB1S2"
                    minTime={wednesdayStartB2S2}
                    disabled={!wednesdayOpen2}
                    value={wednesdayOpen2 && wednesdayEndB2S2}
                    onChange={time => setEndTimes({...endTimes, wednesdayEndB2S2: time})}
                  />
                  <select onChange={changeShiftType} value={bayTwoShift2WedType} className="ml-3" name="bayTwoShift2WedType">
                    <option value="team">Team</option>
                    <option value="solo">Solo</option>
                  </select>
                </div>
                }
              </td>
            </tr>

            {/* THURSDAY */}
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={thursdayOpen2}
                  onChange={toggleDayOpen}
                  name="thursdayOpen2"
                /> Thursday
              </th>
              <td className="text-center">
                <TimePicker
                  clearIcon={null}
                  disableClock={true}
                  className="time-select mr-1"
                  id="thursdayStart2"
                  name="thursdayStart2"
                  disabled={!thursdayOpen2}
                  value={thursdayOpen2 && thursdayStart2}
                  onChange={time => setStartTimes({...startTimes, thursdayStart2: time})}
                />
                -
                <TimePicker
                  clearIcon={null}
                  disableClock={true}
                  className="time-select ml-1"
                  id="thursdayEnd2"
                  name="thursdayEnd2"
                  minTime={thursdayStart2}
                  disabled={!thursdayOpen2}
                  value={thursdayOpen2 && thursdayEnd2}
                  onChange={time => setEndTimes({...endTimes, thursdayEnd2: time})}
                />
                <select onChange={changeShiftType} value={bayTwoShift1ThursType} className="ml-3" name="bayTwoShift1ThursType">
                  <option value="team">Team</option>
                  <option value="solo">Solo</option>
                </select>
              </td>
              <td className="text-center">
                {!bayTwoShift2Thurs
                ?
                  thursdayOpen2 &&
                  <button className="new-shift-btn" onClick={() => setBayTwoShift2Thurs(true)}>Add Shift</button>
                :
                thursdayOpen2 &&
                <div>
                  <i
                    onClick={() => setBayTwoShift2Thurs(false)}
                    className="far fa-times-circle mr-2"
                  />
                  <TimePicker
                    clearIcon={null}
                    disableClock={true}
                    className="time-select mr-1"
                    id="thursdayStart2"
                    name="thursdayStartB2S2"
                    minTime={thursdayEnd2}
                    disabled={!thursdayOpen2}
                    value={thursdayOpen2 && thursdayStartB2S2}
                    onChange={time => setStartTimes({...startTimes, thursdayStartB2S2: time})}
                  />
                    -
                  <TimePicker
                    clearIcon={null}
                    disableClock={true}
                    className="time-select ml-1"
                    id="thursdayEnd2"
                    name="thursdayEndB2S2"
                    minTime={thursdayStartB2S2}
                    disabled={!thursdayOpen2}
                    value={thursdayOpen2 && thursdayEndB2S2}
                    onChange={time => setEndTimes({...endTimes, thursdayEndB2S2: time})}
                  />
                  <select onChange={changeShiftType} value={bayTwoShift2ThursType} className="ml-3" name="bayTwoShift2ThursType">
                    <option value="team">Team</option>
                    <option value="solo">Solo</option>
                  </select>
                </div>
                }
              </td>
            </tr>

            {/* FRIDAY */}
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={fridayOpen2}
                  onChange={toggleDayOpen}
                  name="fridayOpen2"
                /> Friday
              </th>
              <td className="text-center">
                <TimePicker
                  clearIcon={null}
                  disableClock={true}
                  className="time-select mr-1"
                  id="fridayStart2"
                  name="fridayStart2"
                  disabled={!fridayOpen2}
                  value={fridayOpen2 && fridayStart2}
                  onChange={time => setStartTimes({...startTimes, fridayStart2: time})}
                />
                -
                <TimePicker
                  clearIcon={null}
                  disableClock={true}
                  className="time-select ml-1"
                  id="fridayEnd2"
                  name="fridayEnd2"
                  minTime={fridayStart2}
                  disabled={!fridayOpen2}
                  value={fridayOpen2 && fridayEnd2}
                  onChange={time => setEndTimes({...endTimes, fridayEnd2: time})}
                />
                <select onChange={changeShiftType} value={bayTwoShift1FriType} className="ml-3" name="bayTwoShift1FriType">
                  <option value="team">Team</option>
                  <option value="solo">Solo</option>
                </select>
              </td>
              <td className="text-center">
                {!bayTwoShift2Fri
                ?
                  fridayOpen2 &&
                  <button className="new-shift-btn" onClick={() => setBayTwoShift2Fri(true)}>Add Shift</button>
                :
                fridayOpen2 &&
                <div>
                  <i
                    onClick={() => setBayTwoShift2Fri(false)}
                    className="far fa-times-circle mr-2"
                  />
                  <TimePicker
                    clearIcon={null}
                    disableClock={true}
                    className="time-select mr-1"
                    id="fridayStart2"
                    name="fridayStartB2S2"
                    minTime={fridayEnd2}
                    disabled={!fridayOpen2}
                    value={fridayOpen2 && fridayStartB2S2}
                    onChange={time => setStartTimes({...startTimes, fridayStartB2S2: time})}
                  />
                    -
                  <TimePicker
                    clearIcon={null}
                    disableClock={true}
                    className="time-select ml-1"
                    id="fridayEnd2"
                    name="fridayEndB2S2"
                    minTime={fridayStartB2S2}
                    disabled={!fridayOpen2}
                    value={fridayOpen2 && fridayEndB2S2}
                    onChange={time => setEndTimes({...endTimes, fridayEndB2S2: time})}
                  />
                  <select onChange={changeShiftType} value={bayTwoShift2FriType} className="ml-3" name="bayTwoShift2FriType">
                    <option value="team">Team</option>
                    <option value="solo">Solo</option>
                  </select>
                </div>
                }
              </td>
            </tr>
            {/* SATURDAY */}
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={saturdayOpen2}
                  onChange={toggleDayOpen}
                  name="saturdayOpen2"
                /> Saturday
              </th>
              <td className="text-center">
                <TimePicker
                  clearIcon={null}
                  disableClock={true}
                  className="time-select mr-1"
                  id="saturdayStart2"
                  name="saturdayStart2"
                  disabled={!saturdayOpen2}
                  value={saturdayOpen2 && saturdayStart2}
                  onChange={time => setStartTimes({...startTimes, saturdayStart2: time})}
                />
                -
                <TimePicker
                  clearIcon={null}
                  disableClock={true}
                  className="time-select ml-1"
                  id="saturdayEnd2"
                  name="saturdayEnd2"
                  minTime={saturdayStart2}
                  disabled={!saturdayOpen2}
                  value={saturdayOpen2 && saturdayEnd2}
                  onChange={time => setEndTimes({...endTimes, saturdayEnd2: time})}
                />
                <select onChange={changeShiftType} value={bayTwoShift1SatType} className="ml-3" name="bayTwoShift1SatType">
                  <option value="team">Team</option>
                  <option value="solo">Solo</option>
                </select>
              </td>
              <td className="text-center">
                {!bayTwoShift2Sat
                ?
                saturdayOpen2 &&
                  <button className="new-shift-btn" onClick={() => setBayTwoShift2Sat(true)}>Add Shift</button>
                :
                saturdayOpen2 &&
                  <div>
                  <i
                    onClick={() => setBayTwoShift2Sat(false)}
                    className="far fa-times-circle mr-2"
                  />
                  <TimePicker
                    clearIcon={null}
                    disableClock={true}
                    className="time-select mr-1"
                    id="saturdayStart2"
                    name="saturdayStartB2S2"
                    minTime={saturdayEnd2}
                    disabled={!saturdayOpen2}
                    value={saturdayOpen2 && saturdayStartB2S2}
                    onChange={time => setStartTimes({...startTimes, saturdayStartB2S2: time})}
                  />
                    -
                  <TimePicker
                    clearIcon={null}
                    disableClock={true}
                    className="time-select ml-1"
                    id="saturdayEnd2"
                    name="saturdayEndB2S2"
                    minTime={saturdayStartB2S2}
                    disabled={!saturdayOpen2}
                    value={saturdayOpen2 && saturdayEndB2S2}
                    onChange={time => setEndTimes({...endTimes, saturdayEndB2S2: time})}
                  />
                  <select onChange={changeShiftType} value={bayTwoShift2SatType} className="ml-3" name="bayTwoShift2SatType">
                    <option value="team">Team</option>
                    <option value="solo">Solo</option>
                  </select>
                </div>
                }
              </td>
            </tr>
            {/* SUNDAY */}
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={sundayOpen2}
                  onChange={toggleDayOpen}
                  name="sundayOpen2"
                /> Sunday
              </th>
              <td className="text-center">
                <TimePicker
                  clearIcon={null}
                  disableClock={true}
                  className="time-select mr-1"
                  id="sundayStart2"
                  name="sundayStart2"
                  disabled={!sundayOpen2}
                  value={sundayOpen2 && sundayStart2}
                  onChange={time => setStartTimes({...startTimes, sundayStart2: time})}
                />
                -
                <TimePicker
                  clearIcon={null}
                  disableClock={true}
                  className="time-select ml-1"
                  id="sundayEnd2"
                  name="sundayEnd2"
                  minTime={sundayStart2}
                  disabled={!sundayOpen2}
                  value={sundayOpen2 && sundayEnd2}
                  onChange={time => setEndTimes({...endTimes, sundayEnd2: time})}
                />
                <select onChange={changeShiftType} value={bayTwoShift1SunType} className="ml-3" name="bayTwoShift1SunType">
                  <option value="team">Team</option>
                  <option value="solo">Solo</option>
                </select>
              </td>
              <td className="text-center">
                {!bayTwoShift2Sun
                ?
                  sundayOpen2 && <button className="new-shift-btn" onClick={() => setBayTwoShift2Sun(true)}>Add Shift</button>
                :
                sundayOpen2 &&
                <div>
                  <i
                    onClick={() => setBayTwoShift2Sun(false)}
                    className="far fa-times-circle mr-2"
                  />
                  <TimePicker
                    clearIcon={null}
                    disableClock={true}
                    className="time-select mr-1"
                    id="sundayStart2"
                    name="sundayStartB2S2"
                    minTime={sundayEnd2}
                    disabled={!sundayOpen2}
                    value={sundayOpen2 && sundayStartB2S2}
                    onChange={time => setStartTimes({...startTimes, sundayStartB2S2: time})}
                  />
                    -
                  <TimePicker
                    clearIcon={null}
                    disableClock={true}
                    className="time-select ml-1"
                    id="sundayEnd2"
                    name="sundayEndB2S2"
                    minTime={sundayStartB2S2}
                    disabled={!sundayOpen2}
                    value={sundayOpen2 && sundayEndB2S2}
                    onChange={time => setEndTimes({...endTimes, sundayEndB2S2: time})}
                  />
                  <select onChange={changeShiftType} value={bayTwoShift2SunType} className="ml-3" name="bayTwoShift2SunType">
                    <option value="team">Team</option>
                    <option value="solo">Solo</option>
                  </select>
                </div>
                }
              </td>
            </tr>
          </tbody>
        </table>
        </div>
        }
      </div>
      <div class="card-footer text-muted edit-hrs-card-footer">
        <span>
          <button onClick={onCancel} className="btn btn-link cancel-btn">Cancel</button>
          <button
            disabled={
              ((!mondayStart || !mondayEnd) && mondayOpen) ||
              ((!tuesdayStart || !tuesdayEnd) && tuesdayOpen) ||
              ((!wednesdayStart || !wednesdayEnd) && wednesdayOpen) ||
              ((!thursdayStart || !thursdayEnd) && thursdayOpen) ||
              ((!fridayStart || !fridayEnd) && fridayOpen) ||
              ((!saturdayStart || !saturdayEnd) && saturdayOpen) ||
              ((!sundayStart || !sundayEnd) && sundayOpen) ||
              ((!mondayStart2 || !mondayEnd2) && mondayOpen2) ||
              ((!tuesdayStart2 || !tuesdayEnd2) && tuesdayOpen2) ||
              ((!wednesdayStart2 || !wednesdayEnd2) && wednesdayOpen2) ||
              ((!thursdayStart2 || !thursdayEnd2) && thursdayOpen2) ||
              ((!fridayStart2 || !fridayEnd2) && fridayOpen2) ||
              ((!saturdayStart2 || !saturdayEnd2) && saturdayOpen2) ||
              ((!sundayStart2 || !sundayEnd2) && sundayOpen2)
            }
            onClick={updateHrs}
            className="btn submit-btn"
          >
              Save
          </button>
        </span>
      </div>
    </section>
  }
  </section>
  )
}

const mapStateToProps = state => ({
  location: state.location
});

export default connect(mapStateToProps, { updateLocationHrs, updateWashBayQuantity, getLocationInfo })(HoursOfOperation);
