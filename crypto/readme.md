# crypto
第一次接触这个库是在 火币给出的ws-demo里面，百度到说该库可以运行在node与browser端，可最近我发现貌似 现版本的node
天然集成了 crypto,于是想要再次整理一番，并写一些 node 端的小demo

# 创建 api
```text
- createCipheriv
- createDecipheriv
- createDiffieHellman
- createDiffieHellmanGroup
- createECDH
- createHash
- createHmac
- createSign
- createVerify
```

# Certificate
```text
历史说明
    SPKAC 最初由 Netscape 实现的一种证书签名请求机制、现在正是称为 HTML5 的 keygen元素 的一部分
    不推荐使用 keygen [有点像ssl创建key的命令]，因为 HTML 5.2 和新项目不再使用此元素
    符合 openssl-spkac 标准
    
    - exportChallenge
    - exportPublicKey
    - verifySpkac
```

# Cipher(iv)
```javascript
const crypto = require('crypto');

const algorithm = 'aes-192-cbc';
const password = '用于生成密钥的密码';

// 不太知道这个方法意义
const key = crypto.scryptSync(password, '盐值', 24)

// 使用随机数 crypto.randomBytes()
const iv = Buffer.alloc(16, 0);

const cipher = crypto.createCipheriv(algorithm, key, iv);

// 输入的方式去加密
let encrypted = "";
cipher.on('readable', ()=>{
  let chunk;
  while (null !== (chunk = cipher.read())){
    encrypted += chunk.toString('hex');
  } 
});

cipher.on('end',()=>{
  console.log(encrypted)
});

cipher.write('要加密的数据').end();

// 文件的形式去加密
const input = fs.createReadStream('要加密的数据.txt');
const ouput = fs.createWriteStream('加密后的数据.enc');

input.pipe(cipher).pipe(output);

// api 的形式加密
let encrypted = cipher.update('要加密的数据','utf8','hex');
encrypted += cipher.final('hex');
// 一旦调用了 final 就意味该 cipher 就不能用作加密工具
``` 

# Decipher(iv)
将 Cipher 得出的数据反向丢入 Decipher 就解密成功了

# DiffieHellman
```text
一个用来创建 Diffie-Hellman 键交换的工具

是一种密钥交换算法，而不是加密方法，所以密钥必须和其他一种加密算法结合使用

算法描述
    1、有两个全局公开的参数，一个素数q 和 一个整数a，a是q的一个原根
    2、假设用户A和B希望交换一个密钥，用户A选择一个作为私有密钥的随机数 XA<q，并计算 YA = a^XA mod q。A 对
    XA的值保密存放而使YA能被B公开获得。类似地，用户B选择一个私有的随机数XB<q，并计算公开密钥 YB = a^XB mod q
    B对XB的值保密存放而使YB能被A公开获得
    3、用户A产生共享秘密密钥的计算方式是 K = (YB)^DA mod q。同样，用户B产生共享秘密密钥的计算是K=(YA)^XB mod q
    这两个计算产生相同的结果

```


# x

# x

# x
