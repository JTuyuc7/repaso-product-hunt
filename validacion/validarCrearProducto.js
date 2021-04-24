export default function validarCrearProuducto (valores) {
    let errores = {};

    // Validar el nombre del producto
    if( !valores.nombre ) {
        errores.nombre = "El nombre del producto es obligatorio"
    }

    // Validar el nombre de la empresa
    if( !valores.empresa ){
        errores.empresa = "El nombre de la empresa es obligatorio"
    }

    // Validar la url y tambien que sea tipo url
    if( !valores.url ) {
        errores.url = "La Url del producto es un campo obligatorio"
    }else if ( !/^(ftp|http|https):\/\/[^ "]+$/.test( valores.url )){
        errores.url = "Ingresa un formato de url valido"
    }

    // Validar que la descripcion no este vacio
    if( !valores.descripcion ) {
        errores.descripcion = "La descripcion del producto es un campo obligatorio"
    }

    return errores;
}