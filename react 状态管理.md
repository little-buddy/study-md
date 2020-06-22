# React 状态管理

### React最初的更新机制

```
state => setState => state
这是一个组件最基本的更新方式
```

### React 父子组件传值

```
状态提示 Lifting State Up

子元素调用父元素 parent => action =>props => child
把子元素的状态提升到父元素去控制

父元素调用子元素呢？
通过 ref 获取子元素实例，然后去操作

兄弟间传值呢？
在parent获取child实例封装成方法传递给各个需要的元素


单项数据流容易被破坏
	- 多个视图依赖于同一状态
	- 来自不同视图的行为需要变更同一状态

缺点
对于问题一，传参的方法对于多层嵌套的组件将会非常繁琐，并且对于兄弟组件间的状态传递无能为力。
对于问题二，我们经常会采用父子组件直接引用或者通过事件来变更和同步状态的多份拷贝。以上的这些模式非常脆弱，通常会导致无法维护的代码。
```

### Context

```
旧版

新版
```

### 单项数据流和双向数据流

```
单项数据流指的就是 数据 触发 视图的变更。

双向数据流指的是双向数据绑定。即 数据 和 视图 之间的双向绑定。

视图发生变化会触发数据发生变化
数据发生变化又会导致视图发生变化
```

### 基础思想

```
MVP 思想
MVVM 思想

MVC
	Action -> Controller -> Model ------ View

Flux 的核心就是一个简单的约定：视图层组件不允许直接修改应用状态，只能触发action
		 应用的状态必须独立出来放到store里面统一管理，通过侦听action来执行具体的状态操作
```



### react 状态优雅升级

```
state

react 更新方式
父子兄弟间传值
```

### Redux

```
与 flex 相关
```

### rxjs

```

```

### mobx 

```mst

```

### rematch

```

```

### dva

```

```



### React 并不是一个 MVVM 框架

```
A JavaScript library for building user interfaces

所以它会生成一个 FLUX 思想

官方的flux是一个和很简单的东西

Dispatcher
	register
	unregister
	waitFor	这个函数是保证触发监听顺序先后性的，并不是字面意义上的等待
	dispatch
	isDispatching
	
Store
	constructor
	addListener
	getDispatcher
	getDispatchToken
	hasChanged
	__emitChange
	onDispatch(payload: Object):void
ReduceStore
	getState
	getInitialState
	reduce
	areEqual
	
Container
	create(base: ReactClass, options:? Object):ReactClass
```



### 前端架构的发展过程，客户端架构发展史

```
MVC
		Action -> Controller -> Model <======> View
		Model 实际是数据实体的结合，仅用于从数据库读写数据
		Controller 负责主要业务逻辑，仅起到路由的功能
MVP
		View <======> Presenter(主持人) -> Model
MVVM
																		ajax
Action -> View <======> ViewModel <=====> Model
																		json

Presenter 负责和View的双向交互，而Controller只是单向的中介。Presenter是从View层抽离出来的，通常和View是一对一的关系，而Controller是面向业务的，往往是单例模式或者提供静态方法
MVP中View和Model是不能进行通信的，而MVC中View和Model是可以直接交互的

MVVM 框架是 立足于原有MVP并且把WPF的新特性揉合进去，以应对客户日益复杂的需求变化
MVVM模式将Presener改名为ViewModel，基本上与MVP模式一致，唯一的区别是，它采用双向绑定：View的变动，自动反应在ViewModel，反之亦然，这样开发者就不用处理接收事件和View更新的工作

```





### react 有一个需要验证

```
就是 renderToString 与 context 的联动性

```

