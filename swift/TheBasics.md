# The Basics

```
let -> 常量
var -> 变量

You can declare multiple constants or multiple variables on a single line
var x = 0.0, y = 0.0, z= 0.0

Your can define mulitple related variables of the same type on a single line
var red, green, blue: Double

Integer Bounds [UInt8.min, UInt8.max]
```

### Numeric Literals

```
let decimalInteger = 17
let binaryInteger = 0b10001
let octalInteger = 0o21
let hexadecimalInteger = 0x11

let exponentDouble = 1.21875e1
let justOVerOneMillion = 1_000_000.000_000_1
```

### Type Aliases

```
typealias AudioSample = UInt16
```

### Tuples 元组

```
let http404Error = (404, "Not Found")

使用值的时候
let (statusCode, statusMessage) = http404Error

let http200Status = (statusCode:200, description:"OK")

所以某函数返回多个值，其实返回的是一个元组类型
```

### Optional

```
You set an optional variable to a valueless state by 
	assigning it the special value nil

var serverResponseCode: Int? = 404

Note:
	Swift's nil isn't the same as nil in Objective-C.In Objective-C,nil is a pointer
	to a nonexistent object.In Swift, nil isn't a pointer -- it's the absence of
	a value of a certian type.Optionals of any type can be set to nil, not just
	object types.
	
	表示这里一定有值
	if convertedNumber != nil {
		print("convertedNumber has an integer value of \(convertedNumber!).")
	}
```

### Optional Binding

```swift
if let firstNumber = Int("4")
	if let secondNumber = Int("42")
		if firstNumber < secondNumber && secondNumber < 100 {
      print("\(firstNumber) < \(secondNumber) < 100")
    }
```

### Implicitly unwrapped optionals

```
隐式解析可选
面对的问题
	有时候在程序架构中，第一次被赋值之后，可以确定一个可选总会有值，避免低效地每次都去判断和解析
	
let possibleString: String? = "An optional string."
println(possibleString!) 需要感叹号来获取值

加入不添加 ! , 它会输出 Optional(xxx)
添加 ! , 它会输出 xxx

let assumedString: String! = "An implicityly unwrapped optional string."
```

### Error Handling

```
func canThrowAnError() throws{
	// this function may or may not throw an error
}

When you call a function that can throw an error, you prepend the try keyword
to the expression.

do{
	try canThrowAnError()
}catch{
	
}
```



### 安卓虚拟机修改 hosts 方法

```shell
emulator -avd xxx -partitions 128
adb root				获取 root 权限
adb remount			设置 system 可读写
adb pull /system/etc/hosts <文件名>
adb push <文件名> /system/etc/hosts

adb reboot

然后说要 adb disable-veirty

风中凌乱...

adb v1.0.41 [Android Debug Bridge]
ADK 30.0.0-6374843

系统版本 Android 10.0


常规性操作
- Unlock the device
	* boot up the device
	* Choose Settings -> DeveloperOptions
	* FastBoot mode -> reboot bootloader
	* fastboot oem unlock

- Disable DM-verity
	adb root
	adb disable-verity
	adb reboot
	
	https://blog.csdn.net/weixin_43784532/article/details/87998253


 需要通过这个 ip 10.0.2.2 进行访问
 
 http://10.0.2.2:3080/classMusemu/cloudbless/hndxfxy
 
	- 随机生成
	- 安卓输入框弹起导致布局异常

```

