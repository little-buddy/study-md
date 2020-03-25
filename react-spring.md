# react-spring 配置整理

## react-spring-hooks

```
个人感觉 5个数量 的api动画库真的让人感觉不到学习的压力
- useSpring
- useSprings
- useTrail
- useTransition
- useChain
```

## common api

### config

```
react-spring 的配置

// 默认配置的值
	mass				1
	tension			170
	friction		26
	clamp				false
	precision		0.01
	velocity		0

// 设置了 duration 就转换成了 duration模式
	duration
	easing 			-> 可以使用 d3-ease
	
default				{mass:1,tension:170,friction:26}
gentle				{mass:1,tension:120,friction:14}	温和
wobbly				{mass:1,tension:180,friction:12}  摇摇晃晃
stiff					{mass:1,tension:210,friction:20}	僵硬的
slow					{mass:1,tension:280,friction:60}	缓慢的
molasses			{mass:1,tension:280,friction:120} 糖蜜

mass 			附着在弹簧末端的物体质量，默认值是 1
tension 	张力
frication	摩擦力
velocity	附着在弹簧末端物体的初始速度，默认值为0即物体没有运动

spring动画的多套标准
	bounciness/speed					反弹力 和 速度
	tension/friction					张力 和 摩擦力
	stiffness/damping/mass		刚度、阻尼和质量
```

### properties

| Property  | Type              | Description                                                  |
| --------- | ----------------- | ------------------------------------------------------------ |
| from      | obj               |                                                              |
| to        | obj / fn / obj[ ] |                                                              |
| delay     | number / fn       |                                                              |
| immediate | bool / fn         |                                                              |
| config    | obj / fn          |                                                              |
| reset     | bool              |                                                              |
| reverse   | bool              | "from" and "to" are switched if set true, this will only make sense in combination with the "reset" flag [ 不太明白这个东西是什么鬼，为什么需要 combination ? ] |
| onStart   | fn                |                                                              |
| onRest    | fn                |                                                              |
| onFrame   | fn                | Frame by frame callback, first argument passed is the animated value |

### Interpolations

```
插值
	identity / clamp / extend
{
	extrapolateLeft
	extrapolateRight
	extrapolate
	range
	output
	map
}
```

## useSpring

```
# Additional notes
	
	To-prop shortcut
    Any property that useSpring does not recognize will be combined into "to"
    for instance opacity:1 will become to:{opacity:1}
	example:
		useSpring({opacity:1}) => useSpring({to:{opacity:1}})
		
	Async chains/scripts 顺序动画
		useSpring({
			to: async (next,cancel)=>{
				await next({opacity:1})
				await next({opacity:0})
			},
			from:{opacity:0}
		})
	OR
		useSpring({
			to:[{opacity:1},{opacity:0}],
			from:{opacity:0}
		})
```





