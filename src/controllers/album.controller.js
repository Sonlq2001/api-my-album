"use strict";

// const AccessService = require("../services/access.service");
// const SuccessResponse = require("../core/success.response");

class AlbumController {
  static async getAlbums(req, res) {
    return res.status(200).json({ data: [{ image: "", title: "1" }] });
  }
}

module.exports = AlbumController;
