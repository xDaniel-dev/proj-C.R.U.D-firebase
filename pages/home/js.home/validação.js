const valid ={
    date: document.getElementById('date'),
    moeda: document.getElementById('moeda'),
    valor: document.getElementById('valor'),
    transaction: document.getElementById('transaction'),
    dataError: document.getElementById('error-data'),
    moedaError: document.getElementById('error-tipo-moeda'),
    valorError: document.getElementById('error-valor'),
    transactionError: document.getElementById('error-tipo-transaction'),
    btnSave: document.getElementById('form-Save')
}

function onchangeData(){
    const data = valid.date.value
    valid.dataError.style.display = data ? 'none' : 'block'
    anchangeBtn()
}
function onchangeMoeda(){
    const moeda = valid.moeda.value
    valid.moedaError.style.display = moeda == '' ? 'block' : 'none'
    anchangeBtn()
}
function onchangeValor(){ 
    const valor = valid.valor.value
    valid.valorError.style.display = !valor || valor < 0 ? 'block' : 'none'
    anchangeBtn()
}
function onchangeTransaction(){
    const transaction = valid.transaction.value
    valid.transactionError.style.display = transaction == '' ? 'block' : 'none'
    anchangeBtn()
}

function anchangeBtn(){
    valid.btnSave.disabled = isBtnValide()
}

function isBtnValide(){
    const data = valid.date.value
    if(!data){
        return true
    }
    const moeda = valid.moeda.value
    if(moeda == ''){
        return true
    }
    const valor = valid.valor.value
    if(!valor || valor < 0){
        return true
    }
    const transaction = valid.transaction.value
    if(transaction == ''){
        return true
    }
    
    return false
}