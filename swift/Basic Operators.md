# Basic Operators

### 元组的比较规则

```
You can compare two tuples if they have the type and the same number of values.
Tuples are compared from left to right, one value at a time, util the comparison
finds two values that aren't equal.
```

```
swift 遵循了 同类型才能相操作的规则
```



### Range Operators

```swift
// Closed Range Operator
for index in 1...5{
	print("\(index) times 5 is \(index * 5)")
}

// Half-Open Range Operator
for i in 0..<len{
	// 操作
}

// One-Sided Ranges
for name in names[2...]{

}
for name in names[...2]{

}
for name in names[..<2]{

}
// PartialRangeThrough<Int>(upperBound: 5)
let range = ...5
```



### Nil-Coalescing Operator

```
a != nil ? a!:b;
var a = ""
..<
```



### Range Operators

```
a...b
..<b
a<..
```

### Logical Operators

```
!a
a && b
a || b
```





## String

```
- Multiline String Literals
- Special Characters in String Literals
- Extended String Delimiters
- 


String / Character

You can access the individual Character values for a String by iterating over the
string with a for-in loop:

for character in "Dog!狗"{
	print(character)
}

Iterator 是一个很神奇的东西

这里有一个坑
swift 对于初始化的 字符串，添加 COMBINING ACUTE ACCENT 字符串到末尾
并不会增加 原字符串所表示的长度 [有点 加量不加价 的感觉]
```



### Accessing and Modifying a String

```
- Each String value has an associated index type
		String.Index
		
不同的字符可能需要不同数量的内存来存储，因此为了确定那个字符位于特定位置，必须从该字符串的开头或结尾遍历每个Unicode标量，所以Swift字符串不能被整数值索引

查询
index(:before)
index(:after)
index(_start,:offsetBy)
取最后一个字符的表达式 greeting.index(before: greeting.endIndex)
greeting.endIndex 已经越界了
其实它这里明明可以封装函数的，不知道它在这里在较什么劲...

插入
greeting.insert("",at:greeting.endIndex)
greeting.insert("",at:greeting.index(before: greeting.endIndex))

删除
greeting.remove(at:greeting.index(:before)) 删除某个坐标以后
[)
let range = greeting.index(greeting.endIndex,offsetBy:-6)..<greeting.endIndex
greeting.removeSubrange(range)

子串
greeting.firstIndex(of:",")??greeting.endIndexs
先拿到一个指标
greeting[..<index]
虽然子串的变量会单独存在内存中，但是子串不释放会导致原字符串一样不会被释放
```

### Prefix and Suffix Equality

```

```



### Swift 的 switch 特点

```
let anotherCharacter: Character = "a"
switch anotherCharacter{
	case "a":
	case "A":
		print("The letter A")
	default:
		print("Not the letter A")
}
// Error

Swift 的 switch 特点就是不用每个case都添加break；且同类操作的case是以 ，隔开
这是它与传统switch的区别

let anotherCharacter: Character = "a"
switch anotherCharacter{
	case "a","A":
		print("The letter A")
	default:
		print("Not the letter A")
}
整数还能通过 range 类型进行筛选
case 1...5:
	...
与元组类型的配合
  case (0,0)
  case (-2...2,-2...2)

  值绑定
  let anotherPoint = (2,0)
  switch anotherPoint {
    case (let x,0):
      print;
    case (0,let y):
      print;
    case let(x,y) where x==y:
      print;
  }

Compound Cases 合并case通过 逗号。
```

### Control Transfer Statements

```
continue
break
fallthrough
	这个关键字用在 switch中，表示当前case执行完会继续执行下一个case流程直到非fallthrough结束
return
throw
```

### Labeled Statements

```
C 类比较傻逼的语法
给一个 loop 进行命名，然后就可以通过 break loopName 退出循环
```

### Early Exit

```
A guard statement
关键字 guard
like an if statement
executes statements depending on the Boolean value of an expression.

func greet(person:[String:String]){
	guard let name = person["name"] else{
		return
	}
	guard let location = person["location"] else{
		return
	}
	print("I hope the weather is nice in \(location)")
}

guard advanced
It lets you write the code that's typically executed without wrapping it
in an else block, and it lets you keep the code that handles a violated
requirement next to the requirement
```

### Checking API Avaliability

```
Swift has built-in support for checking API availability

if #available(iOS 10, macOS 10.12,*){}else{}

The last argument, * is required and specifies that on any other platform,the body of the if executes on the minimum deployment target specified by your target.
```

