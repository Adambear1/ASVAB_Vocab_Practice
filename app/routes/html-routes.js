"use strict";
module.exports = (app) => {
  app.get("/", (req, res) => {
    res.send("dafsvx");
  });
  app.get("/webhook/", (req, res) => {
    if (req.query["hub.verify_token"] === "blondiebytes") {
      res.send(req.query["hub.challenge"]);
    }
    res.send("Wrong token");
  });
};
