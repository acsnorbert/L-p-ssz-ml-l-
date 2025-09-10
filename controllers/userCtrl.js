const passwdRegExp = /"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"/;
const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

async function registration() {
    /*await fetch('http://localhost:3000/users')
        .then(res => res.json())
        .then(data => console.log(data)) */
    let nameField = document.querySelector('#nameField')
    let emailField = document.querySelector('#emailField')
    let passwdField = document.querySelector('#passwdField')
    let confirmPasswdField = document.querySelector('#confirmPasswdField')

    if(passwdRegExp.test(passwdField.value)){
        showMessage('danger', 'Hiba','A megadott jelszó nem elég biztonságos')
    }
    if(emailRegExp.test(passwdField.value)){
        showMessage('danger','Hiba','E-mail cím nem megfelelő formátumú')
    }


    if (nameField.value == '' || emailField.value == '' || passwdField.value == '' || confirmPasswdField.value == '') {
        showMessage('danger','Hiba','Nem adtál meg minden adatot!')
        return
    }
    if (passwdField.value != confirmPasswdField.value) {
        showMessage('danger','Hiba',' megadott jelszavak nem egyeznek!')
        return
    }


    try {
        const res = await fetch(`${Server}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: nameField.value,
                email: emailField.value,
                password: passwdField.value
            })
        })

        // console.log('Statusz', res.status)
        const data = await res.json()
        // console.log(data)
        
        if(res.status ==200){
            nameField.value =''
            emailField.value=''
            passwdField.value=''
            confirmPasswdField.value=''
            showMessage('success', 'Ok', data.msg)
        }else{
            showMessage('danger','Hiba', data.msg)
        }
    } catch (error) {
        console.log('hiba tortent: ', error)
    }

}
async function login() {
    let emailField = document.querySelector('#emailField')
    let passwdField = document.querySelector('#passwdField')
    if (emailField.value == '' || passwdField.value == '') {
        showMessage('danger','Hiba','Nem adtál meg minden adatot!')
        return
    }

    let user = {}
    try {
        const res = await fetch(`${Server}/users/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: emailField.value,
                    password: passwdField.value
                })
            })
     
        user = await res.json()
        console.log(user.id)
        if (user.id != undefined) {
            loggedUser=user
        }

        if(!loggedUser){
            showMessage('danger','Hiba','Hibás belépési adatok!')
            return
        }
        sessionStorage.setItem('loggedUser',JSON.stringify(loggedUser))
        getLoggedUser()
        showMessage('success','Ok','Sikeres bejelentkezés!')
    }catch(err){
        console.log('Hiba Történt', err)
    }
}
function logout() {
sessionStorage.removeItem('loggedUser')
getLoggedUser()
render('login')
}
function getProfile() {

}
function updateProfile() { 

}

function updatePassword() {

}

