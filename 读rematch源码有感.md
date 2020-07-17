# 读 rematch 源码有感

### 代码结构

```
- utils
	- deprecate
	- isListener
	
	- mergeConfig
		name
		models
		plugins
		redux
			reducers
			rootReducers
			enhancers
			middlewares
			devtoolOptions
			
	- validate
- index
- pluginFactory
- redux
- rematch
```



### validate

```js
const validate = (validations: Validation[]):void=>{
	if(process.env.NODE_ENV !== 'production'){
		for(const validation of validations){
			const [condition,errorMessage] = validation
			if(condition){
				throw new Error(errorMessage)
			}
		}
	}
}
export default validate;
```

### mergeCofnig

```
name
models
plugins
	-> 我对这里的插件其实一直不太懂
redux
  reducers
  rootReducers
  enhancers
  middlewares
  devtoolOptions
pluginFactory
```

### 缺点

```
其实 1.x 的rematch 并不完善
整体导出的方法有4个
{
	dispatch,
	getState,
	createModel,
	init
}

dispatch/getState 已经作废了
createModel = (model) => model
```

### Rematch 结构

```ts
class Rematch{
  protected config;
  protected models;
  protected plugins;
  protected pluginFactory;
  
  constructor(){}
  
  forEachPlugin
  getModels
  addModel
  init
  
}

```

### 插件结构

```
config
exposed
validate

dispatch
createDispatcher

onInit -> 创建插件的时候执行
onStoreCreated -> 对应模块被创建 store 的时候执行
onModel (model)=>void 模块被添加的时候执行
middleware 每个module貌似只能包含一个中间件

内部 dispatchPlugin 构建的
storeDispatch
storeGetState

内部 effectPlugin 构建的
effects

它通过 bind，让返回的对象内部的方法 保持在一个 闭包的 this 环境下面

它会把每个插件中的 middleware 合并到一个redux 插件数组中
所以也就意味着，当你在某个插件中为redux添加了新的插件，其实是当前的store 全局有效的

module 内部name没有定义则以合并的key为参数，定义了则被覆盖
```

### model

```
name
state
baseReducer
	是包裹在所有 reducers 外的一次拦截
reducers
effects
	有2中表达方式
	ModelEffects
	(dispatch)=>ModelEffects
```

### store

```
name
reduxStore
model -> 可以添加一个model
	没添加一个新的模块
		将模块添加到rematch
		将模块的 reducer 合并到 redux
		触发一个 @@redux/REPLACE 的 actions
```

### redux

```
initialState
reducers
enhancers
middlewares
rootReducers
combineRecuers
createStore -> 这个还能拜托自行定义的啊...
devtoolOptions

{
	mergeReducers
	createModelReducer
		在创建reducer的时候，它自行会根据module的name进行构建reducer名称
		这个方法是 巧妙 的关键
	createRootReducer
		其实就是在原有的reducer再包一层执行action，也就意味着，加入统一action的处理，会执行2遍
}

庆幸的是，他这里的 redux 并没有对外暴露什么方法

```

