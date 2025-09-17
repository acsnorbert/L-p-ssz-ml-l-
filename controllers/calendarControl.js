let calevents = []
 
async function getCalendarData(){
    try{
        calevents = []
        const res = await fetch(`${API}/steps/user/${loggedUser.id}`)
        let steps = await res.json()
        steps = steps.sort((a,b) => new Date(a.date) - new Date(b.date))
        for (let i = 0; i < steps.length; i++) {
            calevents.push({
                title: "Lépések: " +steps[i].stepcount,
                start: steps[i].date
            })
        }
    }
    catch(err){
        console.log(err)
    }
}
 
function initCalendar(){
    var calendarEl = document.getElementById('calendar');
        var calendar = new FullCalendar.Calendar(calendarEl, {
          initialView: 'dayGridMonth',
          locale:'hu',
          headerToolbar:{
            left:'prev,today,next',
            center: 'title',
            right: 'multiMonthYear,dayGridMonth,timeGridWeek,listWeek,timeGridDay'
          },
          events: calevents
        });
        calendar.render();
}