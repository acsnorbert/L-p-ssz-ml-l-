let steps = []
let editMode =  false;
let selectedStep = null
 
 
 
function setDate(){
    let today =  new Date().toISOString().split('T')[0];
    let dateField = document.getElementById("dateField")
    dateField.setAttribute("max",today)
}
 
async function Add() {
    let dateOccupied = false
    let stepid = 0
    let dateField = document.getElementById("dateField")
    let stepcountField = document.getElementById("stepcountField")
    try{
        if(dateField.value == '' || stepcountField.value == ''){
            ShowAlert('Nem adtál meg minden adatot!', 'alert-danger')
            return
        }
        steps.forEach(step => {
            if(step.date == dateField.value){
                dateOccupied = true
                stepid = step.id
            }
        });
        if(dateOccupied == false){
            const res = await fetch(`${API}/steps`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: 0,
                uid: loggedUser.id,
                stepcount: stepcountField.value,
                date: dateField.value.toString()
            })
            })
            const data = await res.json()
            if (res.status == 200){
                dateField.value = ''
                stepcountField.value = ''
                ShowAlert("Sikeres adatfelvitel!", "alert-success")
                await FillTable()
            }
            else{
                ShowAlert("Hiba az adatok küldése során!", 'alert-danger')
            }
        }
        else{
            const res = await fetch(`${API}/steps/${stepid}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: stepid,
                    uid: loggedUser.id,
                    stepcount: stepcountField.value,
                    date: dateField.value.toString()
                })
                })
                const data = await res.json()
                if (res.status == 200){
                    dateField.value = ''
                    stepcountField.value = ''
                    ShowAlert("Sikeres adatfrissítés!", "alert-success")
                    await FillTable()
                }
                else{
                    ShowAlert("Hiba az adatok frissítése során!", 'alert-danger')
                }
        }
       
 
       
    }
    catch(err){
        console.log('Hiba történt: ', err)
    }
}
async function Del() {
    await Delete(selectedStep)
}
async function Update(){
    let dateOccupied = false
    let stepid = 0
    let dateField = document.getElementById("dateField")
    let stepcountField = document.getElementById("stepcountField")
 
    if(selectedStep.date == dateField.value){
        const res = await fetch(`${API}/steps/${selectedStep.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: selectedStep.id,
                uid: selectedStep.uid,
                stepcount: Number(stepcountField.value),
                date: dateField.value.toString()
            })
            })
            const data = await res.json()
            if (res.status == 200){
                dateField.value = ''
                stepcountField.value = ''
                ShowAlert("Sikeres adatfrissítés!", "alert-success")
                await FillTable()
            }
            else{
                ShowAlert("Hiba az adatok frissítése során!", 'alert-danger')
            }
    }
    else{
       
        steps.forEach(step => {
            if(step.date == dateField.value){
                dateOccupied = true
                stepid = step.id
            }
        });
        if(dateOccupied == false){
            try{
                const res = await fetch(`${API}/steps`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: 0,
                        uid: loggedUser.id,
                        stepcount: stepcountField.value,
                        date: dateField.value.toString()
                    })
                    })
                    const data = await res.json()
                    if (res.status == 200){
                        dateField.value = ''
                        stepcountField.value = ''
                        ShowAlert("Sikeres adatfrissítés!", "alert-success")
                        await FillTable()
                    }
                    else{
                        ShowAlert("Hiba az adatok küldése során!", 'alert-danger')
                    }
            }
            catch(err){
                console.log(err)
            }
        }
        else{
            try{
            const res = await fetch(`${API}/steps/${stepid}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: stepid,
                    uid: loggedUser.id,
                    stepcount: stepcountField.value,
                    date: dateField.value.toString()
                })
                })
                const data = await res.json()
                if (res.status == 200){
                    dateField.value = ''
                    stepcountField.value = ''
                    ShowAlert("Sikeres adatfrissítés!", "alert-success")
                    await FillTable()
                }
                else{
                    ShowAlert("Hiba az adatok frissítése során!", 'alert-danger')
                }
            }
            catch(err){
                console.log(err)
            }
        }
        try{
            const res = await fetch(`${API}/steps/${selectedStep.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
               
                })
                let data = await res.json()
                if (res.status == 200){
                    dateField.value = ''
                    stepcountField.value = ''
                    Cancel()
                    await FillTable()
                }
                else{
                    ShowAlert("Hupika2",'alert-danger')
                }
        }
        catch(err){
            ShowAlert("Hupika1",'alert-danger')
            console.log(err)
        }
    }
}
async function FillTable() {
    let tbody = document.getElementById("tbody")
    let allstepspan = document.getElementById("allsteps")
    tbody.innerHTML = ''
    try{
        const res = await fetch(`${API}/steps/user/${loggedUser.id}`)
        steps = await res.json()
        steps = steps.sort((a,b) => new Date(b.date) - new Date(a.date))
        let sum = 0
        let idx = 1
        if(res.status == 200){
            for (let i = 0; i < steps.length; i++) {
               
                let index = i
                sum += Number(steps[i].stepcount)
                let tr = document.createElement("tr")
                let td1 = document.createElement("td")
                let td2 = document.createElement("td")
                let td3 = document.createElement("td")
                let td4 = document.createElement("button")
                let td5 = document.createElement("button")
               
                td1.classList.add("text-center")
                td3.classList.add("text-end")
                td4.classList.add("btn")
                td4.classList.add("btn-warning")
                td5.classList.add("btn")
                td5.classList.add("btn-danger")
                td1.innerHTML = i+1
                td2.innerHTML = steps[i].date
                td3.innerHTML = steps[i].stepcount
               
                td4.innerHTML = '<i class="bi bi-pencil-fill"></i>'
                td5.innerHTML = '<i class="bi bi-trash-fill"></i>'
                td4.setAttribute('onClick', `editStep(${index})`)
                td5.setAttribute('onClick',`Delete(${index})`)
                tr.appendChild(td1)
                tr.appendChild(td2)
                tr.appendChild(td3)
                tr.appendChild(td4)
                tr.appendChild(td5)
                tbody.appendChild(tr)
                idx++
            };
            allstepspan.innerHTML = sum
        }
    }
    catch(err){
        ShowAlert("Hiba az adatok lekérdezésében!", 'alert-danger')
        console.log("Hiba történt!", err)
    }
}
async function editStep(index){
    let dateField = document.getElementById("dateField")
    let stepcountField = document.getElementById("stepcountField")
    toggleEditMode(true)
    dateField.value = steps[index].date
    stepcountField.value = steps[index].stepcount
    selectedStep = 1
    selectedStep = steps[index]
}
async function Delete(index){
    if(confirm("Biztos?")){
    try{
        const res = await fetch(`${API}/steps/${index}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
           
            })
            let data = await res.json()
            if (res.status == 200){
                dateField.value = ''
                stepcountField.value = ''
                ShowAlert(data.msg, "alert-success")
                Cancel()
                await FillTable()
            }
            else{
                ShowAlert("Hupika2",'alert-danger')
            }
    }
    catch(err){
        ShowAlert("Hupika1",'alert-danger')
        console.log(err)
    }
}
}
function toggleEditMode(mode){
    let addBtn = document.getElementById("addBtn")
    let updBtn = document.getElementById("updBtn")
    let delBtn = document.getElementById("delBtn")
    let cancelBtn = document.getElementById("cancelBtn")
    if(mode){
        addBtn.classList.add("hide")
        updBtn.classList.remove("hide")
        delBtn.classList.remove("hide")
        cancelBtn.classList.remove("hide")
    }
    else{
        addBtn.classList.remove("hide")
        updBtn.classList.add("hide")
        delBtn.classList.add("hide")
        cancelBtn.classList.add("hide")
    }
}
function Cancel(){
    toggleEditMode(false)
    let dateField = document.getElementById("dateField")
    let stepcountField = document.getElementById("stepcountField")
 
    dateField.value = null
    stepcountField.value = null
    selectedStep = null
}