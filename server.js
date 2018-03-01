const express = require("express");
const bodyParser = require("body-parser");
let app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Route scripts & styles
app.use('/styles/bootstrap', express.static(__dirname + '/bower_components/bootstrap4/dist/css/'));
app.use('/styles/slider', express.static(__dirname + '/bower_components/seiyria-bootstrap-slider/dist/css/'));
app.use('/styles/app', express.static(__dirname + '/app/css/'));
app.use('/scripts/bootstrap', express.static(__dirname + '/bower_components/bootstrap4/dist/js/'));
app.use('/scripts/slider', express.static(__dirname + '/bower_components/seiyria-bootstrap-slider/dist/'));
app.use('/scripts/jquery', express.static(__dirname + '/bower_components/jquery/dist/'));
app.use('/scripts/app', express.static(__dirname + '/app/js/'));

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
