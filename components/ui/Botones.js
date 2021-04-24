import styled from '@emotion/styled';

const Boton = styled.a`
    display: block;
    margin: 2rem auto;
    padding: 1.5rem 1.5rem;
    text-align: center;
    border-radius: 0.4rem;
    border: 1px solid #d1d1d1;
    font-weight: bold;
    margin-right: 1rem;
    text-transform: uppercase;
    background-color: ${ props => props.bgColor ? '#da552f' : 'white' };
    color: ${ props => props.bgColor ? 'white' : '#000' };

    &:hover{
        cursor: pointer;
    }

    &:last-of-type{
        margin-right: 0;
    }
`;

export default Boton;