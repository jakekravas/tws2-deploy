const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  location_id: {
    type: String,
    required: true
  },
  terminal_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zip: {
    type: Number,
    required: true
  },
  washBays: {
    type: Number,
    required: true
  },
  bayOneHours: {
    monday: {
      isOpen: {
        type: Boolean,
        default: true,
      },
      twentyFourHrs: {
        type: Boolean,
        default: false,
      },
      start: {
        type: String
      },
      end: {
        type: String
      },
      type: {
        type: String,
        default: "team",
        required: true
      },
      shift2: {
        type: Boolean,
        default: false
      },
      shift2Start: {
        type: String,
        default: "17:00"
      },
      shift2End: {
        type: String,
        default: "23:00"
      },
      shift2Type: {
        type: String,
        default: "team",
        required: true
      }
    },
    tuesday: {
      isOpen: {
        type: Boolean,
        default: true,
      },
      twentyFourHrs: {
        type: Boolean,
        default: false,
      },
      start: {
        type: String
      },
      end: {
        type: String
      },
      type: {
        type: String,
        default: "team",
        required: true
      },
      shift2: {
        type: Boolean,
        default: false
      },
      shift2Start: {
        type: String,
        default: "17:00"
      },
      shift2End: {
        type: String,
        default: "23:00"
      },
      shift2Type: {
        type: String,
        default: "team",
        required: true
      }
    },
    wednesday: {
      isOpen: {
        type: Boolean,
        default: true,
      },
      twentyFourHrs: {
        type: Boolean,
        default: false,
      },
      start: {
        type: String
      },
      end: {
        type: String
      },
      type: {
        type: String,
        default: "team",
        required: true
      },
      shift2: {
        type: Boolean,
        default: false
      },
      shift2Start: {
        type: String,
        default: "17:00"
      },
      shift2End: {
        type: String,
        default: "23:00"
      },
      shift2Type: {
        type: String,
        default: "team",
        required: true
      }
    },
    thursday: {
      isOpen: {
        type: Boolean,
        default: true,
      },
      twentyFourHrs: {
        type: Boolean,
        default: false,
      },
      start: {
        type: String
      },
      end: {
        type: String
      },
      type: {
        type: String,
        default: "team",
        required: true
      },
      shift2: {
        type: Boolean,
        default: false
      },
      shift2Start: {
        type: String,
        default: "17:00"
      },
      shift2End: {
        type: String,
        default: "23:00"
      },
      shift2Type: {
        type: String,
        default: "team",
        required: true
      }
    },
    friday: {
      isOpen: {
        type: Boolean,
        default: true,
      },
      twentyFourHrs: {
        type: Boolean,
        default: false,
      },
      start: {
        type: String
      },
      type: {
        type: String,
        default: "team",
        required: true
      },
      end: {
        type: String
      },
      shift2: {
        type: Boolean,
        default: false
      },
      shift2Start: {
        type: String,
        default: "17:00"
      },
      shift2End: {
        type: String,
        default: "23:00"
      },
      shift2Type: {
        type: String,
        default: "team",
        required: true
      }
    },
    saturday: {
      isOpen: {
        type: Boolean,
        default: true,
      },
      twentyFourHrs: {
        type: Boolean,
        default: false,
      },
      start: {
        type: String
      },
      type: {
        type: String,
        default: "team",
        required: true
      },
      end: {
        type: String
      },
      shift2: {
        type: Boolean,
        default: false
      },
      shift2Start: {
        type: String,
        default: "17:00"
      },
      shift2End: {
        type: String,
        default: "23:00"
      },
      shift2Type: {
        type: String,
        default: "team",
        required: true
      }
    },
    sunday: {
      isOpen: {
        type: Boolean,
        default: true,
      },
      twentyFourHrs: {
        type: Boolean,
        default: false,
      },
      start: {
        type: String
      },
      end: {
        type: String
      },
      type: {
        type: String,
        default: "team",
        required: true
      },
      shift2: {
        type: Boolean,
        default: false
      },
      shift2Start: {
        type: String,
        default: "17:00"
      },
      shift2End: {
        type: String,
        default: "23:00"
      },
      shift2Type: {
        type: String,
        default: "team",
        required: true
      }
    }
  },
  bayTwoHours: {
    monday: {
      isOpen: {
        type: Boolean,
        default: true,
      },
      twentyFourHrs: {
        type: Boolean,
        default: false,
      },
      start: {
        type: String
      },
      end: {
        type: String
      },
      type: {
        type: String,
        default: "team",
        required: true
      },
      shift2: {
        type: Boolean,
        default: false
      },
      shift2Start: {
        type: String,
        default: "17:00"
      },
      shift2End: {
        type: String,
        default: "23:00"
      },
      shift2Type: {
        type: String,
        default: "team",
        required: true
      }
    },
    tuesday: {
      isOpen: {
        type: Boolean,
        default: true,
      },
      twentyFourHrs: {
        type: Boolean,
        default: false,
      },
      start: {
        type: String
      },
      end: {
        type: String
      },
      type: {
        type: String,
        default: "team",
        required: true
      },
      shift2: {
        type: Boolean,
        default: false
      },
      shift2Start: {
        type: String,
        default: "17:00"
      },
      shift2End: {
        type: String,
        default: "23:00"
      },
      shift2Type: {
        type: String,
        default: "team",
        required: true
      }
    },
    wednesday: {
      isOpen: {
        type: Boolean,
        default: true,
      },
      twentyFourHrs: {
        type: Boolean,
        default: false,
      },
      start: {
        type: String
      },
      end: {
        type: String
      },
      type: {
        type: String,
        default: "team",
        required: true
      },
      shift2: {
        type: Boolean,
        default: false
      },
      shift2Start: {
        type: String,
        default: "17:00"
      },
      shift2End: {
        type: String,
        default: "23:00"
      },
      shift2Type: {
        type: String,
        default: "team",
        required: true
      }
    },
    thursday: {
      isOpen: {
        type: Boolean,
        default: true,
      },
      twentyFourHrs: {
        type: Boolean,
        default: false,
      },
      start: {
        type: String
      },
      end: {
        type: String
      },
      type: {
        type: String,
        default: "team",
        required: true
      },
      shift2: {
        type: Boolean,
        default: false
      },
      shift2Start: {
        type: String,
        default: "17:00"
      },
      shift2End: {
        type: String,
        default: "23:00"
      },
      shift2Type: {
        type: String,
        default: "team",
        required: true
      }
    },
    friday: {
      isOpen: {
        type: Boolean,
        default: true,
      },
      twentyFourHrs: {
        type: Boolean,
        default: false,
      },
      start: {
        type: String
      },
      end: {
        type: String
      },
      type: {
        type: String,
        default: "team",
        required: true
      },
      shift2: {
        type: Boolean,
        default: false
      },
      shift2Start: {
        type: String,
        default: "17:00"
      },
      shift2End: {
        type: String,
        default: "23:00"
      },
      shift2Type: {
        type: String,
        default: "team",
        required: true
      }
    },
    saturday: {
      isOpen: {
        type: Boolean,
        default: true,
      },
      twentyFourHrs: {
        type: Boolean,
        default: false,
      },
      start: {
        type: String
      },
      end: {
        type: String
      },
      type: {
        type: String,
        default: "team",
        required: true
      },
      shift2: {
        type: Boolean,
        default: false
      },
      shift2Start: {
        type: String,
        default: "17:00"
      },
      shift2End: {
        type: String,
        default: "23:00"
      },
      shift2Type: {
        type: String,
        default: "team",
        required: true
      }
    },
    sunday: {
      isOpen: {
        type: Boolean,
        default: true,
      },
      twentyFourHrs: {
        type: Boolean,
        default: false,
      },
      start: {
        type: String
      },
      end: {
        type: String
      },
      type: {
        type: String,
        default: "team",
        required: true
      },
      shift2: {
        type: Boolean,
        default: false
      },
      shift2Start: {
        type: String,
        default: "17:00"
      },
      shift2End: {
        type: String,
        default: "23:00"
      },
      shift2Type: {
        type: String,
        default: "team",
        required: true
      }
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Location = mongoose.model("location", LocationSchema);