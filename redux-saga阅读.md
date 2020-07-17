# redux-saga

```
In redux-saga, Sagas are implemented using Generator functions.
```



### Api

```
call
apply
cps 比较适合返回结果是 (err,result)=>{} 的函数

put
takeEvery -> 每个实例都可以触发
takeLatest -> 如果后面触发，前面的会被取消

所有的函数调用都通过 call 或 apply 进行包裹，方便saga进行测试输出
```



### 对等案例

```js
import {select,takeEvery} from 'redux-saga/effects'

function *watchAndLog(){
  yield takeEvery('*',function *logger(action){
    const state = yield select()
    
    console.log('action',action)
    console.log('state after',state)
  })
}

// en ?

function *watchAndLog(){
  while(true){
    const action = yield take('*')
    const state = yield select()
    
    console.log('action',action)
    console.log('state after',state)
    
  }
}
```

### effects

```
The [ take ] is just like call and put we saw earlier.

It creates another command object that tells the middleware to wait for a specific
action.

call -> 当中间件触发直到一个promise resolve
take -> 当中间件知道匹配到一个action被触发
	也不知道这个 take 和 reducer 哪个先执行
fork -> 任务在后台运行，caller可以继续它的流程而不需要等待这个任务执行完成



call
apply

cancel
cancelled -> 返回是否已经取消了

cps 这是一个 NODE 风格的api
	callback (error,result)=>()

all
race
delay

debounce
throttle

effectTypes

actionChannel
eventChannel

getContext
setContext

select
	类似 store 的 getState
flush

fork
spwan

join

take
takeEvery
takeLatest
takeLeading
takeMaybe

put
putResolve

saga 保证的流程正确性，我真的是...
```

### fork 和 spwan 的区别

```
spwan

A parent doesn't wait for detached forks to terminate.
Uncaught errors from spawned tasks are not bubbled up to the parent.
And cancelling a parent doesn't automatically cancel detached forks(you need to cancel them explicitly).

fork
Attached forks remain attached to their parent by the following rules.
	A Saga terminates only after
	 - It terminates its own body of instructions
	 - All attached forks are themselves terminated

attached 附属的
detached 独立的
```

### actionChannel

```
Channels generalize those Effects to communicate with external event sources
or between Sagas themselves.

- 怎么使用 yield actionChannel
- 怎么使用 eventChannel
- 怎么创建一个 channel

The difference between the 2 forms is that actionChannel can buffer incoming
messages if the Saga is not yet ready to take them(e.g. blocked on an API call)

actionChannel( ACTION_NAME , maxNum )
```

### 其实 saga 里面就已经有 React.effect 这个雏形了

```js
import {eventChannel,END} from 'redux-saga'

function countdown(secs){
  return eventChannel(emitter=>{
    const iv = setInterval(()=>{
      secs -= -1
      if(secs>0){
        emitter(secs)
      }else{
        emitter(END)
      }
    },1000)
    return ()=>{
      clearInterval(iv)
    }
  })
}

emitter 其实就是一个触发返回器
take(END) 会使程序立马进入当前上下文的 finally 下执行
```

```
对于 saga 来说
所有的saga动作都是直接从 root 中触发的

export default function* root(){
	yield all([
		fork(watchNavigate),
		fork(watchLoadUserPage),
		fork(watchLoadRepoPage),
		fork(watchLoadMoreStarred),
		fork(watchLoadMoreStargazers)
	])
}
```



### Uniswap 操作

```
Uniswap 协议是一种通过智能合约实现代币间自动交易的协议。

目前Uniswap已经在以太坊上部署，实现 ETH和代币，以及代币和代币之间交易

Uniswap Exchange Factory 以及 Uniswap Exchange 都是以以太坊上的智能和玉
变成语言 vyper 实现

vyper的语法是有效的python3语法，但并不是所有的Python3语法都可以在Vyper中使用
关键字
	public
	address			以太坊地址，长度为20个字节的十六进制钱包地址
	timestamp		以太坊特有的一种数据类型
	wei_value		以太币金额，以wei为单位
	bool
	
修饰器
	@private
	@constant
		合约状态无法改变
	@payable
		可以接收以太币转账
	@nonrentant
		只能被调一次，防止重入攻击
		
	合约内置对象
		block
		msg
```



```
- 体现
- 转账的风险
- 手续费
```



```
https://httpbin.org -> ip

https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php?query=122.233.188.135&resource_id=6006&ie=utf8&oe=gbk&cb=op_aladdin_callback&format=json&jsonp

先拿的ip，后拿的运营商

- otc-api.huobi.me
- otc-api.huobi.mn
- otc-api.huobi.com

设备信息 navigator.userAgent
操作系统 根据 navigator.userAgent 分析系统环境以及版本
使用浏览器 根据 navigator.userAgent 分析
					宽度 window.innerWidth
					高度 window.innerHeight
手机型号？
语言 navigator.language

用户 IP
用户所在地 
网络运营商 -> 通过 xxx 提取

资源下载速度 通过下载一张图片来测速度

App ws 响应速度
	- 连接速度
	- 返回数据速度
	
Api 响应速度


user-agent: Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148
```



```


- canvas 后续可能需要复用一个来出来...这里需要优化 
多个canvas 一起使用会引起程序崩溃
```

