import {useState, useEffect} from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const ControlPresupuesto = ({presupuesto, gastos}) => {

    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);
    const [porcentaje, setPorcentaje] = useState(0);


    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto)=> gasto.cantidad + total,0) //acumula un valor

        const totalDisponible = presupuesto-totalGastado

        //Calculo de porcentaje gastado
        const nuevoPorcentaje = (((presupuesto-totalDisponible)/presupuesto)*100).toFixed(2)

        setGastado(totalGastado)
        setDisponible(totalDisponible)

        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)  
        }, 500);

    }, [gastos]);

    const formatearCantidad = (cantidad) => {
        return cantidad?.toLocaleString('en-US',{
            style: 'currency',
            currency: 'USD'
        }) 
    }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            <CircularProgressbar 
                styles={buildStyles({
                    pathColor: '#00b347',
                    trailColor: '#F5F5F5',
                    textColor: '#00b347'
                })}
                value={porcentaje}
                text={`${porcentaje}% Gastado`}
            />
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
