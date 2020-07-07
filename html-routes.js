require("dotenv").config;
const express = require("express");
const { request } = require("https");
const app = express();
const token = process.env.TOKEN;

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
  app.post("/webhook/", (req, res) => {
    let messaging_events = req.body.entry[0].messaging;
    for (let i = 0; i < messaging_events.length; i++) {
      let event = messaging_events[i];
      let sender = event.sender.id;
      if (event.message && event.message.text) {
        let text = event.message.text;
        sendText(sender, text.substring(0, 100));
      }
    }
    res.sendStatus(200);
  });
  function sendText(sender, text) {
    let messageData = { text: text };
    request(
      {
        method: "POST",
        url: `https://graph.facebook.com/v2.6/me/subscribed_apps?subscribed_fields=publisher_subscriptions&access_token=${token}`,
        qs: { access_token: token },
        json: {
          receipt: { id: sender },
          message: messageData,
        },
      },
      (error, response, body) => {
        if (error) {
          console.error("Error while subscription: ", error);
        } else {
          console.log("Subscription result: ", response.body);
        }
      }
    );
  }
};
