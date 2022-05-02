class DataTable {
    elementParent;
    headers;
    trs;
    table;
    thead;
    tbody;

    constructor(elementParent, contents) {
        this.elementParent = document.querySelector(elementParent);
        this.table = document.createElement("table");
        this.thead = document.createElement("thead");
        this.tbody = document.createElement("tbody");
        this.headers = contents.headers;
        this.trs = contents.trs;
    }

    makeTable() {
        this.renderHeaders();
        this.renderTrs();
        this.table.appendChild(this.thead);
        this.table.appendChild(this.tbody);
        this.elementParent.appendChild(this.table);
    }

    renderHeaders() {
        let tr = document.createElement("tr");
        let dFragment = document.createDocumentFragment();
        let td = document.createElement("td");
        tr.appendChild(td);

        this.headers.forEach((header) => {
            let td = document.createElement("td");
            td.textContent = header;
            dFragment.appendChild(td);
        });
        tr.appendChild(dFragment);
        this.thead.appendChild(tr);
    }

    renderTrs() {
        let dFragment = document.createDocumentFragment();
        this.trs.forEach((t) => {
            let tr = document.createElement("tr");
            tr.id = Math.floor(Math.random() * 100);
            let td = document.createElement("td");
            td.innerHTML = `<input type="checkbox" class="iCheckBox">`;
            tr.appendChild(td);

            for (let i in t) {
                let td = document.createElement("td");
                td.textContent = t[i];
                tr.appendChild(td);
            }
            dFragment.appendChild(tr);
        });
        this.tbody.appendChild(dFragment);
    }

    insertarFilas(nuevasFilas) {
        let dFragment = document.createDocumentFragment();
        let tr = document.createElement("tr");
        tr.id = Math.floor(Math.random() * 100);
        let td = document.createElement("td");
        td.innerHTML = `<input type="checkbox" class="iCheckBox">`;
        tr.appendChild(td);

        nuevasFilas.forEach((fila) => {
            let td = document.createElement("td");
            td.textContent = fila;
            tr.appendChild(td);
        });
        dFragment.appendChild(tr);
        this.tbody.appendChild(dFragment);
    }

    eliminarFilas(idFila) {
        let filaEliminar = document.getElementById(idFila);
        let fElimParent = filaEliminar.parentNode; //parent es el tr contenedor
        fElimParent.removeChild(filaEliminar);
    }

    editarFilas(idFila) {
        let filaEditar = document.getElementById(idFila); //es el tr contenedor
        let fEHijos = filaEditar.querySelectorAll("td");
        let datosEditados = [];
        fEHijos.forEach((hijo, index) => {
            if (index == 0) {
                let input = hijo.querySelector("input");
                input.type = "button";
                input.value = "aceptar";
                input.addEventListener("click", () => {
                    let parent = input.parentNode.parentNode;
                    let pHijos = parent.querySelectorAll("td");
                    pHijos.forEach((h, index) => {
                        if (index == 0) {
                            input.type = "checkbox";
                            input.value = "";
                            input.checked = false;
                        } else {
                            h.contentEditable = false;
                            h.classList.remove("editableOn");
                            datosEditados.push(h.textContent);
                        }
                    });
                }, {once:true});
            } else {
                hijo.contentEditable = true;
                hijo.classList.add("editableOn");
            }
        });
        return datosEditados;
    }
}

let contents = {
    headers: ["id", "nombre", "apellido", "telefono", "correo"],
    trs: [
        {
            id: "0009",
            nombre: "John",
            apellido: "Calle",
            telefono: "3137497463",
            correo: "Jhon@gmail.com",
        },
        {
            id: "00008",
            nombre: "Carlos",
            apellido: "Posada",
            telefono: "3127249875",
            correo: "Carlos@gmail.com",
        },
        {
            id: "0029",
            nombre: "Juan",
            apellido: "Jaramillo",
            telefono: "3137497463",
            correo: "Juan@gmail.com",
        },
        {
            id: "00018",
            nombre: "Esteban",
            apellido: "Perez",
            telefono: "3127249875",
            correo: "nombre@gmail.com",
        },
    ],
};
let tabla = new DataTable("#datatable-container", contents);
tabla.makeTable();

let formulario = document.getElementById("formulario");
formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    let inputs = formulario.querySelectorAll("input");
    let arrInputsValue = [];
    inputs.forEach((i, index) => {
        arrInputsValue[index] = i.value;
        i.value = "";
        if (index == 0) i.focus();
    });
    tabla.insertarFilas(arrInputsValue);
});

let btn_eliminar = document.getElementById("eliminar");
btn_eliminar.addEventListener("click", () => {
    let iCheckBox = document.querySelectorAll(".iCheckBox");
    iCheckBox.forEach((check) => {
        if (check.checked) {
            let idFila = check.parentNode.parentNode.id;
            tabla.eliminarFilas(idFila);
        }
    });
});

let btn_editar = document.getElementById("editar");
btn_editar.addEventListener("click", () => {
    let iCheckBox = document.querySelectorAll(".iCheckBox");
    let camposEditados = [];
    iCheckBox.forEach((check) => {
        if (check.checked) {
            let idFila = check.parentNode.parentNode.id;
            let datosEditados = tabla.editarFilas(idFila);
            camposEditados.push(datosEditados);
        }
    });
    console.log('campos editados');
    console.log(camposEditados);
});
