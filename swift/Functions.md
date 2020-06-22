# Functions

### exmaple

```swift
func greet(person:String)->String{
  let greeting = "Hello, "+person+"!"
  return greeting
}

func sayHelloWorld()->String{
  return "hello, world"
}

func greet(person:String,alreadyGreeted:Bool)->String{
  if alreadyGreeted{
    return greetAgain(person: person)
  } else {
    return greet(person: person)
  }
}

func name()->void{}

Return values can be ignored, but a function that says it will return a value must
always do so.
A function with a defined return type cannot allow control to fall out of the
bottom of the function without returing a value, and attempting to do so will
result in a compile-time error.
返回值是必须的，否则报错

返回多个值，即元组
func minMax(array:[Int])->(min:Int,max:Ing){}
可选元组返回类型
func minMax(array:[Int])->(min:Int, max:Int)?{}

-Functions With an Implicit Return
  func greeting(for person:String)->String{
    "Hello, "+person+"!"
  }
	func(for:) 在单行表达式的时候不需要写return会直接返回结果
	()=>{}

- Function Argument Labels and Parameter Names
	* Specifying Argument Labels
    func someFunction(argumentLabel parameterName:Int){}
    func greet(person:String, from hometown:String)->String{}
	* Omitting Argument Labels
		func someFunction(_ firstParameterName:Int, secondParameterName:Int){}
	* Default Parameter Values
		func someFunction(
      parameterWithoutDefault:Int,
      parameterWithoutDefault:Int=12)
		{}
- Variadic Parameters
	A variadic parameter accepts zero or more values of a specified type.
	func arithemticMean(_ numbers:Double...)->Double{}
- In-Out Parameters
	Function parameters are constants by default.
	如果你需要改变函数的参数值，你就需要再声明的时候 添加 inout
	func swapTwoInts(_ a: inout Int, _ b: inout Int){
    let temporaryA = a
    a = b
    b= temporaryA
  }
	在这个函数不能传递一个常量或者字面量作为参数，因为常量和字面量是无法被修改的
	但是你可以添加&取地址进行一波操作


- Function Types
	var mathFunction: (Int,Int) -> Int = addTwoInts
	不指名类型的时候，函数赋值给变量，会自动使变量拥有 函数类型
- Function Types as Parameter Types
	func printMathResult(_ mathFunction:(Int,Int)->Int,_ a:Int,_b:Int){
    print("Result: \(mathFunction(a,b))")
  }
- Function Types as Return Types
	func stepForward(_ input: Int)->Int{
    return input + 1
  }
	func stepBackward(_ input: Int)->Int{
    return input -1
  }
	func chooseStepFunction(backward:Bool)->(Int)->Int{
    return back ? stepBackward : stepForward
  }
- Nested Functions
	func chooseStepFunction(backward:Bool)->(Int)->Int{
    func stepForward(input:Int)->Int{return input+1}
    func stepBackward(input:Int)->Int{return input-1}
    return backward ? stepBackward:stepForward
  }
```



```
在变量名前 添加 _，表示调用的时候不需要指定变量名
```

## Closures

```swift
Closures in Swift are simliar to blocks in C and Objective-C and to lambdas in
other programming languages.
闭包操作
// 有点像js的 ()=>{} 这个操作

{
	(parameters) -> return type in
		statements
}

- Inferring Type From Context
	可以省略类型，让它根据上下文推导
- Implicit Returns from Single-Expression Closures
	单行表达式可以省略 return
	s1,s1 in s1> s2
- Shorthand Argument Names
	$0 > $1 直接是这个操作
- Operator Methods
	> 这个一步一步的省略太夸张了

-Trailing Closures
	closures 作为函数的最后一个参数，可以做如下省略
	func someFunctionThatTakesAClosure(closure:()->void){}
	someFunctionThatTakesAClosure(closure:{})
	somefunctionThatTakesAClosure(){
    $num 表示第几个入参
  }

// 等效
Array.sorted(by:{(s1:String,s2:Stirng)->Bool in return s1>s2})
Array.sorted($0>$1)
Array.sorted{$0>$1}
```



```
值类型 Structure 在传递实例时都是复制了一个副本给新的变量
	引用类型Class在传递实例时不会复制一个副本，而是直接引用现有的实例
	
- 结构体的主要目的是用来封装少量相关简单数据值
- 有理由预计一个结构体实例在赋值或传递时，封装的数据将会被拷贝而不是被引用
- 任何在结构体中储存的值类型，也将会被拷贝，而不是被引用
- 结构体不需要去集成另一个已存在类型的属性或者行为
```



```
3200 * 2400
```



```
缩放手势的识别和判断流程

- 如果触摸点只有一个，则先记录此刻的 x,y 为 prevX，prevY，下一次的x，y分别减去 prevX、prevY
	得到的差 dx、dy 为目标在x轴和y轴上需要移动的量
- 如果超过1个点，则对点通过序号进行过奇偶划分，分别求出奇平均点坐标和偶平均点坐标(就是归并为只有两个点)，记录两点之间的距离，然后若下一次的两点距离和上一次的两点距离差值不打，则合并两点，并按照1的方式产生dx dy移动目标对象；否则两次之间的两点距离相差超过阈值，这现在的两点距离除以之前的两点距离得到比例，该比例就是对象本次的宽度和高度的缩放量
- 上述两部的触摸点分别要先加入到一个队列中，当队列满了再把整个队列的所有的坐标拿出来求平均值
	然后出队一个坐标序列，从而使得坐标的变换变得更平滑

那缩放的中心呢？

```



```
deep
user
lazy
sync
```



### ERC的定义

