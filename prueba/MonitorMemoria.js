setInterval(getMemoria,3000);

function getMemoria()
{
   axios.get('http://35.184.238.211:8080/memo')
     .then(function (response) {
      console.log(response.data);
      arr.push(response.data.PorcentajeConsumo);
      porcentaje=response.data.PorcentajeConsumo;
      total=response.data.MemoriaTotal;
      consumida=response.data.MemoriaTotal-response.data.MemoriaLibre;
      document.getElementById("a").innerHTML = total;
      document.getElementById("b").innerHTML = consumida;
      document.getElementById("c").innerHTML = porcentaje;
      contador.push(consumida);
     })
     .catch(function (error) {
      console.log(error);
     })
     .then(function () {
     });
     var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: contador,
        datasets: [{
            label: 'Consumo de RAM',
            data: arr,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
}


var contador=[]
var arr = [];
var total=0;
var consumida=0;
var porcentaje=0.0;

function mostrar() {
  for(var i=0;i<arr.length;i++){
    console.log(arr[i]);
  }
  
}
