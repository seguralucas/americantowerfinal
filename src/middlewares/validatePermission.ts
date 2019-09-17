import { Request, Response, NextFunction } from "express";
import { normalizeUrl } from "../components/utils";
import { Profile } from "../entity/Profile";
import { permisos } from "../config/permisions";
const apiHandler = require("../components/apiHandler")

export const validatePermissions = async (req: Request, res: Response, next: NextFunction) => {
    let newUrl = normalizeUrl(req.originalUrl)
    if (req.method == "POST" && newUrl.match("/reports/[0-9]*"))
        res.locals.hasPermission = true
    if (req.method == "GET")
        res.locals.hasPermission = true
    if(res.locals.jwtPayload.p==Profile.ID_ADMIN || res.locals.jwtPayload.p==Profile.ID_PROVEEDOR)
        res.locals.hasPermission = true
    if ((req.method == "POST" || req.method == "PATCH") && newUrl=="/entities/users" && res.locals.jwtPayload.p==Profile.ID_PROVEEDOR)
        res.locals.hasPermission = false

    let permisosPerfil=permisos[res.locals.jwtPayload.p]
    if(permisosPerfil)
        console.log(permisosPerfil)
    //Get the jwt token from the head
    console.log(res.locals.jwtPayload.u, res.locals.jwtPayload.p, newUrl, req.method)      
    next()
};