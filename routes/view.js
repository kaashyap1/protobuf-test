const express = require("express");
const router = express.Router();
const axios = require("axios");

var person = require("./send_pb");
var message = new person.Person();

const options = {
  headers: { "Content-Type": "application/octet-stream" },
};

router.get("/", function (req, res) {
  res.send("Go to /proto");
});

router.get("/proto", function (req, res) {
  axios
    .get("http://workcare.cscreener.lh:8080/kdp/api/get_responses", options)
    .then((response) => {
      // console.log(response.data);
      // var decodedMessage = Person.
      // let decodedMessage = Person.deserializeBinary(response.data);
      // let decodedMessage = message.deserializeBinary(response.data);
      // var message = new person.Person();
      // var message1 = new person.Person();
      // message.setFirstName("Test");
      // message.setLastName("Test1");
      // message.setHeight(25);
      // message.setAge(20);

      // // // Serializes to a UInt8Array.
      // var bytes = message.serializeBinary();

      // console.log(bytes);

      let data = response.data;
      console.log("Response from the server: " + data);
      let buff = new Buffer(data, "base64");
      console.log(buff);
      // console.log(new Uint8Array(data));
      let decodedMessage = person.Person.deserializeBinary(
        new Uint8Array(buff)
      );

      // Get Every attribute by using the getter
      console.log(decodedMessage.getAge());

      res.send(decodedMessage);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
