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
var dict = [];
var index_dict = [];

function ActualizarListaJornada(){
    var padre_tareas = document.getElementById("tareas-jornada");
    padre_tareas.innerHTML = '';
    for (i = 0; i < lista_tareas.length; i++) {
        var new_formfield = document.createElement("mwc-formfield");
        new_formfield.setAttribute("value",toString(i));
        var new_checkbox = document.createElement("mwc-checkbox");
        var new_content = document.createTextNode(lista_tareas[i]);
        new_formfield.appendChild(new_checkbox);
        new_formfield.appendChild(new_content);
        padre_tareas.appendChild(new_formfield);
    }
}
function ActualizarLista(){
    
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



function FinalizarTarea() {
    var lista = document.getElementById("lista").children[1];
    for (i = 0; i < lista.childElementCount; i++) {
        if(i==0){continue}
        if(lista.children[i].getAttribute("aria-selected")=="true"){
            removeTarea(lista_tareas.indexOf(lista.children[i].lastChild.textContent))
            break;
        }
    }
    ActualizarLista();
    cancelar();
    PantallaPrincipal();
}

function FinalizarJornada() {
    var lista = document.getElementById("lista").children[1];
    for (i = 0; i < lista.childElementCount; i++) {
        if(i==0){continue}
        if(lista.children[i].getAttribute("aria-selected")=="true"){
            var jornada = lista.children[i].lastChild.textContent;
            removeJornada(lista_jornadas.indexOf(jornada));
            for(j = 0; j < dict[index_dict[jornada]]["obj"][jornada].length; j++){
                removeTarea(lista_tareas.indexOf(dict[index_dict[jornada]]["obj"][jornada][j]))
            }
            delete dict[index_dict[jornada]];
            delete index_dict[jornada];
            break;
        }
    }
    ActualizarLista();
    cancelar();
    PantallaPrincipal();
}

function PantallaPrincipal() {
    document.getElementById("pagina-principal").style.display = "block";
    document.getElementById("extras").style.display = "none";
    document.getElementById("agregar-jornada").style.display = "none";
    document.getElementById("agregar-tarea").style.display = "none";
    document.getElementById("manage-time").style.display = "none";
    document.getElementById("finalizar-tarea").style.display = "none";
    document.getElementById("finalizar-jornada").style.display = "none";
}

function AgregarTarea() {
    document.getElementById("pagina-principal").style.display = "none";
    document.getElementById("extras").style.display = "none";
    document.getElementById("agregar-tarea").style.display = "block";
    document.getElementById("agregar-jornada").style.display = "none";
}
function AgregarJornada() {
    document.getElementById("pagina-principal").style.display = "none";
    document.getElementById("extras").style.display = "none";
    document.getElementById("agregar-tarea").style.display = "none";
    document.getElementById("agregar-jornada").style.display = "block";
    ActualizarListaJornada();
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
    window.snacktarea.stacked = false;
    window.snacktarea.leading = false;
    window.snacktarea.open = true;
    //document.getElementById("snacker-div").style.display = "inline-flex";
}

function ConfirmarAddJornada() {
    var padre_tareas = document.getElementById("tareas-jornada");
    var jornada_titulo = document.getElementById("jornada-titulo").firstElementChild.shadowRoot.firstElementChild.children[1].value;
    console.log(jornada_titulo);
    var tareas_de_jornada = [];
    for(i = 0; i < padre_tareas.childElementCount; i++) {
        if(padre_tareas.children[i].children[0].getAttribute("checked")==""){
            tareas_de_jornada.push(padre_tareas.children[i].textContent);
        }
    }
    var obj = {};
    index_dict[jornada_titulo] = dict.length;
    obj[jornada_titulo] = tareas_de_jornada;
    dict.push({
        obj
    });
    console.log(dict);
    addJornada(jornada_titulo);
    ActualizarLista();
    PantallaPrincipal();
    window.snackjornada.stacked = false;
    window.snackjornada.leading = false;
    window.snackjornada.open = true;
}

function addTarea(tarea) {
    lista_tareas.push(tarea);
}

function removeTarea(pos) {
    lista_tareas.splice(pos,1);
}

function addJornada(jornada) {
    lista_jornadas.push(jornada);
}

function removeJornada(pos) {
    lista_jornadas.splice(pos,1);
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