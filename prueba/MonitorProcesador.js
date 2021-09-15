setInterval(getProcesos,6000);
function getProcesos()
{
   axios.get('http://35.184.238.211:8080/proc')
     .then(function (response) {
        var objJson=response.data;
        envio=""
        envio=objJson.split("\n");
        vive(envio);
        infoIndividual();
 
     })
     .catch(function (error) {
      console.log(error);
     })
     .then(function () {
     });
   
}

var arr = [];
var envio;
var TotalDeProcesos=0;
var ProcesosEjecucion=0;
var ProcesosSuspendidos=0;
var ProcesosDetenidos=0;
var ProcesosZombies=0;

function mostrar() {
  for(var i=0;i<arr.length;i++){
    console.log(arr[i]);
  }
}
function vive(envio){
    TotalDeProcesos=0;
    ProcesosEjecucion=0;
    ProcesosSuspendidos=0;
    ProcesosDetenidos=0;
    ProcesosZombies=0;
    //console.log(envio);
    var s=""
    TotalDeProcesos=envio.length;
    for(var i=0;i<envio.length-1;i++){
        s=JSON.parse(envio[i].slice(0,-1));
        console.log(s);
        if (s.STATE=="R"){
            console.log("activo");
            ProcesosEjecucion+=1;
        }else if (s.STATE=="S"){
            console.log("sleep");
            ProcesosSuspendidos+=1;
        }else if (s.STATE=="T"){
            console.log("detenido");
            ProcesosDetenidos+=1;
        }else if (s.STATE=="Z"){
            console.log("zombie");
            ProcesosZombies+=1;
        } 
    }
    document.getElementById("aa").innerHTML = TotalDeProcesos;
    document.getElementById("ab").innerHTML = ProcesosEjecucion;
    document.getElementById("ac").innerHTML = ProcesosSuspendidos;
    document.getElementById("ad").innerHTML = ProcesosDetenidos;
    document.getElementById("ae").innerHTML = ProcesosZombies;
}

function infoIndividual(){
    var cad="";
    cad="<table style=\"width:100%\" class=\"table table-dark\">";
    cad+="<tr>";
    cad+="<th>Identificador de Procesos PID</th>";
    cad+="<th>Nombre del Proceso</th>";
    cad+="<th>Usuario que ejecuto</th>";
    cad+="<th>Estado del Proceso</th>";
    cad+="<th>%RAM</th>";
    cad+="</tr>\n";
    var s=""
    TotalDeProcesos=envio.length;
    for(var i=0;i<envio.length-1;i++){
        s=JSON.parse(envio[i].slice(0,-1));
        console.log(s);
        cad+="<tr>";
        cad+="<td>"+s.PROC_ID+"</td>";
        cad+="<td>"+s.PROC_NAME+"</td>";
        cad+="<td>"+s.USER_ID+"</td>";
        cad+="<td>"+s.STATE+"</td>";
        cad+="<td>"+s.MEMORY_USED+"</td>";
        cad+="</tr>";

    }
    cad+="</table>";
    document.getElementById("aux").innerHTML = cad;
}

function vamoaMatar(){
    var send = document.getElementById("death").value;
    axios.post('http://35.184.238.211:8080/kill', {}, { params:{
        id: send
    }})
    .then(response => response.status)
    .catch(err => console.warn(err));
}