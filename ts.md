# typescript

### Do's and Don'ts

```
- General Types
	Do use the types number string boolean symbol
- Callback Types
	- Return Types of Callbacks
		Do use the return type void for for callbacks whose value will be ignored.
	- Optional Parameters in Callbacks
		Do write callback parameters as non-optional
	- Overloads and Callbacks
		Do write a single overload using the maximum arity
- Function Overloads 重载是根据返回值类型不同做出对应调整
	- Ordering
		Do sort overloads by putting the more general signatures after more specific signatures
	- Use Optional Parameters
		Do use optional parameters whenever possible
- Use Union Types
	- Do use union types whenever possible
```

### interfaces

```
- Our First Interface
- Optional Properties
- Readonly properties
- Excess Property Checks
	interface SquareConfig{
		color?: string;
		width?: number;
		[propName:string]: any;
	}
	这里的 propName 是排除 color、width的
- Function Types
	interface SearchFunc{
		(source:string, subString:string):boolean;
	} -> 有点像 class 的构造方法，但现实中貌似很少这么写，都是直接的 ()=>void
- Indexable Types
	interface StringArray{
		[index:number]:string
	}
	[x:y]:z -> 的属性就是定义了该interface的所有属性表现形式，确定的属性也必须是在这个声明下面
- Class Types
	Implementing an interface
	
	interface ClockInterface{
		currentTime:Date;
		setTime(d:Date):void;
	}
	class Clock implements ClockInterface{
		currentTime: Date = new Date();
		setTime(d:Date){
			this.curretnTime = d;
		}
		constructor(h:number, m:number){}
	}
	
	interface 的 new -> class 的 constructor
	
- Extending Interfaces
	Like classes, interfaces can extend each other.
	This allows you to copy the members of one interface into another,
	which gives you more flexibility in 
	how you separate your interfaces into reusable components
	
- Hybrid Types

- Interfaces Extending Classes
	这种方式，可以控制只有特定的子类能实现对应的方法，避免多继承产生混乱


新增了一个 ReadonlyArray 声明
Typescript comes with a ReadonlyArray<T> type that is the same as Array<T> with all mutating
methods removed,so you can make sure you don't change your arrays after creation:

const -> vaiable
readonly -> properties

a = ro as number[] -> as 就是重新生面前面变量的属性声明
```

### Classes

```
- Classes
- Inheritance
- Public, private, and protected modifiers
	- Public by default
	- ECMAScript Private Fields
			With TypeScript 3.8，TypeScript supports the new JavaScript syntax for private fields.
			#[name]:value;
	- understanding TypeScript's private
			TypeScript is a structural type system.
	- understanding protected
		protected 变量被继承之后就成为了私有变量
- Readonly modifier
		you can make properties readonly by using the readonly keyword.Readonly properties must
		be initialized at their declaration or in the constructor.
- Accessors
		TypeScript supports getters/setters as a way of intercepting accesses to a member of an o
- Static Properties
- Abstract Classes
		规则同 java 差不多
		abstract class Department{
			constructor(public name: string){}
			printName():void{}
			abstract printMeeting():void; // must be implemented in derived classes
		}
- Advanced Techniques
	- Constructor functions
	- Using a class as an interface
		As we said in the previous section, a class declaration creates two things: 
		a type representing instances of the class and a constructor function.
		Because classes create types,you can use them in the same places 
		you would be able to use interface.
interface 继承 class 就好像是将 原class 变成一个 Abstract类，原class的所有实现都成了抽象Method，
且它保护了子类无法创建父类同名的私有成员

```

### Generics

```ts
function identity<T>(arg:T):T{
  return arg;
}

let myIdentity:<T>(arg:T) => T = identity;

interface GenericIdentityFn{
  <T>(arg:T):T;
}

interface GenericIdentityFn<T>{
  (arg:T):T;
}

// Using Type Parameters in Generic Constraints
function getProperty<T, K extends keyof T>(obj:T,key:K){
  return obj[key]
}
// Using Class Types in Generics
function create<T>(c:{new():T;}):T{
  return new c();
}

// 比较不常见的是 keyof 这个关键字
```

### Enums

```ts
// 跟 iOS 差不多
enum Direction{
  Up = 1,
  Down,
  Left,
  Right
}
// 指定第一个，后续会一次类推
// 不指定的情况下第一个就是为0

// 获取一个 enum 关键 key 的方法
enum LogLevel{
  ERROR,
  WARN,
  INFO,
  DEBUG
}
type LogLevelStrings = keyof typeof LogLevel; "ERROR" | "WARN" | "INFO" | "DEBUG"

enum Enum{
  A
}
/*
	- 实现方式
	var Enum;
  (function (Enum) {
      Enum[Enum["A"] = 0] = "A";
  })(Enum || (Enum = {}));
*/
let a = Enum.A; // 0
let nameOfA = Enum[a]; // A
```

### Type Compatibility

```ts
// Type compatibility in TypeScript is based on structural subtyping.
// interface 和 class 结构一致就可以作为一种表示类型，但不包括 private
interface Named{
  name: string;
}
class Person{
  name: string;
}
let p: Named;
p = new Person();

// 它的声明可以向下兼容，但是无法向上兼容，向下多余的值就会成为 optional.
```

### Adcanced Types

```
- Intersection Types
	类型通过 & 的形式表达合并
- Union Types
	string | number
- Type Guards and Differentiating Types
		function move(pet: Fish | Bird){
			if("swin" in pet){
				return pet.swin();
			}
			return pet.fly();
		}
- Nullable types
		TypeScript has two special types, null and undefined
		默认情况任何变量都是支持 null | undefined
		当开启 --strictNullChecks 的时候就不是这样的了
- Type aliases
	Type aliases create a new name for a type.
	- interface vs. Type
		interface显示的是错误名字，type显示的是对应的 原始表达值
	you should always use an interface over a type alias if possible.
- String Literal Types
- Numeric Literal Types
- Enum Member Types
- Exhaustiveness checking
- Polymorphic this types
	class属性方法最终会返回 this 这个类
- index types
- Mapped types
		type Readonly<T>={
			readonly [P in keyof T]: T[P];
		}
		type Partial<T> = {
			[P in keyof T]?:T[P];
		}
		type Nullable<T> = {
			[P in keyof T]:T[P]|null
		}
	添加属性
		type PartialWithNewMember<T> = {
			[P in keyof T]?: T[P];
		} & {newMember: boolean}
- Conditional Types
	T extends U ? X : Y;
	
Exclude<T,U>
Extract<T,U>
NonNullable<T>
ReturnType<T>
InstanceType<T>
```

### Symbol

```
Symbol
	hasInstance
	isConcatSpreadable
	iterator
	match
	replace
	search
	species
	split
	toPrimitive
	toStringTag
	unscopables
```

### Modules Namespaces

```
- exporting a declaration
- export statements
- re-exports
- importing types
	Prior to TypeScript 3.8, you can import a type using import.With TypeScript 3.8, you can
	import a type using the import statement, or using import type.
	
	import {Api} from './api'
	import type {Api} from './api'
- default exports
```




















