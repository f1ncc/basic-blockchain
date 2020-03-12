const SHA256 = require('crypto-js/sha256');

class Transaction{
    constructor(from, to, amount)
    {
        this.from = from
        this.to = to
        this.amount = amount
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
    createTransaction(transaction)
    {
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
var d = new Date();
var newCoin = new Blockchain();
//console.log('Mining block 1')
//newCoin.addBlock(new Block(1, d.getFullYear(), {amount: 11, name: 'Sathya'}))
//console.log('Mining block 2')
//newCoin.addBlock(new Block(2, d.getFullYear(), {amount: 111, name: 'Sathya Again'}))
//console.log(JSON.stringify(newCoin, null, 4))

