# 要点思维导图

```mindmap
# Konva
## 图形
### [Node](../api/node)
#### 元信息
##### 获取类型 `getType`
###### Stage
###### Layer
###### Group
###### Shape
##### 获取类名 `getClassName`
##### 读写名称 `name`
##### 添加名称 `addName`
##### 移除名称 `removeName`
##### 检查是否有名称 `hasName`
##### 读写id `id`
#### 缓存
##### 创建缓存 `cache`
##### 清理缓存 `clearCache`
##### 是否有缓存 `isCached`
#### 图形区域
##### 定义点击区 `hitFunc`
##### 图片点击区 `drawHitFromCache`
#### 绘图
##### 重绘 `draw`
##### 读/写混合操作 `globalCompositeOperation`
#### 节点变换
##### 读写允许变换的模式 `transformsEnabled`
##### 获取客户端矩形区域 [`getClientRect`](../api/node#getclientrect-config)
##### 移动节点 `move`
##### 在现有基础上旋转的角度 `rotate`
##### 设置旋转角度 `roation`
##### 获取绝对旋转 `getAbsoluteRotation`
##### 获取节点绝对位置 `getAbsolutePosition`
##### 节点绝对位置 `absolutePosition`
##### 获取绝对变换 `getAbsoluteTransform`
##### 获取变换 `getTransform`
##### 获取绝对缩放 `getAbsoluteScale`
##### 读写缩放 `scale`/`scaleX`/`scaleY`
##### 读写倾斜值 `skew`/`skewX`/`skewY`
##### 相对父元素位置 `position` / `x` / `y`
##### 偏移 `offset`/`offsetX`/`offsetY`
##### 补间节点属性 `to`
#### 节点操作
##### 移除节点 `remove`
##### 销毁节点 `destroy`
#### 属性操作
##### 获取属性 `getAttr`
##### 设置属性 `setAttr`
##### 获取所有属性 `getAttrs`
##### 批量设置属性 `setAttrs`
#### 属性
##### 可见性
###### 是否可见 `isVisible`
###### 设置可见属性 `visible`
###### 显示 `show`
###### 隐藏 `hide`
###### 获取绝对不透明度 `getAbsoluteOpacity`
###### 读写不透明度 `opacity`
##### 宽高 `size`/`width`/`height`
##### 样式
###### 描边样式 `stroke`
###### 填充样式 `fill`
###### 描边填充样式 `fillAfterStrokeEnabled`
#### 层级
##### 获取绝对层级 `getAbsoluteZIndex`
##### 获取/设置层级 `zindex`
#### 节点关系
##### 查询祖先节点 `getAncestors`
##### 查询父节点 `getParent`
##### 按选择器搜索祖先节点 `findAncestors`
##### 按选择器搜索首个祖先节点 `findAncestor`
##### 获取图层祖先 `getLayer`
##### 获取Stage祖先 `getStage`
##### 改变节点所在容器 `moveTo`
##### 获取节点深度 `getDepth`
##### 移动节点到父节点最顶层 `moveToTop`
##### 向上移动节点 `moveUp`
##### 向下移动节点 `moveDown`
##### 移动节点到父节点最底层 `moveToBottom`
#### 鼠标相关
##### 获取鼠标相对节点位置 `getRelativePointerPosition`
#### 节点转换
##### 转换成对象 `toObject`
##### 转换成 JSON 字符串 `toJSON`
##### 从 JSON 创建 `Node.create`
##### 克隆 `clone`
##### 转换为 Canvas 元素 `toCanvas`
##### 转换为 Base64 字符串 `toDataURL`
##### 转换为图片元素 `toImage`
##### 转换为二进制块 `toBlob`
#### 滤镜
##### 模糊半径 `blurRadius`
##### 亮度 `brightness`
##### 对比度 `contrast`
##### 浮雕化强度 `embossStrength`
##### 浮雕化等级 `embossWhiteLevel`
##### 浮雕画方向 `embossDirection`
##### 浮雕混合方式 `embossBlend`
##### 增强 `enhance`
##### 色调 `hue`
##### 饱和度 `saturation`
##### HSL明度 `luminance`
##### HSV值 `value`
##### 万花筒对称层级 `kaleidoscopePower`
##### 万花筒图案角度 `kaleidoscopeAngle`
##### 噪点强度 `noise`
##### 像素尺寸 `pixelSize`
##### 色阶数 `levels`
##### RGB 颜色通道 `red/green/blue`
##### alpha 通道 `alpha`
##### 阈值 `threshold`
### [Container](../api/container)
#### 子节点
##### 子节点 `getChildren`
##### 是否有子节点 `hasChildren`
##### 移除所有子节点 `removeChildren`
##### 销毁所有子节点 `destroyChildren`
##### 添加子节点 `add`
##### 寻找子节点 `find`
##### 寻找一个子节点 `findOne`
##### 是否为祖先节点 `isAncestorOf`
##### 与指定点相交的节点 `getAllIntersections`
##### 裁剪区 `clip/clipX/clipY/clipWidth/clipHeight`
##### 裁剪函数 `clipFunc`
### Text
#### 字体大小 fontSize
#### 水平对齐 align
##### left
##### center
##### right
#### 垂直对齐 verticalAlign
##### top
##### middle
##### bottom
##### baseline
### 事件
#### 事件绑定 `on`
#### 事件解绑 `off`
#### 触发事件 `fire`
#### 事件类型
##### 鼠标事件
###### mouseover
###### mouseout
###### mouseenter
###### mouseleave
###### mousemove
###### mousedown
###### mouseup
###### wheel
###### click
###### dblclick
##### 触摸事件
###### touchstart
###### touchmove
###### touchend
###### tap
###### dbltap
##### 指针事件
###### pointerdown
###### pointermove
###### pointerup
###### pointercancel
###### pointerover
###### pointerenter
###### pointerout
###### pointerleave
###### pointerclick
###### pointerdblclick
##### 拖拽事件
###### dragstart
###### dragmove
###### dragend
##### 变换事件
###### transformstart
###### transform
###### transformend
#### 事件监听
##### 是否处于监听状态 `isListening`
##### 读写本节点监听 `listening`
##### 阻止默认行为 `preventDefault`
#### 拖拽
##### 开始拖拽 `startDrag`
##### 结束拖拽 `stopDrag`
##### 是否为拖拽模式 `isDragging`
##### 读写拖拽阈值 `dragDistance`
##### 读写拖拽边界函数 `dragBoundFunc`
##### 读写允许拖拽标志 `draggable`
## 选择器
### ID 选择器: 以 `#` 开头
### Name 选择器: 以 `.` 开头
### 类型选择器: 节点类名
### 多选择器: 用逗号分隔
### 函数选择器: `(node) => void` 类型函数
```
