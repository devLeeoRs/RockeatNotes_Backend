require("express-async-errors");

const migrationsRun = require("./database/sqlite/migrations");
const AppError = require("./utils/AppError");
const express = require("express"); // import from express
const routes = require("./routes");
const uploadConfig = require("./configs/upload");
const cors = require("cors");

const app = express(); // initializing the express
app.use(cors());

app.use(express.json());
migrationsRun();
app.use(routes);

app.use("/uploads", express.static(uploadConfig.UPLOADS_FOLDER));

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "internal server error ",
  });
});

const PORT = 3333;
app.listen(PORT, () => {
  console.log(`🔥 Server is running on  http://localhost/${PORT}`);
});
