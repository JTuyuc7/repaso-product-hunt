import styled from '@emotion/styled';

export const Formulario = styled.form`
    max-width: 500px;
    width: 95%;
    margin: 5rem auto 0 auto;

    fieldset{
        margin: 2rem 0;
        border: 1px solid #e1e1e1;
        padding: 2rem;
    }
`;

export const Label = styled.label`
    display: block;
    width: 90%;
    margin: auto;
    padding: 1rem;
    font-family: 'PT Sans', sans-serif;
    font-size: 1.9rem;
    font-weight: bold;
`;

export const Input = styled.input`
    display: block;
    width: 90%;
    margin: auto;
    padding: 1rem;
    border: 1px solid #b0b086;
    margin-bottom: 1rem;
`;

export const TextArea = styled.textarea`
    display: block;
    width: 90%;
    margin: auto;
    height: 10rem;
    margin-bottom: 2rem;
`;

export const InputSubmit = styled.input`
    display: block;
    width: 90%;
    margin: 2rem auto;
    padding: 1.5rem;
    background-color: var(--naranja);
    text-transform: uppercase;
    color: #fff;
    font-weight: bold;
    border: none;
    font-family: 'PT Sans', sans-serif;

    &:hover{
        cursor: pointer;
    }
`;

export const Titulo = styled.h1`
    text-align: center;
    width: 90%;
    margin: 3rem auto;
`;

export const Error = styled.p`
    width: 90%;
    margin: auto;
    padding: 1.5rem;
    text-align: center;
    color: #fff;
    background-color: #FA2016;
    font-family: 'PT Sans', sans-serif;
    border-radius: 0.5rem;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 1.5rem;
    margin-top: 1rem;
`;

export const Parrafo = styled.p`
    padding: 1rem;
    background-color: #5ef213;
    color: #fff;
    width: 90%;
    margin: 1rem auto;
    text-align: center;
    font-weight: bold;
    border-radius: 0.5rem;
`;

export const Alerta = styled.p`
    background-color: #fa7d15;
    padding: 1rem;
    width: 90%;
    text-align: center;
    color: #fff;
    text-transform: uppercase;
`;
