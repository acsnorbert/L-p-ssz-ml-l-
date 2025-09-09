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
        alert('A megadott jelszó nem elég biztonságos')
    }
    if(emailRegExp.test(passwdField.value)){
        alert('E-mail cím nem megfelelő formátumú')
    }


    if (nameField.value == '' || emailField.value == '' || passwdField.value == '' || confirmPasswdField.value == '') {
        alert('Nem adtál meg minden adatot!')
        return
    }
    if (passwdField.value != confirmPasswdField.value) {
        alert(' megadott jelszavak nem egyeznek!')
        return
    }


    try {
        const res = await fetch('http://localhost:3000/users', {
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
        alert(data.msg)
        if(res.status ==200){
            nameField.value =''
            emailField.value=''
            passwdField.value=''
            confirmPasswdField.value=''
        }
    } catch (error) {
        console.log('hiba tortent: ', error)
    }

}
function login() {

}
function logout() {

}
function getProfile() {

}
function updateProfile() { }

function updatePassword() {

}

