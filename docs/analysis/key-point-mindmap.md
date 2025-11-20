# 要点思维导图

```mindmap
# Konva
## 图形
### [Node](../api/node)
#### 缓存
- 创建缓存 `cache`
- 清理缓存 `clearCache`
- 是否有缓存 `isCached`
#### 节点变换
- 获取客户端矩形区域 [`getClientRect`](../api/node#getclientrect-config)
- 移动节点 `move`
- 旋转角度 `rotate`
- 获取节点绝对位置 `getAbsolutePosition`
- 获取绝对变换 `getAbsoluteTransform`
- 获取变换 `getTransform`
- 获取绝对缩放 `getAbsoluteScale`
- 获取绝对旋转 `getAbsoluteRotation`
#### 事件
- 事件绑定 `on`
- 事件解绑 `off`
- 是否处于监听状态 `isListening`
- 事件触发 `fire`
#### 节点操作
- 移除节点 `remove`
- 销毁节点 `destroy`
#### 属性操作
- 获取属性 `getAttr`
- 获取所有属性 `getAttrs`
- 设置属性 `setAttrs`
#### 属性
##### 可见性
- 是否可见 `isVisible`
- 显示 `show`
- 隐藏 `hide`
- 获取绝对不透明度 `getAbsoluteOpacity`
#### 层级
- 获取绝对层级 `getAbsoluteZIndex`
#### 节点关系
- 查询祖先节点 `getAncestors`
- 查询父节点 `getParent`
- 按选择器搜索祖先节点 `findAncestors`
- 按选择器搜索首个祖先节点 `findAncestor`
- 获取图层祖先 `getLayer`
- 获取Stage祖先 `getStage`
- 改变节点所在容器 `moveTo`
- 获取节点深度 `getDepth`
- 移动节点到父节点最顶层 `moveToTop`
- 向上移动节点 `moveUp`
- 向下移动节点 `moveDown`
- 移动节点到父节点最底层 `moveToBottom`
#### 鼠标相关
- 获取鼠标相对节点位置 `getRelativePointerPosition`
#### 节点转换
- 转换成对象 `toObject`
- 转换成 JSON 字符串 `toJSON`
- 克隆 `clone`
- 转换为 Canvas 元素 `toCanvas`
## 选择器
- ID 选择器: 以 `#` 开头
- Name 选择器: 以 `.` 开头
- 类型选择器: 节点类名
- 多选择器: 用逗号分隔
- 函数选择器: `(node) => void` 类型函数
```
