# pods 国内镜像源切换



```
简单粗暴

再 Podfile 最上面添加 source 'https://cdn.cocoapods.org/'
```

### 常规操作

```
$ cd ~/.cocoapods/repos 
$ pod repo remove master
$ git clone https://mirrors.tuna.tsinghua.edu.cn/git/CocoaPods/Specs.git master
```



### 官方镜像

```
https://github.com/CocoaPods/Specs
```

### 旧版指南

```
pod repo remove master
pod repo add master https://mirrors.tuna.tsinghua.edu.cn/git/CocoaPods/Specs.git
pod repo update
```

### 新版指南

```
cd ~/.cocoapods/repos 
pod repo remove master
git clone https://mirrors.tuna.tsinghua.edu.cn/git/CocoaPods/Specs.git master

最后进入自己的工程，在自己工程的podFile第一行加上：
source 'https://mirrors.tuna.tsinghua.edu.cn/git/CocoaPods/Specs.git'
```



```
2020年的时候，你去搜 Cocoapods 更换国内镜像源

按目前所发布的最新文章都停留在 2019年年底

所有的操作都是让你去使用 
	https://mirrors.tuna.tsinghua.edu.cn/git/CocoaPods/Specs.git
	
然后你最终会发现，这个库总是下到一半各种找理由掉链子，然后再一次运行命令期待它哪天抽经就下完了
我可以很负责任的告诉你不要多想了，与其这样做，不如挂FQ用原master吧

最后阴差阳错，发现了 码云有一个镜像源仓库，搜了一下 cocoapods，哈哈，结果有，评论一阵感谢，这个简直就是太帅了，结束了数天查找 cocoapods 源的曲折历程

就这件事感觉 iOS是彻底凉了，一个镜像源库都没有人来论坛告诉你该怎么操作了，还有社区吗？看到这里的朋友可以评论告诉我下靠谱论坛，方便我学习

https://gitee.com/mirrors/CocoaPods-Specs.git
 结果 tm 码云 救了我
 
 0.62.2 新增了 Flipper 相关工具包，并且国内 pod 安装起来特别费事，于是强烈建议不要升级到 0.62.x
 0.61.x 的FastRefresh 就很香
```



```
Flipper-glog 安装失败的原因是因为克隆到本地的库依赖 C++模块去自动 configuration

由于某些原因xcode 的模块无法正常调用或者文件校验没有通过，所以导致 pod install 无法正常进行下去

在读完 https://github.com/facebook/react-native/issues/25561 该 issue 之后，不明觉厉地尝试了

sudo xcode-select --switch /Applications/Xcode.app

结果重新执行 pod install 就完成了该模块的安装

解决 Flipper-glog pod 安装失败的问题


```



```
0.62.x 的新增特性就是
	玻璃 AppleTv 工程
	新增 Flipper 相关调试工具
	新增 New dark mode feature 判断工具
		个人觉得这个iOS 模块完全可以靠三方插件的形式进行添加
		
Flipper 安装太过曲折，真的不建议玩这个东西
```



```
安装 OpenSSL 的时候

error: RPC failed; curl 18 transfer closed with outstanding read data remaining
 
fatal: The remote end hung up unexpectedly
 
fatal: early EOF
 
fatal: index-pack failed

报上述错误

据说是 curl的postBuffer默认值太小了，需要调整

git config --global http.postBuffer 524288000

亲测有效
```





```
这一次主要是为了尝试
	Flipper + rematch 的调试效果
	
```



### react-native-flipper 的使用

```
Flipper{
	registerPlugin
	send
	reportErrorWithMetadata
	reportError
	subscribe
	respondSuccess
	respondError
}

addPlugin({
	getId
	onConnect
	onDisconnect
	runInBackground
})

Native plugins for React Native
- Devices logs
- Devices crash reporter
- Inspecting network requests
- Inspecting app local databases
- Inspecting device preferences
- Inspecting cached images
- Inspecting native layout elements
```



### react-native 调试器的选择

### React Native developer tools

```
Use Chrome DevTools as a interface to debug/log app.带给web开发者更好地开发体验

但是使用久了你就会发现它没有 network log.我不能使用一些开发者的特性且app变得很慢
```

### React Native Debugger

```
It's using Electron with Chrome DevTools,but it has enabled Network tab to log all
network request and adds React+ReduxDevTools on top of that.

含有 redux 状态面板、network log、reactDevtool、console 面板，集百家之所长
```

### remote debugging

```
从本质上抨击该原理性瑕疵

remote debugging 工作原理很简单，就是讲js代码的执行放在不同的引擎，运行的引擎是在我们自己的机器上，而不是虚拟机或真实的设备

运行所有的js在Chrome(V8)，来替代RN 自带的JavascriptCore
所有的命令都来自 JS 和 Native over web socket 连接.
```

### Reactotron

```
它创建了自己的web socket 连接在app和开发者工具之间
```

### Safari Web 开发者共计

```
与 rn 是一个js引擎所以不存在引擎不同而产生奇异bug
而且比较难受的一个点，就是 reload bundle的时候它每次都会创建一个新窗口
```

### Flipper

```
- Network log — very similar to what we have in Chrome
- Log — combines console.log, native log (ADB, IDB)
- React DevTools
- Hermes Debugger — easy way to debug Hermes on Android
- And bunch more (mostly focused on native side).

感觉上去非常的强大，但是使用起来一些日志的输出还是没有 ChromeDevtools 的格式化来的清晰，也可能是对web开发者来说不习惯

不足点
- Log doesn’t support read JSON/Object data. It displays as a string.
- Cannot filter which type request in Network feature. Ex: XHR, Media, CSS…
```





```

个人建议，开发的时候使用 ReactNativeDebugger，而在一些必须在非debug模式下的调试可以使用 flipper，毕竟Chrome自带的console格式化还是很智能的，不能把多个工具的优势集中在一块，那就
分开且分场景去使用它
```



```
参考资料 
	https://itnext.io/flipper-a-react-native-revolution-4859d6acd685
	
	0.61.x 以前的配置 flipper
	http://blog.nparashuram.com/2019/09/using-flipper-with-react-native.html
```







# flipper rn开发者最新的选择

### 初代

```
每一个入坑rn的开发者，首先接触到的调试方式一定是唤出 ReactNative Debug Menu
我相信每一个开发者最先接触的rn调试工具必然是 基于ChromeDevtools的ReactNative
http://localhost:8081/debugger-ui/

```



