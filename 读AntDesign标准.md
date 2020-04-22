# 读 AntDesign 标准

```
Ant Design 色板生成算法演进史
- 色相、饱和度、明度
- HSL 和 HSV 色彩空间
- 贝塞尔曲线扫盲
```

```
在 Ant Design 中，调色板指的是一份颜色表
颜色表由一系列具有一定代表性的基本色彩及它们的渐变色组成
每种颜色有 10 个类别的色系

基本色彩由主设计师来钦定，起渐变色由色板生成算法计算得到
```

### 调色板生成算法@1.0

#### 原理

```
9色
- 选取一个主色作为5号色
- 将主色与纯白色混合，主色与纯白色之间分成100份，20/40/60/80 的位置分别分割，
	得到4/3/2/1 号色
	将主色与黑色混合，主色与纯白色之间分成100份，20/40/60/80 的位置分别分割，
	得6/7/8/9 号色
```

#### scss 实现

```scss
@function tint($color,$percentage){
  @return mix(white,$color,$percentage);
}
@function shade($color,$percentage){
  @return mix(black,$color,$percentage);
}
.useage{
  background-color: tint(#2db7f5, 80%);
}
```

#### 缺点

```
- 自然界没有纯白/纯灰/纯黑色的东西,所以给人不够真实
- 当主色亮度或饱和度低的时候,色号小于5/大于5的变化速率差异增大
```

### 调色板生成算法@2.0

#### 原理

```
- 选取一个颜色作为主色(6号色)
- 判断减淡或加深，进行颜色混合

若减淡，则主色与白色混合，根据色号，获取贝塞尔曲线上对应的值
若加深，则主色与它对应的深色混合(不再是黑色)，根据色号在贝塞尔曲线上对应的值
```

#### 代码实现

```js
// colorEasing 使用的是 bezier-easing 四个参数 (0.26,0.09,0.37,0.18)
var primaryEasing = colorEasing(0.6);
this.colorPalette = function(color,index){
	var currentEasing = colorEasing(index * 0.1);
	if(index <= 6){
		return tinycolor.mix(
			'#ffffff',
			color,
			currentEasing*100/primaryEasing
		).toHexString()
	}
	return tinycolor.mix(
		getShadeColor(color),
		color,
		(1-(currentEasing-primaryEasing)/(1-primaryEasing))*100
	).toHexString();
}

// 浅色依旧与纯白色混合，而纯黑是与区别于冷暖色不同程度的加深与色相值的旋转
// 2.x 使用了 HSL模型

var warmDark = 0.5;
var warmRotate = -26;
var coldDark = 0.55;
var coldRotate = 10;
// 暖色，则旋转 HSL 色轮，使颜色更暖
if(shadeColor.toRgb().r>shadeColor.toRgb().b){
  return shadeColor
    .darken(shadeColor.toHsl().l*warmDark*100)
    .spin(warmRotate)
    .toHexString();
}
// 冷色，则旋转HSL色轮，使眼色更冷
return shadeColor
  .darken(shadeColor.toHsl().l*coldDark*100)
  .spin(coldRotate)
  .toHexString();
```

#### 缺点

```

```

### 调色板生成算法@3.0

#### 原理

```
使用了 HSC 模型，对于 HSV 还是 HSL 更适合人类用户界面是有争议的
直接用 HSV 模型的值进行递减/递增得到完整渐变色板
```

#### 实现

