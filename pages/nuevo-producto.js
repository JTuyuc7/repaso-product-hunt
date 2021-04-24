import React, { useState, useContext } from 'react';
import Layout from '../components/layout/Layout';
import { Formulario, Titulo, Label, Input, InputSubmit, TextArea, Error, Parrafo, Alerta } from '../components/ui/Formulario';
import Router, { useRouter } from 'next/router';
import FileUploader from 'react-firebase-file-uploader';
import Error404 from '../components/layout/404';

// Importar el context de firebase para acceder a la base de datos
import { FirebaseContext } from '../firebase';

// Validaciones del nuevo producto seran nuevas
import validarCrearProuducto from '../validacion/validarCrearProducto';

// Importar el hook de validaciones
import useValidacion from '../hooks/useValidacion';

const NuevoProducto = () => {

    // Usar el context de firebase
    const firebaseContext = useContext( FirebaseContext );
    const { usuario, firebase } = firebaseContext;

    const router = useRouter();

    // State para subir imagenes
    const [ nombreimagen, guardarNombre ] = useState('');
    const [ subiendo, guardarSubiendo ] = useState(false);
    const [ progreso, guardarProgreso ] = useState(0);
    const [ urlimagen, guardarUrlImagen ] = useState('');

    const STATE_INICIAL = {
        nombre: '',
        empresa: '',
        url: '',
        descripcion: '',
        imagen: '',
    }

    // State para los errores
    const [ error, guardarErrores ] = useState(false);

    const { valores, errores, handleChange, handleSubmit, handleBlur } = useValidacion(STATE_INICIAL, validarCrearProuducto, agregarProducto );

    const { nombre, empresa, url, descripcion, imagen } = valores;

    async function agregarProducto () {

        // Si el usuario no esta autenticado redirigirlo ala pagina de verificacion
        if( !usuario ){
            router.push('/login')
        }

        // crear el objeto de nuevo producto
        const producto = {
            nombre,
            empresa,
            url,
            urlimagen,
            descripcion,
            votos: 0,
            comentarios: [],
            creado: Date.now(),
            creador: {
                id: usuario.uid,
                nombre: usuario.displayName
            },
            haVotado: [],
        }

        firebase.db.collection('productos').add(producto);

        // Despues de agregar el producto redirigir al usuario a la pagina principal
        return router.push('/');
    }

    // Funciones para subir la imagen
    // Funcion para iniciar la sibida de imagen
    const handleUploadStart = ( ) => {
        guardarProgreso(0);
        guardarSubiendo(true);
    }

    const handleProgress = (progreso) => guardarProgreso( { progreso } );

    // Toma un error y lo muestra si la subida del archivo no se realiza con exito
    const handleUploadError = (error) => {
        guardarSubiendo( error );
        console.log(error);
    }

    // Toma el prgreso y llena al 100 cuando la imagen se sube -- //Guardar subiendo lo regresa a false porque termina de subir la imagen  // Guardar el nombre toma el nombre del archivo 
    const handleUploadSuccess = (nombre) => {
        guardarProgreso(100);
        guardarSubiendo( false );
        guardarNombre( nombre );
        firebase
            .storage                       // Hace referencia al storage para guardar la imagen
            .ref('productos')              // Lugar donde se guradan las imagenes
            .child(nombre)                 // Toma el nombre 
            .getDownloadURL()              // Tener disponible la url de la imagen
            .then( url => {
                console.log(url);
                guardarUrlImagen(url);
            } );
    }

    return (  
        <>
            <Layout>

                { !usuario ? <Error404 /> : (

                    <>
                        <div>
                            <Titulo>Agregar Nuevo Producto</Titulo>
                            <Formulario
                                onSubmit={ handleSubmit }
                            >

                                <fieldset>
                                    <legend>Información General </legend>
                                
                                    <div>
                                        <Label htmlFor="nombre">Nombre Producto</Label>

                                        <Input
                                            type="text"
                                            name="nombre"
                                            id="nombre"
                                            placeholder="Nombre Producto"
                                            value={nombre}
                                            onChange={ handleChange }
                                            onBlur={handleBlur}
                                        />

                                        { errores.nombre && ( <Error>{errores.nombre}</Error>)}
                                    </div>

                                    <div>
                                        <Label htmlFor="empresa">Nombre Empresa</Label>

                                        <Input
                                            type="text"
                                            name="empresa"
                                            id="empresa"
                                            placeholder="Nombre empresa"
                                            value={ empresa }
                                            onChange={ handleChange }
                                            onBlur={ handleBlur }
                                        />
                                        { errores.empresa && ( <Error>{ errores.empresa }</Error>)}
                                    </div>

                                    <div>
                                        <Label htmlFor="url">Url Producto</Label>

                                        <Input
                                            type="url"
                                            name="url"
                                            id="url"
                                            placeholder="Ingresa la Url de tu producto"
                                            value={ url }
                                            onChange={ handleChange }
                                            onBlur={ handleBlur }
                                        />
                                        { errores.url && ( <Error>{errores.url}</Error>)}
                                    </div>

                                    <div>
                                        <Label htmlFor="imagen">Imagen Producto</Label>

                                        <FileUploader
                                            name="imagen"
                                            accept="image/*"
                                            randomizeFilename
                                            storageRef={ firebase.storage.ref("productos")}
                                            onUploadStart={ handleUploadStart }
                                            onUploadError={ handleUploadError }
                                            onUploadSuccess={ handleUploadSuccess }
                                            onProgress={ handleProgress }
                                        />

                                        { progreso === 100 ? <Parrafo>Imagen Subida correctamente </Parrafo> : <Alerta>Subiendo imagen</Alerta> }
                                    </div>

                                </fieldset>

                                <fieldset>
                                    <legend>Sobre tu Producto</legend>
                                

                                    <div>
                                        <Label htmlFor="descripcion">Descripcion</Label>

                                        <TextArea
                                            id="descripcion"
                                            name="descripcion"
                                            value={ descripcion }
                                            onChange={ handleChange }
                                            onBlur={ handleBlur }
                                        ></TextArea>

                                        { errores.descripcion && ( <Error>{ errores.descripcion }</Error>)}
                                    </div>

                                </fieldset>

                                <div>
                                    <InputSubmit
                                        type="submit"
                                        value="Agregar Producto"
                                    />
                                </div>
                            </Formulario>
                        </div>
                    </>
                )}

            </Layout>
        </>
    );
}

export default NuevoProducto;