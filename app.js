const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const xss = require("xss-clean");
const helmet = require("helmet");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/error.controller");

const userRoutes = require("./routes/user.routes");
const repairRoutes = require("./routes/repairs.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP, please try again in one hour",
});

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(xss());
app.use(hpp());

app.use("/api/v1", limiter);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/repairs", repairRoutes);

app.all("*", (req, res, next) => {
  return next(
    new AppError(`Cannot find ${req.originalUrl} on this server!`, 404)
  );
});
app.use(globalErrorHandler);
module.exports = app;
