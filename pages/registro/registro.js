const form = {
    email: () => document.getElementById('email'),
    password: () => document.getElementById('password'),
    passwordConf: () => document.getElementById('password-Conf'),
    emailRequired: () => document.getElementById('email-obrigatorio'),
    emailInvalid: () => document.getElementById('email-invalido'),
    emailInUser: () => document.getElementById("email-in-use"),
    passwordRequired: () => document.getElementById('password-required'),
    passwordInvalid: () => document.getElementById('password-invalid'),
    passwordConfInvalid: () => document.getElementById('password-Conf-invalido'),
    btn: () => document.getElementById('btn'),
    userValid: () => document.getElementById('user-valid'),
    btnLogin: () => document.getElementById('btn-Login'),
}

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

function onChangeEmail(){
    const email = form.email().value
    
  form.emailRequired().style.display = email ? 'none' : 'block'
  form.emailInvalid().style.display = validateEmail(email) ? 'none' : 'block'
   onChangeBtn()
}

function onChangePassword(){
    const password = form.password().value

    form.passwordRequired().style.display = password ? 'none' : 'block'
    form.passwordInvalid().style.display = password.length >= 6 ? 'none' : 'block'
 
    onChangePasswordConf()  
    onChangeBtn()
}

function onChangePasswordConf(){
   
    const passwordConf = form.passwordConf().value
    const password = form.password().value

    form.passwordConfInvalid().style.display = passwordConf == password ? 'none' : 'block'
    onChangeBtn()
}

function onChangeBtn(){
  form.btn().disabled = isBtnConfirm()
}

function isBtnConfirm(){
    const email = form.email().value
    if(!email || !validateEmail(email)){
        return true
    }
    const passwordConf = form.passwordConf().value
    if(!passwordConf){
        return true
    }
    const password = form.password().value
    if(!password){
        return true
    }
    if(form.emailInvalid().style.display == 'block'){
        return true
    } 
    if(form.emailRequired().style.display == 'block'){
        return true
    }
    if(form.passwordConfInvalid().style.display == 'block'){
        return true
    } 
    if(form.passwordInvalid().style.display =='block'){
        return true
    } 
    if(form.passwordRequired().style.display == 'block'){
        return true
    }
    
    return false
}

function register(){
    const email = form.email().value
    const password = form.password().value

    firebase.auth().createUserWithEmailAndPassword(email,password).then(()=>{
        form.userValid().style.display = 'block'
        setTimeout(() => document.location.href = '/pages/home/home.html', 2000)
    }).catch(error => {
        getErrorMessage(error.code)
    })
}

function getErrorMessage(error){
    if(error === 'auth/email-already-in-use'){
        return  form.emailInUser().style.display = 'block'
    }
    return alert(error)
}

form.btnLogin().addEventListener('click',()=>{
    window.location.href = '/index.html'
})