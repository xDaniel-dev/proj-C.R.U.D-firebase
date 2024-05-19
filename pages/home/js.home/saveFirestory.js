const save = {
    expense : document.getElementById('expense'),
    income : document.getElementById('income'),
    date : document.getElementById('date'),
    currency : document.getElementById('moeda'),
    value : document.getElementById('valor'),
    transactionType : document.getElementById('transaction'),
    description : document.getElementById('description'),
    btnCancel : document.getElementById('form-Cancel'),
}

if(isNewTransaction){
    const uid = getTransactionUid()
    findTransactionsById(uid)
}

function getTransactionUid(){
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get('uid')
}

function isNewTransaction(){
    return getTransactionUid() ? true : false
}

function findTransactionsById(uid){
    firebase.firestore()
    .collection('transações')
    .doc(uid)
    .get()      
    .then(doc => {
        if(doc.exists){
            fillTransactionScreen(doc.data());
        }else{
            alert('documento não encontrado')
            window.location.href = '/pages/home/home.html'
        }
    }).catch(()=>{
        alert('error ao recuperar documento')
        window.location.href = '/pages/home/home.html'
    })
}

function fillTransactionScreen(transaction){
    if(transaction.type === 'expense'){
        save.expense.checked = true
    }else{
        save.income.checked = true
    }

    save.date.value = transaction.date
    save.currency.value = transaction.money.currency
    save.value.value = transaction.money.value
    save.transactionType.value = transaction.transactionType
   if(transaction.description){
    save.description.value = transaction.description
   } 
   anchangeBtn()
}

function saveTransaction(){  
    const transaction = createTransaction()

    if(!isNewTransaction()){
        salvar(transaction)
    }else{
        update(transaction)
    }
}

function salvar(transaction){
    transactionService.save(transaction)
        .then(()=>{
            window.location.href = "/pages/home/home.html"
        }).catch(()=>{
            alert('error ao salvar transação')
        })
}

function update(transaction){
    transactionService.update(transaction)
    .then(()=>{
        window.location.href = "/pages/home/home.html"
    }).catch(()=>{
        alert('error ao atualizar transação')
    })
}

function createTransaction(){
    return {
        type : save.expense.checked ? 'expense' : 'income',
        date: save.date.value,
        money: {
            currency: save.currency.value,
            value: parseFloat(save.value.value)
        },
        transactionType: save.transactionType.value,
        description: save.description.value,
        user:{
            uid: firebase.auth().currentUser.uid
        }
    }
}
save.btnCancel.addEventListener('click',()=>{
    window.location.href = "/pages/home/home.html"
})