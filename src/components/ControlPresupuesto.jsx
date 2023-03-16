import {useState, useEffect} from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const ControlPresupuesto = ({
    presupuesto, 
    setPresupuesto,
    gastos,
    setGastos,
    setIsValidPresupuesto
}) => {

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

    const handleResetApp = () => {
        const resultado = confirm('¿Deseas reiniciar presupuesto y gastos?');

        if(resultado){
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }
    }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            <CircularProgressbar 
                styles={buildStyles({
                    pathColor: porcentaje > 100 ? '#dc2626' : '#00b347',
                    trailColor: '#F5F5F5',
                    textColor: porcentaje > 100 ? '#dc2626' : '#00b347'
                })}
                value={porcentaje}
                text={`${porcentaje}% Gastado`}
            />
        </div>

        <div className='contenido-presupuesto'>
            <button
                className='reset-app'
                type='button'
                onClick={handleResetApp}
            >
                Resetear APP
            </button>

            <p>
                <span>Presupuesto: </span>{formatearCantidad(presupuesto)}
            </p>
            <p>
                <span>Gastado: </span>{formatearCantidad(gastado)}
            </p>
            <p className={`${disponible < 0 ? 'negativo': ''}`}>
                <span>Disponible: </span>{formatearCantidad(disponible)}
            </p>
        </div>
      
    </div>
  )
}

export default ControlPresupuesto
