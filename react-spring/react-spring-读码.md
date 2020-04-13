# react-spring 读源码有感

### 目录结构

```
- addons
	Parallax / ParallaxLayer
- animated
- core
- konva
- native
	react-native版本
- shared
	工具集
- three
	threeJs 版本
- web
- zdog
	zdog 版本 [才发现 web 端还有这么神奇的3D库]
```

```
use-memo-one
	这个库存在的意义就是 react 未来可能会给 useMemo 和 useCallback的caceh
	一定时效性，而该库保留了原来的特性

```

### 动画类库 @react-spring/animated

```
Animated
AnimatedArray
AnimatedInterpolation
AnimatedObject
AnimatedProps
AnimatedStyle
AnimatedValue
addChild
animatedTag
extendAnimated
interpolate
isAnimated
removeChild
toPayload
withAnimated


Symbol.for 有时，我们希望重新使用同一个 Symbol 值，Symbol.for 方法可以做到这一点
```



### 工具集 @react-spring/shared

```
colorMatchers
  颜色的正则匹配
	支持	rgb
			 rgba
			 hsl
			 hsla
			 hex3
			 hex4
			 hex6
			 hex8
colors
	 常规 colors 的变量集
normalizeColor
		来源 https://github.com/react-community/normalize-css-color
		将 css 的颜色转换成 整型
colorToRgba
		将整型颜色 -> rgba
		
createInterpolator(range, output, extrapolate)
		创建一个插值器
deprecations
		调用的不推荐警告
globals
		now
		frameLoop
		colorNames
		skipAnimation
		defaultElement
		getComponentProps
		applyAnimatedValues
		createStringInterpolator
		createAnimatedInterpolator
		createAnimatedTransform
		createAnimatedStyle
		requestAnimationFrame
		cancelAnimationFrame
		assign 改变 globals的值
helpers
	帮助类
	is{
		arr: Array.isArray
		obj: o => !!o&&o.constructor.name==='object'
		fun: fn => typeof fn === 'function'
		str: str => typeof str === 'string'
		num: num => typeof num === 'number'
		und: x => x===void 0
	}
	each
	toArray
	useOnce
		React.useEffect(fn,[])
	useForceUpdate
		()=>React.useReducer(()=>({}),0)[1]
	usePrev(value){
		var prevRef = React.useRef(void 0);
		React.useEffect(()=>{
			// 更新之前的值
			prevRef.current = value
		})
		return prevRef.current;
	}
stringInterpolation
```

