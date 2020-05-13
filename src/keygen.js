const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

const key = ec.genKeyPair();
const pubkey = key.getPublic("hex");
const privkey = key.getPrivate("hex");

console.log(pubkey);
console.log();
console.log(privkey);
