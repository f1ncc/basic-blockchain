import { Blockchain, Transaction } from './blockchain';

const EC = require('elliptic').ec
const ec = new EC('secp256k1')

const myPrivKey = ec.keyFromPrivate('49076404c1f63338df8d7d97a9114c1425866d7857b61e1c776f15b8469b3d4f')
const walletAddress = myPrivKey.getPublic('hex')

var d = new Date();
var newCoin = new Blockchain();
const firstTrans = new Transaction(walletAddress, 'put public key', 96)
firstTrans.signTransaction(myPrivKey)
newCoin.addTransaction(firstTrans)

console.log('\n Starting miner->')
newCoin.minePendTransactions(walletAddress)

console.log(`\n Balance is ${newCoin.getBalance(walletAddress)}`)

module.exports = d