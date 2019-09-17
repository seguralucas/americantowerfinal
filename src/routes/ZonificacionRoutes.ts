import { addToGenericRoute } from './genericRoutes';
import { ZonificacionService } from '../services/ZonificacionService';
import { Zonificacion } from '../entity/Zonificacion';
var express = require('express');
var router = express.Router();

/******************************************** */
const service = new ZonificacionService()
const currentClass = Zonificacion
/******************************************** */
/**
 * 
 * 
update zonificacion set acurdoMunicipal=3 where municipalidadId=8118;
update zonificacion set acurdoMunicipal=3 where municipalidadId=7333;
update zonificacion set acurdoMunicipal=1 where municipalidadId=8607;
update zonificacion set acurdoMunicipal=1 where municipalidadId=7513;
 */
router = addToGenericRoute(router, currentClass, service)

module.exports = router;