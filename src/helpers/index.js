//Funciones utiles para cualquier proyecto

export const generarID = () => {
    const random = Math.random().toString(36).substring(2) //numero aleatorio sin caracteres especiales
    const fecha = Date.now().toString(36)

    return random + fecha
}

export const formatearFecha = fecha => {
    const fechaNueva = new Date(fecha);

    const opciones = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }

    return fechaNueva.toLocaleDateString('es-CO', opciones)

}