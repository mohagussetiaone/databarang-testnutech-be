import Sequelize from "sequelize";
import config from "./config";

const sequelize = new Sequelize(config.db_name, config.db_pass, config.db_username, {
  dialect: "postgres",
});

sequelize
  .authenticate()
  .then(() => console.log("connection has been estabilished successfully"))
  .catch((err) => console.log(err));

export { sequelize };
