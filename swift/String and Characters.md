# Strings and Characters

```
由于 " 以被作为特殊字符，所以在需要使用到 " 的地方，需要前缀添加 \
\"\"\" 等效 \"""

"""
"""

#"""
"""# 添加#号，仅表示忽略单行的任何转义，仅作为字面量显示
```

### String 的一些操作

```
String.isEmpty

for character in "Dog!"{
	print(character)
}

let exclamationMark: Character = "!"
let catCharacters: [Character] = ["C","a","t","!","x"]

startIndex
endIndex
index(before:Int)
index(after:Int)
index(start,offsetBy:Int)

无法通过下标直接取值，需要通过 index获取下标再获取

index 查找
insert 插入
	insert(contentsOf:"", at: 下标)
remove 删除

firstIndex(of:String)
hasPrefix(_:)
hasSuffix(_:)


// 触发器写法
let numbers = [2, 3, 5, 7]
var numbersIterator = numbers.makeIterator()
while let num = numbersIterator.next() {
    print(num)
}
// Prints "2"
// Prints "3"
// Prints "5"
// Prints "7"
```

```
var someInts = [Int]()

someInts.append(3)

// 类似js数组 Array(3).fill(0)
var threeDoubles = Array(repeating: 0.0, count:3)

// a.concat(b) 数组合并
a + b
```

