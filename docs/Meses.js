class Nodo {
    constructor(mes) {
        this.mes = mes
        this.siguiente = null
        this.anterior = null
    }
}

class ListaDobleMeses {
    constructor() {
        this.primero = null
        this.longitud = 0
    }

    insertar(mes) {
        let nuevo = new Nodo(mes)
        if (this.primero == null) { //Si la lista se encuentra vacia
            this.primero = nuevo
        } else {
            let aux = this.primero
            while (aux.siguiente != null) {
                if (aux.mes == mes) { //Si el id del cliente ya esta registrado, mostrara un mensaje de error
                    console.log("Valor ya ingresado, no se puede volver a insertar")
                    return
                }
                aux = aux.siguiente
            }
            if (aux.mes == mes) { //Lo mismo, si el id del cliente ya fue registrado, muestra el mismo mensaje de error
                console.log("Valor ya ingresado, no se puede volver a insertar")
                return
            }
            aux.siguiente = nuevo
            nuevo.anterior = aux
        }
    }

    mostrar() {
        let aux = this.primero
        console.log("///Mostrar Lista///")
        while (aux != null) {
            var mesIngresado = aux.mes
            console.log("///////////////////////")
            console.log("Mes: " + mesIngresado)
            aux = aux.siguiente
        }
    }

    borrar(mes) {
        if (this.primero.mes == mes) {
            this.primero = this.primero.siguiente
            this.longitud--
            if (this.primero != null) {
                this.primero.anterior = null
            }
        } else {
            let aux = this.primero
            while (aux.siguiente.mes) {
                if (aux.siguiente.mes == mes) {
                    aux.siguiente = aux.siguiente.siguiente
                    this.longitud--
                    if (aux.siguiente != null) {
                        aux.siguiente.anterior = aux
                    }
                    break
                }
                aux = aux.siguiente
            }
        }
    }
}

let listaMeses = new ListaDobleMeses()

function imprimirLista() {
    listaMeses.mostrar()
}

function recuperarLista() {
    var listaTemporal = JSON.parse(sessionStorage.getItem("ListaDobleMeses"))
    listaMeses = new ListaDobleMeses()
    listaTemporal = CircularJSON.parse(listaTemporal)
    Object.assign(listaMeses, listaTemporal)
}

function insertarLista() {
    let mesNuevo = document.getElementById("mesCalendario").value
    listaMeses.insertar(mesNuevo)
    alert("Mes ingresado correctamente")
    document.getElementById("mesCalendario").value = ""
    imprimirLista()
}

function borrarLista() {
    let mesBuscar = document.getElementById("mesCalendario").value
    listaMeses.borrar(mesBuscar)
    alert("Mes borrado correctamente")
    document.getElementById("mesCalendario").value = ""
    imprimirLista()
}