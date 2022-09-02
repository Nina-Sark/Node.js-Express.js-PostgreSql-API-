require("dotenv").config({ path: "./config/config.env" });
const express = require("express");
const db = require("./config/db");
const cors = require("cors");
const { notFound } = require("./middlewares/notFound");
const { errorHandler } = require("./middlewares/errorHandler");
const userRouter = require("./routes/usersRoute");
const typeRouter = require("./routes/typesRoute");
const brandRouter = require("./routes/brandRoute");
const deviceRouter = require("./routes/deviceRoute");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`${process.env.API_URL}/users`, userRouter);
app.use(`${process.env.API_URL}/types`, typeRouter);
app.use(`${process.env.API_URL}/brands`, brandRouter);
app.use(`${process.env.API_URL}/devices`, deviceRouter);

app.use(errorHandler);
app.use(notFound);

const startServer = async () => {
  try {
    app.listen(process.env.PORT, () =>
      console.log(`Port running on ${process.env.PORT}`)
    );
  } catch (err) {
    process.exit(1);
    throw new Error(err);
  }
};

startServer();
