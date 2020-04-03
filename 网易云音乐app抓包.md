### 一些借口配置

```
http://interface3.music.163.com 借口请求都是加密的
https://interface3.music
```



### 获取日志类api

```
http://clientlog3.music.163.com/api/feedback/client/log?MUSIC_A=4151efa3800a1ca1328552dcd500772b6fd5c7d29e9ead2b217bed68fd49f148b06447151efe00fcd75447b7cf2a8ebf480bca8ed38f020628352475ea17ac4a339b402cd6459318384fe0dd1eca3a5f
```



### 常规图片地址

```
https://p1.music.126.net/3KT8mmZUQCmnhUBqk7ue6A==/109951164488974658.jpg?imageView=1&type=webp&thumbnail=235y235

https://p1.music.126.net 应该是一个网易云静态服务器
https://p3.music.126.net
https://p4.music.126.net
https://p5.music.126.net
```

### zip 文件

```
https://d1.music.126.net
```

### eapi 类

```
eapi/**/*
/ad/loading/current
/ad/config/get
/ad/get

/cloudvideo/category/list

/mlivestream/anchor/start-stream/entrance

/delivery/batch-deliver

/v1/user/detail/xxx

/reward/artist/get

/act/playlist/vote/config

/experiment/group/batch/get

/webcache/reslist

/pl/count

/pendant/user/get

/hot/search/info/get

/homepage/block/page

/homepage/dragon/ball/get

/banner/get/v3
```

```
http://clientlog3.music.163.com
	/api/feedback/client/log
```

```
https://interface3.music.163.com
	/eapi/music-vip-membership/client/vip/info
```

```
Bug 统计工具貌似用的是 Firebase Crashlytics

	react-native-firebase
```



```
微信授权
	https://api.weixin.qq.com.sns/oauth2/access_token
	入参
		appid
		secret
		code
		grant_type = authorization_code
	出参
		access_token
		expires_in
		refresh_token
		openid
		scope = "snsapi_userinfo"
		unionid
		

微信获取用户信息
	https://api.weixin.qq.com/sns/oauth2/userinfo
	入参
		access_token
		openid
	出参
		openid
		nickname
		sex
		language
		city
		province
		country
		headimgurl
		privilege
		unionid
```

```
该接口就是纯粹的一个东西
  https://ac.dun.163yun.com/v2/m/b
    code
    msg
    result
      timestamp
      tid

  app默认携带的cookie
    MUSIC_A
    deviceId
    os
    appver			这个也只有官方正品才有
    channel			distribution
    URS_APPID		我不知道是用户的还是 app的
    buildver		1586 这个只有官方正品才有的
    machineid		及其id
    osver				系统版本
```

/eapi/login/sns?_nmclfl=1