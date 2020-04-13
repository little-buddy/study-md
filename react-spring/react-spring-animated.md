# @react-spring/animated

### 动画组件标识

```
const animatedTag = Symbol.for('isAnimated');

const isAnimated = val => !!(val && val[animatedTag]);

const _a = animatedTag;

const cacheKey = Symbol.for('AnimatedComponent');
```

### 动画基类

```tsx
// 比较神奇的一点就是 payload _attach _detach 的操作
class Animated{
  constructor(){
    this[_a] = true;
    this.children = new Set();
  }
  
  getPayload(){
    return this.payload;
  }
  
  getChildren(){
    return this.children;
  }
  
  // 处理 this.source
  addChild(child){
    this.children.size || this._attach();
    this.children.add(child);
  }
  
  removeChild(child){
    this.children.delete(child);
    this.children.size || this._detach();
  }
}
```

### 动画对象

```tsx
class AnimatedObject extends Animated{
  constructor(source){
    super();
    // 这里是一个初始化操作
    this.source = source;
    this.payload = toPayload(source);
  }
  - getValue
	- updatePayload
	- _attach
	- _detach
}
```

### 动画样式

```tsx
class AnimatedStyle extends AnimatedObject{
  constructor(style){
    if(style === void 0){
      style = {}
    }
    super(
      style.transform && createAniamtedTransform 
      	? _extends(
          	{},
	          style,
	          {transform:createAnimatedTransform(style.transform)})
    		: style);
  }
}
```

### 动画属性

```tsx
// 跟 AniamtedStyle 还是比较相似的
class AnimatedProps extends AnimatedObject{
  constructor(props, update){
    super(props.style && createAnimatedStyle ? _extends({}, props, {
      style:createAnimatedStyle(props.style)
    }):props);
    this.update = update;
  }
}
```

### 动画切换

```tsx
class AnimatedInterpolation extends Animated{
  constructor(source, args){
    super();
    this.source = source;
    this.calc = createInterpolator(...args);
  }
  
  - getValue
	- to
	- interpolate
	- getPayload
	- updatePayload
  - _attach
	- _deatch
}
```

### 动画值

```tsx
class AnimatedValue extends Animated{
	constructor(value){
		super();
		this.views = new Set();
		this.done = false;
		this.value = value;
		this.payload = new Set([this]);
		
		if(is.num(value)){
			this.startPosition = value;
			this.lastPosition = value;
		}
	}
	
	getValue(){
		return this.value;
	}
	
	setValue(value){
		this.value = value;
		if(flush !== false){
			if(!this.views.size){
				collectViews(this, this.views);
			}
			each(this.views, view=>view.update());
		}
	}
	
	to(){
		for(
			var _len = arguments.length,
					args = new Array(_len),
					_key = 0;
					_key < _len;
					_key ++
		){
			args[_key] = arguments[_key];
		}
		return createAnimatedInterpolation(this, ...args);
	}
	
	interpolate(){
		deprecateInterpolate();
		return this.to(...arguments);
	}
	
	reset(isActive){
		if(is.num(this.value)){
			this.startPosition = this.value;
			this.lastPosition = this.value;
			this.lastVelocity = isActive?this.lastVelocity:undefined;
			this.lastTime = isActive ? this.lastTime : undefined;
			this.startTime = now();
		}
		this.done = false;
		this.views.clear();
	}
	
	_attach(){}
	_detach(){}
}
```

### 动画数组

```tsx
class AnimatedArray extends AnimatedObject{
  constructor(source){
    super(source);
  }
  
  - getValue
  - setValue
	- to
	- interpolate
	- updatePayload
}
```

### 动画组件

```tsx
const createAnimatedComponent = Component => 
forwardRef((rawProps,ref)=>{
  const node = useRef(null);
  const props = useRef(null);
  const forceUpdate = useForceUpdate();
  
  const nextProps = new AnimatedProps(rawProps, ()=>{
    if(!node.current) return;
    const didUpdate = applyAnimatedValues(
    	node.current,
      nextProps.getValue(true)
    );
    if(didUpdate === false){
      forceUpdate();
    }
  });
  
  useEffect(()=>{
    const prevProps = props.current;
    props.current = nextProps;
    
    nextProps._attach();
    
    if(prevProps){
      prevProps._detach();
    }
  })
  
  // ensure the latest props are detached on unmount.
  useOnce(()=>()=>{
    props.current._detach();
  })
  
  const refFn = !is.fun(Component) || 
        Component.prototype.isReactComponent
  			? value=>node.current=updateRef(ref,value)
  			: void 0;
  
  rawProps = getComponentProps(nextProps.getValue());
  return React.createElement(Component, Object.assign({}, rawProps,{
    ref: refFn
  }))
})
```



### 继承结构

```
														  AnimatedStyle
						AniamtedObject <= AnimatedProps
  														AnimatedArray
Animated <=	AnimatedInterpolation
	
						AniamtedValue
						
Aniamted 竟然是由来包裹 AniamtedValue的...
```



```
初始化了2个全局函数

Globals.assign({
	createAnimatedStyle: style => new AnimatedStyle(style),
	
	createAnimatedInterpolation: function(parents){
		for(
			var _len = arguments.length, 
			args = new Array(_len>1?_len-1:0),
			_key = 1;
			_key < _len;
			_key++
		){
			args[_key-1] = arguments[_key];
		}
		
		return new AnimatedInterpolation(parents, args);
	}
})
```



```
Convert an array or object to a flat payload
- toPayload


```