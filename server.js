"use strict";

const app = require("./src/app");

const PORT = process.env.PORT || 3040;

const server = app.listen(PORT, () => {
  console.log(`Server running ${PORT}`);
});

process.on("SIGINT", () => {
  server.close(() => console.log("Exit server"));
});
