import {useState, useEffect} from 'react'

const ControlPresupuesto = ({presupuesto, gastos}) => {

    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState();


    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto)=> gasto.cantidad + total,0) //acumula un valor

        const totalDisponible = presupuesto-totalGastado

        setGastado(totalGastado)
        setDisponible(totalDisponible)

    }, [gastos]);

    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US',{
            style: 'currency',
            currency: 'USD'
        }) 
    }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            <p>Grafica aqui</p>
        </div>

        <div className='contenido-presupuesto'>
            <p>
                <span>Presupuesto: </span>{formatearCantidad(presupuesto)}
            </p>
            <p>
                <span>Gastado: </span>{formatearCantidad(gastado)}
            </p>
            <p>
                <span>Disponible: </span>{formatearCantidad(disponible)}
            </p>
        </div>
      
    </div>
  )
}

export default ControlPresupuesto
