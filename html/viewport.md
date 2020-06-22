# viewport.md



```
devicePixelRatio = 物理像素 / 独立像素
css 中的px就可以看做是独立像素

layout viewport 可以通过 document.documentElement.clientWidth 来获取
visual viewport 可以通过 window.innerWidth 来获取
idea viewport 移动设备的理想viewport
```



### Bootstrap 断点

```
Extra large >=1200
large >=992
Medium >=768
Small	>=576
Extra small <576


scss 下的表达
@include media-breakpoint-up(sm){ ... }
@include media-breakpoint-up(md){ ... }
@include media-breakpoint-up(lg){ ... }
@include media-breakpoint-up(xl){ ... }

@include media-breakpoint-between(md, xl){ ... }

zIndex 断层

$zindex-dropdown: 1000 !default;
$zindex-sticky: 1020 !default;
$zindex-fixed: 1030 !default;
$zindex-modal-backdrop: 1040 !default;
$zindex-modal: 1050 !default;
$zindex-popover: 1060 !default;
$zindex-tooltip: 1070 !default;
```

proxy_set_header X-Forwarded-Proto $scheme;