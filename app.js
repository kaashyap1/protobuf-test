var bodyParser = require("body-parser");
methodOverride = require("method-override");

express = require("express");
app = express();

// Defining Routes
//require("./routes/routes")(app);

// App config
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const router = require("./routes/view.js");
app.use(router);

app.listen(3000, function () {
  console.log("SERVER IS RUNNING");
});
