import app from 'firebase/app';
import 'firebase/auth';                            // Importar la autorizacion de firebase
import 'firebase/firestore';
import 'firebase/storage';

import firebaseConfig from './config';

class Firebase {                                   // Crear una clase de Firebase cuando se instancia
    constructor() {                                // Crear un constrctor para inicializar la pp
        if( !app.apps.length ){
            app.initializeApp( firebaseConfig );   // Iniciar la app con la configuracion de firebase
        }
        this.auth = app.auth();       
        this.db = app.firestore();
        this.storage = app.storage();
    }

    // Registrar un usuario
    async registrar( nombre, email, password ){          // Funcion que registrara los nuevo usuarios
        const nuevoUsuario = await this.auth.createUserWithEmailAndPassword( email, password );   // metodo para crear el usuario usando el correo y la contraseña

        return await nuevoUsuario.user.updateProfile({   // Actualizar el perfil del usuario con el nombre que se le pasa en el formulario
            displayName: nombre
        })
    }

    // Iniciar sesion
    async login(email, password){
        // revisar que el correo y la contraseña sean las mismas que el usuario tiene registrado
        return this.auth.signInWithEmailAndPassword( email, password );
    }

    // Cerrar la sesion del usuario
    async cerrarsesion(){
        await this.auth.signOut();
    }
}

const firebase = new Firebase();                   // Instanciar la app de Firebase
export default firebase;                           // Exportarlo