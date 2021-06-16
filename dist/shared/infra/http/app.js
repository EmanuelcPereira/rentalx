"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;

require("reflect-metadata");

require("dotenv/config");

var _upload = _interopRequireDefault(require("@config/upload"));

var _cors = _interopRequireDefault(require("cors"));

var _express = _interopRequireDefault(require("express"));

require("express-async-errors");

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _AppError = require("@shared/errors/AppError");

var _routes = require("@shared/infra/http/routes");

var _typeorm = _interopRequireDefault(require("@shared/infra/typeorm"));

require("@shared/container");

var _swagger = _interopRequireDefault(require("../../../swagger.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _typeorm.default)();
const app = (0, _express.default)();
exports.app = app;
app.use((0, _cors.default)());
app.use(_express.default.json());
app.use("/api-docs", _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(_swagger.default));
app.use("/avatar", _express.default.static(`${_upload.default.tmpFolder}/avatar`));
app.use("/avatar", _express.default.static(`${_upload.default.tmpFolder}/cars`));
app.use(_routes.router);
app.use((err, req, res, next) => {
  if (err instanceof _AppError.AppError) {
    return res.status(err.statusCode).json({
      message: err.message
    });
  }

  return res.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`
  });
});