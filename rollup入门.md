# rollup 入门

### 安装

```
npm i -g rollup
```



```
rollup ["待打包文件路径"] -f [指定格式]

rollup src/main.js -f cjs

--amd 异步模块
cjs commonjs
es  将软件包保存为 es 模块文件
```



### rollup.config.js

```javascript
export default
{
  input: 'src/main.js',
  output:{
    file: 'bundle.js',
    format: 'cjs'
  }
}

rollup -c / rollup --config 自动寻找 rollup.config.js 配置文件
```



### es 模块 比 CommonJS 更好

```
ES 模块允许进行静态分析，从而实现像 tree-shaking 的优化，并提供诸如循环引用和动态绑定高级功能

tree-shaking -> live code inclusion
它是清除实际上并没有在给定项目中使用的代码过程

CommonJS 需要安装对应 CommonJS 插件
node依赖  插件 node-resolve

rollup 的弱势在 代码拆分 和 运行时态的动态导入
```



```
mkdir -p path 确保目录名存在，不存在就创建

rollup 的命令行选型将会覆盖文件中的选项
rollup -c -o bundle-2.js
```

### 选项

```
-c --config  		default->rollup.config.js
-d --dir		 		chunks 目录
-e --external		不包含在导入的 module 列表
-f --format			amd/cjs/es/iife/umd/system
-g --globals
-h --help
-i --input <filename> 入口文件代替 rollup.config.js 中的input
-m --sourcemap
-n --name <name> Name for UMD export
-o --file <output>
-p --plugin <plugin>
-v --version
-w --watch
```

### 配置文件

```
external
plugins
onwarn 额外选项

acorn
context 顶级上下文
	默认 undefined
moduleContext
	指定每个模块的 上下文 context
legacy
	增加对诸如IE8之类的旧版环境的支持

*input 									library的入口点
*output									
	*file
	*format
	name
	globals
		{ jquery:'$' }
	path
		获取一个ID并返回一个路径，这些路径将被用于生成的包而不是模块，通过cdn加载依赖
		需要与external 进行配对使用
	banner
	footer
		往 sourceMap 添加标注，不破坏 sourceMap 结构
	intro
	outro
		macro 类型
		将 intro 替换成 outro 的代码块
	sourcemap
	sourcemapFile
	interop
	treeshake
		是否开启 live code inclusion
	
	// warning
	exports
	amd
	indent
		缩进格式
	strict

watch
	include
		限制文件监控至某些文件
	exclude
		防止文件被监控
		
以上可以调整
	inputOptions = {
		input,
		external,
		plugins,
		
		// advanced
		onwarn,
		cache,
		
		// dangerous
		acorn,
		context,
		moduleContext,
		legacy
	}
	
	outputOptions = {
		file,
		format,
		name,
		globals,
		
		paths,
		banner,
		footer,
		intro,
		outro,
		sourcemap,
		sourcemapFile,
		interop,
		
		exports,
		amd,
		indent,
		strict
	}
```

### 配置文件

```
rollup-plugin-node-resolve / rollup-plugin-commonjs
可以让你加载 node.js 里面的 CommonJS 模块


rollup-plugin-babel 让 rollup 支持 babel 转译
```

### .babel 调整

```
{
	"presets":[
		["latest",{
			"es2015":{
				"modules":false
			}
		}]
	],
	"plugins":["external-helpers"]
}
这里必须设置 modules:fase，让 rollup 先执行处理
external-helpers 它允许Rollup在包的顶部只引用一次 helpers，而不是每个使用它们的模块都引用一遍

且允许一个模块一个 .babelrc 配置

npm i -D rollup-plugin-babel babel-preset-latest babel-plugin-external-helpers

external 的数组形式不会处理通配符
所以 babel-plugin-lodash 这个导入只会以函数的形式被视作外部依赖/引用
```

