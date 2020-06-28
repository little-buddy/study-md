# 读 react-router 源码有感

### react-router 和 react-dom-dom的区别

```
很多web端同学在初期接触 react-router 的时候，按教程执行了
	npm i react-router react-router-dom
其实一直有个疑问，为什么安装了react-router还要再安装react-router-dom
并且在实际使用过程中，所有的包又都是从 react-router-dom 中引出
那么react-router安装的意义呢？

其实这涉及到 react-router 生态问题，react-router不仅面向web还面向react-native
所以react-router包含的是基本不涉及到平台的基础组件
而涉及平台的 react-router-dom 和 react-router-native 是依赖于 react-router的基础包的
一些基础组件又通过自己的index进行导出，并在这些基础组件之上导出了相关平台的组件

react-router
	HistoryContext
	Lifecycle
	MemoryRouter
	Prompt
	Redirect
	Route
	Router
	RouterContext
	StaticRouter
	Switch
	createNameContext
	generatePath
	matchPath
	withRouter

react-router-dom
	BrowserRouter
	HashRouter
	Link
	NavLink
	
react-router-native
	TabRoutes
	TabRoute
	StackContainer
	AnimatedStack
	StackRootContainer
	RedirectStack
	StackRoute
	BackButton
	DeepingLinking
	Link
	NativeRouter
```



```
默认的 match
computeRootMatch(pathname){
	return {path:"/",url:"/",params:{},isExact:pathname==="/"}
}
```



```js
// Router
	this.unlisten = props.history.listen(location=>{
    if(this._isMounted){
      this.setState({location})
    } else {
      this._pendingLocation = locatin;
    }
  })
// 从这一段代码可以看出来 路由的变化会触发整个路由树的刷新
```



```
路由三大变量来源
	history 	-> 通过 history 这个库生成对应环境的路由
	整体结构
		{
			length,
			action,
			location,
			createHref,
			push,
			replace,
			go,
			goBack,
			goForward,
			block,
			listen
		}
		
	location  -> 内部构建的路由结构
    {
      pathname,
      search, -> query
      hash, -> hash
      state, -> pop
      key,
    }
	match			-> 当前匹配的环境
		{
			path,
			url,
			params,
			isExact
		}
```

```js
function parsePath(path){
  let pathname = path || '/'
  let search = ''
  let hash = ''
  
  const hashIndex = pathname.indexOf('#')
  if(hashIndex!==-1){
    hash = pathname.substr(hashIndex)
    pathname = pathname.substr(0,hashIndex)
  }
  
  const searchIndex = pathname.indexOf('?')
  if(searchIndex !== -1){
    search = pathname.substr(searchIndex)
    pathname = pathname.substr(0,searchIndex)
  }
  
  return {
    pathname,
    search:search==='?':"":search,
    hash:hash==="#"?"":hash
  }
}
```



```jsx
// 这里发现一个很神奇的路由嵌套

<RouterContext.Consumer>
  {
    context=><RouterContext.Provider>
      {child}
		</RouterContext.Provider>
  }
</RouterContext.Consumer>

```



```
从 react-router-native 还依赖原始的 Animated，PanResponder 来说
这个库就不可能会作为一个首选路由库
```



```js
// matchPath 竟然还有缓存

const cache = {};
const cacheLimit = 10000;
let cacheCount = 0;

function compilePath(path,options){
  const cacheKey = `${options.end}${options.strict}${options.sensitive}`
  const pathCache = cache[cacheKey] || (cache[cacheKey]={})
  
  if(pathCache[path]) return pathCache[path]
  
  const keys = []
  const regexp = pathToRegexp(path, keys, options);
  const result = {regexp , keys}
  
  if(cacheCount<cacheLimit){
    pathCache[path] = result;
    cacheCount++;
  }
  
  return result;
}


function matchPath(pathname,options={}){
  if(typeof options === "string" || Array.isArray(options)){
    options = {path: options};
  }
  
  const {path,exct=false,strict=false,sensitive=false} = options
  
  const paths = [].concat(path)
  
  return paths.reduce((matced,path)=>{
    if(!path && path !== "") return null;
    if(matched) return matched;
    
    const {regexp,keys} = compilePath(path,{
      end:exact,
      strict,
      sensitive
    })
    
    const match = regexp.exec(pathname)
    if(!match) return null;
    
    const [url,...values] = match;
    const isExact = pathname === url;
    
    if(exact&&!isExact) return null;
    
    return {
      path,
      url: path === "/" && url === "" ? "/" : url,
      isExact,
      params: keys.reduce((memo,key,index)=>{
        memo[key.name] = values[index];
        return memo;
      },{})
    }
  },null)
}
```



```
处理url的常用库
	resolve-pathanme 根据前者的表达式相对于后者的path进行转换
	path-to-regexp (path,keys,options) 这个库还有很多有趣的功能
```





```
StrictMode 初始会触发组件重复渲染

从 react 代码来看，它有三种模式
	ConcurrentMode
	BlockingMode
	StrictMode
	
NoMode = 0
StrictMode = 1
BlockingMode = 2
ConcurrentMode = 4
ProfileMode = 8
```



```
发现一个官方不认为是bug的bug，那就是 StrictMode 下，所有组件的render部分都会执行2遍
即使是纯组件
```

