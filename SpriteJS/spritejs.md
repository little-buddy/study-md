# SpriteJS

### 基础

```
anchor 描点 0-1 表示相对于宽和高的百分比
pos 距离 [0,0] 的位置
bgColor

texture 图片的的url
textureRect
textureRepeat

offsetPath 沿着某一路径进行调整
autoRender 是否自动渲染

contextType:"2d" 强制使用2D模式渲染
```



### 盒子

```
一个块元素有四个 "宽高"
  - contentSize 
    内容的宽高
  - clientSize
    内容的宽高 + padding
  - borderSize
    内容的宽高 + padding + border 一半
  - offsetSize
    内容的宽高 + padding + border
    
content-size => contentSize
border-size => offsetSize
```

### 边框

```
borderWidth
borderColor
borderDash
borderDashOffset
borderRadius
```

### label

```
v3的label 相比于v2的label被弱化了
仅支持单行文本，不支持自动排版
```

### Group

```
与v2相比，性能提升的同时失去了 clip 和 裁剪区域的功能
```

### 路径元素

```
- Arc 圆弧 与 扇形
		radius			半径
		startAngle  起始角
		endAngle		结束角
		direction		方向 clockwise顺时针，anticklockwise逆时针
		closeType	  none 不闭合；normal 沿直线闭合；sector 沿扇形闭合
- Ellipse 椭圆弧 与 椭圆扇形
		radiusX x轴半径
		radiusY y轴半径
		startAngle 起始角
		endAngle   结束角
		direction
		closeType
- Parallel 平行四边形
- Path SVG路径
- Polyline 折线与多边形
		smooth 平滑的选项
- Rect 矩形
- Regular 正多边形
- Ring
		innerRadius 内圆半径
		outerRadius 外圆半径
		startAngle	起始角
		endAngle		结束角
- Star 多角星
		angles
		innerRadius
		outerRadius

Triangle 三角形
sides 两条边长
angle 一个角度
就可以确定
```



### 过渡

```
x.transition(time).attr({}) 通过这样设置的属性，属性会有过渡效果
还可以通过 x.reverse 回滚动画效果
```

### 动画

```
animate([/* 变化数组 */],{ /* 操作 */ })
```

### 滤镜

```
none
brightness(150%)
grayscale(50%)
blur(12px)
drop-shadow(15,15,#033)
hue-rotate(45)
invert(100%)
opacity(20%)
sepia(100%)

```

### 渐变

```
与v2不同，根据vector参数不同，分别创建 linearGradient 和 RadiaGradient
[bug] 目前有一个bug，无法给同一个元素同时设置 stroke 和 fill
```

### 事件

```
Scene 自动代理了 mouse 和 touch 相关事件，因此要监听这些事件非常简单
直接使用 spirte.addEventListener 即可
mouseeneter
mouseleave
mousemove
mousedown
mouseup

beforerender
afterrender
preload
keydown
keyup
pointerEvents
handleEvent:false 不派发事件
```

```
canvas2d 不支持 textureRepeat

bufferSize 用于合并的顶点个数
```

### Web Animations API

```
animation对象的状态
- idle
- pending
- running
- paused
- finished

timeing对象有以下属性
  delay
  endDelay
  fill none|forwards|backwards|boths
  iterations 动画播放次数
  direction default|reverse|alternate|alternate-reverse
  duration
  easing
  
sprite 所属的layer 上有一个 timeline属性，所有layer上运行的动画使用这个timeline对象来获得时间线，这样当我们改变layer时间线的时候，我们就能影响到所有元素的动画时间
timeline.playbackRate
playbackRate < 0的时候，动画回复到初始状态然后结束

官方推荐第三方动画库 TweenJS

layer.tick((t,p)=>{

},{duration,playbackRate}) 进行一波操作
```

### 外部时钟的操作

```
{autoRender:false}

然后通过外部三方库进行一次性调用更新 ... 666
```

### 云 Cloud

```
它能够以某个元素为模板，大批量绘制该元素
```

### 快照

```
这不正是我们想要的嘛
scene.snapshot() 就是不知道这个能不能调整它的分辨率
```



### 原生api交互

```
layer.gl获取webgl的context
如果是2d，可以通过layer.canvas.getContext('2d')获取
```

