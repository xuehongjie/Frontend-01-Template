# 手势

点击跳转问题
拖拽行为的研究

> touchstart 中的 event.changedTouches[0] 和 touchmove 中的 event.changedTouches[0]不一定是同一个，需要通过 identifier 来确定
> touchend 和 touchcancel 两个一定会触发其中一个，设计手势的时候需要处理 2 个事件的逻辑

| 初始状态    | 条件           | 最终事件        |
| ----------- | -------------- | --------------- |
| start       | end            | tap             |
| start       | 移动 10px      | pan start       |
| start       | 0.5            | press start     |
| press start | 移动 10px      | pan start       |
| press start | end            | press end       |
| pan start   | move           | pan             |
| pan         | move           | pan             |
| pan         | end            | pan end         |
| pan         | end 且速度 > ? | flick(快速扫动) |
