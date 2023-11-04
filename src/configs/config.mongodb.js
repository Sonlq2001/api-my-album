"use strict";

const dev = {
  app: {
    port: process.env.DEV_APP_PORT,
  },
  db: {
    host: process.env.DEV_DB_HOST || "127.0.0.1",
    port: process.env.DEV_DB_PORT || 27017,
    name: process.env.DEV_DB_NAME || "my-album",
  },
};

const config = { dev };

const env = process.env.NODE_END || "dev";

module.exports = config[env];
