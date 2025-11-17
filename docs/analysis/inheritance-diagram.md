# 类继承关系

```mermaid
classDiagram

class Container {
    << abstract >>
}
class Stage {
}
class Layer {
}
class Group {
}

Container <|-- Stage
Container <|-- Layer
Container <|-- Group
```
