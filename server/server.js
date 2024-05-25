require("dotenv").config();
const app = require("./src/app");
const sequelize = require("./src/config/database");
const port = process.env.PORT ;

sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized.");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Unable to synchronize the database:", err);
    process.exit(1);
});

  