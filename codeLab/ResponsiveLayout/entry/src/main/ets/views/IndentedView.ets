// 导入窗口信息工具类，用于获取窗口属性和断点信息
import { WindowInfo } from '../utils/WindowUtil';

/**
 * 缩进布局视图组件
 *
 * 这是一个响应式缩进布局组件，主要特性包括：
 * - 基于GridRow/GridCol栅格系统实现响应式缩进布局
 * - 根据不同屏幕尺寸动态调整内容区域的偏移量和跨度
 * - 在小屏设备上全屏显示，在大屏设备上居中缩进显示
 * - 支持垂直列表滚动，自适应安全区域
 *
 * 响应式断点配置：
 * - XS (≤320vp)：4列栅格，占4列，无偏移
 * - SM (321-600vp)：4列栅格，占4列，无偏移
 * - MD (601-840vp)：8列栅格，占6列，偏移1列
 * - LG (841-1440vp)：12列栅格，占8列，偏移2列
 * - XL (>1440vp)：12列栅格，占8列，偏移2列
 *
 * @since 2023-xx-xx
 */
@Component
export struct IndentedView {
  @ObjectLink mainWindowInfo: WindowInfo; // 主窗口信息对象，包含窗口尺寸和断点信息
  infoArray: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]; // 列表数据源数组，包含12个示例项目
  listScroller: ListScroller = new ListScroller(); // 列表滚动控制器
  pathStack: NavPathStack = new NavPathStack(); // 路径导航栈，用于页面路由管理

  /**
   * 构建缩进布局视图
   * 使用栅格系统实现响应式缩进效果
   */
  build() {
    Column() {
      // 标题栏，包含返回按钮和标题文本
      Row() {
        Image($r('app.media.ic_public_back'))
          .width(40)
          .height(40)
          .margin({ right: 12 }) // 右边距12px
          .onClick(() => {
            // 点击返回按钮，从导航栈中弹出当前页面
            this.pathStack.pop();
          })
        // 页面标题文本
        Text($r('app.string.indented_layout'))
          .fontSize(24) // 标题字体大小24px
      }
      .width('100%') // 标题栏占满宽度
      .margin({ bottom: 12 }) // 底部边距12px

      // [Start indented_view]
      // 响应式栅格行容器，定义不同断点下的列数和断点值
      GridRow({
        columns: { xs: 4, sm: 4, md: 8, lg: 12, xl: 12 }, // 各断点下的列数配置
        gutter: 0, // 列间距为0
        breakpoints: { value: ['320vp', '600vp', '840vp', '1440vp']}, // 断点阈值数组
        direction: GridRowDirection.Row // 水平排列方向
      }) {
        // 响应式栅格列容器，定义内容区域的跨度和偏移
        GridCol({
          span: { xs: 4, sm: 4, md: 6, lg: 8, xl: 8 }, // 各断点下占用的列数
          offset: { xs: 0, sm: 0, md: 1, lg: 2, xl: 2 } // 各断点下的左偏移列数
        }) {
          // [StartExclude indented_view]
          // 垂直滚动列表容器
          List({
            space: 12, // 列表项间距12px
            scroller: this.listScroller // 绑定滚动控制器
          }) {
            // 遍历数据源，生成列表项
            ForEach(this.infoArray, (item: number, index: number) => {
              ListItem() {
                Row() {
                } // 空行组件作为列表项内容占位符
                .width('100%') // 宽度占满列表项
                .height(60) // 固定高度60px
                .borderRadius(16) // 圆角半径16px
                .backgroundColor('#F1F3F5') // 浅灰色背景
              }
              .margin({
                // 最后一项添加底部边距，避免被导航指示器遮挡
                bottom: index === this.infoArray.length - 1 ?
                this.getUIContext().px2vp(this.mainWindowInfo.AvoidNavigationIndicator?.bottomRect.height) : 0
              })
            }, (item: number, index: number) => JSON.stringify(item) + index) // 生成唯一键值
          }
          .width('100%') // 列表宽度占满栅格列
          .layoutWeight(1) // 设置布局权重，占用剩余空间
          .scrollBar(BarState.Off) // 隐藏滚动条
          // [EndExclude indented_view]
        }
        .width('100%') // 栅格列宽度占满栅格行
        .height('100%') // 栅格列高度占满栅格行
      }
      // [End indented_view]
      .width('100%') // 栅格行宽度占满父容器
      .layoutWeight(1) // 设置布局权重，占用剩余空间
    }
    .height('100%') // 列容器高度占满屏幕
    .width('100%') // 列容器宽度占满屏幕
    .padding({
      // 顶部内边距：系统状态栏高度 + 12px额外间距
      top: this.getUIContext().px2vp(this.mainWindowInfo.AvoidSystem?.topRect.height) + 12,
      left: 16, // 左侧内边距16px
      right: 16 // 右侧内边距16px
    })
  }
}