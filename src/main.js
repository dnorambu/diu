window.onload = function(){
    document.addEventListener('click', function(event) {
        var isClickInside = add.contains(event.target);
        
        if (!isClickInside) {
            closeAdd();
        }
    });

    document.getElementById("manage-time").children[0].shadowRoot.firstElementChild.style.width = "100%";
    document.getElementById("manage-time").children[1].shadowRoot.firstElementChild.style.width = "100%";
    document.getElementById("manage-time").children[2].shadowRoot.firstElementChild.style.width = "100%";
    document.getElementById("manage-time").children[0].shadowRoot.firstElementChild.style.height = "60px";
    document.getElementById("manage-time").children[1].shadowRoot.firstElementChild.style.height = "60px";
    document.getElementById("manage-time").children[2].shadowRoot.firstElementChild.style.height = "60px";

    document.getElementById("tarea-jornada").children[0].shadowRoot.firstElementChild.style.width = "150px";
    document.getElementById("tarea-jornada").children[1].shadowRoot.firstElementChild.style.width = "150px";
    document.getElementById("tarea-jornada").children[0].shadowRoot.firstElementChild.style.height = "60px";
    document.getElementById("tarea-jornada").children[1].shadowRoot.firstElementChild.style.height = "60px";

};

var lista_tareas = [];
var lista_jornadas = [];
let dict = {};




function ActualizarLista() {

    var padre_lista = document.getElementById("lista").children[1];
    padre_lista.innerHTML = '';
    for (i = 0; i < lista_tareas.length; i++) {
        var new_item = document.createElement("mwc-list-item");
        new_item.setAttribute("value",toString(i));
        var newContent = document.createTextNode(lista_tareas[i]);
        new_item.appendChild(newContent);
        padre_lista.appendChild(new_item);
    }
    for (i = 0; i < lista_jornadas.length; i++) {
        var new_item = document.createElement("mwc-list-item");
        new_item.setAttribute("value",toString(i));
        var newContent = document.createTextNode(lista_jornadas[i]);
        new_item.appendChild(newContent);
        padre_lista.appendChild(new_item);
    }
}

function PantallaPrincipal() {
    document.getElementById("pagina-principal").style.display = "block";
    document.getElementById("extras").style.display = "none";
    document.getElementById("agregar-jornada").style.display = "none";
    document.getElementById("agregar-tarea").style.display = "none";
    document.getElementById("manage-time").style.display = "none";
}

function AgregarTarea() {
    document.getElementById("pagina-principal").style.display = "none";
    document.getElementById("extras").style.display = "none";
    document.getElementById("agregar-tarea").style.display = "block";

}

function EnEjecucion() {
    document.getElementById("pagina-principal").style.display = "block";

}

function ConfirmarAddTarea() {
    var tarea = document.getElementById("tf-tarea").firstElementChild.shadowRoot.firstElementChild.children[1].value;
    console.log(tarea);
    addTarea(tarea);
    ActualizarLista();
    PantallaPrincipal();

}

function addTarea(tarea) {
    lista_tareas.push(tarea);
}
function addJornada(jornada, tareas) {
    lista_jornadas.push(jornada);
    dict[jornada] = tareas;
}
function openAdd() {
    document.getElementById("tarea-jornada").style.display = "block";
    var add = document.getElementById('tarea-jornada');
}
function closeAdd() {
    document.getElementById("tarea-jornada").style.display = "none";
}