```
ERC 全称 Ehtereum  Request for Comment， Ethereum版的意见征求稿 RFC
RFC 是由互联网工程任务组制定的一个概念
本身 RFC 备忘录包含 技术 和 组织 注意事项
对于ERC 意见征求稿中包括一些关于以太坊网络建设的技术指导
```

### EIP 定义

```
EIP 全称 Ethereum Improvement Protocol 以太坊改进方案
EIP 的4种状态
草稿 Draft 			处于打开状态，便于考察讨论
接受 Accepted   即将被接受，例如将包含在下一个硬分叉中
定稿 Final			在上一个硬分叉中被接受，已定稿
延期 Deferred   不会马上被接受，但也许在将来的硬分叉版本会考虑
```

### ERC 系列 

```
- ERC20 Token标准
- ERC55 混合校验地址编码
- ERC137 以太坊域名服务规范
- ERC162 初始域名哈希注册
- ERC165 标准接口检测
- ERC181
		ENS 对以太坊地址的逆向解决方案支持
- ERC190 以太坊智能合约打包标准
- ERC721 非同质代币标准

ERC-20 是整个加密社区中最为人熟知的标准，在Ethereum平台之上发布的大多数通证(token)都使用它

定义了以下接口
	
	- totalSupply() -> 代币供给总量
	- balanceOf(address_owner) -> _owner的账户余额
	- transfer(address_to,unit256_value) 
			将数量为_value的代币转入地址_to并触发
	- transferFrom(address_from, address_to, unit256_value)
			将地址_from中的_value数量的代币转入地址_to，并触发 transfer 事件
	- approve(address_spender, unit256_value)
			允许_spender提取限额_value的代币
	- allowance(address_owner, address_spender)
			返回 _spender 可从_owner提款的代币数量上限
			
ERC-20 于 2015 年提出并与 2017 年9月正式实施，然而开发者社区已经注意到它存在一些缺陷和漏洞
因此陆续提出了其他的ERC标准
```



```
换行处理的逻辑在于
	- 粘贴输入
			= 需要保留原输入的换行符
			= 对原文本重新按字符串长度进行切分，有换行意味着输入者的强调，这里不应该进行合并
	- 手动输入
			= 输入文字自动添加换行，但是一旦添加上去了又很麻烦，你又没办法按原效果展示
			= 我们不可能每次都进行一波计算吧
```





```
canvas 字体 Adobe Ming Std
- Arial

貌似这个 font-maily 可以不进行操作

根据屏幕的 长 和 宽 进行海报生成，最后比例要根据 dpr 进行一波放大
```



```
const divide = (tx: string, font: object, width: number) => {
  let low = Math.min(1, tx.length);
  let high = tx.length;
  let i;

  while (high >= low) {
    i = low + Math.floor((high - low) / 2);
    const x = getTextWidth(tx.substring(0, i), font);
    if (x > width) {
      high = i - 1;
    } else if (x < width) {
      low = i;
    } else {
      low = i;
      break;
    }
  }

  if (getTextWidth(tx.substring(0, low), font) < width) {
    return [tx.substring(0, low), tx.substring(low)];
  }
  return null;
};
```



### video 内联播放的配置

```
- ios
    webkit-playsinline
    playsinline
- android
		x5-video-player-type = "h5"
		x5-video-player-fullscreen = "true"
		x5-video-player-fullscreen = "portraint"
		
x5videoonenterfullscreen	进入全屏通知
x5videoexitfullscreen			退出全屏通知
```







```
Literal

swift 已经把 new 去掉了，就这一点来说和 flutter 升级dart2.0 类似

Base Types
  Int -> integers
  
  singed 	  positive zero negative
  unsigned  positive zero

  UInt8
    UInt8.min -> 0
    UInt8.max -> 255
  UInt16
  Int32
  Int64
  整型它是有区分的，Int/UInt 之间的差别
  
  Double/Float -> floating-point values
  
  Double	64-bit floating-point number
  Float		32-bit floating-point number
  
  Bool -> Boolean
  String -> textual data
Collection Types
	Array
	Set
	Dictionary
In addition to familiar types	
	tuples 元组
Optional type
	Using optionals is similar to using nil with pointers in Objective-C,
	but they work for any type，not just classes
	
func
class
struct
protocol

在不指定类型的时候，小数默认是 Double 类

Numeric Literals
- decimal number with no prefix
- binary number，with a 0b prefix 				二进制
- octal number，with a 0o prefix	 				八进制
- hexadecimal number，with a 0x prefix   十六进制
let oneMillion = 1_000_000

let twoThousand: UInt16 = 2_000
let one: UInt8 = 1
let twoThousandAndOne = twoThousand + UInt16(one)
类型一致才能进行运算操作，而整型间的转化可以通过这种方式初始化

typealias 外部引用，有点类似 #defined，不同的是它这里只有类型的定义，没有 block 定义
	
Swift's type safety prevents non-Boolean values from being substituted for Bool.
The following example reports a compile-time error

let http404Error = (404, "Not Found")
在没有命名的时候，可以通过 http404Error.0/http404Error.1 表示
let http200Status = (statusCode:200, description:"OK")
命了名之后，http200Status.statusCode/http200Status.description
命了名的仅比未命名多了一向可直接通过变量名获取，其余功能与未命名一致

Optional 可选就表示可以被赋值为 nil，其余是不可以的

swift里面控制流不添加括号的
	
	
In addition to 除了...
compound value 复合值
absence of value 缺失值
separator 分离器
terminator 终结者
```



### swfit 的错误捕获

```
func canThrowAnError() trows{}

do{
	try canThrowAnError()
}catch{}

这里的catch 可以借不同的值，类似于 if的形式去处理不同错误的情况


```





```
缺失
	- 云祝福的icon
	- 宣传片的资料
	- 爱心捐赠的地址
	
- 放大
- 下载图片
- 换地点区上传成图
```



```
react 的状态管理
```

