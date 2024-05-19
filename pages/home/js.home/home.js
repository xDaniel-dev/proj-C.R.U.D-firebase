function logout(){
    firebase.auth().signOut().then(()=>{
        window.location.href = '/index.html'
    }).catch(()=>{
        alert('error ao sair !')
    })
}

// função para saber o id do usuario logado e aparecer somente suas informações
firebase.auth().onAuthStateChanged(user=>{
    if(user) findTransactions(user)
})

// função que retorna os dados que estão salvos no bando de dados
function findTransactions(user){
  transactionService.findByUser(user)
   .then(transactions => {      
         addTransactionsToscreen(transactions)
   })
   .catch(error => {
    alert('Erro ao buscar transações')
    console.error( error);
});    
}

function addTransactionsToscreen(transactions){
    transactions.forEach(transaction => {
        const li = createTransactionListItem(transaction)
        li.appendChild(createDeleteBotton(transaction))
        
        li.appendChild(createParagraph(formatDate(transaction.date)))
        li.appendChild(createParagraph(formatMoney(transaction.money)))
        li.appendChild(createParagraph(transaction.transactionType))
        if(transaction.description){
            li.appendChild(createParagraph( transaction.description))
        }
    });
}

function createTransactionListItem(transaction){
    const listaOrdenada = document.getElementById('ol')
    const li = document.createElement('li')
        listaOrdenada.appendChild(li)       
        li.classList.add(transaction.type)
        li.id = transaction.uid
        li.addEventListener('click',()=>{
           window.location.href = "./atualização.html?uid=" + transaction.uid            
        })
        return li
}

function createDeleteBotton(transaction){
    const deleteButton = document.createElement('button')
        deleteButton.innerHTML = 'Remover'
        deleteButton.classList.add('danger')
        deleteButton.addEventListener('click',event => {
            event.stopPropagation()
            askRemoveTransaction(transaction)
        })
        return deleteButton
}

function createParagraph(value){
    const element = document.createElement('p')
        element.innerHTML = value
        return element
}
function askRemoveTransaction(transaction){
    const shoulRemove = confirm('Deseja remover a transação ?')
    if(shoulRemove){
            removeTransaction(transaction)
    }
}

function removeTransaction(transaction){

   transactionService.remove(transaction)
    .then(()=>{
        document.getElementById(transaction.uid).remove()
    })
    .catch(error => {
        console.log(error);
        alert('error ao remover transação')
    })
}