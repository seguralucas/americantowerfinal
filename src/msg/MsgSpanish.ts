export class MsgSpanish {
    public static NOT_AUTHENTICATION_HEADER: string = "No se envió token de autenticación"
    public static AUTHENTICATION_METHOD_NOT_ALLOW: string = "Sólo se permite método de autenticación Bearer"
    public static SESION_EXPIRED="Cerramos tu sesión, por tu seguridad por favor volvé a loguearte"
    /**Entities error */
    /**User name */
    public static ID_MANDATORY: string = "El campo id es obligatorio"
    public static REGISTER_NOT_FOUND: string = "El registro solicitado no existe"

    public static PASSWORD_MANDATORY: string = "El campo password es obligatorio"
    public static USERNAME_MANDATORY: string = "El campo username es obligatorio"
    public static NAME_MANDATORY: string = "El campo nombre es obligatorio"
    public static DNI_MANDATORY: string = "El campo dni es obligatorio"
    public static EMAIL_DUPLICATED: string = "El mail del usuario ya existe en el sistema."
    public static UNAHUTORIZED: string = "You are not authorized to use this site"
    public static MALFORMED_JSON_SELECT: string = "El formato del json array usado como select es invalido"
    public static MALFORMED_JSON_ORDER: string = "El formato del json array usado como order es invalido"
    public static NIVEL_DE_ACUERDO_MUNICIPAL: string = "El nivel de acuerdo puede ser únicamente 0,1,2 o 3"

    public static CAMPO_OBLIGATORIO(campo: string) {
        return "El campo " + campo + " es obligatorio"
    }

    public static reemplazarCampos(msg: String, valores: any[]) {
        let salida = msg
        for (let i: number = 0; i < valores.length; i++)
            salida = salida.replace("@" + i, valores[i].toString())
        return salida
    }

}