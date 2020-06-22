# Go 第一步

### 安装

```
通过 GVM 来使用多个版本的 Go
bash < <(curl -s -S -L https://raw.githubusercontent.com/moovweb/gvm/master/binscripts/gvm-installer)
```



```
Failed to connect to raw.githubusercontent.com port 443: Connection refused

有的小伙伴在运行官方命令的时候出现以上命令，对应非科学自然异常，而科学下还是异常的原因是 命令行的网络状态并没有同步，这里有一个比较简单粗暴的做法就是 直接将自己的网络DNS 改成 8.8.8.8，你再运行命令就会长舒一口气...
```



```
安装完成之后
gvm: command not found
是不是又很苦恼呢？
没关系，一行命令搞定
source $HOME/.gvm/scripts/gvm
```



```
Go 版本大于 1.4 安装方式
gvm install go1.4 -B
gvm use go1.4
export GOROOT_BOOTSTRAP=$GOROOT
gvm install go1.9.4


如果 出现
ERROR: Failed to download binary go
只需要安装额外插件再运行
brew install mercurial

如果经常出现
zsh: command not found: go
gvm use gox.xx.x --default 可以避免
```



### MACD 指标

``` 
DIF 差离值 = 12日EMA - 26日EMA 
	因为以前每周股票交易日是6天，半个月是12天，一个月就是26天
	虽然现在一周5个交易日，但参数慢慢形成了习惯
	
	DIF绝对值大小，代表着长短期均线距离(开口)的大小。
	当12日均线在26日均线之上，股价处于上升状态，DIF在0轴之上
	当12日均线在26日均线之下时，股价处于下跌状态，DIF在0轴之下
DEM 讯号线 又称MACD值
红柱绿柱 histogram/bar graph

牛市就是不断地顶背离，熊市就是不断地底背离，市场定义指标，而不是指标定义市场
```

### okex 域名问题

```
OpenAPI 请求地址的域名是 www.okex.com
				www.okex.me 是提供给国内用户免费且方便登录的域名
wss 地址
				wss://real.okex.com:8443/ws/v3
阿里云域名
	https://www.okex.com
亚马逊域名
	https://aws.okex.com
```

### okex 限速问题

```
公共数据是根据ip限制，若用户请求传入有效个人信息就根据 UserID限制

HTTP 状态码 429 表示接口超过访问评率限制

API 调用接口报超过访问评率不会被封IP，降低访问频率就可以
每个子账号是独立的UserID，请求次数与母账号是相互独立的，不会累加的
子账户和母账户是分开计算的，相互独立的

websocket 断连
	- 未添加心跳，WebSocket连接需要客户端主动发送 ping 服务器返回 pong，保证连接稳定
	- 需要确保程序能够自动重新连接
```



### 行情接口

```
行情接口可以使用
	- 获取全部 ticker 信息
	- 获取深度数据

k线历史数据
	- 币币最多获取 1440 条
	- 交割合约和永续合约 最多获取 1440 条
	
目前API 暂不提供相关接口

v3 的深度频道接口，首次返回400档，后续返回全量

```

```
最新成交价
	实时显示盘口最新的成交价格
指数价格
	针对每个合约币选择3家以上主流交易所的币对作为指数权重成分，并设计了异常处理逻辑
	保证单个交易所价格出现大幅偏离，指数波动在正常范围内
	
	币本位保证金合约锚定标的货币的美元指数
	USDT保证金合约的锚定标的货币的USDT指数
标记价格
	为了提高合约市场稳定性，减少异常波动时不必要的强制平仓
	我们使用标记价格来计算用户的未实现盈亏
	标记价格 = 现货指数价格 + 基差移动平均值
```



### 账户结构

```
OKEx 分为 主账号和子账号，一个主账号下可以申请多个子账户，子账户是附属于OKEx主账户的一种账户类型
子账号具有独立的账号和密码，可以
```

```
background-image:url(http://qn-classmate.sosho.cn/cc5626a6-9999-cd44-dcc9-b9ab48a49ad2-171cbcf7ccb.jpg?imageView2/1/w/584/h/584/q/90

```



### 云拍毕业照 - 人像分割服务

```
- 七牛
		* 华东、华南
		* 单张图片大小不超过 500KB
		* jpeg/png
		* QPS 有一定限制
		需要在第三方数据处理找到人物分割并开启		
- 百度

- 腾讯云方

- 
```



```
通过主题拿关键字段
```



```
Two 依赖 Underscore.js / Backbone.js 这个工具有点年代感

aims to make the creation and animation of flat shapes easier and more concise.
```



```
TODO
班级首页的入口
	非本班级人员点击出现提示框
	非当年班级无法查看对应入口
```



pixi.js 方案

phaser.js 

three.js

奇舞团的 sprite.js 但是它有2个版本，且效果不一样，主要这个库是响应式的，比较好确定比例

```
spritejs
sprite-extend-3d 3D 扩展
```







