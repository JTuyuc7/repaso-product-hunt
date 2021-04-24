import React, { useState, useEffect } from 'react';

const useValidacion = (stateInicial, validar, fn ) => {

    const [ valores, guardarValores ] = useState( stateInicial );
    const [ errores, guardarErrores ] = useState({});
    const [ submitform, guardarSubmitForm ] = useState(false);

    useEffect(() => {
        if(submitform){
            const noErrores = Object.keys( errores ).length === 0;

            if(noErrores){
                fn();
            }

            guardarSubmitForm(false);
        }
    }, [ errores ]);

    // Funcion para leer el contenido de lo que el usuario escriba
    const handleChange = (e) => {
        guardarValores({
            ...valores,
            [e.target.name] : e.target.value
        })
    }

    // Funcion para leer el submit del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        const erroresValidacion = validar( valores );
        guardarErrores( erroresValidacion);

        guardarSubmitForm(true);
    }

    // Usar el evento on Blur cuando 
    const handleBlur = () => {
        const erroresValidacion = validar( valores );
        guardarErrores( erroresValidacion );
    }

    return {
        valores,
        errores,
        handleChange,
        handleSubmit,
        handleBlur,
    }
}

export default useValidacion;

/*
    hook para la validacion de los formularios

    se crean piezas de state para que puedan reutilizarse en varios componentes

    un hook es basicamente un componete con funciones que se pueden reutilizar en varios componentes

*/