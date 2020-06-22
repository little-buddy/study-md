# Collection types

### Arrays

```
- Creating an Empty Array
		var someInts = [Int]()
		添加
		someInts.append(3)
		重置，重置值但不重置类型
		someInts = []
- Creating an Array with a Default value
		Array(repeating: 0.0, count:3)
- Creating an Array with an Array Literal
		var shoppingList = ["Eggs","Milk"];
- Accessing and Modifying an Array
		.count
		.isEmpty
		append 另一种表现形式就是 +
		shopplingList[4...6] = ["Bananas","Apples"]
		就是后面2个值替换前面区间所有的值，有点类似删除后添加
		.insert(of:"",at:)
		.remove(at:)
		.removeLast() 删除最后一个
- iterating Over an Array
		for value in Array{
			print(item)
		}
		for (index,value) in Array.enumerated{
		
		}
```

### Set

```
You can use a set instead of an array when the order of items is not important,
or when you need to ensure that an item only appears once.

Swift's Set type is bridged to Foundation's NSSet class.

- Hash Values for Set Types

类型必须是可散列的才能存储在一个集合中，也就是说，类型必须提供一种方法来计算自身的散列值
散列值是一个Int值，Swift所有基本类型(String、Int、Double、Bool)都是散列的，可以用作
值类型或字典键类型，没有关联的枚举大小写值也可以哈希。
那么问题来了，什么类型的值是不能 散列的？

也可以自定义一个 实现 Hashable protocol 的值来满足上面的需求

- Creating and Initializing an Empty Set
	var letters = Set<Character>();
	letters [];

- Creating a Set with an Array Literal
	var favoriteGenres:Set<String> = ["a","b","a","c","d"];
	以数组初始化的Set，最终会合并相同的值，并且输出顺序不确定

- Accessing and Modifying a Set
	Set.count
	Set.isEmpty
	Set.insert
	Set.remove
	Set.contains
	Set.sorted -> 默认的排序方法是 从小到大
	intersection 返回 a 和 b 的交集
	symmetricDifference 返回 a 和 b 的非交集
	union 返回 a 和 b 的并集
	subtracting 返回 a 中与b不相交的集合部分
	== 判断2个集合是否相等
	isSubset a 是否是b的子集
	isSuperset a 是否是b的父集
	isStrictSubset/isStrictSuperset 确定是否子集或父集，但不包括2者相等
	isDisjoint a和b 没有交集
	
```

### Dictionaries

```

Swift's Dictionary type is bridged to Foundation's NSDictionary class.

A dictionary Key type must conform to the Hashable protocol
like a set's value type

- Creating an Empty Dictionary
	var namesOfIntegers = [Int:String]()
	nameOfIntegers = [:]
- Creating a Dictionary with a Dictionary Literal
	var airports:[String:String] = [
		"YYZ":"Toronto Pearson",
		"DUB":"Dublin"
	]
- accessing and Modifying a Dictionary
	Dictionary.count
	Dictionary.isEmpty
	更新
	Dictionary[key] = value
	Dictionary.updateValue(value,forKey:key) 返回更新前的值
	删除
	Dictionary[key] = nil
	Dictionary.removeValue(forKey:key) 返回删除的值
- Iterating Over a Dictionary
	for (key,value) in Dictionary{}
	for key in Dictionary.keys
	for value in Dictionary.values
	
	如果希望对 keys和values 使用数组api，做如下操作
	let airportCodes = [String](Dictionary.keys)
```



```
distinct 清晰的
```





```
- tab 栏是电商类型的tab操作，然后触发 change 改变对应的值
- 点击地点就更换背景图，直接 loading
- 自定义的操作并不保留图片，将得到的图片直接生成图片并上传

目前阶段确定的方案
```

