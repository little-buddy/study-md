# babel插件合集整理

### babel-plugin-import

#### 配置方式

```
添加有2种方式
	- babelrc
		// babelrc 配置
	- babel-loader
		use:{
			loader:"label-loader",
			options:{
				// babelrc 配置
			}
		}
```

#### options配置

```
libraryName -> node_modules/${libraryName}
libraryDirectory 
	default -> lib
camel2DashComponentName
	default -> true
style
	default -> ${libraryName}/${libraryDirectory}/${name}
	css -> ${libraryName}/${libraryDirectory}/${name}/css
	true -> ${libraryName}/${libraryDirectory}/${name}/style
	函数式 (name:string,file:Object)=>string
styleLibraryDirectory
	default -> null
customName:(name:string)=>string
transformToDefaultImport
	如果非 module 模式，需要设置该属性为 false
```

### 结论

```
react-weui 并不适合这个组件
```

