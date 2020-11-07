const express = require('express');
const path = require('path');

const app = express();

// Database
const pg_db = require('./config/database');
const mssql_db = require('./config/db_sql_server');

// DB
mssql_db.authenticate()
  .then(() => console.log("MSSQL database connected..."))
  .catch(err => console.log("Error: " + err));

pg_db.authenticate()
  .then(() => console.log("Postgres database connected..."))
  .catch(err => console.log("Error: " + err));

  
app.use(express.json({
  extended: false
}));

// Routes
app.use("/api/locations", require('./routes/api/locations'));
app.use("/api/washtypes", require('./routes/api/washtypes'));
app.use("/api/workorders", require('./routes/api/workorders'));
app.use("/api/userid", require('./routes/api/userid'));

// Server static assets in production
if (process.env.NODE_ENV ==="production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  })
}

const PORT = process.env.PORT || 5000;
// const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));