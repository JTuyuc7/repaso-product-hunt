import React, { useContext } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';

// Importar el context de firebase
import { FirebaseContext } from '../../firebase';

const Nav = styled.div`
    padding-left: 2rem;
    padding-bottom: 2rem;

    a{
        font-size: 1.8rem;
        margin-right: 1.5rem;
        color: var(--gris2);
        font-family: 'PT Sans', sans-serif;

        &:last-of-type{
            margin-right: 0;
        }
    }
`;

const Navegacion = () => {

    const firebaseContext = useContext( FirebaseContext );
    const { usuario } = firebaseContext;

    return (  
        <>
            <Nav>
                <Link href="/">Inicio</Link>
                <Link href="/populares">Populares</Link>
                { usuario ? ( <Link href="/nuevo-producto">Nuevo Producto</Link>) : null }
            </Nav>
        </>
    );
}

export default Navegacion;