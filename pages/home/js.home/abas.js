const form = {
    tabs :  document.querySelectorAll('.tab-btn'),
    btnAba :  document.getElementById('btn-aba-1'),
    btnAba2 :  document.getElementById('btn-aba-2'),
    contents : document.querySelectorAll('.content'),
    projetos : document.getElementById('projetos'),
    info : document.getElementById('info'),
    imgDom: document.getElementById('img-dom'),
    imgGerador: document.getElementById('img-gerador'),
    imgOne: document.getElementById('img-one'),
    imgHonda: document.getElementById('img-honda')
}

form.tabs.forEach(tab => tab.addEventListener('click',()=> tabclicked(tab) ))
const tabclicked = (tab) => {

    form.contents.forEach(content => content.classList.remove('show'))

    const contentId = tab.getAttribute('content-id')
    const content = document.getElementById(contentId)
    
    content.classList.add('show')

}

form.btnAba.addEventListener('click',()=>{removeAbas()})
form.btnAba2.addEventListener('click',()=>{removeAbas()})

function removeAbas() {
if ( form.projetos.classList.contains('show')) form.projetos.classList.remove('show');
if ( form.info.classList.contains('show')) form.info.classList.remove('show');
}


form.imgDom.addEventListener('click',()=>{
    openNewTab('https://xdaniel-dev.github.io/-audio-Book/') 
})
form.imgGerador.addEventListener('click',()=>{
    openNewTab('https://xdaniel-dev.github.io/Gerador-de-Senha/') 
})
form.imgHonda.addEventListener('click',()=>{
    openNewTab('https://xdaniel-dev.github.io/Honda-2024/') 
})
form.imgOne.addEventListener('click',()=>{
    openNewTab('https://xdaniel-dev.github.io/projeto-one-pieci/') 
})

function openNewTab(url) {
    window.open(url, '_blank');
}