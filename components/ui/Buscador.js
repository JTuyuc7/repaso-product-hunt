import React, { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Router from 'next/router';

const InputText = styled.input`
    border: 1px solid var(--gris3);
    padding: 1rem;
    min-width: 200px;
    margin-right: 1rem;
    margin-top: 2.8rem;
`;

const BotonInput = styled.button`
    height: 3rem;
    width: 3rem;
    display: block;
    background-size: 4rem;
    background-image: url('/static/img/buscar.png');
    background-repeat: no-repeat;
    position: absolute;
    right: 1rem;
    top: 2.9rem;
    background-color: #fff;
    border: none;
    text-indent: -9999px;

    &:hover{
        cursor: pointer;
    }
`;

const Buscador = () => {

    // state para la busqueda
    const [ busqueda, guardarBusqueda ] = useState('');

    // Funcion para la busqueda
    const busquedaProducto = (e) => {
        e.preventDefault();

        if( busqueda.trim() === '' ) return;

        Router.push({
            pathname: '/buscar',
            query: { q : busqueda }
        })
    }

    return (  
        <>
            <form
                css={css`
                    position: relative;
                `}

                onSubmit={ busquedaProducto }
            >
                <InputText
                    type="text"
                    placeholder="Busca algo.."
                    value={ busqueda }
                    onChange={ (e) => guardarBusqueda(e.target.value)}
                />

                <BotonInput
                    type="submit"
                >Buscar</BotonInput>
            </form>
        </>
    );
}

export default Buscador;



