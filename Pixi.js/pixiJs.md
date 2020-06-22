# pixiJs



## 看不懂系列

#### groupD8

```
dihedral group 二面体群

D8 is the same but with diagonals, and it is used for texture rotations.
```

#### accessibility

```
allowing interaction via the keyboard.

Do not instantiate this plugin directly.
It is avaliable from the renderer.plugins property.
```

#### canvasUtils

#### graphicsUtils

```
Generalized convenience utilities for Graphics.
```



### 需要插件处理的 API

```
PIXI.interaction
PIXI.accessibility
```







## 看得懂

### filters

```ts
const app = new PIXI.Application();

const rect = new PIXI.Graphics()
	.beginFill(0x00ff00)
	.drawRect(40,40,200,200)

rect.filters = [new PIXI.filters.BlurFilter()];
app.stage.addChild(rect);
document.body.appendChild(app.view);
```

### resources

```
无法直接实例化获取

Resources are used by PIXI.BaseTexture to handle different media types
such as images, video, SVG graphics, etc.

const baseTexture = PIXI.BaseTexture.from("path/to/image.jpg");

ArrayResource
BaseImageResource
BufferResource
CanvasResource
CubeResource
DepthResource
ImageBitmapResource
ImageResource
Resource
SVGResource
VideoResource

通过 PIXI.resources.INSTALLED.push 可以添加自定义资源类型

PIXI.resources.autoDetectResource(source,{
	width,
	height,
	autoLoad,
	scale,
	createBitmap,
	crossorigin,
	autoPlay,
	updateFPS
})
```

### settings [25]

```
ANISOTROPIC_LEVEL
CAN_UPLOAD_SAME_BUFFER
CREATE_IMAGE_BITMAP = false
	experimental
FAIL_IF_MAJOR_PERFORMANCE_CAVEAT
FILTER_RESOLUTION = 1
GC_MAX_CHECK_COUNT = 600
GC_MAX_IDLE = 3600
GC_MODE
MESH_CANVAS_PADDING
MIPMAP_TEXTURES
PRECISION_FRAGMENT
PRECISION_VERTEX
PREFER_ENV
RENDER_OPTIONS
	view
	resolution
	antialias
	forceFXAA
	autoDensity
	transparent
	backgroundColor
	clearBeforeRender
	preserveDrawingBuffer
	width
	height
	legacy
	
RESOLUTION = 1
	resolution / device pixel ratio of the renderer.
RETINA_PREFIX = /@([0-9\.]+)x/
ROUND_PIXELS = false
SCALE_MODE
	LINEAR
	NEAREST
SORTABLE_CHILDREN = false
	开启在调用 sortChildren 会根据 zIndex 进行排序

SPRITE_BBATCH_SIZE = 4096
SPRITE_MAX_TEXTURES = 32

STRICT_TEXTURE_CACHE
	如果设置了， texture.from 调用会从缓存读取
TARGET_FPMS
UPLOADS_PER_FRAME
WRAP_MODE
	CLAMP
	REPEAT
	MIRRORED_REPEAT
```

### systems[15]

```
AbstractMaskSystem
BatchSystem
ContextSystem
FilterSystem
FramebufferSystem
GeometrySystem
MaskSystem
ProjectionSystem
RenderTextureSystem
ScissorSystem
ShaderSystem
StateSystem
StencilSystem
TextureGCSystem
TextureSystem
```

### utils[25]

```
clearTextureCache
correctBlendMode
createIndicesForQuads
decomposeDataUri
deprecation
destroyTextureCache
earcut
getResolutionOfUrl
hex2rgb
hex2string
isPow2
isWebGLSupported
log2
nextPow2
premultiplyRgba
premultiplyTint
premultiplyTintToRgba
removeItems
rgb2hex
sayHello
sign
skipHello
string2hex
trimCanvas
uid
```



```
forceCanvas => true
```



