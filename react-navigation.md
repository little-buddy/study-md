# react-navigation@5.x

### 基础依赖库

```
- react-native-gesture-handler
		手势库 
- react-native-reanimated
		动画库
- react	-native-screens
- react-native-safe-area-context

启动的关键2点
	- import "react-native-gesture-handlers" -> 该库需要在入口文件 top处 import
	- we need wrap the whole app in NavigationContainer
		import {NavigationContainer} from "@react-navigation/native"
		不然可能莫名 crash
		
- @react-navigation/native
- @react-navigation/stack 依赖 @react-native-community/masked-view
```

### 加强的三方库

```
react-async 请求状态获取封装的三方库
```

### @react-navigation/stack

```
NavigationContainer is a component which manages our navigation tree and contains the
navigation state. This component must wrap all navigators structure.

createStackNavigato => Screen Navigator

Props{
	initialRouteName
	screenOptions
	keyboardHandlingEnabled
		If false, the on screen keyboard will NOT automatically dimiss when navigating 
		to a new screen
	mode
		card -> Use the standard iOS and Android screen transitions
		modal -> 
	headerMode header切换路由时的动画配置
		float
		screen
		none
	options{
		title
		header: ({scene, previous, navigation}) => Component
		headerStyle
		headerShown
		headerTitle
		headerTitleAlign
		headerTitleAllowFontScaling
		headerBackImage
		headerBackTitle
		headerBackTitleVisible
		headerRight
		headerLeft
		headerTitleStyle
		headerBackTitleStyle
		headerLeftContainerStyle
		headerRightContainerStyle
		headerTitleContainerStyle
		headerTintColor
		headerPressColorAndroid
		headerTransparent
		headerBackground
		headerStatusBarHeight 一般预设安全高度无须设置，若没有可以通过这个参数调节
		cardShadowEnabled 切换页面时的阴影效果
		cardOverlayEnabled 切换页面时的 Overlay 效果
		
		cardOverlay -> Component
		cardStyle
		animationEnabled -> 动画效果
		animationTypeForReplace
		gestureEnabled
		gestureResponseDistance
		gestureVelocityImpact -> 0.3
		gestureDirection
		transitionSpec => 配置自定义的动画了
			{
				open: {animation,config}
				close: {animation,config}
			}
			
		cardStyleInterpolator
			(current,next,index,closing,layouts)=>{
				containerStyle
				cardStyle
				overlayStyle
				shadowStyle
			}
		headerStyleInterpolator
			({current, next, layouts})=>{
				leftLabelStyle,
				leftButtonStyle,
				rightButtonStyle,
				titleStyle,
				backgroundStyle
			}

		safeAreaInsets
	}
}

Events
	transitionStart
	transitionEnd
Helpers
	push
	pop
	popToTop

预设的 规则configs, 这里并不改变动画的行为，是给动画的行为分配不同的时长
	TransitionIOSSpec
	FadeInFromBottomAndroidSpec
	FadeOutToBottomAndroidSpec
	RevealFromBottomAndroidSpec

预设的卡片动画 CardStyleInterpolators
	forHorizontalIOS
	forVerticalIOS
	forModalPresentationIOS
	forFadeFromBottomAndroid
	forRevealFromBottomAndroid

预设的标题动画 HeaderStyleInterpolators
	forUIKit
	forFade
	forStatic

预设的的动画 TransitionPresets
	SlideFromRightIOS
	ModalSlideFromBottomIOS
	ModalPresentationIOS
	FadeFromBottomAndroid				Android < 9
	RevealFromBottomAndroid			Android >= 9
	DefaultTransition
	ModalTransition
	
如果希望指定的效果对所有 screen 都有效，就指定Navigator的screenOptions

新增 HeaderHeightContext 可以获取 header 的高度

options = ({route}) =>({...x})
navigation.setOptions 还能够更新当前的options 操作

React.useLayoutEffect -> 不就是 componentWillUpdate 吗?
```



###

```
0.62 版本 添加了 新版功能更强大的调试工具
flipper -> 需要人为手动进行编辑导入
```

