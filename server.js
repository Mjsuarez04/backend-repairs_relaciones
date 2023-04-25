require("dotenv").config();
const app = require("./app");
const { db } = require("./database/db");
const { associationModel } = require("./models/associationModel");

db.authenticate()
  .then(() => console.log("Database Authenticated"))
  .catch((err) => console.log(err));

associationModel();

db.sync()
  .then(() => console.log("Database Synced"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 3200;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