```js
function main(color,index){
  var isLight = index <= 6;
  var hsv = tingcolor(color).toHsv();
  var i = isLight 
  		? lightColorCount+1-index
  		: index-lightColorCount-1;
  return tinycolor({
    h:getHue(hsv,i,isLight),
    s:getSaturation(hsv,i,isLight),
    v:getValue(hsv,i,isLight)
  }).toHexString()
}

// 获取色相渐变
var hueStep = 2;
if(hsv.h>=60&&hsv.h<=240){
  // 冷色调
  // 减淡变亮 色相顺时针旋转 更暖
  // 加深变暗 色相逆时针旋转 更冷
  hue = isLight?hsv.h-hueStep*i:hsv.h+hueStep*i;
}else{
  // 暖色调
  // 减淡变亮 色相逆时针旋转 更暖
  // 加深变暗 色相顺时针旋转 更冷
  hue = isLight?hsv.h+hueStep*i:hsv.h-hueStep*i;
}

// 获取饱和度渐变
var saturationStep = 16;
var saturationStep2 = 5;
var darkColorCount = 4;

if(isLight){
  saturation = Math.round(hsv.s*100) - saturationStep * i;
}else if(i==darkColorCount){
  saturation = Math.round(hsv.s*100) + saturationStep;
}else{
  saturation = Math.round(hsv.s*100) + saturationStep2 * i;
}

// 获取明度渐变
var brightnessStep1 = 5;
var brightnessStep2 = 15;
var getValue = function(hsv,i,isLight){
  if(isLight){
    return Math.round(hsv.v*100)+brightnessStep1*i;
  }
  return Math.round(hsv.v*100) - brightnessStep2*i;
}
```

#### 缺点

```
主色的选取很重要，一般主色选取饱和度较高、明度较高的颜色才能更好地匹配这个色板生成算法

舍弃了与某个浅色/深色值 进行混合的形式获取渐变色，而是直接对HSV的三个值进行递增/递减

如果主色的饱和度过低，则渐变色板减淡的部分饱和度迅速递减，而加深部分显得色板不够饱和

如果主色的明度过低，则渐变色板加深的部分明度迅速递减，9/10 色号相差无几

palettes 调色板
```



```
js 端颜色库

@ant-design/colors
```



```
冷暖色: 不同的颜色给人以不同的心理感觉，因此我们将色环分为两个不用的范围，一种是暖色，一种是冷色
互补色: 色环上处于对角线上的色彩为互补色
对比色: 色环上成约120度的为对比色，会有左右2个点
邻近色: 色环上与某颜色相邻的两种颜色
```





### RGB模型

```
R 暖色
B 冷色
G 中性色

rgb -> rgb24
rgba -> rgb32

从原点 (0,0,0) 到对角的顶点 (255,255,255) 连出一条直线，这条对角线就可以说是一条明度轴了，任何一个颜色对应到的一点在这条对角线上的“投影”就是这个颜色的明度，这里的明度应该是 hsl的
```

### HSL 模型

```
Hue 色相
	这里的色相是一个圆环的角度
		红色		0				R
		黄色		60
		绿色		120			G
		青色		180
		蓝色		240			B
		洋红		300
		
Saturation 饱和度
	0 - 100的变化
	数值越大，颜色中的灰色越少，颜色越鲜艳，呈现一种从理性到感性的变化
Lightness 亮度
	0-100
	
	角度轴是色相
	距离周是饱和度
```

### HSV /HSB 模型

```
是一种将RGB色彩空间中的点在倒圆锥体中的表示方法
Hue 色相 Saturation 饱和度 Value 明度，又称 HSB [Brightness]

色相 是色彩的基本属性，就是平常说的颜色的名称，如 红色、黄色
饱和度 是指色彩的纯度，越高色彩越纯，低则逐渐变灰， 0-100% 的数值
明度 取 0-max (计算机中HSV取值范围和存储的长度有关)


HSL 和 HSV 中 “色相” 指称相同的性质，它们的“饱和度”的定义是明显不同的

HSL 更好的反映了 饱和度 和 亮度 作为两个独立参数的直觉观念
而且 非常柔和的几乎白色的颜色在HSL可以被定义为是完全饱和的
```

### YUV 颜色空间

```
是被欧洲电视系统所采用的一种颜色编码方法。
然后把取得的彩色图像信号经 分色、分别放大校正后得到RGB，
再经过矩阵变换电路得到亮度信号Y和两个色差信号R-Y B-Y，
最后发送端将亮度和两个色差总共三个信号分别编码

主要用于优化彩色视频信号的传输，使其向后相容老式黑白电视
```



