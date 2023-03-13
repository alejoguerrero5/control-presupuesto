//Funciones utiles para cualquier proyecto

export const generarID = () => {
    const random = Math.random().toString(36).substring(2) //numero aleatorio sin caracteres especiales
    const fecha = Date.now().toString(36)

    return random + fecha
}