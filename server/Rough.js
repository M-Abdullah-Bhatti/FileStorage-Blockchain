const NodeRSA = require("node-rsa");
const key = new NodeRSA({ b: 2048 });

const publicKey = key.exportKey("pkcs1-public");
const privateKey = key.exportKey("pkcs1-private");

console.log("Public key:\n", publicKey);
console.log("Private key:\n", privateKey);

const encryptor = new NodeRSA();

encryptor.importKey(publicKey, "pkcs1-public");

// Encrypt the message
const encryptedHash = encryptor.encrypt("hello", "base64");

// Decrypt the message
const decryptor = new NodeRSA();
decryptor.importKey(privateKey, "pkcs1-private");
const decryptedHash = decryptor.decrypt(encryptedHash, "utf8");

console.log(encryptedHash);
console.log(decryptedHash);

console.log("afdd");
