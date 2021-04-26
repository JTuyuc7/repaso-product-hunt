import React, { useState, useEffect, useContext } from 'react';

// importar el context y firabse
import { FirebaseContext } from '../firebase';

// Crear un Hook para mostrar losproductos mas populares
const useProductos = ( orden ) => {
    // State para los productos
    const [ productos, guardarProductos ] = useState([]);

    // Importar el Context de Firebase
    const { firebase } = useContext( FirebaseContext );

    useEffect(() => {
        const obtenerProductos = () => {
        firebase.db.collection('productos').orderBy(orden, 'desc').onSnapshot( manejarSnapshot)
        }
        obtenerProductos();
    }, []);

    function manejarSnapshot(snapshot) {
        const productos = snapshot.docs.map( doc => {
        return {
            id: doc.id,
            ...doc.data()
        }
        });

        guardarProductos(productos);
    }

    return {
        productos
    }
}

export default useProductos;


/*


*/