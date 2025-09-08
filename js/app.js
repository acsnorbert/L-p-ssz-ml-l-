const AppTitle = "Lépésszámláló App"
const Author = "13.a Szoftverfejlesztő"
const Company = "Bajai SZC Türr István Technikum"
 
let title = document.querySelector('#title')
let author = document.querySelector('#author')
let company = document.querySelector('#company')
let lightmodeBtn = document.querySelector('#lightmodeBtn')
let darkmodeBtn = document.querySelector('#darkmodeBtn')
 
let main = document.querySelector('main');
 
let theme = 'dark'
 
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
 
loadTheme()
saveTheme()
render('login')
render('registration')