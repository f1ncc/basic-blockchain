const SHA256 = require('crypto-js/sha256');


class Block{
    constructor(index, timestamp, data, prevHash = '')
    {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
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
        console.log(`Block is mined-> Hash-> ${this.hash}`)
    }
}

class Blockchain{
    constructor()
    {
        this.chain = [this.createGenesisBlock()]
    }
    createGenesisBlock()
    {
        return new Block(0, d.getFullYear(), 'GenBlock', '0')
    }
    getLatestBlock()
    {
        return this.chain[this.chain.length - 1]
    }
    addBlock(newBlock)
    {
        newBlock.prevHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calcHash();
        this.chain.push(newBlock);
    }
}
var d = new Date();
var newCoin = new Blockchain();
newCoin.addBlock(new Block(1, d.getFullYear(), {amount: 11, name: 'Sathya'}))
newCoin.addBlock(new Block(2, d.getFullYear(), {amount: 111, name: 'Sathya Again'}))
console.log(JSON.stringify(newCoin, null, 4))