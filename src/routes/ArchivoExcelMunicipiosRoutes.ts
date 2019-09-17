import { addToGenericRoute } from './genericRoutes';
import { ArchivoReglamentacionService } from '../services/ArchivoReglamentacionService';
import { ArchivoReglamentacion } from '../entity/ArchivoReglamentacion';
import { responseError } from '../components/apiHandler';
import { ErrorBiactiva } from '../components/ErrorBiactiva';
var express = require('express');
const multer = require('multer');
const path = require('path');
const PATH_UPLOAD_DIR=path.join(__dirname+('/../public/'))
let upload = multer({ dest:  PATH_UPLOAD_DIR});
var router = express.Router();

/******************************************** */
const service = new ArchivoReglamentacionService()
const currentClass = ArchivoReglamentacion
/******************************************** */
router.post('/upload', upload.single('myFile'), async (req, res) => {
    try{
        console.log("*****************")
        if (req.file) {
            let filename = req.file.filename;
            var fs = require('fs');
            fs.rename(PATH_UPLOAD_DIR+"/"+req.file.filename, PATH_UPLOAD_DIR+"/toLoad.xlsx", function(err) {
                if ( err ) console.log('ERROR: ' + err);
            });
            res.send({"upload":true});
        } else 
            responseError(res,new ErrorBiactiva("No se envio el archivo","No se envio el archivo",500))
    }catch(e){
        responseError(res,e)
    }
});

router = addToGenericRoute(router, currentClass, service)

module.exports = router;