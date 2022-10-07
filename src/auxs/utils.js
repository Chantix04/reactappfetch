//
//import dayjs from "dayjs"

//const urlSearch = "http://192.168.0.148/alfresco/api/-default-/public/search/versions/1/search"

//** validaciones de distintos tipos de inputs
export const validaciones = {
    alerta: (mensaje = "algo") => {
        alert(mensaje)
    },
    //** valida de num. de exp. */
    valNumExp : (value) => {
        const resultado = /^[0-9]{0,6}$/.test(value)
        return resultado
    },
    //*val de texto mediano
    valTextoMediano: (value) => {
        if(value.length === 0){return true}
        if(value.length >= 100){return false}else{return true}
    },
    //** ❕ valida que el año no sea menor a 2019 o mayor al actual */
    valAnioRango: (value) => {

        const hoy = new Date()
        
        const anioActual = hoy.getFullYear()
        
        let anioIngresado = dayjs(value).get('year')
        
        if(anioIngresado < 2019 || anioIngresado > anioActual){return false}else return true
    },
    valAnioIngresoArea: (value) => {
        let hoy = new Date()
        const anioActual = hoy.getFullYear()
        let anioIngresado = dayjs(value).get('year')
        if(anioIngresado < (anioActual - 3) || anioIngresado > anioActual){
            return false
        }else {return true}
    },
    valMesApertura: (value) => {
        let mesIngresado = dayjs(value).get('month')
        console.log('EL MES DE APERTURA FUE=>', mesIngresado)
        if(mesIngresado != 1){return false}else{return true}
    },
    valCantDeFojas: (value) => {
        let resultado
        if(isNaN(value)){
            //console.info('🤮🤬no es un numero')
            //resultado = false
            return false
        }else{
            resultado = /^[0-9]{0,4}$/.test(value)
            return resultado
        }
    },
    valObjNullOrEmpty : (value) => {
        const arrayValues = Object.values(value)
        const nullishOrEmpty = arrayValues.some(item=>item === null || item === "" || item === 0 || item.length === 0)
        if(nullishOrEmpty)console.info('NO SE PUEDE ENVIAR', nullishOrEmpty)
        return nullishOrEmpty
    },
    valFormatFecha : (value) => {
        const dayjsFecha = dayjs(value).format('DD/MM/YYYY')
        return dayjsFecha
    },
    valExpteElect: (value) => {
        const resultado = /^[A-Za-z0-9\!\@\#\$\%\^\&\*\)\(+\=\/._-]{0,20}$/.test(value)
        return resultado
    }
}

//** formateo de fechas & +
export const formateos = {

    forFormatFecha : (value)  => {
        const dayjsFecha = dayjs(value).add(1,"day").format('DD/MM/YYYY')
        return dayjsFecha
    },
    forDependenciaCausante: (arreglo, id) => {
        let nombre = ""
        arreglo.forEach(item=>{
            if(item._id === id){ nombre = item.nombre }
        })
        return nombre 
    }
}

//** funcion -tipo CMIS- para traer el idAlfresco de la carpeta mediante una query
export const nodeSearch = async (queryValue,ticket) => {
    
    //headers
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Basic ${ticket}`);

    //consulta
    const bodyData =JSON.stringify({
        "query": {
            "query": `select * from cmis:folder WHERE cmis:name LIKE '${queryValue}'`,
            "language": "cmis"
          }
    }) 

    //options 
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: bodyData,
        redirect: 'follow'
    }

    //fetch
    try {
        //const sendData = await fetch("alfrescosearch/", requestOptions)
        //const sendData = await fetch("http://192.168.0.148/alfresco/api/-default-/public/search/versions/1/search", requestOptions)
        //const sendData = await fetch(`${urlSearch}`, requestOptions)
        const sendData = await fetch("cmis", requestOptions)

        const dataFinal = await sendData.json()

        console.log('LA DATA ID CARPETA 📑 =>', dataFinal?.list?.entries[0]?.entry?.id)

        const idCarpeta = dataFinal?.list?.entries[0]?.entry?.id

        return idCarpeta

    } catch (error) {
        console.error(error)
        return false
    }
}

//** funcion que trae los children de una carpeta de alfresco
export const getNodeChildren = async (nodeId, ticket) => {

    /* let idFinal = '' */
    
    if (!nodeId){ return }
    console.info("🎃nodeId=>", nodeId)  
    
    //headers
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Basic ${ticket}`);

    //Options
    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    }

    //fetch
    try {
        //const getNodeInfo = await fetch(`http://192.168.0.148/alfresco/api/-default-/public/alfresco/versions/1/nodes/${nodeId}`,requestOptions)
        const getNodeInfo = await fetch(`alfresco/nodes/${nodeId}`,requestOptions)
        //const getData = await fetch( `http://192.168.0.148/alfresco/api/-default-/public/alfresco/versions/1/nodes/${nodeId}/children`, requestOptions)
        const getData = await fetch( `alfresco/nodes/${nodeId}/children`, requestOptions)

        const dataFinal = await getData.json()
        const dataFinalNodeInfo = await getNodeInfo.json()

        console.info("🚧informacion del nodo destino", dataFinalNodeInfo?.entry?.name)

        console.info("🚧informacion del nodo-Id destino", dataFinalNodeInfo?.entry?.id)

        console.info("🚧carpetas dentro del destino", dataFinal?.list?.entries)

        const nombreCarpeta = dataFinalNodeInfo?.entry?.name

        const nodoDestino = dataFinalNodeInfo?.entry?.id

        let listaCarpetas = dataFinal?.list?.entries

        //** REFACTORIZAR=> TENGO QUE FILTAR QUE EL ARRAY NO CONTENGA DOCUMENTOS (isFolder = false) */

        console.info('✅lista de carpetas', listaCarpetas, nodoDestino)

        const carpetaSinDocumentos = listaCarpetas.filter(item=>item.entry.isFolder)

        console.info('🤔🚧✅⭕🤍💥🈳', carpetaSinDocumentos)

        if (listaCarpetas.length == 0 ){ 
            return {listaCarpetas : false , nombreCarpeta, nodoDestino }
        }
        if (carpetaSinDocumentos.length == 0 ){ 
            return {listaCarpetas : false , nombreCarpeta, nodoDestino }
        }else{
            listaCarpetas = carpetaSinDocumentos
            return {listaCarpetas: listaCarpetas, nombreCarpeta, nodoDestino}
        }

        return {listaCarpetas, nombreCarpeta}

    } catch (error) {
        console.error(error)
        return false
    }

} 

//** traer la ruta completa(maso menos) de un nodo
export const getNodePath = async (nodeId, ticket) => {

    //headers
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Basic ${ticket}`);

    //Options
    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    }

    try {
        
        const getData = await fetch(`alfresco/nodes/${nodeId}/children`, requestOptions)

    } catch (error) {
        
    }

}

//** enviar archivos a carpetas de alfresco */
export const sendFile = async (nodeId, ticket, doc) => {

    //console.info('💥', doc)
    console.table({nodeId, ticket, doc})
    

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Basic ${ticket}`);

    var formdata = new FormData();
    formdata.append("filedata", doc[0])
   
    let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    }

    try {

        //const sendData = await fetch(`http://192.168.0.148/alfresco/api/-default-/public/alfresco/versions/1/nodes/${nodeId}/children`, requestOptions, formdata)
        const sendData = await fetch(`alfresco/nodes/${nodeId}/children`, requestOptions, formdata)
        
        const dataFinal = await sendData.json()

        console.info('🆎🈳', dataFinal)

        return dataFinal

    } catch (error) {

        console.log(error)

        return error
    }


}


//** ❕ enviar una novedad solo novedad  */
//export const 
