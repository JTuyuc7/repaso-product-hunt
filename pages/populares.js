import React from 'react';
import Layout from '../components/layout/Layout';
import styled from '@emotion/styled';
import DetallesProducto from '../components/layout/DetallesProducto';

// Importar el Hook para populares
import useProducto from '../hooks/useProductos';

const Listado = styled.div`
    background-color: #f3f3f3;
`;

const Contenedor = styled.div`
    max-width: 1200px;
    width: 90%;
    padding: 5rem 0;
    margin: 0 auto;
`;
const BgWhite = styled.ul`
    background-color: #fff;
    padding: 3rem;
`;

const Populares = () => {

    const { productos } = useProducto('votos');

    return (
        <>
        <Layout>
            <Listado>
            <Contenedor>
                <BgWhite>
                { productos.map( producto => (
                    <DetallesProducto
                    key={ producto.id}
                    producto={ producto }
                    />
                ))}
                </BgWhite>
            </Contenedor>
            </Listado>
        </Layout>
        </>
    )
}

export default Populares;