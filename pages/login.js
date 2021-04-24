import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import Router from 'next/router';
import { Formulario, Titulo, Label, Input, InputSubmit, Error } from '../components/ui/Formulario';

// Importar firebase
import firebase from '../firebase';

// Importar la validacion de iniciar sesion
import validarLogin from '../validacion/validarLogin';

// Importar la validacion
import useValidacion from '../hooks/useValidacion';

const Login = () => {

    // State para los errores
    const [ error, guardarError ] = useState(false);

    const STATE_LOGIN = {
        email: '',
        password: ''
    }

    const { valores, errores, handleChange, handleSubmit, handleBlur, } = useValidacion( STATE_LOGIN, validarLogin, iniciarSesion );
    const { email, password } = valores;

    async function iniciarSesion (){
        
        try {
            await firebase.login( email, password );
            // Redirigirl al usuario a la pagina principal
            Router.push('/');
        } catch (error) {
            guardarError(error.message);

            await setTimeout(() => {
                guardarError(false);
            }, 3000)
        }
    }

    return (  
        <>
            <Layout>
                <div>
                    <Formulario
                        onSubmit={ handleSubmit }
                    >
                        { error && ( <Error>{error}</Error>)}

                        <Titulo>Iniciar Sesión</Titulo>

                        <div>
                            <Label
                                htmlFor="email"
                            >Email</Label>

                            <Input
                                type="text"
                                placeholder="Tu email"
                                id="email"
                                name="email"
                                value={ email }
                                onChange={ handleChange }
                                onBlur={ handleBlur }
                            />

                            { errores.email && ( <Error>{errores.email}</Error>)}
                        </div>
                        <div>
                            <Label
                                htmlFor="password"
                            >Password</Label>

                            <Input
                                type="password"
                                placeholder="Tu password"
                                id="password"
                                name="password"
                                value={ password }
                                onChange={ handleChange }
                                onBlur={ handleBlur }
                            />
                            { errores.password && ( <Error>{errores.password}</Error>)}
                        </div>

                        <div>
                            <InputSubmit
                                type="submit"
                                value="Inciciar Sesión"
                            />
                        </div>
                    </Formulario>
                </div>
            </Layout>
        </>
    );
}

export default Login;