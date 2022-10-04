const express = require('express');
const app = express();
const {v4 : uuidv4} = require('uuid');
const bodyParser = require('body-parser');
const EasyCashPay = require('./Easy-Cash-Pay') ;
const bitcion  = new EasyCashPay();

const nodeAddress = uuidv4().split('-').join('');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false})); 

//This will give us a complete blockchain
app.get('/EasyCashApp', function (req, res) {
  res.send(bitcion);
});

//This is for creating new Transaction
app.post('/Transaction', function (req, res) {
  bitcion.createNewTransaction(req.body.amount, req.body.sender, req.body.resipent);
  res.json({note: 'This transictionS will be added in block '})
});

app.get('/mine', function (req, res) {
    const lastBlock = bitcion.getLastBlock();
    const previousBlockHash = lastBlock['hash'];

    const currentBlockData = {
        transiction: bitcion.pendingTransactions,
        index: lastBlock['index'] + 1
    };

    const nonce = bitcion.proofOfWork(previousBlockHash, currentBlockData);

    const blockHash = bitcion.hashBlock(previousBlockHash, currentBlockData, nonce);

    bitcion.createNewTransition(5, nodeAddress, "0000000");

    
    const newBlock = bitcion.createNewBlock(nonce, previousBlockHash, blockHash);
  res.json({
      note: "new Block mined successfully",
      Block: newBlock
  });
});

//A Simple web Wallet
app.get('/wallet', function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

//This is for creating new Transaction
app.post('/wallet', function (req, res) {
  const blockIndex = bitcion.createNewTransition(req.body.amount, req.body.senderAddress, req.body.RecipientAddress);
  res.json({note:"This transictionS will be added in block " })
});




app.listen(3000, function(){
    console.log("Server is runing on port number 30000");
});