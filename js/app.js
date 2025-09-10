const AppTitle = "Lépésszámláló App"
const Author = "13.a Szoftverfejlesztő"
const Company = "Bajai SZC Türr István Technikum"
const Server = "http://localhost:3000"

let title = document.querySelector('#title')
let author = document.querySelector('#author')
let company = document.querySelector('#company')
let lightmodeBtn = document.querySelector('#lightmodeBtn')
let darkmodeBtn = document.querySelector('#darkmodeBtn')
 
let main = document.querySelector('main');
 
let theme = 'dark'

let mainMenu = document.querySelector('#mainMenu')
let userMenu = document.querySelector('#userMenu')

let loggedUser= null
title.innerHTML = AppTitle
company.innerHTML = Company
Author.innerHTML = Author

 
lightmodeBtn.addEventListener('click', () => {
    setTheme('light')
    saveTheme('light')
})
darkmodeBtn.addEventListener('click', () => {
    setTheme('dark')
    saveTheme('dark')
})
 
function loadTheme() {
    theme = 'light'
    if (localStorage.getItem('SCTheme')) {
        theme = localStorage.getItem('SCTheme')
    }
    setTheme(theme)
}
 
 
function saveTheme(theme) {
    localStorage.setItem('SCTheme', theme)
    setThemeBtn(theme)
 
}
function setThemeBtn(theme) {
    if (theme == 'light') {
        lightmodeBtn.classList.add('hide')
        darkmodeBtn.classList.remove('hide')
 
    }
    else {
        lightmodeBtn.classList.remove('hide')
        darkmodeBtn.classList.add('hide')
    }
}
function setTheme(theme) {
 
    document.documentElement.setAttribute('data-bs-theme', theme)
 
}




async function render(view){
    main.innerHTML = await(await fetch(`views/${view}.html`)).text();
 }
 
async function getLoggedUser() {
    if (sessionStorage.getItem('loggedUser')) {
        loggedUser = JSON.parse(sessionStorage.getItem('loggedUser'))
        mainMenu.classList.add('hide')
        userMenu.classList.remove('hide')
        await render('main')
    }else{
        loggedUser=null
        mainMenu.classList.remove('hide')
        userMenu.classList.add('hide')
        await render('login')
    }
}


loadTheme()
getLoggedUser()
saveTheme()
