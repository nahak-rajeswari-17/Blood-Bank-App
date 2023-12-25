//use " npm run server " to run the file
//to run the react app 1st use "cd client" then press enter, then use "npm start" & press enter
//'npm run dev' works when the file is in the root directory and not in the client directory
//use '&nbsp' in html to add space
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

//dot config
dotenv.config();

//Mongodb connection
connectDB();

//rest object
const app = express();

//middlewares configuration
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//port
//1st the port in env file is accessed if it cant be ftched then 8080 port will run
// this is made so the server doesnt get crashed
const PORT = process.env.PORT || 8080;

app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/inventory", require("./routes/inventoryRoutes"));
app.use("/api/v1/analytics", require("./routes/analyticsRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));

//static folder
app.use(express.static(path.join(__dirname, "./client/build")));

//static routes
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//listen
app.listen(PORT, () => {
  console.log(
    `Node Server Running In ${process.env.DEV_MODE} ModeOn Port ${process.env.PORT}`
      .bgBlue.white
  );
});
