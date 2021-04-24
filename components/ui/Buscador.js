import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

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
    return (  
        <>
            <form
                css={css`
                    position: relative;
                `}
            >
                <InputText
                    type="text"
                    placeholder="Busca algo.."
                />

                <BotonInput
                    type="submit"
                >Buscar</BotonInput>
            </form>
        </>
    );
}

export default Buscador;