# nextjs-router 探寻

```
由于 nextjs 的npm包下的代码都是编译后的，看起来异常吃力，所以建议从github clone一份到本地
便于对 nextjs 的实现更熟悉以至于可以更好的处理一些情况

而 Router 在下面目录下
	next.js/packages/next/next-server/lib/router/router.ts
```

```
映入眼帘的就是
	addBasePath
		从代码里我们知道，可以通过 process.env.__NEXT_ROUTER_BASEPATH 进行配置 路径前缀
	toRoute
		会兼容路径多余的 / 
	fetchNextData
		服务端渲染的尝试次数是3次，客户端是1次
	Router
		在构造该Router的时候，会根据pathname在内部维护一个 Page组件的Map
		并且在客户端会执行一次 history.replaceState
		并且 addEventListener('popstate', this.onPopState)
			onPopState
				e.state 不存在则直接调用 this.changeState 进行路由切换
				beforePopState
				
			changeState 就是直接调用 history 的方法
		reload -> window.location.reload
    back 	 -> window.location.back
    push 	 -> this.change
    replace -> this.change
    change -> 
    	所谓的路由切换就是先 getRouteInfo，再通过 changeState 进行更新
    	所有的Router生命周期都是围绕 popState 来操作的
    	切换的结果会通过 Promise<boolean>返回
    
    路由的信息会根据 shallow 判断来决定是否取缓存
    请求错误就会通过 window.location.href 来进行页面刷新
			
发现一个比较有意思的 method scrollIntoView 操作
	{
		behavior: "auto" | "instant" | "smooth"
		block: "start" | "end"
	}
			
rewriteUrlForNextExport 功能受 process.env.__NEXT_EXPORT_TRAILING_SLASH 控制


```

```
type ComponentRes = { page: ComponentType; mod:any }

type BaseRouter = {
	route: string
	pathname: string
	query: ParsedUrlQuery
	asPath: string
}

type NextRouter = BaseRouter & 
	Pick<
		Router,
		| 'push',
		| 'replace',
		| 'reload',
		| 'back',
		| 'prefetch',
		| 'beforePopState',
		| 'events'
		| 'isFallback'
	>

type RouteInfo = {
	Component: ComponentType
	__N_SSG?: boolean
	__N_SSP?: boolean
	props?: any
	err?: Error
	error?: any
}

type Subscription = (data:RouteInfo, App?: ComponentType) => void

type BeforePopStateCallback = (state:any) => boolean

type ComponentLoadCancel = (()=>void) | null

type HistoryMethod = 'replaceState' | 'pushState'
```

```
urlObjectKeys
	"auth"
	"hash"
	"host"
	"hostname"
	"href"
	"path"
	"pathname"
	"port"
	"protocol"
	"query"
	"search"
	"slashes"
```

```
pixrem 通过node执行对css文件进行 rem的转换
react-ssr-prepass 
	react-dom/server does not have support for suspense yet
	react-ssr-prepass offers suspense on the server-side today, until it does.
```



### env 变量

```
process.env.__NEXT_ROUTER_BASEPATH
```

### 事件触发器

```tsx
type Handler = (...evts: any[]) => void

export type MittEmitter = {
  on(type:string, handler:Handler):void
  off(type:string,handler:Handler):void
  emit(type:string,...evts:any[]):void
}
  
export default function mitt():MittEmiter{
  const all: {[s:string]:Handler[]} = Object.create(null)
  
  return {
    on(type:string, handler: Handler){
      (all[type] || (all[type]=[])).push(handler)
    },
    
    off(type:string, handler:Handler){
      if(all[type]){
        all[type].splice(all[type].indexOf(handler)>>>0,1)
      }
    },
    
    emit(type:string, ...evts: any[]){
      (all[type] || []).slice().map((handler: Handler)=>{
        handler(...evts);
      })
    }
  }
}
```



```
空值合并运算符
	const a = b || 123; => const a = b ?? 123;
可选链运算符
	let age = user && user.info && user.info.getAge && user.info.getAge();
	=> let age = user?.info?.getAge?.()
	触碰到 undefined或null，它只会返回 undefined...
globalThis
```

