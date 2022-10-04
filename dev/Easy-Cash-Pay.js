const sha256 = require('sha256');


function EasyCashPay() {
    this.chain = [];
    this.pendingTransactions = [];

    this.createNewBlock(180182, '000020f4205b90fe149937bd8a2e27927b58715f7971efe0782abd5c5f8cde76', '00005d74968f60710cc7909ab857a5ba86ab62c36e9accedc00e4427923d4a19');
}

EasyCashPay.prototype.createNewBlock = function(nonce, prevblockhash, hash ){
    const newBlock = {
        index: this.chain.length + 1,
        timestamp: Date.now(),
        Transactions: this.pendingTransactions,
        nonce: nonce,
        prevblockhash: prevblockhash,
        hash: hash,
    };
    this.pendingTransactions= [];
    this.chain.push(newBlock);

    return newBlock;
};

EasyCashPay.prototype.getLastBlock = function(){
    return this.chain[this.chain.length - 1];
}
EasyCashPay.prototype.createNewTransition = function(amount, sender, recipient ){
    const NewTransition = {
        amount: amount,
        sender: sender,
        recipient: recipient
    };


    this.pendingTransactions.push(NewTransition);
    return this.getLastBlock()['index'] + 1 ;
}
EasyCashPay.prototype.hashBlock = function(prevblockhash, currentblockData, nonce){
    const dataAssString = prevblockhash + nonce.toString() + JSON.stringify(currentblockData);
    const hash = sha256(dataAssString);
    return hash;
}

EasyCashPay.prototype.proofOfWork = function(prevblockhash, currentblockData) {
    let nonce = 0;
    let hash = this.hashBlock(prevblockhash, currentblockData, nonce)

    while (hash.substring(0,4) !== '0000') {
        nonce++;
        hash = this.hashBlock(prevblockhash, currentblockData, nonce);
        
    
    }

    return nonce;
}


module.exports = EasyCashPay;