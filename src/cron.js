var inicio=0;
var timeout=0;
var resta=0;
function empezarDetener()
{
    var lista = document.getElementById("lista");
    lista.children[0].setAttribute("disabled","true");
    lista.children[1].setAttribute("disabled","true");
    var min_po = document.getElementById("min-pom");
    var min_de = document.getElementById("min-des");
    min_po.firstElementChild.setAttribute("disabled","true");
    min_de.firstElementChild.setAttribute("disabled","true");
    // lista.children[1].children[1].getAttribute("aria-selected")=="true"
    for (i = 0; i < lista.children[1].childElementCount; i++) {
        console.log((lista.children[1].children[i].getAttribute("aria-selected").toLowerCase()==='true')==true);
        if((lista.children[1].children[i].getAttribute("aria-selected").toLowerCase()==='true')==true){
            var tarea_o_jornada = lista.children[1].children[i].lastChild.textContent;
            if(lista_tareas.includes(tarea_o_jornada)){
                console.log("entra al primer sub if")
                document.getElementById("finalizar-tarea").style.display = "block";
            } else {
                console.log("entra al segundo sub if")
                document.getElementById("finalizar-jornada").style.display = "block";
            }
            break;
        }
    }

    var manage_time =  document.getElementById("manage-time");
    manage_time.children[0].style.display = "none";
    manage_time.style.display = "flex";
    manage_time.children[1].style.display = "block";
    manage_time.children[2].style.display = "block";

    if(timeout==0)
    {
        // empezar el cronometro


        // Obtenemos el valor actual
        inicio=vuelta=new Date(new Date().getTime() - 60000*new Date(resta).getMinutes() - (new Date(resta).getSeconds()+1)*1000);

        // iniciamos el proceso
        funcionando();
    }
}

function pausar(){
    clearTimeout(timeout);
    timeout=0;
    var manage_time =  document.getElementById("manage-time");
    manage_time.children[0].style.display = "block";
    manage_time.children[1].style.display = "none";
    manage_time.children[2].style.display = "block";
}

function cancelar() {
    clearTimeout(timeout);
    timeout=0;
    resta=0;
    inicio=0;
    document.getElementById('titulo').style.display = "block";
    document.getElementById('crono').style.display = "none";
    var lista = document.getElementById("lista");
    // lista.children[0].setAttribute("disabled","false");
    // lista.children[1].setAttribute("disabled","false");
    lista.children[0].removeAttribute("disabled");
    lista.children[1].removeAttribute("disabled");
    var min_po = document.getElementById("min-pom");
    var min_de = document.getElementById("min-des");
    // min_po.firstElementChild.setAttribute("disabled","false");
    // min_de.firstElementChild.setAttribute("disabled","false");
    min_po.firstElementChild.removeAttribute("disabled");
    min_de.firstElementChild.removeAttribute("disabled");
    PantallaPrincipal();
}

function funcionando()
{
    // obteneos la fecha actual
    var actual = new Date().getTime();
    // obtenemos la diferencia entre la fecha actual y la de inicio
    var diff=new Date(actual- new Date(inicio));
    //var min = document.getElementById('min').getAttribute("aria-valuenow");
    var min_des = document.getElementById('min-des').firstElementChild.shadowRoot.firstElementChild.getAttribute("aria-valuenow")
    var min_pom = document.getElementById('min-pom').firstElementChild.shadowRoot.firstElementChild.getAttribute("aria-valuenow")
    var date_pom = new Date(new Date(inicio).getTime() + parseFloat(min_pom)*60000);
    //date_pom.setMinutes(parseFloat(min_pom));
    //var final_diff = new Date(date_pom - diff.getMinutes()*60000 - 1000*diff.getSeconds());
    var final_diff = new Date(date_pom.getTime()-actual);
    resta = diff;
    //console.log(final_diff);
    //resta = final_diff;
    document.getElementById('titulo').style.display = "none";
    document.getElementById('crono').style.display = "block";
    // mostramos la diferencia entre la fecha actual y la inicial
    var result=LeadingZero(final_diff.getUTCHours())+":"+LeadingZero(final_diff.getUTCMinutes())+":"+LeadingZero(final_diff.getUTCSeconds());
    document.getElementById('crono').innerHTML = result.substring(3,result.length);

    // Indicamos que se ejecute esta función nuevamente dentro de 1 segundo
    timeout=setTimeout("funcionando()",1000);
}
 
/* Funcion que pone un 0 delante de un valor si es necesario */
function LeadingZero(Time) {
    return (Time < 10) ? "0" + Time : + Time;
}