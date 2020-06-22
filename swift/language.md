# A Swift Tour

### Simple Values

```
var 变量
let 常量

类型声明
let explicitDouble: Double = 70

值的类型转换
let widthLabel = label + String(width);

字符串拼接
let apples = 3;
"I have \(apples) apples." => I have 3 apples.

多行文本
"""
I said "I have xxx."
And then I said "xxx"
"""

数组元素添加
var shoppingList = ["catfish","water"]
shoppingList.append("blue paint")

特殊语法
var optionalString:String? = "Hello";
if let name = optionalName{
		greeting = "Hello, \(name)"
}

repeat{
	express;
} white condition

可以指定一个初始范围
for i in 0..<4{
	total += i
}

func greet(person:String, day: String) -> String{
	return "Hello \(person), today is \(day)."
}
greet(person:"Bob",day:"Tuesday")
```



```
所谓的返回多值其实就是返回一个对象
```



```
let模式下的数组，无法通过append添加元素
[] => 空数组
[:] => 空字节表

字典表即对象表示的方式，是用中括号进行表示的

let x = [
	a:..
	b:..
	c:..
]

for (kind,index) in x{
	// 类似 js Object.entries(x).forEach() 的操作
}

```

```
if and let together to work with values that might be missing.
其实就是简单的在判断处赋值给变量，再做判断
```

```
swift相对于js中|| 的操作符 ??
前者不存在便使用后者

js 中后续提供了 Nullish Coalescing 特性，来排查历史遗留的0问题
```

```
有点不同的是
	do{}while
=>
	repeat{}while 的转换
```

```
函数表达

func greet(person:String,day:String)->{
	print "Hello \(person), today is \(day)."
}
调用函数的方式必须制定变量名
greet(preson:"Kim", day:"28")
```

```swift
// 可以返回多个值

func calculateStatistics(scores:[Int])->(min:Int,max:Int,sum:Int){
  // 操作
  return (min,max,sum)
}

// 数组排序
Array.sorted { $0>$1 }
```

```swift
// Class 操作

// class 非常像 Object-C 的抽象形式

// 基类
class NamedShape{
  var numberOfSides: Int = 0
  var name: String
  
  // 构造函数
  init(name:String){
    // self -> this 
    self.name = name
  }
  
  func simpleDescription()->String{
    return "A shape with \(numberOfSides) sides."
  }
}

// If you don't need to compute the property but still need to provide code that
// is run before and after setting a new value, use willSet and didSet.

```

```swift
// 枚举类型

enum Rank:Int{
	case ace = 1
	case two, three, four, five, six, seven, eight, nine, ten
	case jack, queen, king
	
	func simpleDescription()->String{
		switch self{
			case .ace:
				return "ace"
			case .jack:
				return "jack"
			case .queen:
				return "queen"
			case .king:
				return "king"
			default:
				return String(self.rawValue)
		}
	}
}

// enum 实例化的方式
Rank(rawValue:3) 

enum ServerResponse{
  case result(String, String)
  case failure(String)
}

// Swift assigns the raw values starting at zero and incrementing 
// by one each time, but you can change this behavior by explicitly
// specifying values.

```

```swift
// 结构

struct Card{
  var rank: Rank
  var suit: Suit
  
  func simpleDescription()->String{
    return "The \(rank.simpleDescription()) of \(suit.simpleDescription())"
  }
}

// 实例化 -> 与枚举类的联动
Card(rank: .three, suit: .spades)
```

### Protocols and Extensions

```swift
protocol ExampleProtocol{
  var simpleDescription: String{ get }
  mutating func adjust()
}

class SimpleClass: ExampleProtocol{
  var simpleDescription: String = "A very simple class."
  var anotherProperty: Int = 69105
  func adjust(){
    simpleDescription += " Now 100% adjusted."
  }
}

struct SimpleStructure: ExampleProtocol{
  var simpleDscription: String = "A simple structure"
  mutating func adjust(){
    simpleDescription += " (adjusted)"
  }
}


extension Int: ExampleProtocol{
  var simpleDescription: String{
    return "The number \(self)"
  }
  mutating func adjust(){
    self += 42
  }
}

let protocolValue: ExampleProtocol = a

```

### Error Handing

```swift
enum PrinterError: Error{
  case outOfPaper
  case noToner
  case onFire
}

func send(job:Int, toPrinter printerName:String) throws -> String{
  if printerName == "Never Has Toner"{
    throw PrinterError.noToner
  }
  return "Job sent"
}

do{
  let printerResponse = try send(job: 1040, toPrinter: "Bi Sheng")
  print(printerResponse)
}catch{
  print(error)
}

do{
  let printerResponse = try send(job: 1440, toPrinter: "Gutenberg")
  print(printerResponse)
} catch PrinterError.onFire{
  print("I'll just put this over here, with the rest of the fire.")
} catch let printerError as PrinterError{
  print("Printer error: \(printerError).")
}catch{
  print(error)
}

Another way to handle errors is to use try? to convert the result to an optional.
let printerSuccess = try? send(job: 1884, toPrinter:"Mergenthaler")


Use defer to write a block of code that is executed after all other code in the
function, just before the function returns.

var fridgeIsOpen = false
let fridgeContent = ["milk","eggs","leftovers"]

func fridgeContains(_ food:String)->Bool{
  fridgeIsOpen = true
  defer{
    fridgeIsOpen = false
  }
  let result = fridgeContent.contains(food)
  
  return result;
}
```

### Generics

```swift
func makeArray<Item>(repeating item:Item, numberOfTimes: Int)->[Item]{
  var result = [Item]()
  
  for _ in 0..<numberOfTimes{
    result.append(item)
  }
  
  return result
}

enum OptionalValue<Wrapped>{
  case none
  case some(Wrapped)
}
var possibleInteger: OptionalValue(Int) = .none
possibleInteger = .some(100)

func anyCommonElements<T: Sequence, U: Sequence>
	(_ lhs:T,_ rhs:U)-> Bool where T.Element:Equatable,T.Element === U.Elements
{
  for lhsItem in lhs{
    for rhsItem in rhs{
      if lhsItem == rhsItem{
        return true
      }
    }
  }
  return false
}
```



```
Int
Double
Bool
String
Array
Set
Dictionary
```

