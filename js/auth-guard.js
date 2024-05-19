function check(){
    firebase.auth().onAuthStateChanged(user => {
      if(!user){
          window.location.href = '/index.html'
      }
  })  
  }
  window.onload = function(){
      check()
  }