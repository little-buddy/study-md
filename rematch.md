# rematch

```
redux模式升级版，拜托 action的烦恼又不失 redux的优雅
```

### 名场面

```
Being  front-end developer is not just about moving pixels around;
the real art of development is knowing where to store your state.
Short answer: it's complicated, but not that complicated.
```



### 等效方式

```
// reducres
dispatch({ type:'count/increment', payload:1 })
dispatch.count.increment(1)

// effects
dispatch({ type:'count/incrementAsync', payload:1})
dispatch.count.incrementAsync(1)

Dispatch can be called directly, or with the dispatch[model][action](payload)
```



```
直接配置 redux，rematch 也可以通过redux模式进行初始化

init({
	redux:{
		middlewares:[reduxLogger],
		reducers:{
			someReducer:(state,action) => ...
		}
	}
})

redux{
	initialState
	reducers
	middlewares
	enhancers
	rootReducers
	combineReducers
	createStore
	devtoolOptions
}
```

```
store{
	dispatch
	getState
	name
	model
		懒加载 models并把他们合进 rematch
	action
}
```

### Plugins API

```
官方的说话

After all, in Rematch, everything is a plugin
只不过 dispatch effects selectors subscriptions 是 rquired 插件

一个插件的API
const config = {
	config
		rematch.init 的可选项
	exposed
		一个插件的分享对象
	onModel
		model 创建的时候操作的生命周期
	middleware
		middleware:(store:Model) => (next:Dispatch) => (action:Action):nextState
		类似 effects loading subscriptions
	onStoreCreated
		stored 创建的时候会将该函数返回值合并进 rematch
}
```





```
在调试 react-native 的时候总是碰到 被墙的问题，都已经科学上网了，还是莫名其妙
```





### rematch API

```
init
  - models
      state
      reducers
      effects
      basereducer
      	a reducer that will run before model's reducers.
  - plugins
  - redux


store
	dispatch
		dispatch常规性的redux函数
	* 新增了 dispatch[moduleName][effectName/reducerName](payload) 的新型触发方式
		
	getState
	name
	当使用多个store的时候，The name will become the key when global getState is called.
	model


action
	这是一种兼容模式
	{
		type: 'modelName/[reducerName|effectName]',
		paylod: 'data....'
	}

从这里的结构我们可以看出来，rematch 沿用的依旧是redux模式，且完全向后兼容redux
```

