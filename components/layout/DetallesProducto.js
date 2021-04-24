import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';

const Listado = styled.li`
    padding: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #e1e1e1;

    &:last-of-type{
        border-bottom: none;
    }
`;

const DescripcionProducto = styled.div`
    flex: 0 1 600px;
    display: flex;
    grid-template-columns: 1fr 3fr;
    column-gap: 2rem;
`;

const Titulo = styled.a`
    font-size: 2.5rem;
    font-weight: bold;
    margin: 0;

    &:hover{
        cursor: pointer;
    }
`;

const Descripcion = styled.p`
    font-size: 1.6rem;
    margin: 1rem auto;
    color: #888;
`;

const Comentarios = styled.div`
    margin-top: 2rem;
    display: flex;
    align-items: center;
    div{
        display: flex;
        align-items: center;
        border: 1px solid #e1e1e1;
        padding: 0.3rem 2rem;
        margin-right: 2rem;
    }

    img{
        width: 2rem;
        margin-right: 1rem;
    }

    p{
        font-size: 1.7rem;
        margin-right: 2rem;
        font-weight: bold;

        &:last-of-type{
            margin: 0;
        }
    }
`;

const Votos = styled.div`
    flex: 0 0 auto;
    text-align: center;
    border: 1px solid #e1e1e1;
    padding: 1rem 3rem;

    div{
        font-size: 2rem;
    }

    p{
        margin: 0;
        font-size: 2rem;
        font-weight: bold;
    }
`;

const Imagen = styled.img`
    width: 250px;
`;


const DetallesProducto = ({producto}) => {

    const { comentarios, descripcion, empresa, nombre, url, urlimagen, votos, creado, id } = producto;
    return (
        <>
            <Listado>
                <DescripcionProducto>
                    <div>
                        <Imagen src={ urlimagen } alt="Imagen Producto" />
                    </div>

                    <div>
                        <Link href="/productos/[id]" as={`/productos/${id}`} >
                            <Titulo>{nombre}</Titulo>
                        </Link>

                        <Descripcion>{descripcion}</Descripcion>

                        <Comentarios>
                            <div>
                                <img src="/static/img/comentario.png" />
                                <p>{comentarios.length} Comentarios</p>
                            </div>
                        </Comentarios>

                        <p>Publicado: { formatDistanceToNow( new Date (creado), { locale: es }) }</p>

                        
                    </div>
                </DescripcionProducto>

                <Votos>
                    <div> &#9650;</div>
                    <p>{votos} Votos</p>
                </Votos>
            </Listado>
        </>
    );
}

export default DetallesProducto;