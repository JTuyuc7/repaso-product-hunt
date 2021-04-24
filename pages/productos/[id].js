import React, { useEffect, useState, useContext } from 'react';
import Error404 from '../../components/layout/404';
import Layout from '../../components/layout/Layout';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';
import { Input, InputSubmit } from '../../components/ui/Formulario';
import Boton from '../../components/ui/Botones';
import { css } from '@emotion/react';

// Importar el context para hacer la consulta
import { FirebaseContext } from '../../firebase';


const Titulo = styled.h1`
    text-align: center;
    margin-top: 5rem;
`;

const ContenedorProducto = styled.div`
    @media ( min-width: 768px){
        max-width: 1200px;
        width: 90%;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
    }

    span{
        font-weight: bold;
    }
`;

const Aside = styled.aside`

    div{
        margin-top: 5rem;
    }

    p{
        text-align: center;
    }
`;

const EsCreador = styled.p`
    padding: 0.5rem 2rem;
    background-color: var(--naranja);
    color: #fff;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
    display: inline-block;
`;

const Producto = () => {

    // state para almacenar la informacion y luego mostrarla
    const [ producto, guardarProducto ] = useState({});
    const [ error, guardarError ] = useState(false);
    const [ consultarDB, guardarConsultarDB ] = useState(true);

    // State para el comentario 
    const [ comentario, guardarComentario ] = useState({});

    // Routing para obtener el id actual
    const router = useRouter();
    const { query : { id }} = router;

    const { usuario, firebase } = useContext( FirebaseContext );

    useEffect(() => {
        if( id && consultarDB ){
            // Funcion para consultar el producto
            const obtenerProducto = async () => {                                           // Fucion para realizar la consulta
                const productoQuery = await firebase.db.collection('productos').doc(id);    // Seleccionar la coleccion de donde se quieren los datos
                const producto = await productoQuery.get();                                 // crear una variable para almacenar la consulta

                if( producto.exists ){
                    guardarProducto(producto.data());                                           // Almacenarlo en el state
                    guardarConsultarDB( false );                                                // Regresarlo a false para que solamente haga una consulta a la DB
                }else {
                    guardarError(true);
                    guardarConsultarDB( false );
                }
            }
            obtenerProducto();
        }
    }, [id]);

    const { creado, descripcion, empresa, nombre, url, urlimagen, comentarios, votos, creador, haVotado } = producto;

    if( Object.keys(producto).length === 0 && !error ) return 'Obteniendo informacion';

    // Funcion para registrar el voto del producto
    const votarProducto = () => {
        if( !usuario ){
            return router.push('/');
        }

        // Sumar los nuevos votos
        const nuevoTotal = votos + 1;

        // Verificar si el usuario ha votado
        if( haVotado.includes( usuario.uid )) return;

        // Gurdar el id del usuario que ya ha realizado el voto
        const nuevosVotos = [ ...haVotado, usuario.uid ];

        // Actualizar en la BD el nuevo state
        firebase.db.collection('productos').doc(id).update({ votos: nuevoTotal, haVotado: nuevosVotos });

        // Actualizar state
        guardarProducto({
            ...producto,
            votos: nuevoTotal
        })

        guardarConsultarDB(true);                   // Consultar de nuevo la base de datos cuando se hace un voto.
    }

    // Funcion para actualizar el comentario
    const comentarioChange = (e) => {
        guardarComentario({
            ...comentario,
            [ e.target.name ] : e.target.value
        })
    }

    // Identificar si el comentario lo realizo el creador del producto
    const esCreador = (id) => {
        if( creador.id == id ){
            return true;
        }
    }

    // Funcion para guardar los comentarios    // To do
    const agregarNuevoComentario = (e) => {
        e.preventDefault();

        // Iformacion extra al comentario
        comentario.usuarioId = usuario.uid;
        comentario.usuarioNombre = usuario.displayName;

        // Tomar una copia de los comentarios y agregarlos a la base de datos
        const nuevosComentarios = [ ...comentarios , comentario ]

        // Agregar los nuevos comentarios a la base de datos
        firebase.db.collection('productos').doc(id).update({ comentarios : nuevosComentarios });

        // Actualizar el state
        guardarProducto({
            ...producto,
            comentarios: nuevosComentarios
        })

        guardarConsultarDB(true);                   // Consultar cuando se realiza un comentario
    }

    return (  
        <>
            <Layout>
                { error ? (<Error404 /> ) : (
                    <div>
                        <Titulo>{nombre}</Titulo>

                        <ContenedorProducto>
                            <div>
                                <p>Publicado hace: { formatDistanceToNow( new Date( creado), { locale: es } ) }</p>

                                <p>Publicado por: <span>{creador.nombre}</span> de: <span>{empresa}</span></p>

                                <div>
                                    <img src={urlimagen} alt="Imagen Articulo" />

                                    <p>{descripcion}</p>

                                    { usuario ? (
                                        <>
                                            <h2>Agrega tu comentario</h2>

                                            <form
                                                onSubmit={ agregarNuevoComentario }
                                            >
                                                <div>
                                                    <Input
                                                        type="text"
                                                        placeholder="Ingresa un comentario"
                                                        name="comentario"
                                                        onChange={ comentarioChange }
                                                    />
                                                </div>

                                                <InputSubmit
                                                    type="submit"
                                                    value="Agregar Comentario"
                                                />
                                            </form>
                                        </>
                                    ) : null }

                                    <h2>Comentarios</h2>
                                    { comentarios.length === 0 ? "Aun no hay comentarios, Sé el primero en agregar uno" : (
                                        <ul>
                                            { comentarios.map( (comentario, i) => (
                                                
                                                    <li
                                                        key={`${ comentario.usuarioId}-${i}`}
                                                        css={ css`
                                                            border: 1px solid #e1e1e1;
                                                            padding: 2rem;
                                                        `}
                                                    >
                                                        <p>{comentario.comentario}</p>
                                                        <p>Escrito por: <span>{ comentario.usuarioNombre }</span></p>
                                                        { esCreador( comentario.usuarioId ) && (
                                                            <EsCreador>Es Creador</EsCreador>
                                                        )}
                                                    </li>
                                                
                                            ))}
                                        </ul>
                                    ) }
                                    
                                </div>
                            </div>

                            <Aside>
                                <Boton
                                    target="_blank"
                                    bgColor="true"
                                    href={url}
                                >Visitar Url</Boton>

                                { usuario && (
                                    <>
                                        <div>
                                            <p>{votos} Votos</p>
                                                
                                            <Boton
                                                onClick={ votarProducto }
                                            >Votar</Boton>
                                        </div>
                                    </>
                                )}
                            </Aside>
                        </ContenedorProducto>
                    </div>
                )}
            </Layout>
        </>
    );
}

export default Producto;