const forms = {
    transaction: document.getElementById('addTransaction'),
    btnAddTransaction: document.getElementById('add-Spent-Table'),
    btnCancel: document.getElementById("form-Cancel"),
    btnCancelar: document.getElementById("form-Cancelar"),
}

forms.btnAddTransaction.addEventListener('click',()=>{
    forms.transaction.style.display = 'flex'
    removeAbas()
})

forms.btnCancel.addEventListener('click',()=>{
    window.location.href = "/pages/home/home.html"
})
