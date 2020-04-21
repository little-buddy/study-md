# react-use-gesture

```
这个库开源出来真的是 cool !!! 

useDrag
useMove
useHover
useScroll
useWheel
usePinch
useGesture
```

### gesture 的 state 值

| 参数        | 意义                             |      |
| ----------- | -------------------------------- | ---- |
| event       | 原始的 EventData                 |      |
| xy          | position / scroll 当前的位置     |      |
| previous    | 上一次的xy                       |      |
| initial     | 初始值                           |      |
| movement    | xy - initial                     |      |
| delta       | xy - previous                    |      |
|             |                                  |      |
|             |                                  |      |
| offset      | 一开始的 offset 与 distance 同值 |      |
| lastOffset  | 最初的 offset                    |      |
|             |                                  |      |
| vxvy        | 每个轴的手势动量                 |      |
| velocity    | 手势的绝对速度                   |      |
| distance    | offset distance                  |      |
| direction   | direction per axis               |      |
|             |                                  |      |
| startTime   | 手势的开始时间                   |      |
| elapsedTime | 单次手势触发距离上一次的时间     |      |
| timeStamp   | 当前手势触发的时间               |      |
| first       | 是否是首次事件                   |      |
| last        | 是否是最后一次事件               |      |
| active      | 手势当前是否激活                 |      |
|             |                                  |      |
| memo        |                                  |      |
| cancel      |                                  |      |
| canceled    |                                  |      |
| down        | 是否是鼠标或手指按下的状态       |      |
| buttons     | pressed 的个数                   |      |
| touches     | 手指触摸屏幕的个数               |      |
|             |                                  |      |
| args        | 传递构建的参数                   |      |
| ctrlKey     |                                  |      |
| altKey      |                                  |      |
| shiftKey    |                                  |      |
| metaKey     |                                  |      |
|             |                                  |      |
| dragging    | 拖拽        boolean              |      |
| moving      | moved    boolean                 |      |
| scrolling   | scrolled  boolean                |      |
| wheeling    | wheeled  boolean                 |      |
| pinching    | Pinched  boolean                 |      |



### pinch 新增的状态属性

```
da 			[distance,angle]
vdva		单位时间移动的距离以及角度
origin	两个touch时间中间的坐标
```

### drag 状态属性

```
swipe
tap
```



### Handling multiple gestures in one hook with useGesture

```
useGesture({
	onDrag
	onPinch
	onScroll
	onMove
	onWheel
	// 以上的模式都是含带 start -> '' -> end 的操作
	onHover
})
```



### 属性解释

```
movement 和 offset 的区别
```

 

### 课外拓展

```
H5拖拽Api的总结
	
	用在被拖拽元素上
		drag
		dragstart
		dragend
	
  用在目标元素上
		dragenter
		dragover
		drop
		dragleave
		
使元素可以拖动，需要 设置 draggable = true;

拖动元素的数据总线 ev.dataTransfer [ setData, getData ]
dragover\dragleave 中是无法获取 dataTransfer 里面的值

目标元素 ev.target
		
浏览器默认会阻止 ondrop 事件，我们必须在ondrapover中阻止默认行为
在 ondragover 中一定要执行 preventDefault，否则 ondrop 不会被触发


dropEffect 和 effectAllowed 
	能通过它来确定被拖动的元素以及作为放置目标的元素能够接受什么操作。

effectAllowed 作用于被拖动元素
	表示允许拖放元素的哪种 dropEffect
	- none 被拖动的元素不能有任何行为
	- copy 只允许值为 copy 的dropEffect
	- link 只允许值为 link 的dropEffect
	- move 
	- copyLink
	- copyMove
	- linkMove
	- all
dropEffect 作用于目标元素
	none 不能把拖动的元素放在这里
	move 应该把拖动的元素移动到放置目标
	copy 把拖动的元素复制到放置目标
	link 表示放置目标会打开拖动链接(被拖动元素需要是一个 url)
	以上每一个值都会导致光标显示为不同的符号。
	
```

