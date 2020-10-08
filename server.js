const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

connectDB();

app.use(express.json({
  extended: false
}));

// Routes
// app.use("/api/locations", require('./routes/api/location'));
// app.use("/api/washtypes", require('./routes/api/washtypes'));
// app.use("/api/workorders", require('./routes/api/workorders'));

// Server static assets in production
if (process.env.NODE_ENV ==="production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});
