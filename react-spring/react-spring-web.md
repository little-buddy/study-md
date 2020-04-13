# react-spring-web

### 前置函数

```tsx
// 前置函数
const dangerouStyleValue(name, value, isCustomProperty){
  if(value == null || typeof value === 'boolean' || value === '')
    return ''
  if(!isCustomProperty 
     && typeof value === 'number' 
     && value !==0
  	 && !(isUnitlessNumber.hasOwnProperty(name)
     && isUnitlessNumber[name])  
  )
    return value+'px';
    
  return (""+value).trim();
}

// 属性操作
const _objectWithoutPropertiesLoose(source, excluded){
  if(source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key,i;
  
  for(i=0;i<sourceKeys.length;i++){
    key = sourceKeys[i];
    if(excluded.indexOf(key)>=0) continue;
    target[key] = source[key];
  }
  
  return target;
}
```



### 导出的全局函数

#### applyAnimatedValues

```tsx
const applyAnimatedValues = (instance,props)=>{
  // 当前不是 dom 节点就返回 false
  if(!instance.nodeType || !instance.setAttribute){
    return false;
  }
  const {style,children,scrollTop,scrollLeft} = props
  const attribute = _objectWithoutPropertiesLoose(
    props, ["style","children","scrollTop","scrollLeft"]
  );
  
  if(scrollTop !== void 0) instance.scrollTop = scrollTop;
  if(scrollLeft !== void 0) instance.scrollLeft = scrollLeft;
  
  if(children !== void 0) instance.textContent = children;
  
  for(let styleName in style){
    if(!style.hasOwnProperty(styleName)) continue;
    const isCustomProperty = styleName.indexOf('--') === 0;
    const styleValue = dangerousStyleValue(
      styleName, style[styleName], isCustomProperty);
    if(styleName === 'float') styleName = 'cssFloat';
    // 修改自定义样式，往往以 -- 开头
    if(isCustomProperty) 
      instance.style.setProperty(styleName,styleValue)
    else
      instance.style[styleName] = styleValue;
  }
  
  const isFillterElement = instance.nodeName === 'filter' 
  	|| instace.parentNode 
  	&& instance.parentNode.nodeName === 'filter';
  
  for(let name in attributes){
    const attributeName = 
          isFilterElement || instance.hasAttribute(name)
    			? name
		      : attributeCache[name]||
          (attributeCache[name]=
           name.replace(/([A-Z])/g,n=>'-'+n.toLowerCase()));
    instance.setAttribute(attributeName, attribute[name]);
  }
  
}

这里的动画其实很大一部分是跟 svg 有关系的
```

#### createStringInterpolator

```
来自 @react-spring/shared
```

#### createAnimatedStyle

````tsx
style => new AnimatedStyle(style)
````

#### getComponentProps

```
(_ref)=>{
	let scrollTop = _ref.scrollTop,
			scrollLeft = _ref.scrollLeft,
			props = _objectWithoutPropertiesLoose(_ref,
				["scrollTop","scrollLeft"]
			)
	return props;
}
```



### 特殊值

```tsx
const prefixes = ['Webkit','Ms','Moz','O']
const domTransforms = ['matrix','translate','scale','rotate','skew']
const pxDefaults = ['x','y','z','translate']
const dgDefaults = ['rotate','skew']
```



### 覆写了 AnimatedStyle

```tsx
class AnimatedStyle extends AnimatedObject{
  constructor(_ref){
    if(_ref===void 0){
      _ref = {};
    }
    
    let _ref2 = _ref,
        x = _ref2.x,
        y = _ref2.y,
        z = _ref2.z,
        style = _objectWithoutPropertiesLoose(_ref2, ["x","y","z"]);
    
    const props = [];
    
    const transforms = [];
    
    if(x||y||z){
      const xyz = ensureAnimated([x ||0, y ||0, z ||0]);
      
      props.push(xyz);
      
      transforms.push((_ref3)=>{
        let vx = _ref3[0],
            vy = _ref3[1],
            vz = _ref3[2];
        return [`translated3d(
					${mergeUnit(vx,getUnit('x'))},
					${mergeUnit(vy,getUnit('y'))},
          ${mergeUnit(vz,getUnit('z'))})`]
      })
    }
    
    each(style,(value,key)=>{
      if(key==='transform'){
        props.push(ensureAnimated(value));
        transforms.push(transform=>[transform,transform==='']);
      }else if(
        domTransform.some(transform=>key.startsWith(transform))
      ){
        const unit = getUnit(key);
        props.push(ensureAnimated(value));
        transforms.push(key==='rotate3d'
					? (_ref4)=>{
              let x = _ref4[0],
                  y = _ref4[1],
                  z = _ref4[2],
                  deg = _ref4[3];
              return [
                `rotate3d(${x},${y},${z},${mergeUnit(deg,unit)})`,
                isTransformIdentity(key,deg)
              ];
            }
					: arg=> [is.arr(arg)
                 ?`${key}(${arg.map(v=>mergeUnit(v,unit)).join(',')})`
          			 :`${key}(${mergeUnit(arg,unit)})`,
								 isTransformIdentity(key, arg)
	        ]
			)}
    });
    
    if(props.length>0){
      style.transform = to(props, function(){
        let transform = '';
        let identity = true;
       
        for(let i=0;i<arguments.length;i++){
          const _transform$i = transforms[i](
            i<0||arguments.length<=i
            ?undefined
            :arguments[i]
          ),
                t = _transforms$i[0],
                id = _transform$i[1];
          transform += ''+t;
          identity = identity && id;
        }
        return identity ? "none" : transform;
      })
    }
    super(style);
  }
}
```

