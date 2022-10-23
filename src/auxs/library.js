
//podemos AGRUPAR nuestras funciones en un "DICCIONARIO" DE FUNCIONES
// Cada una de las propiedades tiene un valor el cual ejecuta una función.
// Esas funciones, como todas pueden o no recibir parámetros.
// El codigo que ejecuta retorna una valor.
export const diccionario = {
    nullish : (arreglo) => { //nullish retorna V o F
        
        const nuloVacio = arreglo.some(item=>
            item === null || 
            item === "" || 
            item === 0 || 
            item.length === 0
            ) 
        
            if(nuloVacio)console.info('si nuloVacio es V existen elementos nulos o vacios', nuloVacio)

        return nuloVacio
    },
    menorA100: (numero) => numero < 100 ? true : false
    ,
    "Convertir a Minúsculas": (text) => text.toLowerCase() 
}

// Trabajo Practico A: agregar propiedades al diccionario que consista en hacer fetch a 
// SU API REST EJ. traer los datos de un usuario.

//Trabajo Practico B: agregar una propiedad al diccionario que permita enviarle un array 
//no mayor a 10 elementos, y que retorne el promedio de valores del array.



