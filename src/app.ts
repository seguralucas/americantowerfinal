import { createConnection } from "typeorm";
import { checkJwt } from "./middlewares/checkJwt";
import { test } from "./middlewares/test";
import { validatePermissions } from "./middlewares/validatePermission";
import { authorizationDecision } from "./middlewares/authorizationDecision";
const apiHandler = require("./components/apiHandler")

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const functions = require('firebase-functions')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const ENTITIES_BASE_URL = "entities"
const http = require('http');
const https = require('https');


var appOnPremise = express();

// view engine setup
appOnPremise.use(logger('dev'));
appOnPremise.use(express.json());
appOnPremise.use(express.urlencoded({ extended: false }));
appOnPremise.use(cookieParser());
appOnPremise.use("/public",express.static(path.join(__dirname, 'public')));
appOnPremise.use("/",express.static(path.join(__dirname, 'public/build')));
appOnPremise.use(bodyParser.urlencoded({ extended: true }));
appOnPremise.use(bodyParser.json());

//appOnPremise.use(express.static(path.join(__dirname, 'public')));
console.log(path.join(__dirname, 'public'))
var users = require('./routes/usersRoutes');
var auth = require('./routes/authRoutes');
const fs = require('fs');

const privateKey = fs.readFileSync((path.join(__dirname,'/certificados/privkey.pem')), 'utf8');
const certificate = fs.readFileSync((path.join(__dirname,'/certificados/cert.pem')), 'utf8');
const ca = fs.readFileSync((path.join(__dirname,'/certificados/chain.pem')), 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};
const genericEntitiesServicePath = [] //all services that need the same validation path
genericEntitiesServicePath.push({ "route": require('./routes/usersRoutes'), "serviceName": "users" })
genericEntitiesServicePath.push({ "route": require('./routes/MunicipalidadRoutes'), "serviceName": "municipalidades" })
genericEntitiesServicePath.push({ "route": require('./routes/EnforcementRoutes'), "serviceName": "enforcements" })
genericEntitiesServicePath.push({ "route": require('./routes/ProvinciaRoutes'), "serviceName": "provincias" })
genericEntitiesServicePath.push({ "route": require('./routes/ContextoPoliticoRoutes'), "serviceName": "contextos-politicos" })
genericEntitiesServicePath.push({ "route": require('./routes/ReglamentacionRoutes'), "serviceName": "reglamentaciones" })
genericEntitiesServicePath.push({ "route": require('./routes/reportRoutes'), "serviceName": "reports" })
genericEntitiesServicePath.push({ "route": require('./routes/ZonificacionRoutes'), "serviceName": "zonificaciones" })
genericEntitiesServicePath.push({ "route": require('./routes/TazasRoutes'), "serviceName": "tazas" })
genericEntitiesServicePath.push({ "route": require('./routes/ConflictividadVecinalRoutes'), "serviceName": "conflitividades-vecinal" })
genericEntitiesServicePath.push({ "route": require('./routes/ConvenioMunicipalRoutes'), "serviceName": "convenios-municipales" })
genericEntitiesServicePath.push({ "route": require('./routes/ArchivoReglamentacionRoutes'), "serviceName": "archivos-reglamentacion" })
genericEntitiesServicePath.push({ "route": require('./routes/ArchivoExcelMunicipiosRoutes'), "serviceName": "archivo-municipio" })
//appOnPremise.use('/public', express.static('public'));

appOnPremise.use('/auth', auth);
for (let service of genericEntitiesServicePath) {
  appOnPremise.use('/' + ENTITIES_BASE_URL + '/' + service.serviceName, [ checkJwt, validatePermissions,authorizationDecision], service.route, [test]);
}

// catch 404 and forward to error handler
appOnPremise.use(function (req, res, next) {
  next(createError(404));
});

const httpServer = http.createServer(appOnPremise);
const httpsServer = https.createServer(credentials, appOnPremise);

httpsServer.listen(443, () => {
	console.log('HTTPS Server running on port 443');
});

// error handler
appOnPremise.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

createConnection().then((c) => console.log("OK CONNECTION")).catch((e) => console.log(e))
let cloudFunction = null
try {
  cloudFunction = functions.https.onRequest(appOnPremise)
} catch (e) { }
export = { appOnPremise,cloudFunction }