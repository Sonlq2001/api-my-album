const mongoose = require("mongoose");

// const {
//   db: { host, name, port },
// } = require("../configs/config.mongodb");

const connectString = process.env.DEV_APP;

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    mongoose
      .connect(connectString)
      .then(() => console.log("Connected mongodb success"))
      .catch(() => console.log("Error connect db !"));
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instanceMongodb = Database.getInstance();

module.exports = instanceMongodb;
