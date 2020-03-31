/**
 * Created by buddy on 2020-03-31.
 */

const crypto = require('crypto')

/**
  @desc
  TODO
    包括 OpenSSL 的哈希、HMAC、加密、解密、签名、以及验证功能的一整套封装
* * */
/*
  _toBuf

getCiphers
getCurves
getDiffieHellman
getHashes
pbkdf2
pbkdf2Sync
generateKeyPair
generateKeyPairSync
privateDecrypt
privateEncrypt
prng
pseudoRandomBytes
publicDecrypt
publicEncrypt

randomBytes
randomFill
randomFillSync

rng
scrypt
scryptSync
setEngine
timingSafeEqual
getFips
setFips

Certificate
Cipher
Cipheriv
Decipher
Decipheriv
DiffieHellman
DiffieHellmanGroup
ECDH
Hash
Hmac
Sign
Verify
constants
createCredentials
Credentials

* * */

// TODO 输出它的一些方法名
for(let key in crypto){
  if(Object.prototype.hasOwnProperty.call(crypto,key)){
    console.log(key)
  }
}
