import React, { useEffect, useState, useContext } from 'react';
import Layout from '../components/layout/Layout';
import styled from '@emotion/styled';
import DetallesProducto from '../components/layout/DetallesProducto';
import { FirebaseContext } from '../firebase';

const Listado = styled.div`
  background-color: #f3f3f3;
`;

const Contenedor = styled.div`
  max-width: 1200px;
  width: 90%;
  padding: 5rem 0;
  margin: 0 auto;
`;
const BgWhite = styled.ul`
  background-color: #fff;
  padding: 3rem;
`;

export default function Home() {

  // State para los productos
  const [ productos, guardarProductos ] = useState([]);

  // Importar el Context de Firebase
  const { firebase } = useContext( FirebaseContext );

  useEffect(() => {
    const obtenerProductos = () => {
      firebase.db.collection('productos').orderBy('creado', 'desc').onSnapshot( manejarSnapshot)
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

  return (
    <>
      <Layout>
        <Listado>
          <Contenedor>
            <BgWhite>
              { productos.map( producto => (
                <DetallesProducto
                  key={ producto.id}
                  producto={ producto }
                />
              ))}
            </BgWhite>
          </Contenedor>
        </Listado>
      </Layout>
    </>
  )
}

/*
    // validar email

  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

  // validar URL

  !/^(ftp|http|https):\/\/[^ "]+$/
*/