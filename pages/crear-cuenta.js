import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import Router from 'next/router';
import { Formulario, Label, Input, InputSubmit, Titulo, Error } from '../components/ui/Formulario';

// Importar firebase para poder crear un nuevo usuario
import firebase from '../firebase';

// Importar el hook para las validaciones
import useValidacion from '../hooks/useValidacion';

// importar la validacion del formulario
import validarCrearCuenta from '../validacion/validarCrearCuenta';

const NuevaCuenta = () => {

    // State para los errores
    const [ error, guardarError ] = useState(false);

    // Crear el state local para la validacion
    const STATE_INICIAL = {
        nombre: '',
        email: '',
        password: ''
    }
    const { valores, errores, handleChange, handleSubmit, handleBlur,} = useValidacion(STATE_INICIAL, validarCrearCuenta, crearCuenta );
    const { nombre, email, password } = valores;

    async function crearCuenta () {
        try {
            await firebase.registrar( nombre, email, password );

            // Redirigir el usuario a la pagina principal
            Router.push('/');

        } catch (error) {
            guardarError( error.message );

            await setTimeout( () => {
                guardarError(false)
            }, 3000 )
        }
    }

    return (  
        <>
            <Layout>
                <div>
                    <Formulario
                        onSubmit={ handleSubmit }
                    >
                        { error && ( <Error>{error}</Error>) }
                        <Titulo>Obten Una Cuenta</Titulo>

                        <div>
                            <Label
                                htmlFor="nombre"
                            >Nombre</Label>

                            <Input
                                type="text"
                                placeholder="Tu nombre"
                                id="nombre"
                                name="nombre"
                                value={ nombre }
                                onChange={ handleChange }
                                onBlur={ handleBlur }
                            />
                            { errores.nombre && ( <Error>{errores.nombre}</Error>) }
                        </div>
                        <div>
                            <Label
                                htmlFor="email"
                            >Email</Label>

                            <Input
                                type="email"
                                placeholder="Tu email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={ handleChange }
                                onBlur={ handleBlur }
                            />
                            { errores.email && ( <Error>{errores.email}</Error>) }
                        </div>
                        <div>
                            <Label
                                htmlFor="password"
                            >Password</Label>

                            <Input
                                type="password"
                                placeholder="Tu Password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={ handleChange }
                                onBlur={ handleBlur }
                            />
                            { errores.password && ( <Error>{errores.password}</Error>)}
                        </div>
                        <div>
                            <InputSubmit
                                type="submit"
                                value="Crear Cuenta"
                            />
                        </div>
                    </Formulario>
                </div>
            </Layout>
        </>
    );
}

export default NuevaCuenta;