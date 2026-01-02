<script setup>
import { shadowDemo, shadowCodes } from './codes/shadow';
</script>

# 阴影

要为形状应用阴影，我们可以在实例化形状时设置`shadowColor`、`shadowOffset`、`shadowBlur`和`shadowOpacity`属性。

在实例化后，我们也可以通过`shadowColor()`、`shadowOffset()`、`shadowBlur()`和`shadowOpacity()`方法来调整阴影属性。

<KShape :afterMounted="shadowDemo" width="500" height="200" bgColor='#eee' />

<ShapeCode v-bind="shadowCodes" />
