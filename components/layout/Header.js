import React, { useContext } from 'react';
import LogoBuscador from '../ui/LogoBuscador';
import Boton from '../ui/Botones';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Navegacion from './Navegacion';
import Link from 'next/link';

// Importar el context para extraer la informacion del usuario verificado
import { FirebaseContext } from '../../firebase';

const ContenedorHeader = styled.div`

    max-width: 1200px;
    width: 90%;
    margin: 0 auto;
    @media( min-width: 768px){
        display: flex;
        justify-content: space-between;
    }
`;
const ContenedorLogo = styled.div`

`;

const Header = () => {

    const firebaseContext = useContext(FirebaseContext);
    const { usuario, firebase } = firebaseContext;

    // Funcion para cerrar la sesion del usuario
    async function cerrarSesionUsuario() {
        try {
            await firebase.cerrarsesion();
            console.log("Sesion Cerrada");
        } catch (error) {
            console.log(error.message, "La secion no se pudo cerrar");
        }
    }

    return (  
        <>
            <header
                css={ css`
                    border-bottom: 2px solid var(--gris3);
                    padding: 1.5rem 0;
                `}
            >
                <ContenedorHeader>
                    <ContenedorLogo>
                        <div>
                            <LogoBuscador />
                        </div>
                        <div>
                            <Navegacion />
                        </div>
                    </ContenedorLogo>

                    <div
                        css={ css`
                            display: flex;
                            align-items: center;
                        `}
                    >
                        {/* Menu de administracion aqui*/}
                        { usuario ? (
                            <>
                                <p
                                    css={ css`
                                        margin-right: 2rem;
                                        font-size: 1.8rem;
                                    `}
                                ><span
                                    css={ css`
                                        font-size: 2rem;
                                        font-weight: bold;
                                    `}
                                >Hola:</span> {usuario.displayName}</p>

                                <Boton
                                    bgColor="true"
                                    type="button"
                                    onClick={ () => cerrarSesionUsuario() }
                                >Cerrar Sesión</Boton>
                            </>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Boton
                                        bgColor='true'
                                    >Iniciar Sesión</Boton>
                                </Link>

                                <Link href="/crear-cuenta">
                                    <Boton
                                        
                                    >Obtener Cuenta</Boton>
                                </Link>
                            </>
                        )}

                        
                    </div>
                </ContenedorHeader>
            </header>
        </>
    );
}

export default Header;