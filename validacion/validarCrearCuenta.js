export default function validarCrearCuenta(valores) {

    let errores = {};

    //Validar el nombre del usuario
    if( !valores.nombre ){                          // Validar que el nobre no este vacio
        errores.nombre = "El nombre es obligatorio"
    }

    // Validar el email
    if( !valores.email ){                           // Validar que el correo no este vacio
        errores.email = "El email es obligatorio"
    } else if ( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test( valores.email )){  //validar el correo con una expresion regular
        errores.email = "Agrega un email valido"
    }

    // Validar la contraseña
    if( !valores.password ){                        // Validar que el password no este vacio
        errores.password = "El password es obligatorio"
    }else if( valores.password.length < 6 ){        // Validaar que el password no se menor a 6 caracteres
        errores.password = 'El password debe ser minimo 6 caracteres'
    }

    return errores;   // Retornamos el objeto con los errores
}