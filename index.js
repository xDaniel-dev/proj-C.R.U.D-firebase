const forn = {
    email: () => document.getElementById('email'),
    password: () => document.getElementById('password'),
    login: () => document.getElementById('login'),
    recPassword: () => document.getElementById('recPassword'),
    emailRequired: () => document.getElementById('email-obrigatorio'),
    emailInvalid: () => document.getElementById('email-invalido'),
    passwordInvalid: () => document.getElementById('password-invalido'),
    userInvalid: () => document.getElementById("user-invalido")

}
// mantem o usuario logado 
function check(){
  firebase.auth().onAuthStateChanged(user => {
    if(user){
        window.location.href = '/pages/home/home.html'
    }
})  
}
window.onload = function(){
    check()
}
const onChangeEmail = () =>{
   toggleBottonsDisable()
   toggleEmailErrors()
}
const onChangePassword = () =>{
   toggleBottonsDisable()
   togglePasswordErros()
}
function login(){
    
    firebase.auth().signInWithEmailAndPassword(forn.email().value,forn.password().value).then(Response =>{
      window.location.href = '/pages/home/home.html'
    }).catch(error => {
        getErrorMessage(error.code)
    })   
}
function getErrorMessage(error){
   const userInvalid = forn.userInvalid()
    if(error === "auth/invalid-credential"){
        userInvalid.style.display = 'block'
    }
    
    userInvalid.style.display = 'block'
}
function register(){
    window.location.href = 'pages/registro/registro.html'
}
const recoverPassword = () => {
    firebase.auth().sendPasswordResetEmail(forn.email().value).then(()=>{
        alert('email enviado com sucesso !')
    }).catch(error =>{
        alert(getErrorMessage(error))
    })
}
function isEmailvalidate(){
    const email = forn.email().value
    if(!email){
        return false
    }
    return validateEmail(email)
}
function toggleEmailErrors(){
    const email = forn.email().value
    forn.emailRequired().style.display = email ? 'none' : 'block'
    // if(!email){
    //     forn.emailRequired().style.display ='block'
    // }else{
    //     forn.emailRequired().style.display ='none'
    // }
    forn.emailInvalid().style.display = validateEmail(email) ? 'none' : 'block'
    // if(validateEmail(email)){
    //     forn.emailInvalid().style.display ='none'
    // }else{
    //     forn.emailInvalid().style.display ='block'
    // }
}
function togglePasswordErros(){
    const password = forn.password().value
    forn.passwordInvalid().style.display = password ? 'none' : 'block' 
    // if(!password){
    //     forn.passwordInvalid().style.display = 'block'
    // }else{
    //     forn.passwordInvalid().style.display = 'none'
    // }
}
function toggleBottonsDisable(){
     const emailValidate = isEmailvalidate()
    forn.recPassword().disabled = !emailValidate

    const passwordValidate = isPasswordValidate()
    forn.login().disabled = !emailValidate || !passwordValidate
}
const isPasswordValidate = () => {
    const passworld = forn.password().value
    if(!passworld){
      return false  
    } 
    return true
}

