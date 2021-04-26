import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import { useRouter } from 'next/router';
import DetallesProducto from '../components/layout/DetallesProducto';
import useProductos from '../hooks/useProductos';
import styled from '@emotion/styled';

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

const Buscar = () => {

    // Usar el hook de router
    const router = useRouter();
    const { query : { q }} = router;

    const { productos } = useProductos('creado');

    // State para almacenar el resultado de la busqueda
    const [ resultado, guardarResultado ] = useState([]);

    useEffect(() => {
        const busqueda = q.toLowerCase();

        const filtro = productos.filter( producto => {
            return (
                producto.nombre.toLowerCase().includes( busqueda ) || 
                producto.descripcion.toLowerCase().includes( busqueda )
            )
        })
        guardarResultado( filtro );
    }, [ q, productos ])

    return (  
        <>
            <Layout>
                <Listado>
                    <Contenedor>
                        <BgWhite>
                        { resultado.map( producto => (
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
    );
}

export default Buscar;