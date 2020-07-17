### options

```json
debug[false] 是否开启日志输出
resource
lng
fallbackLng
supportedLngs
nonExplicitSupportedLngs
load
preload
lowerCaseLng
cleanCode
ns
defaultNS
fallbackNS
partialBundledLanguages
```



### 浏览器是如何加载字体的

```
大多数浏览器在自定义字体还未下载之前会隐藏文本 FOIT(Flash of Invisible Text)

- 传统方案
		初始设置一种字体，然后在 p 前添加 className 覆盖这一属性样式
- font-display 时代
		auto 典型浏览器字体加载的行为，自定义字体的文本会被隐藏，知道字体加载结束才会显示
		swap 后备文本立即显示直到自定义字体加载完成后再使用自定义字体渲染文本
		fallback 
			auto和swap的一种折中，自定义字体渲染100ms内不可见，然后加载后背文本，再加载自定义字体
		optional 效果和 fallback 几乎一样，都是先在极短的时间内文本不可见，然后再加载自定义，
						 如果加载很慢，即使加载成功也不会应用

判断font-display是否得到支持
	"fontDiaplay" in document.body.style
```

### sass 最新的 module system

```
@use

@use 和 @import 的区别
	在一个 project 里 use 引入的文件只会 import 一次
	_ / - 开头的 Variables mixins functions 不会被引入
	每个引入都会 有 namespaced
	
@use "buttons"
$btn-color: buttons.$color;

自定义命名
@use "button" as *;
@use "forms" as 'f';

在引入的时候，使用with关键字设置变量
@use 'button' with(
	$color:red,
	$style:'flat'
)

@forword
	类似于 js 的 export *
	就是指并不想引入任何变量 只是想将文件导入进来 方便改文件被引入时可以使用
	
	通过 hide 可以禁止某些变量 导出
```



```
IOST 就是区分 
	MAINNET 1024
  TESTNET 1020
```

