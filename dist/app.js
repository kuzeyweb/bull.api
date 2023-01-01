"use strict";

var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _index = require("./routes/index.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const app = (0, _express.default)();
app.use(_express.default.json());
app.use((0, _cors.default)());
app.use(_express.default.urlencoded({
  extended: true
}));
app.use('/api/auth', _index.auth);
app.use('/api/me', _index.me);
app.listen(5000, console.log("Server is running on PORT 5000"));