export const getFechaNotificacion=function():Date{
    var fechaNotificacionCambio = new Date();
    fechaNotificacionCambio.setDate(fechaNotificacionCambio.getDate()-1);
    return fechaNotificacionCambio

}