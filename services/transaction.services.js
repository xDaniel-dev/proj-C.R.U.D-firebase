const transactionService = {
    findByUser: user => {
         return    firebase.firestore()
            .collection('transações')
            .where('user.uid','==',user.uid)
            .orderBy('date','desc')
            .get()
            .then(snapshot => {      
                return snapshot.docs.map(doc => ({
                    ...doc.data(),
                    uid: doc.id
                }))
            })
        },
    save: transaction =>{
        return firebase.firestore()
            .collection('transações')
            .add(transaction)
    },
    update: transaction => {
        return firebase.firestore()
            .collection('transações')
            .doc(getTransactionUid())
            .update(transaction)
    },
    remove : transaction => {
        return  firebase.firestore()
            .collection('transações')
            .doc(transaction.uid)
            .delete()
    }
}