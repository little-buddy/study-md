# grid 布局

```
一直以为 grid 的兼容性极差，是不会被考虑的一种布局，但是今天在参考 facebook的 reactnative官网
发现它已经早早的用上了 gird，所以我们就学着用起来吧
```

### grid 和 flex 布局的区别

```
Flex 是轴线布局，只能指定 “项目” 针对轴线的位置，可以看做一维布局
Grid 将容器划分成 “行” 和 “列”，产生单元格，可以看做二维布局

grid和flex 属性分成两类，一类定义在容器上，一类定义在项目上
	display: grid;
					 inline-grid; 表示该容器是个内敛样式

注意 
	设置为网格布局，容器子元素
		float
		display: inline-block
		display: tabel-cell
		vertical-align
		column-*
		等设置都将失效
```



```
- 容器和项目
- 行和列
- 单元格
- 网格线(包裹单元格)

```



### 属性

```
grid-template-columns 设置每一列列宽
grid-template-rows		设置每一行行高
	=》 除了使用 确切的数字，还可以使用 百分比
	=》 可以用 repeat 简化多个同额数值的写法
		repeat(3, 33.3%)
		repeat(2, 100px 20px 80px)
		repeat(auto-fill, 100px)
			每列宽度100px，然后自动填充，直到容器不能放置更多的列
	=》  fr 关键字(fraction)，表示比例关系
	=》  minmax 产生一个长度范围，表示长度就在这个范围之中
	=》  auto 表示浏览器自己决定长度
	=》 指定网格线的名称 [name]
	
grid-row-gap			设置行间距
grid-column-gap		设置列间距
grid-gap
根据最新标准，以上属性已经删除了前缀 grid

grid-auto-flow 指定子元素的排列顺序
	column 先行后列
	row 先列后行
	这样的设置会存在空白区域，为了尽可能填补这块区域 可以使用 dense 属性
	
justify-items
align-items
place-items
	用于设置子元素内容的布局方式，而place-items:<align-items> <justify-items> 的缩写
	
justify-content
align-content
place-content
	表示整块区域的布局

grid-auto-columns		列宽
grid-auto-rows			行高
	写法与 template 相同
	有时候一些项目的指定位置在现有网格的外部，浏览器就会自动生成多余的网格，一遍放置项目
	
	grid-template:<grid-template-columns> <grid-template-rows> <grid-template-areas>
	grid:<grid-template-rows> <grid-tempalte-columns> <grid-template-areas>
			 <grid-auto-rows> <grid-auto-columns> <grid-auto-flow>
```

```
布局实例变得简单
	grid-template-columns: 70% 30%;
		两栏布局
	grid-template-columns: repeat(12, 1fr);
		传统的十二网格布局
```

### 项目属性

```g
grid-column-start
grid-column-end
grid-row-start
grid-row-end

指定停靠的 网格线，等于通过网格线的形式手动指定 box 的位置

span 2 => 表示跨越几个网格

grid-column: <grid-column-start> <grid-column-end>
grid-row: <grid-row-start> <grid-row-end>

grid-area 表示放置在哪个区域

justify-self
align-self
place-self
```



```
容器，单元格容器，单元格内容
```

