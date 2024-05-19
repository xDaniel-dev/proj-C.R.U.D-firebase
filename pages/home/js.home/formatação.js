function formatMoney(money){
    return `${money.currency} ${money.value},00`
}
function formatDate(date){
    return new Date(date + 'T00:00:00').toLocaleDateString('pt-br')
}