let chart = null
let chartLabels = []
let chartData = []

async function getChartData() {

}

function initChart() {
    const ctx = document.getElementById('chart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'My First dataset',

                data: data,
            }]

        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Nika Chart'
                }

            }
        }
    }
    );
}