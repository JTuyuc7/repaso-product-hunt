import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Link from 'next/link';
import Buscador from './Buscador';

const Logo = styled.p`
    font-weight: 900;
    color: var(--naranja);
    font-size: 4.5rem;
    line-height: 0;
    font-family: 'Roboto Slab', serif;
    margin-right: 2rem;

    &:hover{
        cursor: pointer;
    }
`;

const LogoBuscador = () => {
    return (  
        <>
            <div
                css={ css`
                    display: flex;
                    justify-content: space-between;
                `}
                >
                        <Link href="/">
                            <Logo>P</Logo>
                        </Link>
                    <Buscador />
                </div>
        </>
    );
}

export default LogoBuscador;