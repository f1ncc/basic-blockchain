const SHA256 = require('crypto-js/sha256');

const EC = require('elliptic').ec
const ec = new EC('secp256k1')

import d from './main'

class Transaction{
    constructor(from, to, amount)
    {
        this.from = from
        this.to = to
        this.amount = amount
    }
    calcHash()
    {
        return SHA256(this.from + this.to + this.amount).toString()
    }
    signTransaction(signingKey)
    {
        if(signingKey.getPublic('hex') !== this.from)
        {
            throw new Error('fraud detected -- addresses not matched')
        }
        
        const hashTrans = this.calcHash
        const sign = signingKey.sign(hashTrans, 'base64')
        this.signature = sign.toDER('hex')
    }
    isValid()
    {
        if(this.from === null)
        {
            return true
        }
        if(!this.signature || this.signature.length === 0)
        {
            throw new Error('Not approved')
        }
        const pubkey = ec.keyFromPublic(this.from, 'hex')
        return pubkey.verify(this.calcHash(), this.signature)
    }
}



class Block{
    constructor(timestamp, transactions, prevHash = '')
    {
        //this.index = index;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.prevHash = prevHash;
        this.hash = this.calcHash();
        this.nonce = 0;
    }
    calcHash()
    {
        return SHA256(this.index + this.timestamp + this.prevHash + JSON.stringify(this.data) + this.nonce).toString();
    }
    mineBlock(difficulty)
    {
        while(this.hash.substring(0,difficulty) !== Array(difficulty+1).join("0"))
        {
            this.nonce++;
            this.hash = this.calcHash();
        }
        //console.log(`Block is mined-> Hash-> ${this.hash}`)
    }
    allValid()
    {
        for(let k = 0; k < this.transactions.length; k++)
        {
            if(!k.isValid())
            {
                return false
            }
        }
        return true
    }
}

class Blockchain{
    constructor()
    {
        this.chain = [this.createGenesisBlock()]
        this.difficulty = 10
        this.pendingTransactions = []
        this.miningReward = 50
    }
    createGenesisBlock()
    {
        return new Block(d.getFullYear(), 'GenBlock', '0')
    }
    getLatestBlock()
    {
        return this.chain[this.chain.length - 1]
    }
    minePendTransactions(miningRewardAddress)
    {
        let block = new Block(d.getFullYear(), this.pendingTransactions)
        block.mineBlock(this.difficulty)
        //console.log("block is mined")
        this.chain.push(block)

        this.pendingTransactions = [new Transaction(null, miningRewardAddress, this.miningReward)]


    }
    addTransaction(transaction)
    {
        if(!transaction.from || !transaction.to)
        {
            throw new Error('Include the required addresses to complete the transaction')
        }
        if(!transaction.isValid())
        {
            throw new Error('The transaction is invalid')
        }
        
        this.pendingTransactions.push(transaction)
    }
    getBalance(address)
    {
        let balance = 0
        for(let i = 0; i < this.chain.length; i++)
        {
            for(let j = 0; j < transactions; j++)
            {
                if(j.from === address)
                {
                    balance -= j.amount
                }
                if(j.to === address)
                {
                    balance += j.amount
                }
            }
        }
        return balance
    }
    addBlock(newBlock)
    {
        newBlock.prevHash = this.getLatestBlock().hash;
        //newBlock.hash = newBlock.calcHash();
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }
    isValid()
    {
        for(let i = 1; i < this.chain.length; i++)
        {
            const currentBlock = this.chain[i]
            const prevBlock = this.chain[i-1]
            if(!currentBlock.allValid())
            {
                return false
            }
            
            if(currentBlock.hash !== currentBlock.calcHash)
            {
                return false
            }
            if(currentBlock.prevHash !== prevBlock.hash)
            {
                return false
            }
        }
        return true
    }
}


module.exports.Blockchain = Blockchain
module.exports.transaction = Transaction


