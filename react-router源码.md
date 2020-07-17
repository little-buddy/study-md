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



### widget 初始化配置参数

```
symbol	 商品
interval 周期
container_id 容器id
datafeed 数据源
timeframe 设置图表的初始时间范围
study_count_limit 指标的限制数量
custom_indicators_getter 自定义指标设置
time_frames 是图表底部时间范围选择器的选项
library_path
width,height,
fullscreen -> 让图表占据所有空间
autosize
toolbar_bg 工具栏颜色

symbol_search_request 延迟搜索，减少请求次数


保存/加载的高级api
charts_storage_url
client_id
user_id
charts_storage_api_version
load_last_chart

save_load_adapter 桥接层
	ChartLayouts
	StudyTemplates
setting_adapter


```

### widget 方法

```
onShortcut(shortcut,callback) 快捷键

onChartReady
headerReady

setLanguage(locale)
setSumbol(symbol,interval,callback)
remove
closePopupsAndDialogs
takeScreenshot

// 更改主题的时候，这里一并修改了
changeTheme
addCustomCSSFile
applyOverrides(overrides)
applyStudiesOverrides(overrides)

symbolInterval 返回包含 symbol 和 interval 的对象
```

### 图表方法

```
onDataLoaded
	您可以使用此方法返回订阅对象，一遍在加载新历史K线时收到通知
onSymbolChanged
onIntervalChanged
onVisibleRangeChanged

dataReady((interval)=>{})
	如果K线数据已经被加载或被接收时，图标库将立即调用此回调
crossHairMoved(({time,price})=>{})
	每当十字线位置改变
setVisibleRange(range,options)
	调整参数以使选定的时间段适合视口
	
setSymbol
setResolution
resetData 重新请求数据
setChartType 3分时 1蜡烛条
setTimezone



executeActionById

getAllShapes
getAllStudies
setEntityVisibility(id,isVisible)
createStduy(name,forceOverlay,lock,inputs,overrides,options)
	name 指标名称
	foceOverlay 强制图表库放在主窗格中
	lock 是否锁定指标
	inputs
	overrides
	options
getStudyById
removeEntity(entityId)
removeAllStudyies()

createStudyTemplate 创建指标模板

symbol()
symbolExt()
resolution()
getVisibleRange()
getVisiblePricerRange()
scrollPosition()
	返回图表右边到最后一根K线的滚动距离
defaultScrollPosition()
	总距离
chartType()

setZoomEnabled
setScrollEnabled


	
```

```
Symbology 配置

volume_precision 显示此商品的成交量数字的小数位
has_no_volume 是否拥有成交量数据
has_emtpry_bars 表示datafeed没有返回数据时library是否会生成空的K柱

seconds_multipliers 包含秒周期，datafeed将会自行构建它


format
	price 根据 minmov、pricescale、minmove2 和 fractional 格式化小数
	volume 将十进制数字格式化为千、百万 或 十亿

intraday_multipliers

has_intraday
has_seconds
has_daily
has_weekly_and_monthly

supported_resolutions

exchange、listed_exchange 仅为某个交易所略称，不做其他用
description 描述将显示在图表标题栏中

holidays 商品假期列表，将不显示在里面
```



```
目前我们需要的点
	- 指标的高度设置
			可能要去内联api去找方法
	- 可见苦于范围的跨度
			timeframe

			
	目前打算，把所有的 k线数据集成到一个环境里面
		然后所有的数据都更新在那里，rankList就作为一个容器
		
		
- 中英文翻译 -> 因为长短不一，需要校验
- 绿涨红跌 -> 仅做原红绿颜色对调，有特殊再细调
- 主题替换	-> 因为只有粗略的颜色标准，需要校验
- 在线客服 -> 需要购买服务，是自己开发还是购买待定
- 社区 -> 接口出来的第2天搞定
- 高级认证/身份认证
		这里的实名 与 高级认证需要确认 流程再确定，以及新接口
- 网络监测 -> web端实现方案
```

