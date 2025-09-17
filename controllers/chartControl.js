let chart = null;
let Chartdata = []
let Chartlabels = []
async function getChartData() {
    try{
        Chartdata = []
        Chartlabels = []
        const res = await fetch(`${API}/steps/user/${loggedUser.id}`)
        let steps = await res.json()
        steps = steps.sort((a,b) => new Date(a.date) - new Date(b.date))
        for (let i = 0; i < steps.length; i++) {
            Chartdata.push(steps[i].stepcount)
            Chartlabels.push(steps[i].date)
        }
    }
    catch(err){
        console.log(err)
    }
    
}
function initChart(){
    const ctx = document.getElementById("chart").getContext("2d");
    chart = new Chart(ctx, {
        type:'line',
        data: 
        {
          labels:  Chartlabels,
          datasets: [
            {
                label:loggedUser.name,
                data: Chartdata
            }
        ]
          
        },
        labels: [],
        
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Chart.js Line Chart'
              }
            }
          },
    })
}