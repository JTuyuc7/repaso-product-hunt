import React from 'react';
import Layout from '../components/layout/Layout';
import { useRouter } from 'next/router';

const Buscar = () => {

    // Usar el hook de router
    const router = useRouter();
    const { query : { q }} = router;

    console.log(q);

    return (  
        <>
            <Layout>
                <h1>Buscar El producto</h1>
            </Layout>
        </>
    );
}

export default Buscar;